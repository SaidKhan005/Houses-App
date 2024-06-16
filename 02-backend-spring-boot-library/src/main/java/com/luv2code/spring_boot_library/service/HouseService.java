package com.luv2code.spring_boot_library.service;

import com.luv2code.spring_boot_library.Entity.Checkout;
import com.luv2code.spring_boot_library.Entity.History;
import com.luv2code.spring_boot_library.Entity.House;
import com.luv2code.spring_boot_library.dao.HistoryRepository;
import com.luv2code.spring_boot_library.dao.HouseRepository;
import com.luv2code.spring_boot_library.dao.CheckoutRepository;
import com.luv2code.spring_boot_library.responsemodels.ShelfCurrentBookedResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class HouseService {

    private HouseRepository houseRepository;
    private static CheckoutRepository checkoutRepository;
    private HistoryRepository historyrepository;

    // constructor dependancy injection
    public HouseService(HouseRepository houseRepository, CheckoutRepository checkoutRepository, HistoryRepository historyrepository
    ) {
        this.houseRepository = houseRepository;
        this.checkoutRepository = checkoutRepository;
        this.historyrepository = historyrepository;
    }

    public House checkoutHouse(String userEmail, Long bookId) throws Exception {

        // when you call a database u return an optional of the entity
        Optional<House> house = houseRepository.findById(bookId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if (!house.isPresent() || validateCheckout != null || house.get().getViewingSlotsAvailable() <= 0) {
            throw new Exception("Book doesn't exist or already checked out by user");
        }

        house.get().setViewingSlotsAvailable(house.get().getViewingSlotsAvailable() - 1);
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

    public List<ShelfCurrentBookedResponse> currentLoans(String userEmail) throws Exception {

        List<ShelfCurrentBookedResponse> shelfCurrentLoansResponses = new ArrayList<>();

        List<Checkout> checkoutList = checkoutRepository.findHouseByUserEmail(userEmail);
        List<Long> houseIdList = new ArrayList<>();

        for (Checkout i: checkoutList) {
            houseIdList.add(i.getBookId());
        }

        List<House> houses = houseRepository.findHousesByHouseIds(houseIdList);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        for (House house : houses) {
            Optional<Checkout> checkout = checkoutList.stream()
                    .filter(x -> x.getBookId() == house.getId()).findFirst();

            if (checkout.isPresent()) {

                Date d1 = sdf.parse(checkout.get().getReturnDate());
                Date d2 = sdf.parse(LocalDate.now().toString());

                TimeUnit time = TimeUnit.DAYS;

                long difference_In_Time = time.convert(d1.getTime() - d2.getTime(),
                        TimeUnit.MILLISECONDS);

                shelfCurrentLoansResponses.add(new ShelfCurrentBookedResponse(house, (int) difference_In_Time));
            }
        }
        return shelfCurrentLoansResponses;
    }
    public void returnHouseReservation(String userEmail, Long bookId) throws Exception {

        Optional<House> book = houseRepository.findById(bookId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if (!book.isPresent() || validateCheckout == null) {
            throw new Exception("Book does not exist or not checked out by user");
        }

        book.get().setViewingSlotsAvailable(book.get().getViewingSlotsAvailable() + 1);

        houseRepository.save(book.get());
        checkoutRepository.deleteById(validateCheckout.getId());

        History history = new History(
                userEmail,
                validateCheckout.getCheckoutDate(),
                LocalDate.now().toString(),
                book.get().getTitle(),
                book.get().getLandLord(),
                book.get().getDescription(),
                book.get().getImg()
        );

        historyrepository.save(history);
    }

    public void renewReservation(String userEmail, Long houseId) throws Exception {

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, houseId);

        if (validateCheckout == null) {
            throw new Exception("house does not exist or not checked out by user");
        }

        SimpleDateFormat sdFormat = new SimpleDateFormat("yyyy-MM-dd");

        Date d1 = sdFormat.parse(validateCheckout.getReturnDate());
        Date d2 = sdFormat.parse(LocalDate.now().toString());

        if (d1.compareTo(d2) > 0 || d1.compareTo(d2) == 0) {
            validateCheckout.setReturnDate(LocalDate.now().plusDays(7).toString());
            checkoutRepository.save(validateCheckout);
        }
    }
}