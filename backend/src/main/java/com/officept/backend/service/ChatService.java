package com.officept.backend.service;

import com.officept.backend.dto.ChatInputDTO;
import com.officept.backend.dto.ChatOutputDTO;
import com.officept.backend.dto.FlaskInputDTO;
import com.officept.backend.model.Chat;
import com.officept.backend.model.Conversation;
import com.officept.backend.model.User;
import com.officept.backend.record.ChatType;
import com.officept.backend.repository.ChatRepository;
import com.officept.backend.repository.ConversationRepository;
import com.officept.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ConversationRepository conversationRepository;
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    private static final String FLASK_URL = "http://localhost:5000/chatter";

    public ChatOutputDTO processMessage(ChatInputDTO dto) {
        // 1. Find or create conversation
        Conversation conversation;
        if (dto.conversationId() != null && !dto.conversationId().isBlank()) {
            conversation = conversationRepository.findById(dto.conversationId()).orElseThrow();
        } else {
            conversation = Conversation.builder().build();
            conversation = conversationRepository.save(conversation);
        }

        // 2. Find user
        User user = null;
        if (dto.user() != null && dto.user().id() != null && !dto.user().id().isBlank()) {
            user = userRepository.findById(dto.user().id()).orElseThrow();
        } else if (dto.user() != null && dto.user().email() != null && !dto.user().email().isBlank()) {
            user = userRepository.findByEmail(dto.user().email()).orElseThrow();
        }

        // 3. Save user message chat
        Chat userChat = Chat.builder()
                .setConversation(conversation)
                .setUser(user)
                .setType(ChatType.USER_MESSAGE)
                .setText(dto.userMessage())
                .build();
        chatRepository.save(userChat);

        // 4. Call Flask
        FlaskInputDTO flaskPostRequest = restTemplate.postForObject(
                FLASK_URL,
                Map.of("message", dto.userMessage()),
                FlaskInputDTO.class
        );

        String agentReply = flaskPostRequest != null ? flaskPostRequest.reply() : "";

        // 5. Save reply chat (system/bot user can be null or a special user)
        Chat replyChat = Chat.builder()
                .setConversation(conversation)
                .setUser(null)
                .setType(ChatType.AGENT_REPLY)
                .setText(agentReply)
                .build();
        chatRepository.save(replyChat);

        // 6. Build response DTO
        return ChatOutputDTO.builder()
                .withConversationId(conversation.getId())
                .withUserMessage(dto.userMessage())
                .withAgentReply(agentReply)
                .build();
    }
}
