package com.englishsponge.backend.remote;

import com.englishsponge.backend.utility.ResultTransformer;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.*;
import java.util.Objects;

@Component
@SuppressWarnings("SqlSourceToSinkFlow")
public class DbExecutor {

    @PersistenceContext
    private EntityManager entityManager;

    public <T> List<T> run(String sql, Class<T> dtoClass, Map<String, Object> params) {
        NativeQuery<?> nativeQuery = getNativeQuery(sql, params);
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> rows = (List<Map<String, Object>>) nativeQuery.getResultList();

        if (rows == null || rows.isEmpty()) {
            return Collections.emptyList();
        }

        return mapRowsToDTOs(rows, dtoClass);
    }

    public <T> T runSingle(String sql, Class<T> dtoClass, Map<String, Object> params) {
        NativeQuery<?> nativeQuery = getNativeQuery(sql, params);
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> row = (Map<String, Object>) nativeQuery.getSingleResult();
            return mapRowToDTO(row, dtoClass);
        } catch (NoResultException e) {
            return null;
        }
    }

    // runs ddl
    public int execute(String sql, Map<String, Object> params) {
        Query query = entityManager.createNativeQuery(sql);
        if (params != null) {
            params.forEach(query::setParameter);
        }
        return query.executeUpdate(); // returns number of affected rows
    }

    private NativeQuery<?> getNativeQuery(String sql, Map<String, Object> params) {
        params = params == null ? new HashMap<>() : new HashMap<>(params);
        for (Map.Entry<String, Object> entry : new ArrayList<>(params.entrySet())) {
            String key = entry.getKey();
            if (sql.contains("#{" + key + "}")) {
                sql = sql.replace("#{" + key + "}", entry.getValue().toString());
                params.remove(key);
            }
        }

        Query query = entityManager.createNativeQuery(sql);
        params.forEach(query::setParameter);

        NativeQuery<?> nativeQuery = query.unwrap(NativeQuery.class);
        nativeQuery.setTupleTransformer(ResultTransformer.INSTANCE);
        return nativeQuery;
    }

    private <T> List<T> mapRowsToDTOs(List<Map<String, Object>> rows, Class<T> dtoClass) {
        List<T> result = new ArrayList<>();
        for (Map<String, Object> row : rows) {
            try {
                T dto = mapRowToDTO(row, dtoClass);
                result.add(dto);
            } catch (Exception e) {
                throw new RuntimeException("Failed to instantiate DTO: " + dtoClass.getSimpleName(), e);
            }
        }
        return result;
    }

    private <T> T mapRowToDTO(Map<String, Object> row, Class<T> dtoClass) {
        try {
            // Handle scalar types directly
            if (dtoClass == String.class || Number.class.isAssignableFrom(dtoClass) ||
                    dtoClass == Integer.class || dtoClass == Long.class ||
                    dtoClass == Double.class || dtoClass == Boolean.class ||
                    dtoClass.isPrimitive()) {
                Object value = row.values().stream().filter(Objects::nonNull).findFirst().orElse(null);
                if (value == null) {
                    return null;
                }
                return dtoClass.cast(value);
            }

            // Handle DTOs
            T dto = dtoClass.getDeclaredConstructor().newInstance();
            for (Map.Entry<String, Object> entry : row.entrySet()) {
                try {
                    Field field = dtoClass.getDeclaredField(convertSnakeToCamel(entry.getKey()));
                    field.setAccessible(true);
                    field.set(dto, entry.getValue());
                } catch (NoSuchFieldException ignored) {
                    // field not present in DTO – skip
                }
            }
            return dto;
        } catch (Exception e) {
            throw new RuntimeException("Failed to instantiate DTO: " + dtoClass.getSimpleName(), e);
        }
    }

    private String convertSnakeToCamel(String key) {
        StringBuilder result = new StringBuilder();
        boolean nextUpper = false;
        for (char c : key.toCharArray()) {
            if (c == '_') {
                nextUpper = true;
            } else {
                result.append(nextUpper ? Character.toUpperCase(c) : c);
                nextUpper = false;
            }
        }
        return result.toString();
    }
}
