package com.englishsponge.backend.dto.request;

import lombok.Data;

@Data
public class PasswordChangeRequest {
    private String currentPassword;
    private String newPassword;
}
