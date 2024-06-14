import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";


export const LoansModal: React.FC<{ shelfCurrentLoan: ShelfCurrentLoans, mobile: boolean, returnViewingSlot: any,
    renewViewingSlot: any }> = (props) => {


    return (
        <div className='modal fade' id={props.mobile ? `mobilemodal${props.shelfCurrentLoan.house.id}` : 
            `modal${props.shelfCurrentLoan.house.id}`} data-bs-backdrop='static' data-bs-keyboard='false' 
            aria-labelledby='staticBackdropLabel' aria-hidden='true' key={props.shelfCurrentLoan.house.id}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='staticBackdropLabel'>
                                Viewing Options
                            </h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='container'>
                                <div className='mt-3'>
                                    <div className='row'>
                                        <div className='col-2'>
                                            {props.shelfCurrentLoan.house?.img ?
                                                <img src={props.shelfCurrentLoan.house?.img} 
                                                    width='56' height='87' alt='Book'/>
                                                :
                                                <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} 
                                                    width='56' height='87' alt='Book'/>
                                            }
                                        </div>
                                        <div className='col-10'>
                                            <h6>{props.shelfCurrentLoan.house.author}</h6>
                                            <h4>{props.shelfCurrentLoan.house.title}</h4>
                                        </div>
                                    </div>
                                    <hr/>
                                    {props.shelfCurrentLoan.daysLeft > 0 && 
                                        <p className='text-secondary'>
                                           Viewing Due in {props.shelfCurrentLoan.daysLeft} days.
                                        </p>
                                    }
                                    {props.shelfCurrentLoan.daysLeft === 0 && 
                                        <p className='text-success'>
                                             Viewing Due Today.
                                        </p>
                                    }
                                    {props.shelfCurrentLoan.daysLeft < 0 && 
                                        <p className='text-danger'>
                                            Viewing Past due by {props.shelfCurrentLoan.daysLeft} days.
                                        </p>
                                    }
                                    <div className='list-group mt-3'>
                                        <button onClick={() => props.returnViewingSlot(props.shelfCurrentLoan.house.id)} 
                                           data-bs-dismiss='modal' className='list-group-item list-group-item-action' 
                                           aria-current='true'>
                                            Realease Viewing
                                        </button>
                                        <button onClick={
                                            props.shelfCurrentLoan.daysLeft < 0 ? 
                                            (event) => event.preventDefault() 
                                            :
                                            () => props.renewViewingSlot(props.shelfCurrentLoan.house.id)
                                        } 
                                            data-bs-dismiss='modal' 
                                            className={
                                                props.shelfCurrentLoan.daysLeft < 0 ? 
                                                'list-group-item list-group-item-action inactiveLink' : 
                                                'list-group-item list-group-item-action'
                                            }>
                                            {props.shelfCurrentLoan.daysLeft < 0 ? 
                                            'Missed dues cannot be renewed' : 'Renew viewing'    
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    );
}