package com.AITestGenerator.AITestGenerator.service;

import com.AITestGenerator.AITestGenerator.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    /* =========================
       Registration & Auth
       ========================= */

    User registerUser(User user);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    User login(String email, String rawPassword);

    void updateLastLogin(String userId);


    /* =========================
       User Profile
       ========================= */

    Optional<User> getUserById(String userId);

    List<User> getAllUsers();

    User updateProfile(String userId, User updatedUser);

    void updateAvatar(String userId, String avatarUrl);


    /* =========================
       Account Status
       ========================= */
    String deleteUser(String userId);


    /* =========================
       Security
       ========================= */

    void changePassword(String userId, String oldPassword, String newPassword);

}

