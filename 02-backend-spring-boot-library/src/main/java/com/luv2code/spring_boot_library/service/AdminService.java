package com.luv2code.spring_boot_library.service;

import com.luv2code.spring_boot_library.Entity.House;
import com.luv2code.spring_boot_library.dao.CheckoutRepository;
import com.luv2code.spring_boot_library.dao.HouseRepository;
import com.luv2code.spring_boot_library.dao.ReviewRepository;
import com.luv2code.spring_boot_library.requestmodels.AddHouseRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AdminService {

    private HouseRepository houseRepository;
    private ReviewRepository reviewRepository;
    private CheckoutRepository checkoutRepository;

    public AdminService(HouseRepository houseRepository,
                        ReviewRepository reviewRepository,
                        CheckoutRepository checkoutRepository) {
        this.houseRepository = houseRepository;
        this.reviewRepository = reviewRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public void increaseHouseQuantity(Long houseId) throws Exception {

        Optional<House> house = houseRepository.findById(houseId);

        if (!house.isPresent()) {
            throw new Exception("House not found");
        }

        house.get().setViewingSlotsAvailable(house.get().getViewingSlotsAvailable() + 1);
        house.get().setViewingSlots(house.get().getViewingSlots() + 1);

        houseRepository.save(house.get());
    }

    public void decreaseHouseQuantity(Long houseId) throws Exception {

        Optional<House> house = houseRepository.findById(houseId);

        if (!house.isPresent() || house.get().getViewingSlotsAvailable() <= 0 || house.get().getViewingSlots() <= 0) {
            throw new Exception("house not found or quantity locked");
        }

        house.get().setViewingSlotsAvailable(house.get().getViewingSlotsAvailable() - 1);
        house.get().setViewingSlots(house.get().getViewingSlots() - 1);

        houseRepository.save(house.get());
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

    public void deleteHouse(Long houseId) throws Exception {

        Optional<House> house = houseRepository.findById(houseId);

        if (!house.isPresent()) {
            throw new Exception("house not found");
        }

        houseRepository.delete(house.get());
        checkoutRepository.deleteAllByHouseId(houseId);
        reviewRepository.deleteAllByHouseId(houseId);
    }
}
