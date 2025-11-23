package com.officept.backend.controller;

import com.officept.backend.dto.UserInputDTO;
import com.officept.backend.dto.UserOutputDTO;
import com.officept.backend.model.User;
import com.officept.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    private final UserRepository userRepository;

    UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public List<UserOutputDTO> getUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(u -> UserOutputDTO.builder()
                        .withFirstName(u.getFirstName())
                        .withLastName(u.getLastName())
                        .withEmail(u.getEmail())
                        .build())
                .toList();
    }

    @GetMapping("/user")
    public UserOutputDTO getUser(UserInputDTO userInputDTO) {
        User user;
        if (userInputDTO.id() == null || userInputDTO.id().isEmpty()) {
            user = userRepository.findByEmail(userInputDTO.email()).orElseThrow();
        } else {
            user = userRepository.findById(userInputDTO.id()).orElseThrow();
        }
        return UserOutputDTO.builder()
                .withFirstName(user.getFirstName())
                .withLastName(user.getLastName())
                .withEmail(user.getEmail())
                .build();
    }
}
