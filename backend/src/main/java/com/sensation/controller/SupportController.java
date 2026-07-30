package com.sensation.controller;

import com.sensation.dto.SupportDtos.*;
import com.sensation.security.UserPrincipal;
import com.sensation.service.SupportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/support")
@RequiredArgsConstructor
public class SupportController {

    private final SupportService supportService;

    @PostMapping("/tickets")
    public ResponseEntity<TicketResponse> createTicket(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateTicketRequest request) {
        return ResponseEntity.ok(supportService.createTicket(principal.getId(), request));
    }

    @GetMapping("/tickets")
    public ResponseEntity<List<TicketResponse>> getMyTickets(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(supportService.getUserTickets(principal.getId()));
    }

    @PostMapping("/tickets/{ticketId}/messages")
    public ResponseEntity<TicketResponse> addMessage(
            @PathVariable UUID ticketId,
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody AddMessageRequest request) {
        return ResponseEntity.ok(supportService.addMessage(ticketId, principal.getId(), principal.getRole(), request));
    }
}
