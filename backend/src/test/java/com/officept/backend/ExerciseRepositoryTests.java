package com.officept.backend;

import com.officept.backend.config.CustomMongoConfiguration;
import com.officept.backend.model.Exercise;
import com.officept.backend.repository.ExerciseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.mongodb.test.autoconfigure.DataMongoTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataMongoTest
@Import(CustomMongoConfiguration.class)
@ActiveProfiles("test")
public class ExerciseRepositoryTests {
    @Autowired
    private ExerciseRepository exerciseRepository;

    @BeforeEach
    void beforeEach() {
        exerciseRepository.deleteAll();
    }

    @Test
    void testFindByUrl() {
        Exercise exercise = Exercise.builder()
                .setName("My Sample Exercise")
                .setUrl("https://samplevideo.com")
                .build();
        exerciseRepository.save(exercise);

        Optional<Exercise> foundExercise = exerciseRepository.findByUrl("https://SAMPLEvideo.com");
        assertThat(foundExercise).isNotPresent();

        foundExercise = exerciseRepository.findByUrl("https://samplevideo.com");
        assertThat(foundExercise).isPresent();
        assertThat(foundExercise.get().getName()).isEqualTo("My Sample Exercise");

        List<Exercise> foundExercises = exerciseRepository.findByNameContainsIgnoreCase("my sample exercise");
        assertThat(foundExercises).isNotEmpty();
        assertThat(foundExercises.size()).isEqualTo(1);
        assertThat(foundExercises.getFirst().getName()).isEqualTo("My Sample Exercise");
        assertThat(foundExercises.getFirst().getUrl()).isEqualTo("https://samplevideo.com");
    }
}
