package com.officept.backend.model;

import com.officept.backend.record.Muscle;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.Set;
import java.util.UUID;

@Data
@Builder(setterPrefix = "set")
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "exercises")
public class Exercise {
    @MongoId(FieldType.STRING)
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    @Field("name")
    private String name;

    @Field("url")
    private String url;

    @Field("muscles")
    private Set<Muscle> muscles;

    @Field("num_set")
    private int numSet;

    @Field("repetition")
    private Range repetition;

    @Field("session_per_day")
    private Range sessionPerDay;

    @Field("description")
    private String description;

    @Field("notes")
    private String note;
}
