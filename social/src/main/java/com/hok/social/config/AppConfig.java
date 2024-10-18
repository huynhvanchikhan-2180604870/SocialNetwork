package com.hok.social.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class AppConfig {

    // @Bean
    // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    //     http
    //             .sessionManagement(session -> session
    //             .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
    //             .authorizeHttpRequests(authorize -> authorize
    //             .requestMatchers("/api/**").authenticated()
    //             .anyRequest().permitAll())
    //             .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
    //             .csrf(csrf -> csrf.disable())
    //             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
    //             .httpBasic(Customizer.withDefaults()) // Lambda style configuration for HTTP Basic Authentication
    //             .formLogin(form -> form.disable())
    //             .requiresChannel(channel -> channel.anyRequest().requiresSecure()); // Thêm dòng này để yêu cầu HTTPS
    //     return http.build();
    // }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll())
                .addFilterBefore(new CustomCorsFilter(), BasicAuthenticationFilter.class)
                .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults())
                .formLogin(form -> form.disable())
                .requiresChannel(channel -> channel.anyRequest().requiresSecure());

        return http.build();
    }

    // // private CorsConfigurationSource corsConfigurationSource() {
    // //     return new CorsConfigurationSource() {
    // //         @Override
    // //         public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
    // //             CorsConfiguration config = new CorsConfiguration();
    // //             config.setAllowedOrigins(Arrays.asList(
    // //                     "http://localhost:3000",
    // //                     "https://hockitsystems.id.vn"  // Thêm địa chỉ IP của máy chạy React
    // //             ));
    // //             config.setAllowedMethods(Collections.singletonList("*"));
    // //             config.setAllowedHeaders(Collections.singletonList("*"));
    // //             config.setExposedHeaders(Collections.singletonList("Authorization"));
    // //             config.setAllowCredentials(true);
    // //             config.setMaxAge(3600L);
    // //             UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    // //             source.registerCorsConfiguration("/**", config);
    // //             return source;
    // //         }
    // //     };
    // }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("https://hockitsystems.id.vn"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With", "accept", "Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers"));
        config.setExposedHeaders(Arrays.asList("Authorization"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    public JwtProvider  jwtProvider(){
//        return new JwtProvider();
//    }
}
