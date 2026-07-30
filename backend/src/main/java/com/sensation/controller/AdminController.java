package com.sensation.controller;

import com.sensation.dto.AnalyticsDto;
import com.sensation.dto.OrderDtos.OrderResponse;
import com.sensation.dto.SupportDtos.TicketResponse;
import com.sensation.service.AnalyticsService;
import com.sensation.service.OrderService;
import com.sensation.service.SupportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AnalyticsService analyticsService;
    private final OrderService orderService;
    private final SupportService supportService;

    @GetMapping("/analytics/dashboard")
    public ResponseEntity<AnalyticsDto> getDashboardStats() {
        return ResponseEntity.ok(analyticsService.getAdminDashboardStats());
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/support/tickets")
    public ResponseEntity<List<TicketResponse>> getAllSupportTickets() {
        return ResponseEntity.ok(supportService.getAllTickets());
    }
}
