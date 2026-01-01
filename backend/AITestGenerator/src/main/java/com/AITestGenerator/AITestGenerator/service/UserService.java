package com.AITestGenerator.AITestGenerator.service;

import com.AITestGenerator.AITestGenerator.exception.InvalidPasswordException;
import com.AITestGenerator.AITestGenerator.exception.UserAlreadyExistsException;
import com.AITestGenerator.AITestGenerator.exception.UserNotFoundException;
import com.AITestGenerator.AITestGenerator.model.User;
import com.AITestGenerator.AITestGenerator.repository.IUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepo userRepo;



    @Override
    public User registerUser(User user) {

//        for unique email
       if(userRepo.existsByEmail(user.getEmail())){
           throw new UserAlreadyExistsException("Email already exists");
       }
//       validate username
        if (userRepo.existsByName(user.getName())) {
            throw new UserAlreadyExistsException("Username already exists");
        }

//        password hash
//        String hashedPassword=passwordEncoder.encode(user.getPassword());
//        user.setPassword(hashedPassword);

        user.setAvatar("");
        user.setFullName("");
        user.setLastLogin(null);

        return userRepo.save(user);

    }

    @Override
    public Optional<User> findByEmail(String email) {
        return Optional.empty();
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return Optional.empty();
    }

    @Override
    public boolean existsByEmail(String email) {
        return false;
    }

    @Override
    public boolean existsByUsername(String username) {
        return false;
    }

    @Override
    public User login(String email, String rawPassword) {
        System.out.println("Login attempt - Email received: '" + email + "'");

        // Check if email exists first
        boolean exists = userRepo.existsByEmail(email);
        System.out.println("Email exists in DB: " + exists);

        // Try case-insensitive search
        Optional<User> user = userRepo.findByEmailIgnoreCase(email.trim());
        System.out.println("User found: " + (user.isPresent()));


        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found for email: " + email);
        }

        System.out.println("User retrieved: " + user.get().getEmail());

        if (!rawPassword.equals(user.get().getPassword())) {
            throw new InvalidPasswordException("Invalid password");
        }

//        user.get().setLastLogin(Instant.now());
        updateLastLogin(user.get().getId());
        return userRepo.save(user.get()); // Save the updated lastLogin
    }

    @Override
    public void updateLastLogin(String userId) {
        userRepo.findById(userId).ifPresent(user -> user.setLastLogin(Instant.now()));
    }

    @Override
    public Optional<User> getUserById(String userId) {
        Optional<User> user = userRepo.findById(userId);
        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found for id: " + userId);
        }
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User updateProfile(String userId, User updatedUser) {
        Optional <User> user = userRepo.findById(userId);
        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found for id: " + userId);
        }
       //   TODO
        return null;
    }

    @Override
    public void updateAvatar(String userId, String avatarUrl) {
        //TODO
    }


    @Override
    public String deleteUser(String userId) {
        Optional<User> user = userRepo.findById(userId);
        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found for id: " + userId);
        }else{
            userRepo.deleteById(userId);
            return "User Deleted";
        }
    }

    @Override
    public void changePassword(String userId, String oldPassword, String newPassword) {
        Optional<User> user = userRepo.findById(userId);
        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found for id: " + userId);
        }
        if (user.get().getPassword().equals(oldPassword)) {
            user.get().setPassword(newPassword);
            userRepo.save(user.get());
        }else{
            throw new InvalidPasswordException("Invalid password");
        }
    }
}
