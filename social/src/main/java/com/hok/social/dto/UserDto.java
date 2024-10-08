package com.hok.social.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class UserDto {
    private UUID id;
    private String fullName;
    private String email;
    private String image;
    private String location;
    private String website;
    private String birthDate;
    private String mobile;
    private String backgroudImage;
    private String bio;
    private boolean req_user;
    private boolean login_with_google;
    private List<UserDto> followers = new ArrayList<>();
    private List<UserDto> following = new ArrayList<>();
    private boolean followed;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
    private boolean isOnline;
    private boolean isVerified;


}
