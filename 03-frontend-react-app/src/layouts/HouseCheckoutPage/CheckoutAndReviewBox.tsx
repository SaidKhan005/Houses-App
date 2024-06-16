import { Link } from "react-router-dom";
import HouseModel from "../../models/HouseModel";
import { LeaveAReview } from "../Utils/LeaveAReview";

export const CheckoutAndReviewBox: React.FC<{
    house: HouseModel | undefined, mobile: boolean,
    currentLoansCount: number, isAuthenticated: any, isCheckedOut: boolean
    checkOutHouse: any, isReviewLeft: boolean, submitReview: any
    }> = (props) => {


    function buttonRender() {
        if (props.isAuthenticated) {
            if (!props.isCheckedOut && props.currentLoansCount < 5) {
                return (<button onClick={() => props.checkOutHouse()} className='btn btn-success btn-lg'>Book Viewing</button>)
            } else if (props.isCheckedOut) {
                return (<p><b>House Booked. Enjoy!</b></p>)
            } else if (!props.isCheckedOut) {
                return (<p className='text-danger'>Too many Houses booked.</p>)
            }
        }
        return (<Link to={'/login'} className='btn btn-success btn-lg'>Sign in</Link>)
    }

    function reviewRender() {
        if (props.isAuthenticated && !props.isReviewLeft) {
            return(
            <p>
                <LeaveAReview submitReview={props.submitReview}/>
            </p>
            )
        } else if (props.isAuthenticated && props.isReviewLeft) {
            return(
            <p>
                <b>Thank you for your review!</b>
            </p>
            )
        }
        return (
        <div>
            <hr/>
            <p>Sign in to be able to leave a review.</p>
        </div>
        )
    }

    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>{props.currentLoansCount}/5 </b>
                        Houses Reserved for viewing
                    </p>
                    <hr />
                    {props.house && props.house.viewingSlotsAvailable && props.house.viewingSlotsAvailable > 0 ?
                        <h4 className='text-success'>
                            Available
                        </h4>
                        :
                        <h4 className='text-danger'>
                            Wait List
                        </h4>
                    }
                    <div className='row'>
                        <p className='col-6 lead'>
                            <b>{props.house?.viewingSlots} </b>
                            Total Slots
                        </p>
                        <p className='col-6 lead'>
                            <b>{props.house?.viewingSlotsAvailable} </b>
                            Available
                        </p>
                    </div>
                </div>
                {buttonRender()}
                <hr />
                <p className='mt-3'>
                    This number can change until reservation has been complete.
                </p>
                <p>
                {reviewRender()}
                </p>
            </div>
        </div>
    );
}