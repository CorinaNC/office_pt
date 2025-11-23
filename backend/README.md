**Please make sure to connect your own MongoDB URI inside of secrets.properties so the bakcend/ can run!**
**Note:** The Flask API must be running for the tests to pass since Spring Boot calls it.
```aiignore
mvn clean install
mvn clean install -DskipTests
mvn test
.\mvnw spring-boot:run
```
http://localhost:8080/actuator/health
https://www.baeldung.com/spring-boot-actuators
