package com.luv2code.spring_boot_library.service;

import com.luv2code.spring_boot_library.Entity.House;
import com.luv2code.spring_boot_library.dao.HouseRepository;
import com.luv2code.spring_boot_library.requestmodels.AddHouseRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminService {

    private HouseRepository houseRepository;

    @Autowired
    public AdminService(HouseRepository houseRepository){
        this.houseRepository = houseRepository;
    }

    public void postHouse(AddHouseRequest addHouseRequest) {
        House house = new House();
        house.setTitle(addHouseRequest.getTitle());
        house.setLandLord(addHouseRequest.getLandLord());
        house.setDescription(addHouseRequest.getDescription());
        house.setViewingSlots(addHouseRequest.getViewingSlots());
        house.setViewingSlotsAvailable(addHouseRequest.getViewingSlots());
        house.setCategory(addHouseRequest.getCategory());
        house.setImg(addHouseRequest.getImg());

        houseRepository.save(house);
    }
}
