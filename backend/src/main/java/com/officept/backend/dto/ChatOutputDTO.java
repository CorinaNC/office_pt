package com.officept.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;

@JsonIgnoreProperties(ignoreUnknown = true)
@Builder(setterPrefix = "with")
public record ChatOutputDTO(
        String conversationId,
        UserInputDTO user,
        String userMessage,
        String agentReply
) {}
