package com.officept.backend.repository;

import com.officept.backend.model.Exercise;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ExerciseRepository extends MongoRepository<Exercise, String> {
    Optional<Exercise> findByUrl(String url);

    List<Exercise> findByNameContainsIgnoreCase(String name);
}
