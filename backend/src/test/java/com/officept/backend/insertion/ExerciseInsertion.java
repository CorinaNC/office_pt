package com.officept.backend.insertion;

import com.officept.backend.config.CustomMongoConfiguration;
import com.officept.backend.model.Exercise;
import com.officept.backend.model.Range;
import com.officept.backend.repository.ExerciseRepository;
import org.junit.Ignore;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.mongodb.test.autoconfigure.DataMongoTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

@DataMongoTest
@Import(CustomMongoConfiguration.class)
@ActiveProfiles("test")  // Comment out to use main database
public class ExerciseInsertion {
    @Autowired
    private ExerciseRepository exerciseRepository;

    @Test
    @Ignore  // Used to add exercise data
    void testAddExerciseData() {
        // -----------------------------------------
        // 1. Forearm PROM Advanced Flexor Stretch
        // -----------------------------------------
        Exercise forearmPromFlexor = Exercise.builder()
                .setName("Forearm PROM Advanced Flexor Stretch")
                .setUrl("vids/Forearm PROM Advanced Flexor Stretch.mp4")
                .setNumSet(1)
                .setRepetition(Range.builder().setMin(2).setMax(3).build())   // 2–3 reps
                .setSessionPerDay(Range.builder().setMin(2).setMax(3).build())// 2–3 sessions/day
                .setDescription("")                                            // none provided
                .setNote("Try to keep elbow softly bent if needed, pull in the hand/wrist to mild tension/pull not pain. 8-10 second hold. Add a little rotation, either in or out to target the side of the forearm a little more.")
                .build();

        // --------------------------------------------------------------
        // 2. Forearm Passive Range of Motion Advanced Extensor Stretch
        // --------------------------------------------------------------
        Exercise forearmPromExtensor = Exercise.builder()
                .setName("Forearm Passive Range of Motion Advanced Extensor Stretch")
                .setUrl("vids/Forearm Passive Range of Motion Advanced Extensor Stretch.mp4")
                .setNumSet(1)
                .setRepetition(Range.builder().setMin(2).setMax(3).build())   // 2–3 reps
                .setSessionPerDay(Range.builder().setMin(2).setMax(3).build())// 2–3 sessions/day
                .setDescription("")                                            // none provided
                .setNote("Try to keep elbow softly bent if needed, pull in the hand/wrist to mild tension/pull not pain. 8-10 second hold. Add a little rotation, either in or out to target the side of the forearm a little more.")
                .build();

        // -------------------------------------------------
        // 3. Elbow Strengthening Flexion with Theraband
        // -------------------------------------------------
        Exercise elbowStrengthFlexion = Exercise.builder()
                .setName("Elbow Strengthening Flexion with Theraband")
                .setUrl("vids/Elbow Strengthening Flexion with Theraband.mp4")
                .setNumSet(1)
                .setRepetition(Range.builder().setMin(15).setMax(20).build()) // 15–20 reps
                .setSessionPerDay(Range.builder().setMin(1).setMax(2).build())// 1–2 sessions/day
                .setDescription("")                                            // none provided
                .setNote("")                                                   // none provided
                .build();

        // -----------------------------------------
        // 4. Nerve Gliding Proximal Median
        // -----------------------------------------
        Exercise nerveGlideProxMedian = Exercise.builder()
                .setName("Nerve Gliding Proximal Median")
                .setUrl("vids/Nerve Gliding Proximal Median.mp4")
                .setNumSet(1)
                .setRepetition(Range.builder().setMin(15).setMax(20).build()) // 15–20 reps
                .setSessionPerDay(Range.builder().setMin(1).setMax(2).build())// 1–2 sessions/day
                .setDescription("Progress through the following positions at your own pace, and stop at the position where you feel a comfortable stretch. You should not push to pain and should not feel an increase in any numbness or tingling.")
                .setNote("Take to tension, not pain or tingling. For now stop at rotation step.")
                .build();

        // -----------------------------------------
        // 5. Nerve Gliding Proximal Radial
        // -----------------------------------------
        Exercise nerveGlideProxRadial = Exercise.builder()
                .setName("Nerve Gliding Proximal Radial")
                .setUrl("vids/Nerve Gliding Proximal Radial.mp4")
                .setNumSet(1)
                .setRepetition(Range.builder().setMin(15).setMax(20).build()) // 15–20 reps
                .setSessionPerDay(Range.builder().setMin(1).setMax(2).build())// 1–2 sessions/day
                .setDescription("Progress through the following positions at your own pace, and stop at the position where you feel a comfortable stretch. You should not push to pain and should not feel an increase in any numbness or tingling.")
                .setNote("Take to tension, not pain or tingling.")
                .build();

        // Save in EXACT order
        exerciseRepository.saveAll(List.of(
                forearmPromFlexor,
                forearmPromExtensor,
                elbowStrengthFlexion,
                nerveGlideProxMedian,
                nerveGlideProxRadial
        ));
    }
}
