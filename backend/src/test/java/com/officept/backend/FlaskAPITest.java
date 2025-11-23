package com.officept.backend;

import com.officept.backend.dto.ChatInputDTO;
import com.officept.backend.dto.ChatOutputDTO;
import com.officept.backend.repository.ChatRepository;
import com.officept.backend.repository.ConversationRepository;
import com.officept.backend.service.ChatService;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class FlaskAPITest {
    Logger logger = LoggerFactory.getLogger(FlaskAPITest.class);

    @Autowired
    private ChatService chatService;
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private ConversationRepository conversationRepository;

    @Before
    public void setup() {
        chatRepository.deleteAll();
        conversationRepository.deleteAll();
    }

    @Test
    @Ignore  // Only run when python server is on
    public void testManualChat() {
        ChatInputDTO input = ChatInputDTO.builder()
                .withConversationId(null)
                .withUser(null)
                .withUserMessage("Why am I tired?")
                .build();

        ChatOutputDTO output = chatService.processMessage(input);
        assertThat(output).isNotNull();

        logger.info("=== MANUAL TEST ===");
        logger.info("Conversation ID: {}", output.conversationId());
        logger.info("User said: {}", output.userMessage());
        logger.info("Agent said: {}", output.agentReply());
    }
}
