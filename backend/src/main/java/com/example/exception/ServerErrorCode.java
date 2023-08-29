package com.example.exception;

public enum ServerErrorCode {
    CLIENT_NOT_FOUND("Invalid passport details"),
    INVALID_EMAIL("Invalid email"),
    INVALID_FULL_NAME("Invalid full name");

    private final String message;

    ServerErrorCode(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

}
