package com.englishsponge.backend.dto.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.Instant;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto {
    private Integer id;
    private String name;
    private String email;
    @JsonIgnore
    private String password;
    private Integer dailyGoal;
    private Long dailyGoalCompleted;
    private Instant createdOn;
    private Integer otp;
    private Boolean verified;
    private Integer subscriptionTier;
    @JsonIgnore
    private String stripeCusId;
    @JsonIgnore
    private String stripeSubId;
    @JsonIgnore
    private String paymentInfo;
}
