package com.officept.backend.record;

import lombok.Getter;

@Getter
public enum Muscle {
    FLEXOR_CARPI_RADIALIS(0, "Flexor carpi radialis"),
    FLEXOR_CARPI_ULNARIS(1, "Flexor carpi ulnaris"),
    EXTENSOR_CARPI_RADIALIS_BREVIS(2, "Extensor carpi radialis brevis"),
    EXTENSOR_CARPI_RADIALIS_LONGUS(3, "Extensor carpi radialis longus"),
    EXTENSOR_CARPI_ULNARIS(4, "Extensor carpi ulnaris"),
    EXTENSOR_POLLICIS_LONGUS(5, "Extensor pollicis longus"),
    ABDUCTOR_POLLICIS_LONGUS(6, "Abductor pollicis longus"),
    EXTENSOR_POLLICIS_BREVIS(7, "Extensor pollicis brevis"),
    CARPAL_TUNNEL(8, "Carpal tunnel");

    private final int value;
    private final String label;

    Muscle(int value, String label) {
        this.value = value;
        this.label = label;
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
