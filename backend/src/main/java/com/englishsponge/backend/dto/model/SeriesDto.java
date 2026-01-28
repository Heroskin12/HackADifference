package com.englishsponge.backend.dto.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SeriesDto {
    private Integer id;
    private String name;
    private String description;
    private String shortDescription;
    private UUID thumbnail;
    private Instant createdAt;
    @JsonIgnore
    private String filenameDisk;
}
