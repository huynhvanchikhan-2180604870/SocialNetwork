package com.hok.social.util;

import com.hok.social.entities.Like;
import com.hok.social.entities.Twit;
import com.hok.social.entities.User;

public class TwitUtil {
    public final static boolean isLikeByReqUser(User reqUser, Twit twit){
        for(Like like : twit.getLikes()){
            if(like.getUser().getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }

    public final static boolean isRetwitedByReqUser(User reqUser, Twit twit){
        for(User user : twit.getRetwitUsers()){
            if(user.getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }
}
