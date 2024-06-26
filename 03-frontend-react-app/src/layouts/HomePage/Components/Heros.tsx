import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const Heros = () => {

    const { authState } = useOktaAuth();

    return (
        <div>
            <div className='d-none d-lg-block'>
                <div className='row g-0 mt-5'>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-left'></div>
                    </div>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Where Have you been Before?</h1>
                            <p className='lead'>
                                The Home Buddy team would love to know More about you.
                                Tell us about your living experience/ rental experience,
                                we would love to hear your feedback about your home owners / home renters and any reccomendations!
                            </p>
                            {authState?.isAuthenticated ?
                                <Link type='button' className='btn main-color btn-lg text-white'
                                    to='search'>Explore top Houses </Link>
                                :
                                <Link className='btn main-color btn-lg text-white' to='/login'>Sign up</Link>
                            }
                        </div>
                    </div>
                </div>
                <div className='row g-0'>
                    <div className='col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                                Try to check in daily as our collection is always changing!
                                We work nonstop to provide the most accurate House selection possible
                                for our Home buddy members! We are diligent and our Members's Home's are always going to be our
                                top priority.
                            </p>
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-right'></div>
                    </div>
                </div>
            </div>

            {/* Mobile Heros */}
            <div className='d-lg-none'>
                <div className='container'>
                    <div className='m-2'>
                        <div className='col-image-left'></div>
                        <div className='mt-2'>
                            <h1>Where Have you been Before?</h1>
                            <p className='lead'>
                                The Home Buddy team would love to know More about you.
                                Tell us about your living experience/ rental experience,
                                we would love to hear your feedback about your home owners / home renters and any reccomendations!
                            </p>
                            {authState?.isAuthenticated ?
                                <Link type='button' className='btn main-color btn-lg text-white'
                                    to='search'>Explore top Homes</Link>
                                :
                                <Link className='btn main-color btn-lg text-white' to='/login'>Sign up</Link>
                            }
                        </div>
                    </div>
                    <div className='m-2'>
                        <div className='col-image-right'></div>
                        <div className='mt-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                                Try to check in daily as our collection is always changing!
                                We work nonstop to provide the most accurate House selection possible
                                for our Home buddy members! We are diligent and our Members's Home's are always going to be our
                                top priority.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}