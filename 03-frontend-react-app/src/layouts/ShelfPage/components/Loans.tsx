import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";
import { LoansModal } from "./LoansModal";

export const Loans = () => {

    const { authState } = useOktaAuth();
    const [httpError, setHttpError] = useState(null);

    // Current Loans
    const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
    const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);
    const [checkout, setCheckout] = useState(false);

    useEffect(() => {
        const fetchUserCurrentLoans = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/houses/secure/currentbooked`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const shelfCurrentBookedResponse = await fetch(url, requestOptions);
                if (!shelfCurrentBookedResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const shelfCurrentLoansResponseJson = await shelfCurrentBookedResponse.json();
                setShelfCurrentLoans(shelfCurrentLoansResponseJson);
            }
            setIsLoadingUserLoans(false);
        }
        fetchUserCurrentLoans().catch((error: any) => {
            setIsLoadingUserLoans(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [authState, checkout]);

    if (isLoadingUserLoans) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>
                    {httpError}
                </p>
            </div>
        );
    }

    async function returnViewingSlot(houseId: number) {
        const url = `http://localhost:8080/api/houses/secure/return/?houseId=${houseId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setCheckout(!checkout);
    }

    async function renewViewingSlot(houseId: number) {
        const url = `http://localhost:8080/api/houses/secure/renew/reservation/?houseId=${houseId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setCheckout(!checkout);
    }

    return (
        <div>
            {/* Desktop */}
            <div className='d-none d-lg-block mt-2'>
                {shelfCurrentLoans.length > 0 ?
                    <>
                        <h5>Current Houses Booked: </h5>

                        {shelfCurrentLoans.map(shelfCurrentLoan => (
                            <div key={shelfCurrentLoan.house.id}>
                                <div className='row mt-3 mb-3'>
                                    <div className='col-4 col-md-4 container'>
                                        {shelfCurrentLoan.house?.img ?
                                            <img src={shelfCurrentLoan.house?.img} width='226' height='349' alt='Book' />
                                            :
                                            <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                                                width='226' height='349' alt='Book' />
                                        }
                                    </div>
                                    <div className='card col-3 col-md-3 container d-flex'>
                                        <div className='card-body'>
                                            <div className='mt-3'>
                                                <h4>Reservation Options</h4>
                                                {shelfCurrentLoan.daysLeft > 0 &&
                                                    <p className='text-secondary'>
                                                       Viewing Due in {shelfCurrentLoan.daysLeft} days.
                                                    </p>
                                                }
                                                {shelfCurrentLoan.daysLeft === 0 &&
                                                    <p className='text-success'>
                                                        Viewing Due Today.
                                                    </p>
                                                }
                                                {shelfCurrentLoan.daysLeft < 0 &&
                                                    <p className='text-danger'>
                                                        Viewing Past due by {shelfCurrentLoan.daysLeft} days.
                                                    </p>
                                                }
                                                <div className='list-group mt-3'>
                                                    <button className='list-group-item list-group-item-action'
                                                        aria-current='true' data-bs-toggle='modal'
                                                        data-bs-target={`#modal${shelfCurrentLoan.house.id}`}>
                                                        Manage Reservation
                                                    </button>
                                                    <Link to={'search'} className='list-group-item list-group-item-action'>
                                                        Search more Houses?
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr />
                                            <p className='mt-3'>
                                                Help other find their home by reviewing your Viewing.
                                            </p>
                                            <Link className='btn btn-primary' to={`/checkout/${shelfCurrentLoan.house.id}`}>
                                                Leave a review
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <LoansModal shelfCurrentLoan={shelfCurrentLoan} mobile={false} returnViewingSlot={returnViewingSlot}
                                    renewViewingSlot={renewViewingSlot} />
                            </div>
                        ))}
                    </> :
                    <>
                        <h3 className='mt-3'>
                            Currently no Reservations
                        </h3>
                        <Link className='btn btn-primary' to={`search`}>
                            Search for a new House
                        </Link>
                    </>
                }
            </div>

            {/* Mobile */}
            <div className='container d-lg-none mt-2'>
                {shelfCurrentLoans.length > 0 ?
                    <>
                        <h5 className='mb-3'>Current Reservations: </h5>

                        {shelfCurrentLoans.map(shelfCurrentLoan => (
                            <div key={shelfCurrentLoan.house.id}>
                                <div className='d-flex justify-content-center align-items-center'>
                                    {shelfCurrentLoan.house?.img ?
                                        <img src={shelfCurrentLoan.house?.img} width='226' height='349' alt='Book' />
                                        :
                                        <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                                            width='226' height='349' alt='Book' />
                                    }
                                </div>
                                <div className='card d-flex mt-5 mb-3'>
                                    <div className='card-body container'>
                                        <div className='mt-3'>
                                            <h4>Loan Options</h4>
                                            {shelfCurrentLoan.daysLeft > 0 &&
                                                <p className='text-secondary'>
                                                    Viewing Due in {shelfCurrentLoan.daysLeft} days.
                                                </p>
                                            }
                                            {shelfCurrentLoan.daysLeft === 0 &&
                                                <p className='text-success'>
                                                    Viewing Due Today.
                                                </p>
                                            }
                                            {shelfCurrentLoan.daysLeft < 0 &&
                                                <p className='text-danger'>
                                                    Viewing Past due by {shelfCurrentLoan.daysLeft} days.
                                                </p>
                                            }
                                            <div className='list-group mt-3'>
                                                <button className='list-group-item list-group-item-action'
                                                    aria-current='true' data-bs-toggle='modal'
                                                    data-bs-target={`#mobilemodal${shelfCurrentLoan.house.id}`}>
                                                    Manage Reservation
                                                </button>
                                                <Link to={'search'} className='list-group-item list-group-item-action'>
                                                    Search more houses?
                                                </Link>
                                            </div>
                                        </div>
                                        <hr />
                                        <p className='mt-3'>
                                            Help other find their Home by reviewing your viewing.
                                        </p>
                                        <Link className='btn btn-primary' to={`/checkout/${shelfCurrentLoan.house.id}`}>
                                            Leave a review
                                        </Link>
                                    </div>
                                </div>

                                <hr />
                                <LoansModal shelfCurrentLoan={shelfCurrentLoan} mobile={true} returnViewingSlot={returnViewingSlot}
                                    renewViewingSlot={renewViewingSlot} />
                            </div>
                        ))}
                    </> :
                    <>
                        <h3 className='mt-3'>
                            Currently no Reservations
                        </h3>
                        <Link className='btn btn-primary' to={`search`}>
                            Search for a new House
                        </Link>
                    </>
                }
            </div>
        </div>
    );
}