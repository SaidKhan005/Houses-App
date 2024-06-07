import { Carousel } from "./Components/Carousel";
import { ExploreTopHomes } from "./Components/ExploreTopHomes";
import { Heros } from "./Components/Heros";
import { RentalServices } from "./Components/RentalServices";

export const HomePage = () =>{
    return(
        <> 
        <ExploreTopHomes />
        <Carousel />
        <Heros />
        <RentalServices />
        </>
    );
}