package com.englishsponge.backend.exception;

public class InternalAppException extends RuntimeException {
    public InternalAppException(Exception e) {
        super(e);
    }
}
