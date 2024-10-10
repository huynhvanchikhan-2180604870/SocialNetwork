package com.hok.social.services;

import com.hok.social.entities.Post;
import com.hok.social.entities.User;
import com.hok.social.exception.PostException;
import com.hok.social.exception.UserException;
import com.hok.social.repositories.PostRepository;
import com.hok.social.request.PostReplyReques;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PostServicerImplementation implements PostService {
    @Autowired
    private PostRepository postRepository;

    @Override
    public Post createPost(Post req, User user) throws UserException {
        Post post = new Post();
        post.setContent(req.getContent());
        post.setCreatedAt(LocalDateTime.now());
        post.setId(UUID.randomUUID());
        post.setUser(user);
        post.setReply(false);
        post.setImage(req.getImage());
        post.setVideo(req.getVideo());
        post.setPost(true);
        return postRepository.save(post);
    }

    @Override
    public List<Post> findAllPost() {
        return postRepository.findAllByIsPostTrueOrderByCreatedAtDesc();
    }

    @Override
    public Post rePost(UUID post_id, User user) throws UserException, PostException {
        Post post = findById(post_id);
        if(post.getRepostUsers().contains(user)) {
            post.getRepostUsers().remove(user);
        }else{
            post.getRepostUsers().add(user);
        }
        return postRepository.save(post);
    }

    @Override
    public Post findById(UUID post_id) throws PostException {
        Post post = postRepository.findById(post_id).orElseThrow(() ->new PostException("Post nod found with id "+post_id) );
        return post;
    }

    @Override
    public void deletePostById(UUID post_id, UUID user_id) throws PostException, UserException {
        Post post = findById(post_id);

        if(!user_id.equals(post.getUser().getId())) {
            throw new UserException("you can't delete another user's twit "+post_id);
        }
        postRepository.deleteById(post_id);
    }

    @Override
    public Post removeFromPost(UUID post_id, User user) throws UserException, PostException {
        return null;
    }

    @Override
    public Post createdReply(PostReplyReques req, User user) throws PostException {
        // Tìm bài viết gốc mà bạn muốn reply
        Post replyFor = findById(req.getPost_id());

        // Tạo một bài viết mới là bài reply
        Post replyPost = new Post();
        replyPost.setContent(req.getContent());
        replyPost.setCreatedAt(LocalDateTime.now());
        replyPost.setId(UUID.randomUUID());
        replyPost.setUser(user);
        replyPost.setReply(true);
        replyPost.setPost(false);
        replyPost.setReplyFor(replyFor); // Gắn reply này vào bài viết gốc

        // Lưu bài reply trước
        Post savedReply = postRepository.save(replyPost);

        // Thêm bài reply vào danh sách replyPosts của bài viết gốc
        replyFor.getReplyPosts().add(savedReply);

        // Lưu lại bài viết gốc với danh sách reply mới
        postRepository.save(replyFor);

        // Trả về bài viết gốc đã được cập nhật
        return savedReply;
    }

    @Override
    public List<Post> getUserPosts(User user) throws PostException {
        return postRepository.findByUserAndIsPostTrueOrderByCreatedAtDesc(user);
    }


    @Override
    public List<Post> findByLikesContainsUser(User user) throws PostException {
        return postRepository.findByLikesUser_Id(user.getId());
    }

    @Override
    public List<Post> getUserReposts(User user) throws PostException {
        return postRepository.findByRepostUsersContainsAndIsPostTrueOrderByCreatedAtDesc(user);
    }


}
