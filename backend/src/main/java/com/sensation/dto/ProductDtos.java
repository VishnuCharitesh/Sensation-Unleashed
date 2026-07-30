package com.sensation.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public class ProductDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ProductResponse {
        private UUID id;
        private String name;
        private String slug;
        private String description;
        private BigDecimal regularPrice;
        private BigDecimal subscriberPrice; // VIP ₹500 subscriber price
        private BigDecimal activeUserPrice; // Evaluated dynamically based on logged in user's VIP status!
        private BigDecimal userSavings;
        private Boolean isSubscriberExclusive;
        private Boolean isEarlyAccess;
        private String categoryName;
        private String imageUrl;
        private Double rating;
        private List<VariantResponse> variants;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class VariantResponse {
        private UUID id;
        private String sku;
        private String size;
        private String color;
        private Integer stock;
    }
}
