package com.officept.backend.model;

import com.officept.backend.record.ChatType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.mapping.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder(setterPrefix = "set")
@NoArgsConstructor
@AllArgsConstructor
@EnableMongoAuditing
@Document(collection = "chats")
public class Chat {
    @MongoId(FieldType.STRING)
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime lastModifiedDate;

    @DocumentReference(lazy = true)
    private Conversation conversation;

    @DocumentReference(lazy = true)
    private User user;

    @Field("type")
    ChatType type;

    @Field("text")
    private String text;
}
