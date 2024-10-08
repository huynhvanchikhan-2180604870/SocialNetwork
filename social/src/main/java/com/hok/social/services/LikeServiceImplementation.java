package com.hok.social.services;

import com.hok.social.entities.Like;
import com.hok.social.entities.Twit;
import com.hok.social.entities.User;
import com.hok.social.exception.TwitException;
import com.hok.social.exception.UserException;
import com.hok.social.repositories.LikeRepository;
import com.hok.social.repositories.TwitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public class LikeServiceImplementation implements LikeService {
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private TwitService twitService;
    @Autowired
    private TwitRepository  twitRepository;

    @Override
    public Like likeTwit(UUID twit_id, User user) throws TwitException, UserException {
        Like isLikeExist = likeRepository.isLikeExists(user.getId(), twit_id);

        if(isLikeExist != null) {
            likeRepository.deleteById(isLikeExist.getId());
            return isLikeExist;
        }

        Twit twit = twitService.findById(twit_id);
        Like like = new Like();
        like.setTwit(twit);
        like.setUser(user);
        like.setId(UUID.randomUUID());

        Like saveLike = likeRepository.save(like);

        twit.getLikes().add(saveLike);
        twitRepository.save(twit);
        return saveLike;
    }

    @Override
    public List<Like> getAllLikes(UUID twit_id) throws TwitException {
        Twit twit = twitService.findById(twit_id);

        List<Like> likes = likeRepository.findByTwitId(twit.getId());
        return likes;
    }
}
