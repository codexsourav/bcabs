import { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from "../../components/Cabs/CabBox";
import Button from "../../components/Inputbox/Button";
import { InputBox } from "../../components/Inputbox/GoogleInputBoc";
import { UserWrapper } from "../../components/wrapper/UserWrapper";
import { ContainerWrapper } from "../../components/wrapper/Wrappers";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgetPassword() {
    const [email, setEmail] = useState("");

    const handleInputChange = (e: string) => {
        setEmail(e);
    };

    const validateEmail = () => {
        if (!email) {
            toast.error('Please enter your Email ID');
            return false;
        }
        return true;
    };

    const handleResetPassword = () => {
        if (validateEmail()) {
            console.log("Email for password reset:", email);
            toast.success('Reset password link sent successfully!');
        }
    };

    return (
        <UserWrapper>
            <ContainerWrapper>
                <div className="grid md:grid-cols-2 my-20 h-[600px] relative">
                    <div className="relative md:block hidden">
                        <div
                            className="bg-orange-400 h-full w-full border-orange-100 relative bg-cover bg-center bg-[url('/images/forget.jpg')] rounded-3xl shadow-2xl"
                        ></div>
                    </div>

                    <div className="relative px-8 md:px-14">
                        <div className="">
                            <h1 className="font-bold text-4xl text-orange-600 uppercase">
                                Forget My Password?
                            </h1>
                            <p className="text-gray-950/80 mt-6 md:text-lg text-sm leading-7">
                                No worries! Resetting your password on Babagcabs is a breeze. Follow these simple steps to regain access to your account and continue your seamless journey with us.
                            </p>
                        </div>
                        <div className="mt-8">
                            <Label>Enter Your Email ID</Label>
                            <InputBox
                                value={email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mt-8 md:mt-5 w-full">
                            <Button className="w-full md:w-auto" onClick={handleResetPassword}>
                                Send Reset Password Link
                            </Button>
                        </div>
                        <Link
                            to="/signup"
                            className="mt-24 block text-center text-sm text-orange-600 font-bold"
                        >
                            Create New Account
                        </Link>
                    </div>
                </div>
            </ContainerWrapper>
        </UserWrapper>
    );
}

export default ForgetPassword;
