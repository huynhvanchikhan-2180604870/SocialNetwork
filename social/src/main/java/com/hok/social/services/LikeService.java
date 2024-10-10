package com.hok.social.services;

import com.hok.social.entities.Like;
import com.hok.social.entities.User;
import com.hok.social.exception.PostException;
import com.hok.social.exception.UserException;

import java.util.List;
import java.util.UUID;

public interface LikeService {
    public Like likePost(UUID post_id, User user) throws PostException, UserException;

    public List<Like> getAllLikes(UUID post_id) throws PostException;

}
