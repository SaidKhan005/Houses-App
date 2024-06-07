import React from "react";

export const ReturnHomes = () => {
    return (
            <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
                <div className='text-center'>
                    <img
                        src={require('./../../../Images/BooksImages/22212771_1_lg.jpg')}
                        width='151'
                        height='233'
                        alt="book"
                    />
                    <h6 className='mt-2'>Destination</h6>
                    <p>Home</p>
                    <a className='btn main-color text-white' href='#'>Reserve Viewing</a>
                </div>
            </div>
    );
}