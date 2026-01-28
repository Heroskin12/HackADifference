package com.englishsponge.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

import java.time.Instant;
import java.util.UUID;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SeriesResponse {
    private Integer id;
    private String name;
    private String description;
    private String shortDescription;
    private String thumbnail;
    private Instant createdAt;
}
