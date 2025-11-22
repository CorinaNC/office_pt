package com.officept.backend.model;

import com.officept.backend.record.Muscle;
import lombok.Builder;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder(setterPrefix = "set")
@Document(collection = "videos")
public class Video {
    @Id
    private ObjectId id;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime lastModifiedDate;

    @Field("name")
    private String name;

    @Field("url")
    private String url;

    @Field("muscles")
    List<Muscle> muscles;
}
