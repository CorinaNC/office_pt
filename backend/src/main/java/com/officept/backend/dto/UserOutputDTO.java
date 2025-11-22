package com.officept.backend.dto;

import org.bson.types.ObjectId;

import java.time.LocalDateTime;

public record UserOutputDTO(
        ObjectId id,
        String firstName,
        String lastName,
        String email,
        LocalDateTime createdDate,
        LocalDateTime lastModifiedDate
) {}
