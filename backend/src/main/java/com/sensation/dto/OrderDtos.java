package com.sensation.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public class OrderDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CheckoutRequest {
        @NotBlank(message = "Shipping address is required")
        private String shippingAddress;
        @NotBlank(message = "Payment method is required")
        @Pattern(regexp = "UPI|CARD|NETBANKING", message = "Unsupported payment method")
        private String paymentMethod; // UPI, CARD, NETBANKING
        @NotEmpty(message = "At least one order item is required")
        @Valid
        private List<OrderItemRequest> items;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemRequest {
        @NotNull(message = "Variant is required")
        private UUID variantId;
        @NotNull(message = "Quantity is required")
        @Min(value = 1, message = "Quantity must be at least one")
        private Integer quantity;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderResponse {
        private UUID id;
        private String orderNumber;
        private BigDecimal totalAmount;
        private BigDecimal discountAmount;
        private BigDecimal finalAmount;
        private String orderStatus;
        private String paymentStatus;
        private String shippingAddress;
        private Boolean isSubscriberOrder;
        private String createdAt;
        private List<OrderItemResponse> items;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItemResponse {
        private UUID id;
        private String productName;
        private String size;
        private String color;
        private Integer quantity;
        private BigDecimal unitPrice;
        private BigDecimal subtotal;
    }
}
