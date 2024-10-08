package com.hok.social.controllers;

import com.hok.social.dto.UserDto;
import com.hok.social.dto.mapper.UserDtoMapper;
import com.hok.social.entities.User;
import com.hok.social.exception.UserException;
import com.hok.social.services.UserService;
import com.hok.social.util.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/profile")
    public ResponseEntity<UserDto> getUserProfile(@RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.findUserProfileByJwt(jwt);
        UserDto userDto = UserDtoMapper.toUserDto(user);
        userDto.setReq_user(true);
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable UUID user_id,
            @RequestHeader("Authorization") String jwt) throws UserException {
        User requser = userService.findUserProfileByJwt(jwt);
        User user = userService.findUserById(user_id);
        UserDto userDto = UserDtoMapper.toUserDto(user);
        userDto.setReq_user(UserUtil.isReqUser(requser, user));
        userDto.setFollowed(UserUtil.isFollowedByReqUser(requser, user));
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }


    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUser(@RequestParam String search,
                                               @RequestHeader("Authorization") String jwt) throws UserException {
        User requser = userService.findUserProfileByJwt(jwt);
        List<User> users = userService.search(search);


        List<UserDto> userDtos = UserDtoMapper.toUserDtos(users);
        return new ResponseEntity<>(userDtos, HttpStatus.ACCEPTED);
    }

    @PutMapping("/update")
    public ResponseEntity<UserDto> updateUser(@RequestBody User req,
                                                    @RequestHeader("Authorization") String jwt) throws UserException {
        User requser = userService.findUserProfileByJwt(jwt);
        User user = userService.updateUser(req.getId(), req);


        UserDto userDto = UserDtoMapper.toUserDto(user);
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{user_id}/follow")
    public ResponseEntity<UserDto> updateUser(@PathVariable UUID user_id,
                                              @RequestHeader("Authorization") String jwt) throws UserException {
        User requser = userService.findUserProfileByJwt(jwt);
        User user = userService.followUser(user_id, requser);


        UserDto userDto = UserDtoMapper.toUserDto(user);
        userDto.setFollowed(UserUtil.isFollowedByReqUser(requser, user));
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }

}
