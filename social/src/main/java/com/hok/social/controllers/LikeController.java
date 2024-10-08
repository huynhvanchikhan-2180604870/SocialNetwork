package com.hok.social.controllers;

import com.hok.social.dto.LikeDto;
import com.hok.social.dto.mapper.LikeDtoMapper;
import com.hok.social.entities.Like;
import com.hok.social.entities.User;
import com.hok.social.exception.TwitException;
import com.hok.social.exception.UserException;
import com.hok.social.services.LikeService;
import com.hok.social.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class LikeController {
    @Autowired
    private UserService userService;

    @Autowired
    private LikeService likeService;

    @PostMapping("/{twit_id}/likes")
    public ResponseEntity<LikeDto> likeTwit(@PathVariable UUID twit_id, @RequestHeader("Authorization") String jwt)throws UserException, TwitException{
        User user = userService.findUserProfileByJwt(jwt);
        Like like = likeService.likeTwit(twit_id, user);

        LikeDto likeDto = LikeDtoMapper.toLikeDto(like, user);
        return new ResponseEntity<>(likeDto, HttpStatus.CREATED);
    }

    @PostMapping("/twit/{twit_id}/")
    public ResponseEntity<List<LikeDto>> getAllLikes(@PathVariable UUID twit_id, @RequestHeader("Authorization") String jwt)throws UserException, TwitException{
        User user = userService.findUserProfileByJwt(jwt);
        List<Like> likes = likeService.getAllLikes(twit_id);

        List<LikeDto> likeDtos = LikeDtoMapper.toLikeDtos(likes, user);
        return new ResponseEntity<>(likeDtos, HttpStatus.CREATED);
    }

}
