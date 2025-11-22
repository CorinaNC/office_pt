package com.officept.backend.controller;

import com.officept.backend.model.User;
import com.officept.backend.repository.UserRepository;
import org.bson.types.ObjectId;
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

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable ObjectId id) {
        return userRepository.findById(id).orElseThrow();
    }

    @GetMapping("/user")
    public User getUsersByEmail(@RequestBody String email) {
        return userRepository.findByEmail(email).orElseThrow();
    }
}
