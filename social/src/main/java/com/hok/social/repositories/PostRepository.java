package com.hok.social.repositories;

import com.hok.social.entities.Post;
import com.hok.social.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {




    List<Post> findAllByIsPostTrueOrderByCreatedAtDesc();

    List<Post> findByRepostUsersContainsOrUserIdAndIsPostTrueOrderByCreatedAtDesc(User user, UUID userId);

    List<Post> findByRepostUsersContainingOrUserIdAndIsPostTrueOrderByCreatedAtDesc(User user, UUID userId);
    List<Post> findByUserAndIsPostTrueOrderByCreatedAtDesc(User user);
    List<Post> findByLikesContainingOrderByCreatedAtDesc(User user);
    List<Post> findByRepostUsersContainsAndIsPostTrueOrderByCreatedAtDesc(User user);
    @Query("select p from Post p JOIN  p.likes i where i.user.id=:user_id")
    List<Post> findByLikesUser_Id(UUID user_id);
}
