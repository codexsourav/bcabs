import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from "../../components/Cabs/CabBox";
import Button from "../../components/Inputbox/Button";
import { InputBox, PassInputBox } from "../../components/Inputbox/GoogleInputBoc";
import { UserWrapper } from "../../components/wrapper/UserWrapper";
import { ContainerWrapper } from "../../components/wrapper/Wrappers";
import { toast } from "react-toastify";

interface SignupState {
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    confirmPassword: string;
}

function Signup() {
    const [signupState, setSignupState] = useState<SignupState>({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e: string, field: keyof SignupState) => {
        console.log(e);

        setSignupState({
            ...signupState,
            [field]: e,
        });
    };



    const validateSignup = () => {
        const { fullName, email, mobileNumber, password, confirmPassword } = signupState;
        let errors: string[] = [];

        if (!fullName) {
            errors.push('Full Name is required');
        }

        if (!email) {
            errors.push('Email is required');
        }

        if (!mobileNumber) {
            errors.push('Mobile Number is required');
        }

        if (!password) {
            errors.push('Password is required');
        }

        if (!confirmPassword) {
            errors.push('Confirm Password is required');
        }



        if (password !== confirmPassword) {
            errors.push('Passwords do not match');
        }

        if (errors.length > 0) {
            errors.forEach((error) => {
                toast.error(error);
            });
            return false;
        }

        return true;
    };


    const handleSignup = () => {
        validateSignup();
        // Add your signup logic here using signupState values
        console.log("Signup State:", signupState);
    };
    console.log(signupState);
    return (
        <UserWrapper>
            <ContainerWrapper>
                <div className="grid md:grid-cols-2 my-20 h-[600px] relative">
                    <div className="relative md:block hidden">
                        <div
                            className="bg-orange-400 h-full w-full border-orange-100 relative bg-cover bg-center bg-[url('/images/signup.jpg')] rounded-3xl shadow-2xl"
                        ></div>
                    </div>

                    <div className="relative px-8 md:px-14">
                        <div className="">
                            <h1 className="font-bold text-4xl text-orange-600 uppercase">
                                Create A Account
                            </h1>
                        </div>
                        <div className="mt-6">
                            <Label>Your Full Name</Label>
                            <InputBox
                                value={signupState.fullName}
                                onChange={(e) => handleInputChange(e, "fullName")}
                            />
                        </div>
                        <div className="mt-6">
                            <Label>Your Email ID</Label>
                            <InputBox
                                value={signupState.email}
                                onChange={(e) => handleInputChange(e, "email")}
                            />
                        </div>
                        <div className="mt-6">
                            <Label>Mobile Number</Label>
                            <InputBox
                                value={signupState.mobileNumber}
                                onChange={(e) => handleInputChange(e, "mobileNumber")}
                            />
                        </div>
                        <div className="mt-6">
                            <Label>Password</Label>
                            <PassInputBox
                                type="password"
                                value={signupState.password}
                                onChange={(e) => handleInputChange(e, "password")}
                            />
                        </div>
                        <div className="mt-6">
                            <Label>Confirm Password</Label>
                            <PassInputBox
                                type="password"
                                value={signupState.confirmPassword}
                                onChange={(e) => handleInputChange(e, "confirmPassword")}
                            />
                        </div>
                        <div className="mt-6 md:mt-5 w-full">
                            <Button className="w-full md:w-auto" onClick={handleSignup}>
                                SignUp Now
                            </Button>
                        </div>
                        <Link
                            to="/login"
                            className="mt-24 block text-center text-sm text-orange-600 font-bold"
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>
            </ContainerWrapper>
        </UserWrapper>
    );
}

export default Signup;
