import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from "../../components/Cabs/CabBox";
import Button from "../../components/Inputbox/Button";
import { InputBox, PassInputBox } from "../../components/Inputbox/GoogleInputBoc";
import { UserWrapper } from "../../components/wrapper/UserWrapper";
import { ContainerWrapper } from "../../components/wrapper/Wrappers";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginState {
    emailOrMobile: string;
    password: string;
}

function Login() {
    const [loginState, setLoginState] = useState<LoginState>({
        emailOrMobile: "",
        password: "",
    });

    const handleInputChange = (
        e: string,
        field: keyof LoginState
    ) => {
        setLoginState({
            ...loginState,
            [field]: e,
        });
    };

    const validateLogin = () => {
        const { emailOrMobile, password } = loginState;

        if (!emailOrMobile || !password) {
            toast.error('Please Enter Email Or Password');
            return false;
        }


        return true;
    };

    const handleLogin = () => {
        if (validateLogin()) {
            // Proceed with login logic
            console.log("Login State:", loginState);
            toast.success('Login successful!');
        }
    };

    return (
        <UserWrapper>
            <ContainerWrapper>
                <div className="grid md:grid-cols-2 my-20 h-[600px] relative">
                    <div className="relative md:block hidden">
                        <div
                            className="bg-orange-400 h-full w-full border-orange-100 relative bg-cover bg-center bg-[url('/images/auth.jpg')] rounded-3xl shadow-2xl"
                        ></div>
                    </div>

                    <div className="relative px-8 md:px-14">
                        <div className="">
                            <h1 className="font-bold text-4xl text-orange-600 uppercase">
                                Login Now
                            </h1>
                            <p className="text-gray-950/80 mt-6 md:text-lg text-sm leading-7">
                                Discover the world with ease by logging into your Babagcabs account. Whether you are planning a ride across town or a journey to a new destination, we've got you covered.
                            </p>
                        </div>
                        <div className="mt-8">
                            <Label>Email Or Mobile Number</Label>
                            <InputBox
                                value={loginState.emailOrMobile}
                                onChange={(e) => handleInputChange(e, "emailOrMobile")}
                            />
                        </div>
                        <div className="mt-8">
                            <Label>Password</Label>
                            <PassInputBox

                                type="password"
                                value={loginState.password}
                                onChange={(e) => handleInputChange(e, "password")}
                            />
                        </div>
                        <Link to="/forgetpassword" className="mt-5 block text-right text-sm">
                            Forget Password?
                        </Link>
                        <div className="mt-8 md:mt-5 w-full">
                            <Button className="w-full md:w-auto" onClick={handleLogin}>
                                Login Now
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

export default Login;
