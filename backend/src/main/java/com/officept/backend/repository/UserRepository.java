package com.officept.backend.repository;

import com.officept.backend.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, ObjectId> {
    Optional<User> findById(ObjectId id);
    Optional<User> findByEmail(String email);
}