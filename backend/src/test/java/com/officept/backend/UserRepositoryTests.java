package com.officept.backend;

import com.officept.backend.config.CustomMongoConfiguration;
import com.officept.backend.model.User;
import com.officept.backend.repository.UserRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.mongodb.test.autoconfigure.DataMongoTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataMongoTest
@Import(CustomMongoConfiguration.class)
@ActiveProfiles("test")
public class UserRepositoryTests {
    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void beforeEach() {
        userRepository.deleteAll();
    }

    @Test
    void testFindById() {
        User user = User.builder()
                .setFirstName("First")
                .setLastName("Last")
                .setEmail("first&last@email.com")
                .build();
        userRepository.save(user);

        Optional<User> foundUser = userRepository.findById("");
        assertThat(foundUser).isNotPresent();

        foundUser = userRepository.findByUserId(user.getUserId());
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getFirstName()).isEqualTo("First");
        assertThat(foundUser.get().getLastName()).isEqualTo("Last");
    }

    @Test
    void testFindByEmail() {
        User user = User.builder()
                .setFirstName("First")
                .setLastName("Last")
                .setEmail("first&last@email.com")
                .build();
        userRepository.save(user);

        Optional<User> foundUser = userRepository.findByEmail("wrong@email.com");
        assertThat(foundUser).isNotPresent();

        foundUser = userRepository.findByEmail("first&last@email.com");
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getFirstName()).isEqualTo("First");
        assertThat(foundUser.get().getLastName()).isEqualTo("Last");
    }
}
