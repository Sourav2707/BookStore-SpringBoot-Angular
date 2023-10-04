package com.bridgelabz.bookstore.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Component;

@Component
public class TokenUtility {
    private static final String TOKEN_SECRET =  "Globe_book_store0";
    public String generateToken(long Id) {
        Algorithm algorithm = Algorithm.HMAC256(TOKEN_SECRET);
        String token = JWT.create().withClaim("Id", Id).sign(algorithm);
        return token;
    }
}
