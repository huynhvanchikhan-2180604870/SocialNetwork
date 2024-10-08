package com.hok.social.repositories;

import com.hok.social.entities.Twit;
import com.hok.social.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TwitRepository extends JpaRepository<Twit, UUID> {

//    List<Twit> findAllByIs_twitTrueOrderByCreated_atDesc();
//
//    List<Twit> findByRetwit_usersContainsOrUser_IdAndIsTwitTrueOrderByCreated_atDesc(User user, UUID user_id);
//
//
//    List<Twit> findByLikesContainingOrderByCreated_atDesc(User user);

    List<Twit> findAllByIsTwitTrueOrderByCreatedAtDesc();

    List<Twit> findByRetwitUsersContainsOrUserIdAndIsTwitTrueOrderByCreatedAtDesc(User user, UUID userId);

    List<Twit> findByLikesContainingOrderByCreatedAtDesc(User user);

    @Query("select t from Twit t JOIN  t.likes i where i.user.id=:user_id")
    List<Twit> findByLikesUser_Id(UUID user_id);
}
