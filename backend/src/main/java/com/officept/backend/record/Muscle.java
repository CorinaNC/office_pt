package com.officept.backend.record;

import lombok.Getter;

@Getter
public enum Muscle {
    INTEROSSEI(0, "Interossei"),
    PALMARIS_LONGUS(1, "Palmaris longus")
    ;
    // TODO: Add more please

    private final int value;
    private final String description;

    Muscle(int value, String description) {
        this.value = value;
        this.description = description;
    }

    public static Muscle fromValue(int value) throws IllegalArgumentException {
        for (Muscle muscle : Muscle.values()) {
            if (muscle.value == value) {
                return muscle;
            }
        }
        throw new IllegalArgumentException("Muscle with value " + value + " does not exist.");
    }
}
