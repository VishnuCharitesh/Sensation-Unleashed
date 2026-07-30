package com.sensation.controller;

import com.sensation.dto.SubscriptionDtos.*;
import com.sensation.security.UserPrincipal;
import com.sensation.service.SubscriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @PostMapping("/subscribe")
    public ResponseEntity<SubscriptionResponse> activateSubscription(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody SubscribeRequest request) {
        return ResponseEntity.ok(subscriptionService.activateSubscription(principal.getId(), request.getPaymentMethod()));
    }

    @GetMapping("/status")
    public ResponseEntity<SubscriptionResponse> getStatus(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(subscriptionService.getSubscriptionStatus(principal.getId()));
    }
}
