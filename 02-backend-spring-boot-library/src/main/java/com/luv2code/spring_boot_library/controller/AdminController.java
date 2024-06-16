package com.luv2code.spring_boot_library.controller;




import com.luv2code.spring_boot_library.Utils.ExtractJwt;
import com.luv2code.spring_boot_library.requestmodels.AddHouseRequest;
import com.luv2code.spring_boot_library.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/admin")


public class AdminController {

    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService){
        this.adminService = adminService;
    }

    @PutMapping("/secure/increase/house/quantity")
    public void increaseHouseQuantity(@RequestHeader(value="Authorization") String token,
                                     @RequestParam Long houseId) throws Exception {
        String admin = ExtractJwt.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.increaseHouseQuantity(houseId);
    }


    @PutMapping("/secure/decrease/house/quantity")
    public void decreaseHouseQuantity(@RequestHeader(value="Authorization") String token,
                                     @RequestParam Long houseId) throws Exception {
        String admin = ExtractJwt.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.decreaseHouseQuantity(houseId);
    }


    @PostMapping("/secure/add/house")
    public void postHouse(@RequestHeader(value="Authorization") String token,
                         @RequestBody AddHouseRequest addHouseRequest) throws Exception {
        String admin = ExtractJwt.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.postHouse(addHouseRequest);
    }

    @DeleteMapping("/secure/delete/house")
    public void deleteHouse(@RequestHeader(value="Authorization") String token,
                           @RequestParam Long houseId) throws Exception {
        String admin = ExtractJwt.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.deleteHouse(houseId);
    }
}

