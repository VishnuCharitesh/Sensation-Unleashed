package com.sensation.service;

import com.sensation.dto.SubscriptionDtos.*;
import com.sensation.entity.Subscription;
import com.sensation.entity.User;
import com.sensation.repository.SubscriptionRepository;
import com.sensation.repository.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    @Transactional
    public SubscriptionResponse activateSubscription(@NonNull UUID userId, @NonNull String paymentMethod) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDateTime now = LocalDateTime.now();
        Optional<Subscription> latestSubscription = subscriptionRepository
                .findTopByUserIdAndStatusOrderByEndDateDesc(userId, "ACTIVE");
        if (latestSubscription.isPresent()) {
            Subscription existing = latestSubscription.get();
            if (existing.getEndDate().isAfter(now)) {
                return mapToResponse(existing);
            }
            expireSubscription(existing);
        }
        LocalDateTime endDate = now.plusDays(30); // 30-day membership for ₹500

        Subscription subscription = Subscription.builder()
                .user(user)
                .status("ACTIVE")
                .amount(new BigDecimal("500.00"))
                .startDate(now)
                .endDate(endDate)
                .paymentReference("SUB_TXN_" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .build();

        subscriptionRepository.save(subscription);

        // Promote role to ROLE_SUBSCRIBER
        user.setRole("ROLE_SUBSCRIBER");
        userRepository.save(user);

        return mapToResponse(subscription);
    }

    @Transactional
    public SubscriptionResponse getSubscriptionStatus(UUID userId) {
        return subscriptionRepository.findTopByUserIdAndStatusOrderByEndDateDesc(userId, "ACTIVE")
                .map(subscription -> {
                    if (!subscription.getEndDate().isAfter(LocalDateTime.now())) {
                        expireSubscription(subscription);
                    }
                    return mapToResponse(subscription);
                })
                .orElse(SubscriptionResponse.builder()
                        .status("INACTIVE")
                        .isActive(false)
                        .daysRemaining(0)
                        .amount(new BigDecimal("500.00"))
                        .build());
    }

    @Scheduled(cron = "0 0 0 * * ?") // Daily at midnight
    @Transactional
    public void processSubscriptionExpiries() {
        List<Subscription> expiredSubs = subscriptionRepository.findByStatusAndEndDateBefore("ACTIVE", LocalDateTime.now());
        for (Subscription sub : expiredSubs) {
            expireSubscription(sub);
        }
    }

    private void expireSubscription(Subscription subscription) {
        subscription.setStatus("EXPIRED");
        subscriptionRepository.save(subscription);

        User user = subscription.getUser();
        if ("ROLE_SUBSCRIBER".equals(user.getRole())) {
            user.setRole("ROLE_CUSTOMER");
            userRepository.save(user);
        }
    }

    private SubscriptionResponse mapToResponse(Subscription sub) {
        boolean isActive = "ACTIVE".equals(sub.getStatus()) && sub.getEndDate().isAfter(LocalDateTime.now());
        long daysRemaining = Math.max(0, Duration.between(LocalDateTime.now(), sub.getEndDate()).toDays());

        return SubscriptionResponse.builder()
                .id(sub.getId())
                .status(sub.getStatus())
                .amount(sub.getAmount())
                .startDate(sub.getStartDate())
                .endDate(sub.getEndDate())
                .paymentReference(sub.getPaymentReference())
                .isActive(isActive)
                .daysRemaining(daysRemaining)
                .build();
    }
}
