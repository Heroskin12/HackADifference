package com.englishsponge.backend.dto.request;

import lombok.Data;

@Data
public class CreateCheckoutRequest {
    private Integer userId;
    private Integer priceId;
}
