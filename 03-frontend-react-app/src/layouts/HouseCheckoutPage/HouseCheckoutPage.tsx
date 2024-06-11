import { useEffect, useState } from "react";
import HouseModel from "../../models/HouseModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";
import ReviewRequestModel from "../../models/ReviewRequestModel";

export const HouseCheckoutPage = () => {
    
    
    const { authState } = useOktaAuth();

    const houseId = (window.location.pathname).split('/')[2];

    // House Description states
    const [house, setHouse] = useState<HouseModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Review State
    const [reviews, setReviews] = useState<ReviewModel[]>([])
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);
    
    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

    // Loans Count State
    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);

    // House checked out state
    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [isLoadingCurrentCheckOut, setIsLoadingCheckOut] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/houses/${houseId}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const loadedBook: HouseModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img,
            };

            setHouse(loadedBook);
            setIsLoading(false);
        };
        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [isCheckedOut]);

    //use effect for reviews for books api
    useEffect(() => {
        const fetchHouseReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${houseId}`;

            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJsonReviews = await responseReviews.json();

            const responseData = responseJsonReviews._embedded.reviews;

            const loadedReviews: ReviewModel[] = [];

            let weightedStarReviews: number = 0; //total number of reviews

            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    book_id: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription,
                });
                weightedStarReviews = weightedStarReviews + responseData[key].rating;
            }

            if (loadedReviews) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1); //round the total reviews for each house to .5's
                setTotalStars(Number(round)); 
            }

            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };

        fetchHouseReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    }, [isReviewLeft]);

    //  use effect for review for particular user
    useEffect(() => {
        const fetchUserReviewBook = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/reviews/secure/user/house/?houseId=${houseId}`; // returns true or false depending on whether user has left a review
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const userReview = await fetch(url, requestOptions);
                if (!userReview.ok) {
                    throw new Error('Something went wrong');
                }
                const userReviewResponseJson = await userReview.json();
                setIsReviewLeft(userReviewResponseJson);
            }
            setIsLoadingUserReview(false);
        }
        fetchUserReviewBook().catch((error: any) => {
            setIsLoadingUserReview(false);
            setHttpError(error.message);
        })
    }, [authState]);


    // use effect for loans count
    useEffect(() => {
        const fetchUserCurrentLoansCount = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/houses/secure/currentloans/count`;
                const requestOptions = {
                    method: 'GET',
                    headers: { 
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                     }
                };
                const currentLoansCountResponse = await fetch(url, requestOptions);
                if (!currentLoansCountResponse.ok)  {
                    throw new Error('Something went wrong!');
                }
                const currentLoansCountResponseJson = await currentLoansCountResponse.json();
                setCurrentLoansCount(currentLoansCountResponseJson);
            }
            setIsLoadingCurrentLoansCount(false);
        }
        fetchUserCurrentLoansCount().catch((error: any) => {
            setIsLoadingCurrentLoansCount(false);
            setHttpError(error.message);
        })
    }, [authState, isCheckedOut]);



    useEffect(() => {
        const fetchUserCheckedOutHouse = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/houses/secure/ischeckedout/byuser/?houseId=${houseId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const houseCheckedOut = await fetch(url, requestOptions);

                if (!houseCheckedOut.ok) {
                    throw new Error('Something went wrong!');
                }

                const houseCheckedOutResponseJson = await houseCheckedOut.json();
                setIsCheckedOut(houseCheckedOutResponseJson);
            }
            setIsLoadingCheckOut(false);
        }
        fetchUserCheckedOutHouse().catch((error: any) => {
            setIsLoadingCheckOut(false);
            setHttpError(error.message);
        })
    }, [authState]);

    if (isLoading || isLoadingReview || isLoadingCurrentLoansCount || isLoadingCurrentCheckOut || isLoadingUserReview) { // makes sure that all fetch api's are complete before we go and render the react appilcation
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    async function checkoutHouse() {
        const url = `http://localhost:8080/api/houses/secure/checkout/?houseId=${house?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const checkoutResponse = await fetch(url, requestOptions);
        if (!checkoutResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setIsCheckedOut(true);
    }

    async function submitReview(starInput: number, reviewDescription: string) {
        let houseId: number = 0;
        if (house?.id) {
            houseId = house.id;
        }

        const reviewRequestModel = new ReviewRequestModel(starInput, houseId, reviewDescription);
        const url = `http://localhost:8080/api/reviews/secure`;
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewRequestModel)
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setIsReviewLeft(true);
    }

    return (
        <div>
            <div className='container d-none d-lg-block'>
                <div className='row mt-5'>
                    <div className='col-sm-2 col-md-2'>
                        {house?.img ?
                            <img src={house?.img} width='226' height='349' alt='house' />
                            :
                            <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                                height='349' alt='house' />
                        }
                    </div>
                    <div className='col-4 col-md-4 container'>
                        <div className='ml-2'>
                            <h2>{house?.title}</h2>
                            <h5 className='text-primary'>{house?.author}</h5>
                            <p className='lead'>{house?.description}</p>
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox house={house} mobile={false}  currentLoansCount={currentLoansCount}
                                            isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut}
                                            checkOutHouse={checkoutHouse} isReviewLeft= {isReviewLeft} submitReview={submitReview}/>
                </div>
                <hr />
                <LatestReviews reviews = {reviews} houseId = {house?.id} mobile = {false}/>
            </div>

            {/**mobile */}
            <div className='container d-lg-none mt-5'>
                <div className='d-flex justify-content-center align-items-center'>
                    {house?.img ?
                        <img src={house?.img} width='226' height='349' alt='house' />
                        :
                        <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                            height='349' alt='house' />
                    }
                </div>
                <div className='mt-4'>
                    <div className='ml-2'>
                        <h2>{house?.title}</h2>
                        <h5 className='text-primary'>{house?.author}</h5>
                        <p className='lead'>{house?.description}</p>
                        <StarsReview rating={totalStars} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox house={house} mobile={true} currentLoansCount={currentLoansCount}
                                        isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut}
                                        checkOutHouse={checkoutHouse} isReviewLeft= {isReviewLeft} submitReview={submitReview}/>
                <hr />
                <LatestReviews reviews = {reviews} houseId = {house?.id} mobile = {true}/>
            </div>
        </div>
    );
}