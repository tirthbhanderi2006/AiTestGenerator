package com.AITestGenerator.AITestGenerator.repository;

import com.AITestGenerator.AITestGenerator.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface IUserRepo extends MongoRepository<User, String> {
    boolean existsByEmail(String email);
    boolean existsByName(String username);
    // Add this - try with Optional
    Optional<User> findByEmailIgnoreCase(String email);
}
