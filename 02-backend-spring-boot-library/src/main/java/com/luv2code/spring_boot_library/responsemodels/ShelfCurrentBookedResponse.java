// maps server object to client api
package com.luv2code.spring_boot_library.responsemodels;

import com.luv2code.spring_boot_library.Entity.House;
import lombok.Data;

@Data
public class ShelfCurrentBookedResponse {

    public ShelfCurrentBookedResponse(House house, int daysLeft){
        this.house = house;
        this.daysLeft = daysLeft;
    }
    private House house;
    private int daysLeft;
}
