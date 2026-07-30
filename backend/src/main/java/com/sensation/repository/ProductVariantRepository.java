package com.sensation.repository;

import com.sensation.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ProductVariantRepository extends JpaRepository<ProductVariant, UUID> {
}
