package com.hok.social.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "likes")
public class Like {
    @Id
    private UUID id;


    @ManyToOne
    private User user;

    @ManyToOne
    private Twit twit;


}
