import React from "react";
import HouseModel from "../../../models/HouseModel";
import { Link } from "react-router-dom";

export const ReturnHomes: React.FC<{home: HouseModel}> = (props) =>{
    return (
            <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
                <div className='text-center'>
                    {props.home.img ? 
                        <img                        
                        src={props.home.img}
                        width='151'
                        height='233'
                        alt="home"
                        />
                        :
                        <img
                        src={require('./../../../Images/BooksImages/22212771_1_lg.jpg')}
                        width='151'
                        height='233'
                        alt="home"
                    />
                    }

                    <h6 className='mt-2'>{props.home.title}</h6>
                    <p>{props.home.landLord}</p>
                    <Link className='btn main-color text-white' to={`/checkout/${props.home.id}`}>Reserve Viewing</Link>
                </div>
            </div>
    );
}