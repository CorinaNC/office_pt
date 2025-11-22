package com.officept.backend.controller;

import com.officept.backend.dto.UserInputDTO;
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
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/user")
    public User getUser(UserInputDTO userInputDTO) {
        if (userInputDTO.id() == null || userInputDTO.id().isEmpty()) {
            return userRepository.findByEmail(userInputDTO.email()).orElseThrow();
        }
        return userRepository.findById(userInputDTO.id()).orElseThrow();
    }
}
