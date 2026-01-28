package com.englishsponge.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VideosResponse {
    private Integer id;
    private String title;
    private String description;
    private String guide;
    private String link;
    private String accent;
    private String level;
    private String tabId;
    private String grammarArea;
    private List<String> topics;
    private Integer series;
    @JsonIgnore
    private Integer subscriptionTier;
    private Boolean locked = false;

    @JsonGetter("link")
    public String getTransformedLink() {
        if (link != null) {
            return link.replace("https://www.youtube.com/watch?v=", "");
        }
        return null;
    }
}