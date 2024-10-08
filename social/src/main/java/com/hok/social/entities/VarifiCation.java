package com.hok.social.entities;

import jakarta.persistence.Entity;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class VarifiCation {
    private boolean status = false;
    private LocalDateTime started_at;
    private LocalDateTime ends_at;
    private String plan_type;
}
