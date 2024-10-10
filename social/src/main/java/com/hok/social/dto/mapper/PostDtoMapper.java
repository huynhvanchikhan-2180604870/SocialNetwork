package com.hok.social.dto.mapper;

import com.hok.social.dto.PostDto;
import com.hok.social.dto.UserDto;
import com.hok.social.entities.Post;
import com.hok.social.entities.User;
import com.hok.social.util.PostUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class PostDtoMapper {

    // Phương thức chính để chuyển từ Post entity sang PostDto
    public static PostDto toPostDto(Post post, User reqUser) {
        UserDto user = UserDtoMapper.toUserDto(post.getUser());
        boolean isLiked = PostUtil.isLikeByReqUser(reqUser, post);
        boolean isRetwit = PostUtil.isRepostedByReqUser(reqUser, post);

        // Ánh xạ danh sách các user đã retwit
        List<UUID> retwitUserId = new ArrayList<>();
        for (User usre1 : post.getRepostUsers()) {
            retwitUserId.add(usre1.getId());
        }

        // Tạo đối tượng PostDto
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setContent(post.getContent());
        postDto.setCreatedAt(post.getCreatedAt());
        postDto.setImage(post.getImage());
        postDto.setTotalLikes(post.getLikes().size());
        postDto.setTotalReplies(post.getReplyPosts().size()); // Số lượng phản hồi
        postDto.setTotalRepost(post.getRepostUsers().size()); // Số lượng reposts
        postDto.setUser(user);
        postDto.setLiked(isLiked);
        postDto.setRepost(isRetwit);
        postDto.setRetwitUsersId(retwitUserId);
        postDto.setReplyPost(toPostDtos(post.getReplyPosts(), reqUser)); // Ánh xạ danh sách các phản hồi
        postDto.setVideo(post.getVideo());

        return postDto;
    }

    // Chuyển danh sách các bài viết (hoặc bài trả lời) từ Post entity sang PostDto
    public static List<PostDto> toPostDtos(List<Post> posts, User reqUser) {
        List<PostDto> postDtos = new ArrayList<>();
        for (Post post : posts) {
            PostDto postDto = toReplyTwitDto(post, reqUser);
            postDtos.add(postDto);
        }
        return postDtos;
    }

    // Chuyển đổi các bài trả lời từ Post entity sang PostDto
    private static PostDto toReplyTwitDto(Post post, User reqUser) {
        UserDto user = UserDtoMapper.toUserDto(post.getUser());
        boolean isLiked = PostUtil.isLikeByReqUser(reqUser, post);
        boolean isRetwit = PostUtil.isRepostedByReqUser(reqUser, post);

        // Ánh xạ danh sách các user đã repost
        List<UUID> retwitUserId = new ArrayList<>();
        for (User usre1 : post.getRepostUsers()) {
            retwitUserId.add(usre1.getId());
        }

        // Tạo đối tượng PostDto cho bài trả lời
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setContent(post.getContent());
        postDto.setCreatedAt(post.getCreatedAt());
        postDto.setImage(post.getImage());
        postDto.setTotalLikes(post.getLikes().size());
        postDto.setTotalReplies(post.getReplyPosts().size());
        postDto.setTotalRepost(post.getRepostUsers().size());
        postDto.setUser(user);
        postDto.setLiked(isLiked);
        postDto.setRepost(isRetwit);
        postDto.setRetwitUsersId(retwitUserId);
        postDto.setVideo(post.getVideo());

        // Ánh xạ danh sách các phản hồi (nếu có)
        postDto.setReplyPost(toPostDtos(post.getReplyPosts(), reqUser));

        return postDto;
    }
}


//public class PostDtoMapper {
//    public static PostDto toPostDto(Post post, User reqUser) {
//        UserDto user = UserDtoMapper.toUserDto(post.getUser());
//        boolean isLiked = PostUtil.isLikeByReqUser(reqUser, post);
//        boolean isRetwit = PostUtil.isRepostedByReqUser(reqUser, post);
//        List<UUID> retwitUserId = new ArrayList<>();
//        for(User usre1 : post.getRepostUsers()){
//            retwitUserId.add(usre1.getId());
//        }
//
//        PostDto postDto = new PostDto();
//        postDto.setId(post.getId());
//        postDto.setContent(post.getContent());
//        postDto.setCreatedAt(post.getCreatedAt());
//        postDto.setImage(post.getImage());
//        postDto.setTotalLikes(post.getLikes().size());
//        postDto.setTotalReplies(post.getReplyPosts().size());
//        postDto.setTotalRepost(post.getRepostUsers().size());
//        postDto.setUser(user);
//        postDto.setLiked(isLiked);
//        postDto.setRepost(isRetwit);
//        postDto.setRetwitUsersId(retwitUserId);
//        postDto.setReplyPost(toPostDtos(post.getReplyPosts(), reqUser));
//        postDto.setVideo(post.getVideo());
//        return postDto;
//    }
//
//    public static List<PostDto> toPostDtos(List<Post> posts, User reqUser) {
//        List<PostDto> postDtos = new ArrayList<>();
//        for(Post post : posts){
//            PostDto postDto = toReplyTwitDto(post, reqUser);
//            postDtos.add(postDto);
//        }
//        return postDtos;
//    }
//
//    private static PostDto toReplyTwitDto(Post post, User reqUser) {
//        UserDto user = UserDtoMapper.toUserDto(post.getUser());
//        boolean isLiked = PostUtil.isLikeByReqUser(reqUser, post);
//        boolean isRetwit = PostUtil.isRepostedByReqUser(reqUser, post);
//        List<UUID> retwitUserId = new ArrayList<>();
//        for(User usre1 : post.getRepostUsers()){
//            retwitUserId.add(usre1.getId());
//        }
//
//        PostDto postDto = new PostDto();
//        postDto.setId(post.getId());
//        postDto.setContent(post.getContent());
//        postDto.setCreatedAt(post.getCreatedAt());
//        postDto.setImage(post.getImage());
//        postDto.setTotalLikes(post.getLikes().size());
//        postDto.setTotalReplies(post.getReplyPosts().size());
//        postDto.setTotalRepost(post.getRepostUsers().size());
//        postDto.setUser(user);
//        postDto.setLiked(isLiked);
//        postDto.setRepost(isRetwit);
//        postDto.setRetwitUsersId(retwitUserId);
//        postDto.setVideo(post.getVideo());
//
//        return postDto;
//    }
//}
