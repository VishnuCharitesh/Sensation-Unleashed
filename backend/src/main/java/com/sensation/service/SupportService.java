package com.sensation.service;

import com.sensation.dto.SupportDtos.*;
import com.sensation.entity.SupportTicket;
import com.sensation.entity.TicketMessage;
import com.sensation.entity.User;
import com.sensation.repository.SupportTicketRepository;
import com.sensation.repository.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupportService {

    private final SupportTicketRepository ticketRepository;
    private final UserRepository userRepository;

    @Transactional
    public TicketResponse createTicket(@NonNull UUID userId, @NonNull CreateTicketRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        SupportTicket ticket = SupportTicket.builder()
                .user(user)
                .subject(request.getSubject())
                .category(request.getCategory())
                .priority(request.getPriority())
                .status("OPEN")
                .messages(new ArrayList<>())
                .build();

        TicketMessage initialMessage = TicketMessage.builder()
                .ticket(ticket)
                .senderName(user.getFullName())
                .senderRole(user.getRole())
                .message(request.getMessage())
                .build();

        ticket.getMessages().add(initialMessage);

        // Generate AI Assistant Reply automatically
        String aiReply = generateAiBotReply(request.getSubject(), request.getMessage(), request.getCategory());
        TicketMessage aiMessage = TicketMessage.builder()
                .ticket(ticket)
                .senderName("Sensation AI Assistant")
                .senderRole("AI_BOT")
                .message(aiReply)
                .build();
        ticket.getMessages().add(aiMessage);

        SupportTicket savedTicket = ticketRepository.save(ticket);
        return mapToTicketResponse(savedTicket);
    }

    @Transactional
    public TicketResponse addMessage(@NonNull UUID ticketId, @NonNull UUID userId, @NonNull String senderRole, @NonNull AddMessageRequest request) {
        SupportTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        boolean isAgent = "ROLE_SUPPORT".equals(senderRole) || "ROLE_ADMIN".equals(senderRole);
        if (!isAgent && !ticket.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("You do not have access to this support ticket");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        TicketMessage message = TicketMessage.builder()
                .ticket(ticket)
                .senderName(user.getFullName())
                .senderRole(senderRole)
                .message(request.getMessage())
                .build();

        ticket.getMessages().add(message);
        SupportTicket saved = ticketRepository.save(ticket);
        return mapToTicketResponse(saved);
    }

    public List<TicketResponse> getUserTickets(UUID userId) {
        return ticketRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToTicketResponse)
                .collect(Collectors.toList());
    }

    public List<TicketResponse> getAllTickets() {
        return ticketRepository.findAll().stream()
                .map(this::mapToTicketResponse)
                .collect(Collectors.toList());
    }

    private String generateAiBotReply(String subject, String userMsg, String category) {
        String msgLower = (subject + " " + userMsg).toLowerCase();
        if (msgLower.contains("subscription") || msgLower.contains("500") || msgLower.contains("vip")) {
            return "Thank you for reaching out! Sensation Unleashed VIP Membership costs ₹500/month and grants you exclusive member-only pricing, early access to new collections, and free priority delivery in Nellore. You can manage your renewal in your Subscriber Dashboard!";
        } else if (msgLower.contains("delivery") || msgLower.contains("shipping") || msgLower.contains("nellore")) {
            return "Local deliveries within Nellore district are fulfilled within 24-48 hours. Orders across Andhra Pradesh & India arrive within 3-5 business days.";
        } else if (msgLower.contains("return") || msgLower.contains("exchange") || msgLower.contains("refund")) {
            return "We offer a 7-day hassle-free return and size exchange policy. Please keep tags intact and submit a request from your Customer Orders page.";
        }
        return "Hello! I am the Sensation Unleashed AI Assistant. We have logged your support request. A human customer support agent from our Nellore store team has been assigned and will reply shortly!";
    }

    private TicketResponse mapToTicketResponse(SupportTicket ticket) {
        List<MessageResponse> msgs = ticket.getMessages().stream()
                .map(m -> MessageResponse.builder()
                        .id(m.getId())
                        .senderName(m.getSenderName())
                        .senderRole(m.getSenderRole())
                        .message(m.getMessage())
                        .createdAt(m.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        return TicketResponse.builder()
                .id(ticket.getId())
                .userName(ticket.getUser().getFullName())
                .userEmail(ticket.getUser().getEmail())
                .subject(ticket.getSubject())
                .status(ticket.getStatus())
                .priority(ticket.getPriority())
                .category(ticket.getCategory())
                .createdAt(ticket.getCreatedAt())
                .messages(msgs)
                .build();
    }
}
