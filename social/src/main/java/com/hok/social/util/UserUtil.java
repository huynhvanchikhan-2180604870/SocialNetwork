package com.hok.social.util;

import com.hok.social.entities.User;

public class UserUtil {
    public static final boolean isReqUser(User reqUser, User user) {
        return  reqUser.getId().equals(user.getId());
    }

    public static final boolean isFollowedByReqUser(User reqUser, User user) {
        return reqUser.getFollowings().contains(user);
    }
}
