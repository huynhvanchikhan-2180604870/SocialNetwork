package com.hok.social.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
@Data
public class TwitDto {
    private UUID id;
    private String content;
    private String image;
    private String video;
    private UserDto user;
    private LocalDateTime createdAt;
    private int totalLikes;
    private int totalReplies;
    private int totalRetweets;
    private boolean isLiked;
    private boolean isRetwit;
    private List<UUID>retwitUsersId;
    private List<TwitDto> replyTwits;
}
