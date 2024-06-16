package com.luv2code.spring_boot_library.dao;

import com.luv2code.spring_boot_library.Entity.House;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface HouseRepository extends JpaRepository <House,Long> {
        Page<House> findByTitleContaining (@RequestParam("title") String title, Pageable pageable);

        Page<House> findByCategory (@RequestParam("category") String category, Pageable pageable);

        @Query("select o from House o where id in :house_ids")
        List<House> findHousesByHouseIds(@Param("house_ids") List<Long> houseId);
}
