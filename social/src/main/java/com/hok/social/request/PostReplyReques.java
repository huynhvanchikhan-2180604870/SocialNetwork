package com.hok.social.request;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class PostReplyReques {
    private String content;
    private UUID post_id;
    private LocalDateTime created_at;
    private String image;

}
