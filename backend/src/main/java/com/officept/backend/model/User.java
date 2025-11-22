package com.officept.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
@Builder(setterPrefix = "set")
@Document(collection = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private ObjectId id;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime lastModifiedDate;

    @Field("first_name")
    private String firstName;

    @Field("last_name")
    private String lastName;

    @Field("email")
    private String email;
}
