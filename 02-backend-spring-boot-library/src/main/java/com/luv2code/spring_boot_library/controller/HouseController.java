package com.luv2code.spring_boot_library.controller;

import com.luv2code.spring_boot_library.Entity.House;
import com.luv2code.spring_boot_library.Utils.ExtractJwt;
import com.luv2code.spring_boot_library.responsemodels.ShelfCurrentBookedResponse;
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

    @GetMapping("/secure/currentbooked")
    public List<ShelfCurrentBookedResponse> currentBooked(@RequestHeader(value = "Authorization") String token)
            throws Exception
    {
        String userEmail = ExtractJwt.payloadJWTExtraction(token, "\"sub\"");
        return houseService.currentLoans(userEmail);
    }

    //Request Header takes key as authorization and value as token from Jwt body
    @GetMapping("/secure/currentloans/count")
    public int currentBookedCount(@RequestHeader(value = "Authorization") String token) {
        String userEmail = ExtractJwt.payloadJWTExtraction(token,"\"sub\"");
        return houseService.currentReserveCount(userEmail);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutHouseByUser(@RequestHeader(value = "Authorization") String token,
                                       @RequestParam Long houseId) {
        String userEmail = ExtractJwt.payloadJWTExtraction(token, "\"sub\"");
        return HouseService.checkoutHouseByUser(userEmail,houseId);
    }

    @PutMapping("/secure/checkout")
    public House checkoutHouse(@RequestHeader(value = "Authorization") String token,
                               @RequestParam Long houseId) throws Exception {
        String userEmail = ExtractJwt.payloadJWTExtraction(token, "\"sub\"");
        return houseService.checkoutHouse(userEmail, houseId);
    }

    @PutMapping("/secure/return")
    public void returnViewingSlot(@RequestHeader(value = "Authorization") String token,
                           @RequestParam Long houseId) throws Exception {
        String userEmail = ExtractJwt.payloadJWTExtraction(token, "\"sub\"");
        houseService.returnHouseReservation(userEmail, houseId);
    }

    @PutMapping("/secure/renew/reservation")
    public void renewViewingSlot(@RequestHeader(value = "Authorization") String token,
                          @RequestParam Long houseId) throws Exception {
        String userEmail = ExtractJwt.payloadJWTExtraction(token, "\"sub\"");
        houseService.renewReservation(userEmail, houseId);
    }

}