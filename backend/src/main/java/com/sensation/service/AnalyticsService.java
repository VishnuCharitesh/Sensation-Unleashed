package com.sensation.service;

import com.sensation.dto.AnalyticsDto;
import com.sensation.repository.OrderRepository;
import com.sensation.repository.SubscriptionRepository;
import com.sensation.repository.SupportTicketRepository;
import com.sensation.repository.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final OrderRepository orderRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final SupportTicketRepository supportTicketRepository;

    public AnalyticsDto getAdminDashboardStats() {
        BigDecimal totalRevenue = orderRepository.calculateTotalRevenue();
        long totalOrders = orderRepository.count();
        long totalSubscribers = userRepository.countByRole("ROLE_SUBSCRIBER");
        long totalCustomers = userRepository.count();
        long pendingOrders = orderRepository.countByOrderStatus("PENDING");
        long openTickets = supportTicketRepository.findByStatus("OPEN").size();
        BigDecimal monthlySubRevenue = BigDecimal.valueOf(totalSubscribers).multiply(BigDecimal.valueOf(500));

        return AnalyticsDto.builder()
                .totalRevenue(totalRevenue)
                .totalOrders(totalOrders)
                .totalSubscribers(totalSubscribers)
                .totalCustomers(totalCustomers)
                .pendingOrders(pendingOrders)
                .openSupportTickets(openTickets)
                .monthlySubscriptionRevenue(monthlySubRevenue)
                .build();
    }
}
