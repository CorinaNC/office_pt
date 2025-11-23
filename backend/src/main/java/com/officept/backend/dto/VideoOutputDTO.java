package com.officept.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.officept.backend.record.Muscle;
import lombok.Builder;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Builder(setterPrefix = "with")
public record VideoOutputDTO(
        String id,
        String name,
        String url,
        List<Muscle> muscles
) {}
