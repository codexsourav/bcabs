import React from 'react';
import { UserWrapper } from '../../../../components/wrapper/UserWrapper';
import { Link } from 'react-router-dom';

const ErrorPayment = () => {
    return (
        <UserWrapper>
            <div className="flex items-center justify-center h-96">
                <div className="bg-white flex justify-center items-center flex-col gap-5 mt-14">
                    <img src="/images/pay-error.jpg" alt="Error Icon" className="mx-auto h-32 mb-4" />
                    <h1 className="text-3xl font-bold text-red-600 mb-2">Oops!</h1>
                    <p className="text-lg text-gray-700">Something went wrong with your payment.</p>
                    <p className="text-lg text-gray-700">Please try again later.</p>
                    <Link to="/" className="text-orange-600">Home</Link>
                </div>
            </div>
        </UserWrapper>
    );
};

export default React.memo(ErrorPayment);
