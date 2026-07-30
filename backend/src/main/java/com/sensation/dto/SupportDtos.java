package com.sensation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class SupportDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateTicketRequest {
        @NotBlank(message = "Subject is required")
        @Size(max = 200, message = "Subject must be 200 characters or fewer")
        private String subject;
        @NotBlank(message = "Category is required")
        @Pattern(regexp = "ORDER|SUBSCRIPTION|REFUND|PRODUCT|OTHER", message = "Unsupported ticket category")
        private String category;
        @NotBlank(message = "Priority is required")
        @Pattern(regexp = "LOW|MEDIUM|HIGH|URGENT", message = "Unsupported ticket priority")
        private String priority;
        @NotBlank(message = "Message is required")
        @Size(max = 5000, message = "Message must be 5000 characters or fewer")
        private String message;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AddMessageRequest {
        @NotBlank(message = "Message is required")
        @Size(max = 5000, message = "Message must be 5000 characters or fewer")
        private String message;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TicketResponse {
        private UUID id;
        private String userName;
        private String userEmail;
        private String subject;
        private String status;
        private String priority;
        private String category;
        private LocalDateTime createdAt;
        private List<MessageResponse> messages;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MessageResponse {
        private UUID id;
        private String senderName;
        private String senderRole;
        private String message;
        private LocalDateTime createdAt;
    }
}
