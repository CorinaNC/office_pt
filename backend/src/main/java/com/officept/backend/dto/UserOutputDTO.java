package com.officept.backend.dto;

import java.time.LocalDateTime;

public record UserOutputDTO(
        String userId,
        String firstName,
        String lastName,
        String email,
        LocalDateTime createdDate,
        LocalDateTime lastModifiedDate
) {}
