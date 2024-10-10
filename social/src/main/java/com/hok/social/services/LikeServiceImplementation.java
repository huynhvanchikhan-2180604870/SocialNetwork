package com.hok.social.services;

import com.hok.social.entities.Like;
import com.hok.social.entities.Post;
import com.hok.social.entities.User;
import com.hok.social.exception.PostException;
import com.hok.social.exception.UserException;
import com.hok.social.repositories.LikeRepository;
import com.hok.social.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public class LikeServiceImplementation implements LikeService {
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private PostService postService;
    @Autowired
    private PostRepository postRepository;

    @Override
    public Like likePost(UUID post_id, User user) throws PostException, UserException {
        Like isLikeExist = likeRepository.isLikeExists(user.getId(), post_id);

        if(isLikeExist != null) {
            likeRepository.deleteById(isLikeExist.getId());
            return isLikeExist;
        }

        Post post = postService.findById(post_id);
        Like like = new Like();
        like.setPost(post);
        like.setUser(user);
        like.setId(UUID.randomUUID());

        Like saveLike = likeRepository.save(like);

        post.getLikes().add(saveLike);
        postRepository.save(post);
        return saveLike;
    }

    @Override
    public List<Like> getAllLikes(UUID post_id) throws PostException {
        Post post = postService.findById(post_id);

        List<Like> likes = likeRepository.findByPostId(post.getId());
        return likes;
    }
}
