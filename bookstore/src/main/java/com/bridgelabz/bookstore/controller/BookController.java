package com.bridgelabz.bookstore.controller;

import com.bridgelabz.bookstore.dto.BookDTO;
import com.bridgelabz.bookstore.dto.LoginDTO;
import com.bridgelabz.bookstore.dto.RegisterDTO;
import com.bridgelabz.bookstore.entity.User;
import com.bridgelabz.bookstore.service.IUserService;
import com.bridgelabz.bookstore.util.TokenUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookstore")
@CrossOrigin(origins = "http://localhost:4200", exposedHeaders = "Authorization")
public class BookController {
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Autowired
    TokenUtility tokenUtility;
    @Autowired
    IUserService userService;
    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:4200", exposedHeaders = "Authorization")
    public ResponseEntity<User> login(@RequestBody LoginDTO loginDTO) {
        User userByEmail = userService.login(loginDTO);
        if(userByEmail.getEmail().equals(loginDTO.getEmail()) & passwordEncoder.matches(loginDTO.getPassword(), userByEmail.getPassword())) {
            String token = tokenUtility.generateToken(userByEmail.getId());
            if (token != null) {
                return ResponseEntity.status(HttpStatus.OK).header("Authorization", token).body(userByEmail);
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(userByEmail);
    }
    @PostMapping("/register")
    public ResponseEntity<Boolean> register(@RequestBody RegisterDTO registerDTO) {
        userService.register(registerDTO);
        return ResponseEntity.status(HttpStatus.OK).body(true);
    }
    @PatchMapping("/addtocart")
    public void addToCart(@RequestBody BookDTO bookDTO) {

    }
}
