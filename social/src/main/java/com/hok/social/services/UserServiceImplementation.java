package com.hok.social.services;

import com.hok.social.config.JwtProvider;
import com.hok.social.entities.User;
import com.hok.social.exception.UserException;
import com.hok.social.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImplementation implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserById(UUID id) throws UserException{
        User user = userRepository.findById(id).orElseThrow(() -> new UserException("user not found with id" + id));
        return user;
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        String email = jwtProvider.getEmailFromToken(jwt);
        User user = userRepository.findByEmail(email);
        if(user == null){
            throw new UserException("user not found with email" + email);
        }

        return user;
    }

    @Override
    public User updateUser(UUID id, User req) throws UserException {
        User user = findUserById(id);

        if(req.getFull_name() != null){
            user.setFull_name(req.getFull_name());
        }

        if(req.getImage() != null){
            user.setImage(req.getImage());
        }

        if(req.getBackgroud_image() != null){
            user.setBackgroud_image(req.getBackgroud_image());
        }

        if(req.getBirth_day() != null){
            user.setBirth_day(req.getBirth_day());
        }

        if(req.getLocation() != null){
            user.setLocation(req.getLocation());
        }

        if(req.getBio() != null){
            user.setBio(req.getBio());
        }

        if(req.getWebsite() != null){
            user.setWebsite(req.getWebsite());
        }


        return userRepository.save(user);
    }

    @Override
    public User followUser(UUID id, User user) throws UserException {
        User followToUser = findUserById(id);
        if(user.getFollowings().contains(followToUser) && followToUser.getFollowers().contains(user)){
            user.getFollowings().remove(followToUser);
            followToUser.getFollowers().remove(user);
        }else{
            user.getFollowings().add(followToUser);
            followToUser.getFollowers().add(user);
        }

        userRepository.save(followToUser);
        userRepository.save(user);
        return followToUser;
    }

    @Override
    public List<User> search(String query) throws UserException {

        return userRepository.searchUser(query);
    }

    public void processOAuthPostLogin(String username) {
        User existUser = userRepository.findByEmail(username);

        if (existUser == null) {

        }

    }
}
