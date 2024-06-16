import { useEffect, useState } from "react";
import { useOktaAuth } from '@okta/okta-react';
import HouseModel from "../../../models/HouseModel";

export const ChangeQuantityOfHouse: React.FC<{ house: HouseModel, deleteHouse:any }> = (props, key) => {
    
    const { authState } = useOktaAuth();
    const [quantity, setQuantity] = useState<number>(0);
    const [remaining, setRemaining] = useState<number>(0);

    useEffect(() => {
        const fetchHouseInState = () => {
            props.house.viewingSlots ? setQuantity(props.house.viewingSlots) : setQuantity(0);
            props.house.viewingSlotsAvailable ? setRemaining(props.house.viewingSlotsAvailable) : setRemaining(0);
        };
        fetchHouseInState();
    }, []);

    async function increaseSlots() {
        const url = `http://localhost:8080/api/admin/secure/increase/house/quantity/?houseId=${props.house?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if (!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        // call the api and check if it's valid. if valid then quantity has changed in backend.
        // Instead of calling books all over again we just manually change the quantity state like so
        setQuantity(quantity + 1);
        setRemaining(remaining + 1);
    }

    async function decreaseSlots() {
        const url = `http://localhost:8080/api/admin/secure/decrease/house/quantity/?houseId=${props.house?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if (!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setQuantity(quantity - 1);
        setRemaining(remaining - 1);
    }

    async function deleteHouse() {
        const url = `http://localhost:8080/api/admin/secure/delete/house/?houseId=${props.house?.id}`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const updateResponse = await fetch(url, requestOptions);
        if (!updateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        props.deleteHouse();
    }
    
    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        {props.house.img ?
                            <img src={props.house.img} width='123' height='196' alt='House' />
                            :
                            <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} 
                                width='123' height='196' alt='House' />
                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center align-items-center'>
                        {props.house.img ?
                            <img src={props.house.img} width='123' height='196' alt='Book' />
                            :
                            <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} 
                                width='123' height='196' alt='Book' />
                        }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>{props.house.landLord}</h5>
                        <h4>{props.house.title}</h4>
                        <p className='card-text'> {props.house.description} </p>
                    </div>
                </div>
                <div className='mt-3 col-md-4'>
                    <div className='d-flex justify-content-center algin-items-center'>
                        <p>Total slots: <b>{quantity}</b></p>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <p>Houses Remaining: <b>{remaining}</b></p>
                    </div>
                </div>
                <div className='mt-3 col-md-1'>
                    <div className='d-flex justify-content-start'>
                        <button className='m-1 btn btn-md btn-danger' onClick={deleteHouse}>Delete</button>
                    </div>
                </div>
                <button className='m1 btn btn-md main-color text-white' onClick={increaseSlots}>Add Slots</button>
                <button className='m1 btn btn-md btn-warning' onClick={decreaseSlots}>Decrease Slots</button>
            </div>
        </div>
    );
}