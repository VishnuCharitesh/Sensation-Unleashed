package com.sensation.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsDto {
    private BigDecimal totalRevenue;
    private long totalOrders;
    private long totalSubscribers;
    private long totalCustomers;
    private long pendingOrders;
    private long openSupportTickets;
    private BigDecimal monthlySubscriptionRevenue;
}
