    package com.officept.backend.controller;

    import com.officept.backend.dto.ExerciseInputDTO;
    import com.officept.backend.dto.ExerciseOutputDTO;
    import com.officept.backend.dto.RangeDTO;
    import com.officept.backend.model.Exercise;
    import com.officept.backend.repository.ExerciseRepository;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.RestController;

    import java.util.ArrayList;
    import java.util.List;

    @RestController
    public class ExerciseController {
        private final ExerciseRepository exerciseRepository;

        ExerciseController(ExerciseRepository exerciseRepository) {
            this.exerciseRepository = exerciseRepository;
        }

        @GetMapping("/exercises")
        public List<ExerciseOutputDTO> getExercises(ExerciseInputDTO exerciseInputDTO) {
            List<Exercise> exercises = new ArrayList<>();
            if (exerciseInputDTO.id() != null && !exerciseInputDTO.id().isEmpty()) {
                exercises.add(exerciseRepository.findById(exerciseInputDTO.id()).orElseThrow());
            } else if (exerciseInputDTO.url() != null && !exerciseInputDTO.url().isEmpty()) {
                exercises.add(exerciseRepository.findByUrl(exerciseInputDTO.url()).orElseThrow());
            } else if (exerciseInputDTO.name() != null && !exerciseInputDTO.name().isEmpty()) {
                exercises.addAll(exerciseRepository.findByNameContainsIgnoreCase(exerciseInputDTO.name()));
            } else {
                exercises.addAll(exerciseRepository.findAll());
            }
            return exercises.stream()
                    .map(e -> ExerciseOutputDTO.builder()
                            .withId(e.getId())
                            .withName(e.getName())
                            .withUrl(e.getUrl())
                            .withDescription(e.getDescription())
                            .withNote(e.getNote())
                            .withMuscles(e.getMuscles())
                            .withNumSet(e.getNumSet())
                            .withRepetition(RangeDTO.from(e.getRepetition()))
                            .withSessionPerDay(RangeDTO.from(e.getSessionPerDay()))
                            .build())
                    .toList();
        }
    }
