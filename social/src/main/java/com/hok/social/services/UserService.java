package com.hok.social.services;

import com.hok.social.entities.User;
import com.hok.social.exception.UserException;

import java.util.List;
import java.util.UUID;

public interface UserService {
    public User findUserById(UUID id)throws UserException;
    public User findUserProfileByJwt(String jwt) throws UserException;
    public User updateUser(UUID id, User user) throws UserException;
    public User followUser(UUID id, User user) throws UserException;
    public List<User> search(String query) throws UserException;

}
