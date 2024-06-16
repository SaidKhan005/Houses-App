import { useOktaAuth } from '@okta/okta-react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AdminMessages } from './Components/AdminMessages';
import { AddNewHouse } from './Components/AddNewHouse';
import { ChangeQuantityOfHouses } from './Components/ChangeQuantityOfHouses';


export const ManageHousesPage = () => {

    const { authState } = useOktaAuth();

    const [changeQuantityOfSlotsClick, setChangeQuantityOfSlotsClick] = useState(false);
    const [messagesClick, setMessagesClick] = useState(false);

    function addHouseClickFunction() {
        setChangeQuantityOfSlotsClick(false);
        setMessagesClick(false);
    }

    function changeQuantityOfHousesClickFunction() {
        setChangeQuantityOfSlotsClick(true);
        setMessagesClick(false);
    }

    function messagesClickFunction() {
        setChangeQuantityOfSlotsClick(false);
        setMessagesClick(true);
    }

    // check to see if user is an admin for access
    if (authState?.accessToken?.claims.userType === undefined) {
        return <Redirect to='/home'/>
    }

    return (
        <div className='container'>
            <div className='mt-5'>
                <h3>Manage Library</h3>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <button onClick={addHouseClickFunction} className='nav-link active' id='nav-add-book-tab' data-bs-toggle='tab' 
                            data-bs-target='#nav-add-book' type='button' role='tab' aria-controls='nav-add-book' 
                            aria-selected='false'
                        >
                            Add House
                        </button>
                        <button onClick={changeQuantityOfHousesClickFunction} className='nav-link' id='nav-quantity-tab' data-bs-toggle='tab' 
                            data-bs-target='#nav-quantity' type='button' role='tab' aria-controls='nav-quantity' 
                            aria-selected='true'
                        >
                            Manage Houses
                        </button>
                        <button onClick={messagesClickFunction} className='nav-link' id='nav-messages-tab' data-bs-toggle='tab' 
                            data-bs-target='#nav-messages' type='button' role='tab' aria-controls='nav-messages' 
                            aria-selected='false'
                        >
                            Messages
                        </button>
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'> 
                    <div className='tab-pane fade show active' id='nav-add-book' role='tabpanel'
                        aria-labelledby='nav-add-book-tab'>
                            <AddNewHouse/>
                    </div>
                    <div className='tab-pane fade' id='nav-quantity' role='tabpanel' aria-labelledby='nav-quantity-tab'>
                       {changeQuantityOfSlotsClick ? <ChangeQuantityOfHouses/> : <></>}
                    </div>
                    <div className='tab-pane fade' id='nav-messages' role='tabpanel' aria-labelledby='nav-messages-tab'>
                        {messagesClick ? <AdminMessages/> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}