package com.officept.backend.controller;

import com.officept.backend.dto.ChatInputDTO;
import com.officept.backend.dto.ChatOutputDTO;
import com.officept.backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @PostMapping("/chat")
    public ChatOutputDTO chat(@RequestBody ChatInputDTO request) {
        return chatService.processMessage(request);
    }
}
