package com.englishsponge.backend.service;

import com.englishsponge.backend.dto.model.SeriesDto;
import com.englishsponge.backend.dto.response.SeriesResponse;
import com.englishsponge.backend.remote.DbExecutor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class SeriesService {

    private final DbExecutor dbExecutor;
    @Value("${delivery.cdn}")
    private String cdn;

    public List<SeriesResponse> getAllSeries() {
        List<SeriesDto> result = dbExecutor.run("select s.*, f.filename_disk from series s join directus_files f on f.id = s.thumbnail order by s.created_at desc;",
                                                SeriesDto.class,
                                                null);
        return result.stream()
                     .map(this::mapResponse)
                     .toList();
    }

    public SeriesResponse getSeriesById(Integer id) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", id);
        SeriesDto dto = dbExecutor.runSingle("select s.*, f.filename_disk from series s join directus_files f on f.id = s.thumbnail where s.id = :id;", SeriesDto.class, data);
        return mapResponse(dto);
    }

    private SeriesResponse mapResponse(SeriesDto dto) {
        SeriesResponse resp = new SeriesResponse();
        resp.setId(dto.getId());
        resp.setName(dto.getName());
        resp.setDescription(dto.getDescription());
        resp.setShortDescription(dto.getShortDescription());
        resp.setThumbnail(cdn + dto.getFilenameDisk());
        resp.setCreatedAt(dto.getCreatedAt());
        return resp;
    }
}
