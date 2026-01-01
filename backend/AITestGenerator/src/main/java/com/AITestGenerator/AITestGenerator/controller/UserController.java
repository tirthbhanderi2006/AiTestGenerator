package com.AITestGenerator.AITestGenerator.controller;

import com.AITestGenerator.AITestGenerator.exception.UserAlreadyExistsException;
import com.AITestGenerator.AITestGenerator.model.DTO.LoginRequest;
import com.AITestGenerator.AITestGenerator.model.User;
import com.AITestGenerator.AITestGenerator.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@Tag(
        name = "User Authentication",
        description = "Endpoints for user registration and authentication"
)
public class UserController {

    @Autowired
    private IUserService  userService;

    @GetMapping("/test")
    @Operation(summary = "Test endpopint ",
            description = "Hit this endpoint to test ")
    public String test() {
        return "Working";
    }

    @PostMapping("/register")
    @Operation(summary = "Register a new user",
            description = "Creates a new user account with unique email and username")
    public ResponseEntity<User> registerNewUser(@RequestBody User user)  {
        System.out.println("Registering a new user new Request");
        User registereduser=userService.registerUser(user);
        return ResponseEntity.ok(registereduser);
    }

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Login endpoint return User")
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Login endpoint return User");
        System.out.println(loginRequest.getEmail() + " " + loginRequest.getPassword());
        User loginUser = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(loginUser);
    }

}
