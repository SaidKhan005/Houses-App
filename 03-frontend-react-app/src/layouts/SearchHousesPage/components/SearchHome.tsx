import { Link } from "react-router-dom";
import HouseModel from "../../../models/HouseModel";

export const SearchHome: React.FC<{ house: HouseModel }> = (props) => {
    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        {props.house.img ?
                            <img src={props.house.img}
                                width='123'
                                height='196'
                                alt='house'
                            />
                            :
                            <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')}
                                width='123'
                                height='196'
                                alt='house'
                            />
                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center 
                        align-items-center'>
                        {props.house.img ?
                            <img src={props.house.img}
                                width='123'
                                height='196'
                                alt='house'
                            />
                            :
                            <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')}
                                width='123'
                                height='196'
                                alt='house'
                            />
                        }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {props.house.author}
                        </h5>
                        <h4>
                            {props.house.title}
                        </h4>
                        <p className='card-text'>
                            {props.house.description}
                        </p>
                    </div>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    <Link className='btn btn-md main-color text-white' to={`/checkout/${props.house.id}`}>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}