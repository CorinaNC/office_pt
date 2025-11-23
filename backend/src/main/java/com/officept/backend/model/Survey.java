package com.officept.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.UUID;

@Data
@Builder(setterPrefix = "set")
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "surveys")
@CrossOrigin(origins = "http://localhost:5173")
public class Survey {
    @MongoId(FieldType.STRING)
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    @Field("experience_pain")
    private boolean experiencePain;

    @Field("pain_location")
    private String painLocation;

    @Field("pain_intensity")
    private String painIntensity;

    @Field("pain_type")
    private String painType;

    public String getId() {
        return id;
    }

    public boolean isExperiencePain() {
        return experiencePain;
    }

    public String getPainLocation() {
        return painLocation;
    }

    public String getPainIntensity() {
        return painIntensity;
    }

    public String getPainType() {
        return painType;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setExperiencePain(boolean experiencePain) {
        this.experiencePain = experiencePain;
    }

    public void setPainLocation(String painLocation) {
        this.painLocation = painLocation;
    }

    public void setPainIntensity(String painIntensity) {
        this.painIntensity = painIntensity;
    }

    public void setPainType(String painType) {
        this.painType = painType;
    }
}