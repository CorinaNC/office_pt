package com.officept.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.officept.backend.record.Muscle;
import lombok.Builder;

import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
@Builder(setterPrefix = "with")
public record ExerciseOutputDTO(
        String id,
        String name,
        String url,
        String description,
        String note,
        Set<Muscle> muscles,
        int numSet,
        RangeDTO repetition,
        RangeDTO sessionPerDay
) {}
