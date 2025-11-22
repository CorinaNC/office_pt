package com.officept.backend.model;

import com.officept.backend.record.Muscle;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;
import java.util.UUID;

@Data
@Builder(setterPrefix = "set")
@Document(collection = "videos")
public class Video {
    @Id
    private String id = UUID.randomUUID().toString();

    @Field("name")
    private String name;

    @Field("url")
    private String url;

    @Field("muscles")
    List<Muscle> muscles;
}
