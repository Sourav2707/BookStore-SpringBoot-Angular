package com.bridgelabz.bookstore.service;

import com.bridgelabz.bookstore.config.SecurityConfig;
import com.bridgelabz.bookstore.dto.BookDTO;
import com.bridgelabz.bookstore.dto.LoginDTO;
import com.bridgelabz.bookstore.dto.RegisterDTO;
import com.bridgelabz.bookstore.entity.User;
import com.bridgelabz.bookstore.repository.UserRepository;
import com.bridgelabz.bookstore.util.TokenUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService{

    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Autowired
    UserRepository userRepository;
    @Autowired
    JavaMailSender mailSender;
    @Autowired
    TokenUtility tokenUtility;
    @Override
    public User login(LoginDTO loginDTO) {
        User userByEmail = userRepository.findByEmail(loginDTO.getEmail());
        return userByEmail;
    }

    @Override
    public void register(RegisterDTO registerDTO) {
        User user = new User(registerDTO);
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        userRepository.save(user);
        sendEmail(registerDTO.getEmail(), "Registration Success with Globe Book Store", "Testing");
    }

    @Override
    public void sendEmail(String toEmail, String subject, String textMessage) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(textMessage);
        mailSender.send(message);
    }

    @Override
    public void addToCart(BookDTO bookDTO) {

    }
}
