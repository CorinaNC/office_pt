package com.officept.backend;

import com.officept.backend.config.CustomMongoConfiguration;
import com.officept.backend.model.Video;
import com.officept.backend.repository.VideoRepository;
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
public class VideoRepositoryTests {
    @Autowired
    private VideoRepository videoRepository;

    @BeforeEach
    void beforeEach() {
        videoRepository.deleteAll();
    }

    @Test
    void testFindByEmail() {
        Video video = Video.builder()
                .setName("My Sample Video")
                .setUrl("https://samplevideo.com")
                .build();
        videoRepository.save(video);

        Optional<Video> foundVideo = videoRepository.findByUrl("https://SAMPLEvideo.com");
        assertThat(foundVideo).isNotPresent();

        foundVideo = videoRepository.findByUrl("https://samplevideo.com");
        assertThat(foundVideo).isPresent();
        assertThat(foundVideo.get().getName()).isEqualTo("My Sample Video");

        List<Video> foundVideos = videoRepository.findByNameContainsIgnoreCase("my sample video");
        assertThat(foundVideos).isNotEmpty();
        assertThat(foundVideos.size()).isEqualTo(1);
        assertThat(foundVideos.getFirst().getName()).isEqualTo("My Sample Video");
        assertThat(foundVideos.getFirst().getUrl()).isEqualTo("https://samplevideo.com");
    }
}
