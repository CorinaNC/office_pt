package com.officept.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.officept.backend.model.Range;
import lombok.Builder;

@JsonIgnoreProperties(ignoreUnknown = true)
@Builder(setterPrefix = "with")
public record RangeDTO(
        int min,
        int max
) {
    public static RangeDTO from(Range range) {
        if (range == null) {
            return null;
        }
        return RangeDTO.builder()
                .withMin(range.getMin())
                .withMax(range.getMax())
                .build();
    }
}
