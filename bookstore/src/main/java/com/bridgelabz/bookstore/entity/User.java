package com.bridgelabz.bookstore.entity;

import com.bridgelabz.bookstore.entity.Book;
import com.bridgelabz.bookstore.dto.RegisterDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String phNo;
    private String email;
    private String password;

    @OneToMany(mappedBy = "userCart")
    private List<Book> cart = new ArrayList<>();

    @OneToMany(mappedBy = "userOrderHistory")
    private List<Book> orderHistory = new ArrayList<>();

    public User(RegisterDTO registerDTO) {
        this.name = registerDTO.getName();
        this.phNo = registerDTO.getPhNo();
        this.email = registerDTO.getEmail();
    }
}
