package com.hok.social.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class LikeDto {
    private UUID id;
    private UserDto user;
    private PostDto post;

}
