package com.luv2code.spring_boot_library.dao;

import com.luv2code.spring_boot_library.Entity.House;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface HouseRepository extends JpaRepository <House,Long> {
        Page<House> findByTitleContaining (@RequestParam("title") String title, Pageable pageable);
        Page<House> findByCategory (@RequestParam("category") String category, Pageable pageable);

}
