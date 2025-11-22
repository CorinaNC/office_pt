package com.officept.backend.insertion;

import com.officept.backend.config.CustomMongoConfiguration;
import com.officept.backend.model.User;
import com.officept.backend.repository.UserRepository;
import org.junit.Ignore;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.mongodb.test.autoconfigure.DataMongoTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

@DataMongoTest
@Import(CustomMongoConfiguration.class)
@ActiveProfiles("test")  // Comment out to use main database
public class UserRepositoryInsertion {
    @Autowired
    private UserRepository userRepository;

    @Test
    @Ignore  // Used to add user data
    void testAddUserData() {
        User user = User.builder()
                .setFirstName("Jonny")
                .setLastName("Johnson")
                .setEmail("jonjon@notmyeemail.com")
                .build();
        userRepository.save(user);
        user = User.builder()
                .setFirstName("Lorem")
                .setLastName("Ipsumson")
                .setEmail("lorem@notmyeemail.com")
                .build();
        userRepository.save(user);
        user = User.builder()
                .setFirstName("Sam")
                .setLastName("Sample")
                .setEmail("sammy@notmyeemail.com")
                .build();
        userRepository.save(user);
        user = User.builder()
                .setFirstName("Nona")
                .setLastName("Realperson")
                .setEmail("nonanoreal@notmyeemail.com")
                .build();
        userRepository.save(user);
    }
}
