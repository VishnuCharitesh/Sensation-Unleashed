package com.sensation.service;

import com.sensation.dto.ProductDtos.*;
import com.sensation.entity.Product;
import com.sensation.entity.Subscription;
import com.sensation.entity.User;
import com.sensation.repository.ProductRepository;
import com.sensation.repository.SubscriptionRepository;
import com.sensation.repository.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;

    public List<ProductResponse> getAllProducts(@NonNull UUID userId) {
        boolean isSubscriber = isUserSubscriber(userId);
        return productRepository.findAll().stream()
                .map(product -> mapToProductResponse(product, isSubscriber))
                .collect(Collectors.toList());
    }

    public ProductResponse getProductBySlug(@NonNull String slug, @NonNull UUID userId) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Product not found with slug: " + slug));
        boolean isSubscriber = isUserSubscriber(userId);
        return mapToProductResponse(product, isSubscriber);
    }

    public List<ProductResponse> searchProducts(@NonNull String query, @NonNull UUID userId) {
        boolean isSubscriber = isUserSubscriber(userId);
        return productRepository.searchProducts(query).stream()
                .map(product -> mapToProductResponse(product, isSubscriber))
                .collect(Collectors.toList());
    }

    public boolean isUserSubscriber(UUID userId) {
        if (userId == null) return false;
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) return false;

        User user = userOpt.get();
        if ("ROLE_SUBSCRIBER".equals(user.getRole()) || "ROLE_ADMIN".equals(user.getRole())) {
            return true;
        }

        Optional<Subscription> subOpt = subscriptionRepository
                .findTopByUserIdAndStatusOrderByEndDateDesc(userId, "ACTIVE");
        return subOpt.isPresent() && subOpt.get().getEndDate().isAfter(LocalDateTime.now());
    }

    private ProductResponse mapToProductResponse(Product product, boolean isSubscriber) {
        BigDecimal activePrice = isSubscriber ? product.getSubscriberPrice() : product.getRegularPrice();
        BigDecimal savings = product.getRegularPrice().subtract(product.getSubscriberPrice());

        List<VariantResponse> variantDtos = product.getVariants().stream()
                .map(v -> VariantResponse.builder()
                        .id(v.getId())
                        .sku(v.getSku())
                        .size(v.getSize())
                        .color(v.getColor())
                        .stock(v.getStock())
                        .build())
                .collect(Collectors.toList());

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .description(product.getDescription())
                .regularPrice(product.getRegularPrice())
                .subscriberPrice(product.getSubscriberPrice())
                .activeUserPrice(activePrice)
                .userSavings(savings)
                .isSubscriberExclusive(product.getIsSubscriberExclusive())
                .isEarlyAccess(product.getIsEarlyAccess())
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : "General")
                .imageUrl(product.getImageUrl())
                .rating(product.getRating())
                .variants(variantDtos)
                .build();
    }
}
