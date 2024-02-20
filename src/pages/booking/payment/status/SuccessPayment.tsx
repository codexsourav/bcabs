import React from 'react';
import { UserWrapper } from '../../../../components/wrapper/UserWrapper';
import { Link } from 'react-router-dom';

const SuccessPayment = () => {

    return (
        <UserWrapper>
            <div className="flex items-center justify-center h-96">
                <div className="bg-white flex justify-center items-center flex-col gap-5">
                    <img src="/images/payment_success_icon.png" alt="Success Icon" className="mx-auto h-16 mb-4" />
                    <h1 className="text-3xl font-bold text-green-600 mb-2">Congratulations!</h1>
                    <p className="text-lg text-gray-700">Your order has been successfully placed.</p>
                    <Link to="/account/booking" className='text-orange-600'>View Bookings</Link>
                </div>
            </div>

        </UserWrapper>
    );
};

export default React.memo(SuccessPayment);