package com.sensation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public class SubscriptionDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SubscribeRequest {
        @NotBlank(message = "Payment method is required")
        @Pattern(regexp = "UPI|CARD|NETBANKING", message = "Unsupported payment method")
        private String paymentMethod; // UPI, CARD, NETBANKING
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SubscriptionResponse {
        private UUID id;
        private String status;
        private BigDecimal amount;
        private LocalDateTime startDate;
        private LocalDateTime endDate;
        private String paymentReference;
        private Boolean isActive;
        private long daysRemaining;
    }
}
