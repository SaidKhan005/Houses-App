package com.luv2code.spring_boot_library.requestmodels;

import lombok.Data;

@Data
public class AddHouseRequest {

    private String title;

    private String LandLord;

    private String description;

    private int viewingSlots;

    private String category;

    private String img;

}
