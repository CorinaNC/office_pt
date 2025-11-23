package com.officept.backend.service;

import com.officept.backend.dto.SurveyInputDTO;
import com.officept.backend.model.Survey;
import com.officept.backend.repository.SurveyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;

    public SurveyService(SurveyRepository surveyRepository) {
        this.surveyRepository = surveyRepository;
    }

    public SurveyInputDTO processMessage(SurveyInputDTO request) {
        // Convert DTO to Entity
        Survey survey = Survey.builder()
                .setId(request.id() != null ? request.id() : null)
                .setExperiencePain(request.experiencePain())
                .setPainLocation(request.painLocation())
                .setPainIntensity(request.painIntensity())
                .setPainType(request.painType())
                .build();

        Survey savedSurvey = surveyRepository.save(survey);

        return SurveyInputDTO.builder()
                .withId(savedSurvey.getId())
                .withExperiencePain(savedSurvey.isExperiencePain())
                .withPainLocation(savedSurvey.getPainLocation())
                .withPainIntensity(savedSurvey.getPainIntensity())
                .withPainType(savedSurvey.getPainType())
                .build();
    }

    public List<Survey> getAllSurveys() {
        return surveyRepository.findAll();
    }

    public Optional<Survey> getSurveyById(String id) {
        return surveyRepository.findById(id);
    }

    public SurveyRepository getSurveyRepository() {
        return surveyRepository;
    }
}