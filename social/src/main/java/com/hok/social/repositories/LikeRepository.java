package com.hok.social.repositories;

import com.hok.social.entities.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LikeRepository extends JpaRepository<Like, UUID> {
    @Query("select i from Like i where i.user.id=:user_id and i.post.id=:post_id")
    public Like isLikeExists(@Param("user_id") UUID user_id, @Param("post_id") UUID post_id);

    @Query("select i from Like i where i.post.id=:post_id")
    public List<Like> findByPostId(@Param("post_id") UUID post_id);
}
