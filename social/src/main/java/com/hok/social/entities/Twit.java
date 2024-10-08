package com.hok.social.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "twits")
public class Twit {
    @Id
    private UUID id;

    @ManyToOne
    private User user;

    private String content;
    private String image;
    private String video;

    @OneToMany(mappedBy = "twit", cascade = CascadeType.ALL)
    private List<Like> likes = new ArrayList<>();

    @OneToMany
    private List<Twit> replyTwits = new ArrayList<>();

    @ManyToMany
    private List<User> retwitUsers = new ArrayList<>();

    @ManyToOne
    private Twit replyFor;

    private boolean isReply;
    private boolean isTwit;
    private LocalDateTime createdAt;
}
