package com.hok.social.util;

import com.hok.social.entities.Like;
import com.hok.social.entities.Post;
import com.hok.social.entities.User;

public class PostUtil {
    public final static boolean isLikeByReqUser(User reqUser, Post post){
        for(Like like : post.getLikes()){
            if(like.getUser().getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }

    public final static boolean isRepostedByReqUser(User reqUser, Post post){
        for(User user : post.getRepostUsers()){
            if(user.getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }
}
