package com.bridgelabz.bookstore.repository;

import com.bridgelabz.bookstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "select * from user where email = ?", nativeQuery = true)
    User findByEmail(String email);
}
