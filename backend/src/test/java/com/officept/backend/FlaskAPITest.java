package com.officept.backend;

import com.officept.backend.dto.ChatInputDTO;
import com.officept.backend.dto.ChatOutputDTO;
import com.officept.backend.service.ChatService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FlaskAPITest {

    @Autowired
    private ChatService chatService;

    @Test
    public void runManualChat() {
        ChatInputDTO input = ChatInputDTO.builder()
                .withConversationId(null)
                .withUser(null)
                .withUserMessage("What are some reason why my wrist hurt?")
                .build();

        ChatOutputDTO output = chatService.processMessage(input);

        System.out.println("=== MANUAL TEST ===");
        System.out.println("Conversation ID: " + output.conversationId());
        System.out.println("User said: " + output.userMessage());
        System.out.println("Agent said: " + output.agentReply());
    }
}
