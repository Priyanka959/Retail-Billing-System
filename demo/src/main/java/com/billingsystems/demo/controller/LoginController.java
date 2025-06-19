package com.billingsystems.demo.controller;

import com.billingsystems.demo.model.Login;
import com.billingsystems.demo.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    // ✅ Register a new user
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public ResponseEntity<Login> registerUser(@RequestBody Login loginRequest) {
        Login savedUser = loginService.registerUser(loginRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    // ✅ Authenticate user by username
    @PostMapping
    public ResponseEntity<String> authenticateUser(@RequestBody Login loginRequest) {
        try {
            Login login = loginService.findByUsername(loginRequest.getUsername());
            if (login.getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity.ok("Login successful! Role: " + login.getRole());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password!");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    

    // ✅ Get user details by username
    @GetMapping("/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        try {
            Login login = loginService.findByUsername(username);
            return ResponseEntity.ok(login);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with username: " + username);
        }
    }
}
