import HouseModel from "./HouseModel";

class ShelfCurrentLoans {
    house: HouseModel;
    daysLeft: number;

    constructor(house:  HouseModel, daysLeft: number) {
        this.house = house;
        this.daysLeft = daysLeft;
    }
}

export default ShelfCurrentLoans;