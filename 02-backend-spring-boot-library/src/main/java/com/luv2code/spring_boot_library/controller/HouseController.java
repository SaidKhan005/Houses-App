package com.luv2code.spring_boot_library.controller;

import com.luv2code.spring_boot_library.Entity.House;
import com.luv2code.spring_boot_library.service.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/houses")
public class HouseController {

    private HouseService houseService;

    @Autowired
    public HouseController(HouseService houseService) {
        this.houseService = houseService;
    }


    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount() {
        String userEmail = "testuser@email.com";
        return houseService.currentReserveCount(userEmail);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutHouseByUser(@RequestParam Long houseId) {
        String userEmail = "testuser@email.com";
        return HouseService.checkoutHouseByUser(userEmail,houseId);
    }

    @PutMapping("/secure/checkout")
    public House checkoutHouse(@RequestParam Long houseId) throws Exception {
        String userEmail = "testuser@email.com";
        return houseService.checkoutHouse(userEmail, houseId);
    }
}