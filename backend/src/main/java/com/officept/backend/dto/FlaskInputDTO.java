package com.officept.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;

@JsonIgnoreProperties(ignoreUnknown = true)
@Builder(setterPrefix = "with")
public record FlaskInputDTO(
        String agentReply
) {}
