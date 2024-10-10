package com.hok.social.dto.mapper;

import com.hok.social.dto.LikeDto;
import com.hok.social.dto.PostDto;
import com.hok.social.dto.UserDto;
import com.hok.social.entities.Like;
import com.hok.social.entities.User;

import java.util.ArrayList;
import java.util.List;

public class LikeDtoMapper {
    public static LikeDto toLikeDto(Like like, User reqUser){
        UserDto user = UserDtoMapper.toUserDto(like.getUser());
        UserDto reqUserDto = UserDtoMapper.toUserDto(reqUser);
        PostDto postDto = PostDtoMapper.toPostDto(like.getPost(), reqUser);
        LikeDto likeDto = new LikeDto();

        likeDto.setId(like.getId());
        likeDto.setUser(user);
        likeDto.setPost(postDto);

        return likeDto;
    }

    public static List<LikeDto> toLikeDtos(List<Like> likes, User reqUser){
        List<LikeDto> likeDtos = new ArrayList<>();
        for (Like like : likes) {
            UserDto user = UserDtoMapper.toUserDto(like.getUser());
            PostDto postDto = PostDtoMapper.toPostDto(like.getPost(), reqUser);
            LikeDto likeDto = new LikeDto();

            likeDto.setId(like.getId());
            likeDto.setUser(user);
            likeDto.setPost(postDto);
            likeDtos.add(likeDto);
        }
        return likeDtos;
    }
}
