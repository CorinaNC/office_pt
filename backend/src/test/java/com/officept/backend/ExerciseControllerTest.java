package com.officept.backend;

import com.officept.backend.controller.ExerciseController;
import com.officept.backend.model.Exercise;
import com.officept.backend.model.Range;
import com.officept.backend.record.Muscle;
import com.officept.backend.repository.ExerciseRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;

import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;
import java.util.Set;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@WebMvcTest(ExerciseController.class)
@ActiveProfiles("test")
class ExerciseControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    private ExerciseRepository exerciseRepository;

    @Test
    void testGetExercises() throws Exception {
        Exercise exercise1 = Exercise.builder()
                .setId("1")
                .setName("Wrist Flexor Stretch")
                .setUrl("https://example.com/flexor")
                .setDescription("Desc1")
                .setNote("Note1")
                .setMuscles(Set.of(Muscle.FLEXOR_CARPI_RADIALIS))
                .setNumSet(3)
                .setRepetition(Range.builder().setMin(15).setMax(20).build())
                .setSessionPerDay(Range.builder().setMin(1).setMax(2).build())
                .build();

        Exercise exercise2 = Exercise.builder()
                .setId("2")
                .setName("Wrist Extensor Stretch")
                .setUrl("https://example.com/extensor")
                .setDescription("Desc2")
                .setNote("Note2")
                .setMuscles(Set.of(Muscle.EXTENSOR_CARPI_RADIALIS_BREVIS))
                .setNumSet(2)
                .setRepetition(Range.builder().setMin(10).setMax(12).build())
                .setSessionPerDay(Range.builder().setMin(3).setMax(4).build())
                .build();

        when(exerciseRepository.findAll()).thenReturn(List.of(exercise1, exercise2));

        mockMvc.perform(get("/exercises"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))

                .andExpect(jsonPath("$[0].id").value(exercise1.getId()))
                .andExpect(jsonPath("$[0].name").value(exercise1.getName()))
                .andExpect(jsonPath("$[0].url").value(exercise1.getUrl()))
                .andExpect(jsonPath("$[0].description").value(exercise1.getDescription()))
                .andExpect(jsonPath("$[0].note").value(exercise1.getNote()))
                .andExpect(jsonPath("$[0].numSet").value(exercise1.getNumSet()))
                .andExpect(jsonPath("$[0].repetition").value(exercise1.getRepetition()))
                .andExpect(jsonPath("$[0].sessionPerDay").value(exercise1.getSessionPerDay()))
                .andExpect(jsonPath("$[0].muscles.length()").value(1))

                .andExpect(jsonPath("$[1].id").value(exercise2.getId()))
                .andExpect(jsonPath("$[1].name").value(exercise2.getName()))
                .andExpect(jsonPath("$[1].url").value(exercise2.getUrl()))
                .andExpect(jsonPath("$[1].description").value(exercise2.getDescription()))
                .andExpect(jsonPath("$[1].note").value(exercise2.getNote()))
                .andExpect(jsonPath("$[1].numSet").value(exercise2.getNumSet()))
                .andExpect(jsonPath("$[1].repetition").value(exercise2.getRepetition()))
                .andExpect(jsonPath("$[1].sessionPerDay").value(exercise2.getSessionPerDay()))
                .andExpect(jsonPath("$[1].muscles.length()").value(1));
    }
}
