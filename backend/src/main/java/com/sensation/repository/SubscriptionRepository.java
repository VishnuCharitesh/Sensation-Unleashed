package com.sensation.repository;

import com.sensation.entity.Subscription;
import com.sensation.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SubscriptionRepository extends JpaRepository<Subscription, UUID> {
    Optional<Subscription> findTopByUserIdAndStatusOrderByEndDateDesc(UUID userId, String status);
    List<Subscription> findByUserIdOrderByCreatedAtDesc(UUID userId);
    List<Subscription> findByStatusAndEndDateBefore(String status, LocalDateTime date);
    long countByStatus(String status);
}
