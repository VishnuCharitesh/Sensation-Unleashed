package com.sensation.config;

import com.sensation.entity.*;
import com.sensation.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) return;

        // 1. Seed Users
        User admin = User.builder()
                .fullName("Nellore Store Admin")
                .email("admin@sensation.com")
                .phone("9999911111")
                .passwordHash(passwordEncoder.encode(System.getenv().getOrDefault("ADMIN_PASSWORD", "admin123")))
                .role("ROLE_ADMIN")
                .build();
        userRepository.save(admin);

        User subscriber = User.builder()
                .fullName("Rajesh Varma (VIP)")
                .email("subscriber@sensation.com")
                .phone("9848022334")
                .passwordHash(passwordEncoder.encode(System.getenv().getOrDefault("SUBSCRIBER_PASSWORD", "sub123")))
                .role("ROLE_SUBSCRIBER")
                .build();
        userRepository.save(subscriber);

        User customer = User.builder()
                .fullName("Priya Sharma")
                .email("customer@sensation.com")
                .phone("9848099887")
                .passwordHash(passwordEncoder.encode(System.getenv().getOrDefault("CUSTOMER_PASSWORD", "cust123")))
                .role("ROLE_CUSTOMER")
                .build();
        userRepository.save(customer);

        // Seed Active Subscription for VIP user
        Subscription sub = Subscription.builder()
                .user(subscriber)
                .status("ACTIVE")
                .amount(new BigDecimal("500.00"))
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusDays(30))
                .paymentReference("SUB_INITIAL_SEED_01")
                .build();
        subscriptionRepository.save(sub);

        // 2. Seed Categories
        Category ethnic = categoryRepository.save(Category.builder()
                .name("Ethnic & Festive Wear")
                .slug("ethnic-festive-wear")
                .description("Traditional silk sarees, designer kurtas, and festive sherwanis crafted in Andhra Pradesh.")
                .imageUrl("https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80")
                .build());

        Category menFormals = categoryRepository.save(Category.builder()
                .name("Men's Formal & Linen")
                .slug("mens-formal-linen")
                .description("Breathable pure linen shirts and tailored formal trousers suitable for Nellore summers.")
                .imageUrl("https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80")
                .build());

        Category womenWestern = categoryRepository.save(Category.builder()
                .name("Women's Western & Casuals")
                .slug("womens-western")
                .description("Modern dresses, denim jeans, and chic tops for women.")
                .imageUrl("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80")
                .build());

        // 3. Seed Clothing Products with VIP ₹500 Member Prices
        Product p1 = Product.builder()
                .name("Nellore Royal Silk Kurta Set")
                .slug("nellore-royal-silk-kurta-set")
                .description("Handcrafted silk blend festive kurta with zari embroidery work around neckline. Perfect for weddings and festive occasions.")
                .regularPrice(new BigDecimal("1999.00"))
                .subscriberPrice(new BigDecimal("1299.00")) // Save ₹700!
                .isSubscriberExclusive(false)
                .isEarlyAccess(true)
                .category(ethnic)
                .imageUrl("https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80")
                .rating(4.8)
                .build();
        p1.getVariants().add(ProductVariant.builder().product(p1).sku("KURTA-M-MRN").size("M").color("Maroon").stock(15).build());
        p1.getVariants().add(ProductVariant.builder().product(p1).sku("KURTA-L-MRN").size("L").color("Maroon").stock(20).build());
        p1.getVariants().add(ProductVariant.builder().product(p1).sku("KURTA-XL-GLD").size("XL").color("Gold").stock(8).build());
        productRepository.save(p1);

        Product p2 = Product.builder()
                .name("Pure French Linen Slim Fit Shirt")
                .slug("pure-french-linen-shirt")
                .description("100% Organic French linen shirt designed for ultimate comfort and breathability in warm weather.")
                .regularPrice(new BigDecimal("1499.00"))
                .subscriberPrice(new BigDecimal("999.00")) // Save ₹500!
                .isSubscriberExclusive(false)
                .isEarlyAccess(false)
                .category(menFormals)
                .imageUrl("https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80")
                .rating(4.6)
                .build();
        p2.getVariants().add(ProductVariant.builder().product(p2).sku("LINEN-M-WHT").size("M").color("White").stock(25).build());
        p2.getVariants().add(ProductVariant.builder().product(p2).sku("LINEN-L-BLU").size("L").color("Sky Blue").stock(18).build());
        productRepository.save(p2);

        Product p3 = Product.builder()
                .name("Kanchipuram Silk Saree - Subscriber VIP Edition")
                .slug("kanchipuram-silk-saree-vip")
                .description("Exclusive pure Zari Kanchipuram silk saree reserved exclusively for Sensation VIP ₹500/mo subscribers.")
                .regularPrice(new BigDecimal("4999.00"))
                .subscriberPrice(new BigDecimal("3499.00")) // Save ₹1500!
                .isSubscriberExclusive(true) // MEMBER ONLY PRODUCT!
                .isEarlyAccess(true)
                .category(ethnic)
                .imageUrl("https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80")
                .rating(4.9)
                .build();
        p3.getVariants().add(ProductVariant.builder().product(p3).sku("SAREE-RED-FREE").size("Free Size").color("Crimson Red").stock(5).build());
        productRepository.save(p3);

        Product p4 = Product.builder()
                .name("High-Waist Stretch Denim Jeans")
                .slug("high-waist-stretch-denim")
                .description("Premium cotton elastane stretch jeans with sleek high-waist fit.")
                .regularPrice(new BigDecimal("1799.00"))
                .subscriberPrice(new BigDecimal("1199.00")) // Save ₹600!
                .isSubscriberExclusive(false)
                .isEarlyAccess(false)
                .category(womenWestern)
                .imageUrl("https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80")
                .rating(4.7)
                .build();
        p4.getVariants().add(ProductVariant.builder().product(p4).sku("JEANS-28-BLU").size("28").color("Dark Blue").stock(12).build());
        p4.getVariants().add(ProductVariant.builder().product(p4).sku("JEANS-30-BLU").size("30").color("Dark Blue").stock(14).build());
        productRepository.save(p4);
    }
}
