package com.englishsponge.backend.dto.response;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ManageSubscriptionResponse {
    private final String sessionUrl;
}
