package com.hok.social.services;

import com.hok.social.entities.Like;
import com.hok.social.entities.User;
import com.hok.social.exception.TwitException;
import com.hok.social.exception.UserException;

import java.util.List;
import java.util.UUID;

public interface LikeService {
    public Like likeTwit(UUID twit_id, User user) throws TwitException, UserException;

    public List<Like> getAllLikes(UUID twit_id) throws TwitException;

}
