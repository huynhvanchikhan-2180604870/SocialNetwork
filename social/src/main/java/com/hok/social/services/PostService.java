package com.hok.social.services;

import com.hok.social.entities.Post;
import com.hok.social.entities.User;
import com.hok.social.exception.PostException;
import com.hok.social.exception.UserException;
import com.hok.social.request.PostReplyReques;

import java.util.List;
import java.util.UUID;


public interface PostService {

    public Post createPost(Post post, User user) throws UserException ;
    public List<Post> findAllPost() ;
    public Post rePost(UUID post_id, User user) throws UserException, PostException;
    public Post findById(UUID post_id) throws PostException;
    public void deletePostById(UUID post_id, UUID user_id) throws PostException, UserException;
    public Post removeFromPost(UUID post_id, User user) throws UserException, PostException;
    public Post createdReply(PostReplyReques req, User user) throws PostException;
    public List<Post> getUserPosts(User user) throws PostException;
    public List<Post> findByLikesContainsUser(User user) throws PostException;
    public List<Post> getUserReposts(User user) throws PostException;


}
