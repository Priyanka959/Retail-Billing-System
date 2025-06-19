package com.billingsystems.demo.service;

import com.billingsystems.demo.model.Login;
import com.billingsystems.demo.repository.LoginRepository;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    // Register a new user
    public Login registerUser(Login login) {
        return loginRepository.save(login);
    }

    // Authenticate user by username
    public Login findByUsername(String username) {
      return loginRepository.findByUsername(username)
              .orElseThrow(() -> new IllegalArgumentException("User not found"));
  }
  
}


