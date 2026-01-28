package com.englishsponge.backend.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class Filter {
    private String key;
    private List<Value> values;

    @Data
    public static class Value {
        private Integer id;
        private String name;
    }
}
