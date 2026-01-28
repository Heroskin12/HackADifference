package com.englishsponge.backend.dto.response;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class CreateCheckoutResponse {
    private final String sessionUrl;
}
