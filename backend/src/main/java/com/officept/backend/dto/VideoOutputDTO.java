package com.officept.backend.dto;

import com.officept.backend.record.Muscle;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.List;

public record VideoOutputDTO(
        String videoId,
        String name,
        String url,
        List<Muscle> muscles,
        LocalDateTime createdDate,
        LocalDateTime lastModifiedDate
) {}
