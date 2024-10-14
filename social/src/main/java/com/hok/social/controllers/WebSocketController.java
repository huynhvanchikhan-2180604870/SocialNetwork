//package com.hok.social.controllers;
//
//import com.hok.social.dto.LikeDto;
//import com.hok.social.dto.PostDto;
//import com.hok.social.entities.Like;
//import com.hok.social.entities.Post;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Controller;
//
//@Controller
//public class WebSocketController {
//    @Autowired
//    private SimpMessagingTemplate messagingTemplate;
//
//    @MessageMapping("/newPost")
//    @SendTo("/topic/newPosts")
//    public PostDto handleNewPost(PostDto post) {
//        // Nếu cần xử lý logic từ client gửi lên, xử lý tại đây
//        return post;
//    }
//
//    @MessageMapping("/like")
//    @SendTo("/topic/likes")
//    public LikeDto handleLike(LikeDto like) {
//        return like;
//    }
//
//    @MessageMapping("/reply")
//    @SendTo("/topic/replies")
//    public PostDto handleReply(PostDto reply) {
//        return reply;
//    }
//}
