package com.englishsponge.backend.utility;

import org.hibernate.query.ResultListTransformer;
import org.hibernate.query.TupleTransformer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ResultTransformer implements TupleTransformer<Map<String, Object>>, ResultListTransformer<Map<String, Object>> {

    public static final ResultTransformer INSTANCE = new ResultTransformer();

    private ResultTransformer() {}

    @Override
    public Map<String, Object> transformTuple(Object[] tuple, String[] aliases) {
        Map<String, Object> result = new HashMap<>();
        for (int i = 0; i < aliases.length; i++) {
            if (aliases[i] != null) {
                result.put(aliases[i], tuple[i]);
            }
        }
        return result;
    }

    @Override
    public List<Map<String, Object>> transformList(List<Map<String, Object>> list) {
        return list;
    }
}