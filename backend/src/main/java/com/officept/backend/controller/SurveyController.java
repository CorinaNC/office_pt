package com.officept.backend.controller;

import com.officept.backend.dto.SurveyInputDTO;
import com.officept.backend.model.Survey;
import com.officept.backend.service.SurveyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/surveys")
public class SurveyController {
    private final SurveyService surveyService;

    SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @PostMapping
    public SurveyInputDTO createSurvey(@RequestBody SurveyInputDTO request) {
        return surveyService.processMessage(request);
    }

    @GetMapping
    public ResponseEntity<List<Survey>> getAllSurveys() {
        List<Survey> surveys = surveyService.getAllSurveys();
        return ResponseEntity.ok(surveys);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Survey> getSurveyById(@PathVariable String id) {
        Optional<Survey> survey = surveyService.getSurveyById(id);
        return survey.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}