package com.hok.social.dto.mapper;

import com.hok.social.dto.LikeDto;
import com.hok.social.dto.TwitDto;
import com.hok.social.dto.UserDto;
import com.hok.social.entities.Like;
import com.hok.social.entities.User;

import java.util.ArrayList;
import java.util.List;

public class LikeDtoMapper {
    public static LikeDto toLikeDto(Like like, User reqUser){
        UserDto user = UserDtoMapper.toUserDto(like.getUser());
        UserDto reqUserDto = UserDtoMapper.toUserDto(reqUser);
        TwitDto twitDto = TwitDtoMapper.toTwitDto(like.getTwit(), reqUser);
        LikeDto likeDto = new LikeDto();

        likeDto.setId(like.getId());
        likeDto.setUser(user);
        likeDto.setTwit(twitDto);

        return likeDto;
    }

    public static List<LikeDto> toLikeDtos(List<Like> likes, User reqUser){
        List<LikeDto> likeDtos = new ArrayList<>();
        for (Like like : likes) {
            UserDto user = UserDtoMapper.toUserDto(like.getUser());
            TwitDto twitDto = TwitDtoMapper.toTwitDto(like.getTwit(), reqUser);
            LikeDto likeDto = new LikeDto();

            likeDto.setId(like.getId());
            likeDto.setUser(user);
            likeDto.setTwit(twitDto);
            likeDtos.add(likeDto);
        }
        return likeDtos;
    }
}
