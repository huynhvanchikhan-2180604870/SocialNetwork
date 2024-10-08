package com.hok.social.services;

import com.hok.social.entities.Twit;
import com.hok.social.entities.User;
import com.hok.social.exception.TwitException;
import com.hok.social.exception.UserException;
import com.hok.social.repositories.TwitRepository;
import com.hok.social.request.TwitReplyReques;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class TwitServicerImplementation implements TwitService{
    @Autowired
    private TwitRepository twitRepository;

    @Override
    public Twit createTwit(Twit req, User user) throws UserException {
        Twit twit = new Twit();
        twit.setContent(req.getContent());
        twit.setCreatedAt(LocalDateTime.now());
        twit.setId(UUID.randomUUID());
        twit.setUser(user);
        twit.setReply(false);
        twit.setImage(req.getImage());
        twit.setVideo(req.getVideo());

        return twitRepository.save(twit);
    }

    @Override
    public List<Twit> findAllTwits() {
        return twitRepository.findAllByIsTwitTrueOrderByCreatedAtDesc();
    }

    @Override
    public Twit reTwit(UUID twit_id, User user) throws UserException, TwitException {
        Twit twit = findById(twit_id);
        if(twit.getRetwitUsers().contains(user)) {
            twit.getRetwitUsers().remove(user);
        }else{
            twit.getRetwitUsers().add(user);
        }
        return twitRepository.save(twit);
    }

    @Override
    public Twit findById(UUID twit_id) throws TwitException {
        Twit twit = twitRepository.findById(twit_id).orElseThrow(() ->new TwitException("Twit nod found with id "+twit_id) );
        return twit;
    }

    @Override
    public void deleteTwitById(UUID twit_id, UUID user_id) throws TwitException, UserException {
        Twit twit = findById(twit_id);

        if(!user_id.equals(twit.getUser().getId())) {
            throw new UserException("you can't delete another user's twit "+twit_id);
        }
        twitRepository.deleteById(twit_id);
    }

    @Override
    public Twit removeFromRetwit(UUID twit_id, User user) throws UserException, TwitException {
        return null;
    }

    @Override
    public Twit createdReply(TwitReplyReques req, User user) throws TwitException {
        Twit replyFor = findById(req.getTwit_id());
        Twit twit = new Twit();
        twit.setContent(req.getContent());
        twit.setCreatedAt(LocalDateTime.now());
        twit.setId(UUID.randomUUID());
        twit.setUser(user);
        twit.setReply(true);
        twit.setTwit(false);
        twit.setReplyFor(replyFor);
        Twit savedReply= twitRepository.save(twit);
        twit.getReplyTwits().add(savedReply);
        twitRepository.save(replyFor);
        return replyFor;
    }

    @Override
    public List<Twit> getUserTwits(User user) throws TwitException {
        return twitRepository.findByRetwitUsersContainsOrUserIdAndIsTwitTrueOrderByCreatedAtDesc(user, user.getId());
    }

    @Override
    public List<Twit> findByLikesContainsUser(User user) throws TwitException {
        return twitRepository.findByLikesUser_Id(user.getId());
    }
}
