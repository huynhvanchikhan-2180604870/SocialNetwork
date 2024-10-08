package com.hok.social.services;

import com.hok.social.entities.Twit;
import com.hok.social.entities.User;
import com.hok.social.exception.TwitException;
import com.hok.social.exception.UserException;
import com.hok.social.repositories.TwitRepository;
import com.hok.social.request.TwitReplyReques;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


public interface TwitService {

    public Twit createTwit(Twit twit, User user) throws UserException ;
    public List<Twit> findAllTwits() ;
    public Twit reTwit(UUID twit_id, User user) throws UserException, TwitException;
    public Twit findById(UUID twit_id) throws TwitException;
    public void deleteTwitById(UUID twit_id, UUID user_id) throws TwitException, UserException;
    public Twit removeFromRetwit(UUID twit_id, User user) throws UserException, TwitException;
    public Twit createdReply(TwitReplyReques req, User user) throws TwitException;
    public List<Twit> getUserTwits(User user) throws TwitException;
    public List<Twit> findByLikesContainsUser(User user) throws TwitException;


}
