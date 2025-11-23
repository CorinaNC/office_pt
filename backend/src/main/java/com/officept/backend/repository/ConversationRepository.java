package com.officept.backend.repository;

import com.officept.backend.model.Chat;
import com.officept.backend.model.Conversation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ConversationRepository extends MongoRepository<Conversation, String> {
    Optional<Conversation> findByChat(Chat chat);
}