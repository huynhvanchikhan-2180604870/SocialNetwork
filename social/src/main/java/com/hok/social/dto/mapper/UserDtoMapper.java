package com.hok.social.dto.mapper;

import com.hok.social.dto.UserDto;
import com.hok.social.entities.User;

import java.util.ArrayList;
import java.util.List;

public class UserDtoMapper {

    public static UserDto toUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setImage(user.getImage());
        userDto.setFullName(user.getFull_name());
        userDto.setEmail(user.getEmail());
        userDto.setImage(user.getImage());
        userDto.setBackgroudImage(user.getBackgroud_image());
        userDto.setBio(user.getBio());
        userDto.setBirthDate(user.getBirth_day());
        userDto.setFollowers(toUserDtos(user.getFollowers()));
        userDto.setFollowing(toUserDtos(user.getFollowings()));
        userDto.setLogin_with_google(user.isLogin_with_google());
        userDto.setLocation(user.getLocation());
        userDto.setCreatedAt(user.getCreated_at());
        userDto.setLastLogin(user.getLast_login());
        userDto.setOnline(user.is_online());
//        userDto.setVerified();
        return userDto;
    }

    public static List<UserDto> toUserDtos(List<User> followers) {
        List<UserDto> userDtos = new ArrayList<>();
        for (User user : followers) {
            UserDto userDto = new UserDto();
            userDto.setId(user.getId());
            userDto.setImage(user.getImage());
            userDto.setFullName(user.getFull_name());
            userDto.setEmail(user.getEmail());
            userDto.setImage(user.getImage());
            userDto.setBackgroudImage(user.getBackgroud_image());

            userDtos.add(userDto);
        }
        return userDtos;
    }
}
