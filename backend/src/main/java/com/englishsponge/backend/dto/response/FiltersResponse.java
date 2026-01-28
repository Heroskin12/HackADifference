package com.englishsponge.backend.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class FiltersResponse {
    private List<Filter> filters;
}
