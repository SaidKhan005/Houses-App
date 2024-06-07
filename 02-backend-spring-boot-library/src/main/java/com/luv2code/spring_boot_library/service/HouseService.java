package com.luv2code.spring_boot_library.service;

import com.luv2code.spring_boot_library.Entity.Checkout;
import com.luv2code.spring_boot_library.Entity.House;
import com.luv2code.spring_boot_library.dao.HouseRepository;
import com.luv2code.spring_boot_library.dao.CheckoutRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class HouseService {

    private HouseRepository houseRepository;
    private static CheckoutRepository checkoutRepository;

    // constructor dependancy injection
    public HouseService(HouseRepository houseRepository, CheckoutRepository checkoutRepository
    ) {
        this.houseRepository = houseRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public House checkoutHouse(String userEmail, Long bookId) throws Exception {

        // when you call a database u return an optional of the entity
        Optional<House> house = houseRepository.findById(bookId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if (!house.isPresent() || validateCheckout != null || house.get().getCopiesAvailable() <= 0) {
            throw new Exception("Book doesn't exist or already checked out by user");
        }

        house.get().setCopiesAvailable(house.get().getCopiesAvailable() - 1);
        houseRepository.save(house.get());

        // creating checkout object to save into database
        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                house.get().getId()
        );

        checkoutRepository.save(checkout);

        return house.get();
    }

    public static Boolean checkoutHouseByUser(String userEmail, Long bookId) {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (validateCheckout != null) {
            return true;
        } else {
            return false;
        }

    }

    public int currentReserveCount (String userEmail){
        return checkoutRepository.findHouseByUserEmail(userEmail).size();
    }


}