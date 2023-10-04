package com.bridgelabz.bookstore.entity;

import com.bridgelabz.bookstore.dto.BookDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import com.bridgelabz.bookstore.entity.User;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private float price;
    private String description;
    private String category;
    private String image;
    @ManyToOne
    @JoinColumn(name = "user_cart_id")
    private User userCart;

    @ManyToOne
    @JoinColumn(name = "user_order_history_id")
    private User userOrderHistory;
    public Book(BookDTO bookDTO) {
        this.title = bookDTO.getTitle();
        this.price = bookDTO.getPrice();
        this.description = bookDTO.getDescription();
        this.category = bookDTO.getCategory();
        this.image = bookDTO.getImage();
    }
}
