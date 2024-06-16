import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchHomesPage } from './layouts/SearchHousesPage/SearchHomesPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { HouseCheckoutPage } from './layouts/HouseCheckoutPage/HouseCheckoutPage';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewListPage } from './layouts/HouseCheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './layouts/ShelfPage/ShelfPage';
import { MessagesPage } from './layouts/MessagesPage/messagesPage';
import { ManageHousesPage } from './layouts/ManageHousesPage/ManageHousesPage';




const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {

  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };


  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Navbar />
        <div className='flex-grow-1'>

          <Switch>

            <Route path='/' exact={true}>
              <Redirect to='/home' />
            </Route>

            <Route path='/home'>
              <HomePage />
            </Route>

            <Route path='/search'>
              <SearchHomesPage />
            </Route>

            <Route path='/reviewList/:bookId'>
              <ReviewListPage />
            </Route>

            <Route path='/checkout/:bookId'>
              <HouseCheckoutPage />
            </Route>

            <Route path='/login' render={
              () => <LoginWidget config={oktaConfig} />
            } />
            <Route path='/login/callback' component={LoginCallback}
            />

            <SecureRoute path='/shelf'> <ShelfPage /> </SecureRoute>

            <SecureRoute path='/messages'> <MessagesPage/> </SecureRoute>
            <SecureRoute path='/admin'> <ManageHousesPage/> </SecureRoute>


          </Switch>

        </div>
        <Footer />
      </Security>
    </div>
  );
}