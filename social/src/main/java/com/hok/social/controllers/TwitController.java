package com.hok.social.controllers;

import com.hok.social.dto.TwitDto;
import com.hok.social.dto.mapper.TwitDtoMapper;
import com.hok.social.entities.Twit;
import com.hok.social.entities.User;
import com.hok.social.exception.TwitException;
import com.hok.social.exception.UserException;
import com.hok.social.request.TwitReplyReques;
import com.hok.social.response.ApiResponse;
import com.hok.social.services.TwitService;
import com.hok.social.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/twits")
public class TwitController {
    @Autowired
    private TwitService twitService;
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<TwitDto> createTwit(@RequestBody Twit req, @RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.findUserProfileByJwt(jwt);
        Twit twit = twitService.createTwit(req, user);
        TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
    }

    @PostMapping("/reply")
    public ResponseEntity<TwitDto> replyTwit(@RequestBody TwitReplyReques req, @RequestHeader("Authorization") String jwt) throws UserException, TwitException {
        User user = userService.findUserProfileByJwt(jwt);
        Twit twit = twitService.createdReply(req, user);
        TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
    }

    @PutMapping("/{twit_id}/retwit")
    public ResponseEntity<TwitDto> retwit(@PathVariable UUID twit_id, @RequestHeader("Authorization") String jwt) throws UserException, TwitException {
        User user = userService.findUserProfileByJwt(jwt);
        Twit twit = twitService.reTwit(twit_id, user);
        TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }

    @GetMapping("/{twit_id}")
    public ResponseEntity<TwitDto> findTwitById(@PathVariable UUID twit_id, @RequestHeader("Authorization") String jwt) throws UserException, TwitException {
        User user = userService.findUserProfileByJwt(jwt);
        Twit twit = twitService.findById(twit_id);
        TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }

    @DeleteMapping("/{twit_id}")
    public ResponseEntity<ApiResponse> deletTwit(@PathVariable UUID twit_id, @RequestHeader("Authorization") String jwt) throws UserException, TwitException {
        User user = userService.findUserProfileByJwt(jwt);
        twitService.deleteTwitById(twit_id, user.getId());

        ApiResponse res = new ApiResponse("Twit deleted successfully", true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    @GetMapping("/")
    public ResponseEntity<List<TwitDto>> getAllTwits(@RequestHeader("Authorization") String jwt) throws UserException, TwitException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Twit> twits = twitService.findAllTwits();
        List<TwitDto> twitDtos = TwitDtoMapper.toTwitDtos(twits, user);
        return new ResponseEntity<>(twitDtos, HttpStatus.OK);
    }


    @GetMapping("/user/{user_id}")
    public ResponseEntity<List<TwitDto>> getUserAllTwits(@PathVariable UUID user_id, @RequestHeader("Authorization") String jwt) throws UserException, TwitException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Twit> twits = twitService.getUserTwits(user);
        List<TwitDto> twitDtos = TwitDtoMapper.toTwitDtos(twits, user);
        return new ResponseEntity<>(twitDtos, HttpStatus.OK);
    }


    @GetMapping("/user/{user_id}/likes")
    public ResponseEntity<List<TwitDto>> findTwitLikesContainsUser(@PathVariable UUID user_id, @RequestHeader("Authorization") String jwt) throws UserException, TwitException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Twit> twits = twitService.findByLikesContainsUser(user);
        List<TwitDto> twitDtos = TwitDtoMapper.toTwitDtos(twits, user);
        return new ResponseEntity<>(twitDtos, HttpStatus.OK);
    }


}
