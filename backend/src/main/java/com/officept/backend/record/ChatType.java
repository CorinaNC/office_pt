package com.officept.backend.record;

import lombok.Getter;

@Getter
public enum ChatType {
    USER_MESSAGE(0, "User Message"),
    AGENT_REPLY(1, "Agent Reply");

    private final int value;
    private final String label;

    ChatType(int value, String label) {
        this.value = value;
        this.label = label;
    }

    public static ChatType fromValue(int value) throws IllegalArgumentException {
        for (ChatType chatType : ChatType.values()) {
            if (chatType.value == value) {
                return chatType;
            }
        }
        throw new IllegalArgumentException("ChatType with value " + value + " does not exist.");
    }
}
