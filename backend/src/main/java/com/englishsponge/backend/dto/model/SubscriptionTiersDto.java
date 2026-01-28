package com.englishsponge.backend.dto.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SubscriptionTiersDto {
    private Integer id;
    @JsonIgnore
    private String stripeIdentifier;
    private Integer price;
    private String name;
}
