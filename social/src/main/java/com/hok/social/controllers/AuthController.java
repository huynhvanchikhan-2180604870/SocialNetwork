package com.hok.social.controllers;

import com.hok.social.config.JwtProvider;
import com.hok.social.entities.User;
import com.hok.social.entities.VarifiCation;
import com.hok.social.exception.UserException;
import com.hok.social.repositories.UserRepository;
import com.hok.social.response.AuthResponse;
import com.hok.social.services.CustomUserDetailsServiceImplementation;
import com.hok.social.services.UserService;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomUserDetailsServiceImplementation customUserDetailsService;

    private static final String GOOGLE_TOKEN_VERIFICATION_URL = "https://oauth2.googleapis.com/tokeninfo?id_token=";

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
        String email = user.getEmail();
        String password = user.getPassword_hash();
        String fullname = user.getFull_name();
        String birtdate = user.getBirth_day();
        UUID id = UUID.randomUUID();

        User isEmailExist = userRepository.findByEmail(email);
        if (isEmailExist != null) {
            throw new UserException("Email Already Exists");
        }

        User createUser = new User();
        createUser.setEmail(email);
        createUser.setId(id);
        createUser.setCreated_at(LocalDateTime.now());
        createUser.setFull_name(fullname);
        createUser.setPassword_hash(passwordEncoder.encode(password));
        createUser.setBirth_day(birtdate);
        createUser.setVerification(new VarifiCation());
        createUser.setLogin_with_google(false);
        createUser.setLast_login(LocalDateTime.now());
        createUser.set_online(true);
        User savedUser = userRepository.save(createUser);
        Authentication auth = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String token = jwtProvider.generateToken(auth);

        AuthResponse authResponse = new AuthResponse(token, true);

        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> signin(@RequestBody User user) throws UserException {
        String email = user.getEmail();
        String password = user.getPassword_hash();
        User userLogin = userRepository.findByEmail(email);
        userLogin.set_online(true);
        userLogin.setLast_login(LocalDateTime.now());
        userRepository.save(userLogin);
        Authentication auth = authenticate(email, password);

        String token = jwtProvider.generateToken(auth);

        AuthResponse authResponse = new AuthResponse(token, true);

        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.ACCEPTED);
    }

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

        if(userDetails == null) {
            throw new BadCredentialsException("Invalid username");
        }

        if(!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid username or password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> authenticateGoogleToken(@RequestBody String request) {
        String token = request;
        String verificationUrl = GOOGLE_TOKEN_VERIFICATION_URL + token;
        RestTemplate restTemplate = new RestTemplate();
        AuthResponse authResponse = null;

        try {
            // Gửi yêu cầu xác thực tới Google
            ResponseEntity<Map> response = restTemplate.getForEntity(verificationUrl, Map.class);
            Map<String, Object> payload = response.getBody();

            if (payload != null) {
                // Trích xuất thông tin người dùng từ phản hồi
                String email = (String) payload.get("email");
                String name = (String) payload.get("name");
                String pictureUrl = (String) payload.get("picture");
                String password = (String) payload.get("email");
                User isEmailExist = userRepository.findByEmail(email);

                if (isEmailExist != null) {
                    Authentication auth = new UsernamePasswordAuthenticationToken(email, email);
                    SecurityContextHolder.getContext().setAuthentication(auth);
                    String jwt = jwtProvider.generateToken(auth);
                    User userLogin = userRepository.findByEmail(email);
                    userLogin.set_online(true);
                    userLogin.setLast_login(LocalDateTime.now());
                    userRepository.save(userLogin);
                    authResponse = new AuthResponse(jwt, true);
                    return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.ACCEPTED);
                }else{
                    User createUser = new User();
                    createUser.setEmail(email);
                    createUser.setId(UUID.randomUUID());
                    createUser.setFull_name(name);
                    createUser.setPassword_hash(passwordEncoder.encode(email));
                    createUser.setVerification(new VarifiCation());
                    createUser.setImage(pictureUrl);
                    createUser.setCreated_at(LocalDateTime.now());
                    createUser.setLogin_with_google(true);
                    createUser.setLast_login(LocalDateTime.now());
                    createUser.set_online(true);
                    User savedUser = userRepository.save(createUser);
                    Authentication auth = new UsernamePasswordAuthenticationToken(email, password);
                    SecurityContextHolder.getContext().setAuthentication(auth);
                    String jwt = jwtProvider.generateToken(auth);

                    authResponse = new AuthResponse(jwt, true);

                    return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
                }
            } else {

            }
        } catch (Exception e) {
            throw new BadCredentialsException("Invalid username or password");
        }
        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/logout")
    public ResponseEntity<Boolean> logout(@RequestHeader("Authorization") String jwt)throws UserException {
        User currentUser = userService.findUserProfileByJwt(jwt);
        if(currentUser == null) {
            throw new BadCredentialsException("Invalid username or password");
        }
        currentUser.set_online(false);
        userRepository.save(currentUser);
        return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
    }
}
