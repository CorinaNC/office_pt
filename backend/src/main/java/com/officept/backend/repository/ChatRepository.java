package com.officept.backend.repository;

import com.officept.backend.model.Chat;
import com.officept.backend.model.Conversation;
import com.officept.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends MongoRepository<Chat, String> {
    Optional<Chat> findByConversation(Conversation conversation);

    List<Chat> findByUser(User user);
}