package com.officept.backend.repository;

import com.officept.backend.model.Video;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface VideoRepository extends MongoRepository<Video, ObjectId> {
    Optional<Video> findByUrl(String url);

    List<Video> findByNameContainsIgnoreCase(String name);
}
