package com.hok.social.repositories;

import com.hok.social.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    public User findByEmail(String email);

    @Query("select distinct u from User u where u.full_name like %:query% or u.email like %:query%")
    public List<User> searchUser(@Param("query") String query);
}
