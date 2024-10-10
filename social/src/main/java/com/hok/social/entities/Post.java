package com.hok.social.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "posts")
public class Post {
    @Id
    private UUID id;

    @ManyToOne
    private User user;

    private String content;
    private String image;
    private String video;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "replyFor", cascade = CascadeType.ALL)
    private List<Post> replyPosts = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "post_repost_users", // Tên bảng trung gian
            joinColumns = @JoinColumn(name = "post_id"), // Khóa chính của bảng Post
            inverseJoinColumns = @JoinColumn(name = "user_id") // Khóa chính của bảng User
    )
    private List<User> repostUsers = new ArrayList<>();


    @ManyToOne
    private Post replyFor;

    private boolean isReply;
    private boolean isPost;
    private LocalDateTime createdAt;
}
