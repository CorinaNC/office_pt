package com.officept.backend;

import com.officept.backend.controller.UserController;
import com.officept.backend.model.User;
import com.officept.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;

import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@WebMvcTest(UserController.class)
@ActiveProfiles("test")
class UserControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    private UserRepository userRepository;

    @Test
    void testGetUsers() throws Exception {
        User user1 = User.builder().setFirstName("Jimmy").setLastName("Ginny").setEmail("jimgin@notmyemail.com").build();
        User user2 = User.builder().setFirstName("Jenny").setLastName("Penny").setEmail("jenpen@notmyemail.com").build();

        when(userRepository.findAll()).thenReturn(List.of(user1, user2));

        mockMvc.perform(get("/users"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].firstName").value(user1.getFirstName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].lastName").value(user1.getLastName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].email").value(user1.getEmail()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].firstName").value(user2.getFirstName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].lastName").value(user2.getLastName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].email").value(user2.getEmail()));
    }
}
