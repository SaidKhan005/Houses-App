import { ReturnHomes } from "./ReturnHomes";
import { useEffect, useState } from "react";
import HouseModel from "../../../models/HouseModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";

export const Carousel = () => {

    const [Houses, setHouses] = useState<HouseModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchHouses = async () => {
            const baseUrl: string = "http://localhost:8080/api/houses";

            const url: string = `${baseUrl}?page=0&size=9`; /*this dictates us getting 9 items from the api*/

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.houses;

            const loadedHouses: HouseModel[] = [];

            for (const key in responseData) {
                loadedHouses.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    landLord: responseData[key].author,
                    description: responseData[key].description,
                    viewingSlots: responseData[key].copies,
                    viewingSlotsAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img,
                });
            }

            setHouses(loadedHouses);
            setIsLoading(false);

        };
        fetchHouses().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading/>
        )
    };

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    };

    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Find your next "I love this place" Home.</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {
                                Houses.slice(0, 3).map(home => (
                                    <ReturnHomes home={home} key={home.id} />
                                ))
                            }
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {
                                Houses.slice(3, 6).map(home => (
                                    <ReturnHomes home={home} key={home.id} />
                                ))
                            }

                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {
                                Houses.slice(6, 9).map(home => (
                                    <ReturnHomes home={home} key={home.id} />
                                ))
                            }
                        </div>
                    </div>
                    <button className='carousel-control-prev' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>
            </div>

            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                <ReturnHomes home={Houses[7]} key={Houses[7].id}/>
                </div>
            </div>
            <div className='homepage-carousel-title mt-3'>
                <Link className='btn btn-outline-secondary btn-lg' to='/search'>View More</Link>
            </div>
        </div>
    );
}