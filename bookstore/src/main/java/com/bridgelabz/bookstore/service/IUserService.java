package com.bridgelabz.bookstore.service;

import com.bridgelabz.bookstore.dto.BookDTO;
import com.bridgelabz.bookstore.dto.LoginDTO;
import com.bridgelabz.bookstore.dto.RegisterDTO;
import com.bridgelabz.bookstore.entity.User;
import org.springframework.stereotype.Service;


public interface IUserService {
    User login(LoginDTO loginDTO);
    void register(RegisterDTO registerDTO);
    void sendEmail(String toEmail,String subject, String textMessage);
    void addToCart(BookDTO bookDTO);
}
