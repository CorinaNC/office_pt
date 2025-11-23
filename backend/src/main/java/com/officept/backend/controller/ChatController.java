package com.officept.backend.controller;

import com.officept.backend.dto.ChatInputDTO;
import com.officept.backend.dto.ChatOutputDTO;
import com.officept.backend.dto.UserOutputDTO;
import com.officept.backend.model.Chat;
import com.officept.backend.model.User;
import com.officept.backend.record.ChatType;
import com.officept.backend.repository.ChatRepository;
import com.officept.backend.repository.UserRepository;
import com.officept.backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @Autowired
    ChatRepository chatRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/chat")
    public ChatOutputDTO chat(@RequestBody ChatInputDTO request) {
        return chatService.processMessage(request);
    }

    @GetMapping("/chats")
    public List<ChatOutputDTO> getChats(ChatInputDTO chatInputDTO) {
        List<Chat> chats;
        if (chatInputDTO == null) {
            chats = chatRepository.findAll();
        } else {
            User user = userRepository.findById(chatInputDTO.user().id()).orElse(null);
            chats = chatRepository.findByUser(user);
        }
        return chats.stream()
                .map(c -> ChatOutputDTO.builder()
                        .withConversationId(c.getConversation().getId())
                        .withUser(UserOutputDTO.from(c.getUser()))
                        .withUserMessage(c.getType().equals(ChatType.USER_MESSAGE) ? c.getText() : null)
                        .withAgentReply(c.getType().equals(ChatType.AGENT_REPLY) ? c.getText() : null)
                        .build())
                .toList();
    }
}
