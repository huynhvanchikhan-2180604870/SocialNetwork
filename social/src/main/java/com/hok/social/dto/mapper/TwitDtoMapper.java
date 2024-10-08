package com.hok.social.dto.mapper;

import com.hok.social.dto.TwitDto;
import com.hok.social.dto.UserDto;
import com.hok.social.entities.Twit;
import com.hok.social.entities.User;
import com.hok.social.util.TwitUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class TwitDtoMapper {
    public static TwitDto toTwitDto(Twit twit, User reqUser) {
        UserDto user = UserDtoMapper.toUserDto(twit.getUser());
        boolean isLiked = TwitUtil.isLikeByReqUser(reqUser, twit);
        boolean isRetwit = TwitUtil.isRetwitedByReqUser(reqUser, twit);
        List<UUID> retwitUserId = new ArrayList<>();
        for(User usre1 : twit.getRetwitUsers()){
            retwitUserId.add(usre1.getId());
        }
        
        TwitDto twitDto = new TwitDto();
        twitDto.setId(twit.getId());
        twitDto.setContent(twit.getContent());
        twitDto.setCreatedAt(twit.getCreatedAt());
        twitDto.setImage(twit.getImage());
        twitDto.setTotalLikes(twit.getLikes().size());
        twitDto.setTotalReplies(twit.getReplyTwits().size());
        twitDto.setTotalRetweets(twit.getRetwitUsers().size());
        twitDto.setUser(user);
        twitDto.setLiked(isLiked);
        twitDto.setRetwit(isRetwit);
        twitDto.setRetwitUsersId(retwitUserId);
        twitDto.setReplyTwits(toTwitDtos(twit.getReplyTwits(), reqUser));
        twitDto.setVideo(twit.getVideo());
        return twitDto;
    }
    
    public static List<TwitDto> toTwitDtos(List<Twit> twits, User reqUser) {
        List<TwitDto> twitDtos = new ArrayList<>();
        for(Twit twit : twits){
            TwitDto twitDto = toReplyTwitDto(twit, reqUser);
            twitDtos.add(twitDto);
        }
        return twitDtos;
    }

    private static TwitDto toReplyTwitDto(Twit twit, User reqUser) {
        UserDto user = UserDtoMapper.toUserDto(twit.getUser());
        boolean isLiked = TwitUtil.isLikeByReqUser(reqUser, twit);
        boolean isRetwit = TwitUtil.isRetwitedByReqUser(reqUser, twit);
        List<UUID> retwitUserId = new ArrayList<>();
        for(User usre1 : twit.getRetwitUsers()){
            retwitUserId.add(usre1.getId());
        }

        TwitDto twitDto = new TwitDto();
        twitDto.setId(twit.getId());
        twitDto.setContent(twit.getContent());
        twitDto.setCreatedAt(twit.getCreatedAt());
        twitDto.setImage(twit.getImage());
        twitDto.setTotalLikes(twit.getLikes().size());
        twitDto.setTotalReplies(twit.getReplyTwits().size());
        twitDto.setTotalRetweets(twit.getRetwitUsers().size());
        twitDto.setUser(user);
        twitDto.setLiked(isLiked);
        twitDto.setRetwit(isRetwit);
        twitDto.setRetwitUsersId(retwitUserId);
        twitDto.setVideo(twit.getVideo());
        return twitDto;
    }
}
