package com.officept.backend.repository;

import com.officept.backend.model.Survey;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface SurveyRepository extends MongoRepository<Survey, String> {

}