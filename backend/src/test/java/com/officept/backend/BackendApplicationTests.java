package com.officept.backend;

import com.officept.backend.config.CustomMongoConfiguration;
import org.junit.jupiter.api.Test;
import org.springframework.boot.data.mongodb.test.autoconfigure.DataMongoTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

@DataMongoTest
@Import(CustomMongoConfiguration.class)
@ActiveProfiles("test")
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}

}
