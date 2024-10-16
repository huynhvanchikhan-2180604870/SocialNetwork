package com.hok.social.controllers;

import com.hok.social.dto.PostDto;
import com.hok.social.dto.mapper.PostDtoMapper;
import com.hok.social.entities.Post;
import com.hok.social.entities.User;
import com.hok.social.exception.PostException;
import com.hok.social.exception.UserException;
import com.hok.social.request.PostReplyReques;
import com.hok.social.response.ApiResponse;
import com.hok.social.services.PostService;
import com.hok.social.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private UserService userService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/create")
    public ResponseEntity<PostDto> createTwit(@RequestBody Post req, @RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.findUserProfileByJwt(jwt);
        Post post = postService.createPost(req, user);
        PostDto postDto = PostDtoMapper.toPostDto(post, user);

        // Phát thông báo về bài viết mới qua WebSocket
        messagingTemplate.convertAndSend("/topic/newPosts", postDto);
        return new ResponseEntity<>(postDto, HttpStatus.CREATED);
    }

    @PostMapping("/reply")
    public ResponseEntity<PostDto> replyTwit(@RequestBody PostReplyReques req, @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);
        Post post = postService.createdReply(req, user);
        PostDto postDto = PostDtoMapper.toPostDto(post, user);
        // Phát thông báo reply qua WebSocket
        messagingTemplate.convertAndSend("/topic/replies", postDto);
        return new ResponseEntity<>(postDto, HttpStatus.CREATED);
    }

    @PutMapping("/{post_id}/repost")
    public ResponseEntity<PostDto> repost(@PathVariable UUID post_id, @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);
        Post post = postService.rePost(post_id, user);
        PostDto postDto = PostDtoMapper.toPostDto(post, user);
        // Phát thông báo về repost qua WebSocket
        messagingTemplate.convertAndSend("/topic/reposts", postDto);
        return new ResponseEntity<>(postDto, HttpStatus.OK);
    }

    @GetMapping("/{post_id}")
    public ResponseEntity<PostDto> findPostById(@PathVariable UUID post_id, @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);
        Post post = postService.findById(post_id);
        PostDto postDto = PostDtoMapper.toPostDto(post, user);
        // Phát thông báo về like/unlike qua WebSocket

        return new ResponseEntity<>(postDto, HttpStatus.OK);
    }

    @DeleteMapping("/{post_id}")
    public ResponseEntity<ApiResponse> deletePost(@PathVariable UUID post_id, @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);
        postService.deletePostById(post_id, user.getId());

        ApiResponse res = new ApiResponse("Twit deleted successfully", true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    @GetMapping("/")
    public ResponseEntity<List<PostDto>> getAllPost(@RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Post> posts = postService.findAllPost();
        List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, user);
        return new ResponseEntity<>(postDtos, HttpStatus.OK);
    }


    @GetMapping("/user/{user_id}")
    public ResponseEntity<List<PostDto>> getUserAllPosts(@PathVariable UUID user_id, @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);
        User cu = userService.findUserById(user_id);
        List<Post> posts = postService.getUserPosts(cu);
        List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, cu);
        return new ResponseEntity<>(postDtos, HttpStatus.OK);
    }


    @GetMapping("/user/{user_id}/likes")
    public ResponseEntity<List<PostDto>> findPostLikesContainsUser(@PathVariable UUID user_id, @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);
        User cu = userService.findUserById(user_id);
        List<Post> posts = postService.findByLikesContainsUser(cu);
        List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, cu);
        return new ResponseEntity<>(postDtos, HttpStatus.OK);
    }


    @GetMapping("user/{user_id}/reposts")
    public ResponseEntity<List<PostDto>> findRePostUserContainsUser(@PathVariable UUID user_id, @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);
        User cu = userService.findUserById(user_id);
        List<Post> posts = postService.getUserReposts(cu);
        List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, cu);
        return new ResponseEntity<>(postDtos, HttpStatus.OK);
    }

}
