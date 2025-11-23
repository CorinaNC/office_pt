package com.officept.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.officept.backend.model.User;
import lombok.Builder;

@JsonIgnoreProperties(ignoreUnknown = true)
@Builder(setterPrefix = "with")
public record UserOutputDTO(
        String id,
        String firstName,
        String lastName,
        String email
) {
    public static UserOutputDTO from(User user) {
        if (user == null) {
            return null;
        }

        return UserOutputDTO.builder()
                .withId(user.getId())
                .withFirstName(user.getFirstName())
                .withLastName(user.getLastName())
                .withEmail(user.getEmail())
                .build();
    }
}
