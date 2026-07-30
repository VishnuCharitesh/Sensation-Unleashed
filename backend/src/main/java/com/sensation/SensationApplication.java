package com.sensation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SensationApplication {
    public static void main(String[] args) {
        SpringApplication.run(SensationApplication.class, args);
    }
}
