package com.luv2code.spring_boot_library.dao;


import com.luv2code.spring_boot_library.Entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    Checkout findByUserEmailAndBookId(String userEmail, Long bookId);
    List<Checkout> findHouseByUserEmail(String userEmail);

    @Modifying
    @Query("delete from Checkout where book_id in :house_id")
    void deleteAllByHouseId(@Param("house_id") Long houseId);
}