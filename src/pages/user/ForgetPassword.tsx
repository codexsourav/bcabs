import { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from "../../components/Cabs/CabBox";
import Button from "../../components/Inputbox/Button";
import { InputBox } from "../../components/Inputbox/GoogleInputBoc";
import { UserWrapper } from "../../components/wrapper/UserWrapper";
import { ContainerWrapper } from "../../components/wrapper/Wrappers";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiRequest, withErrorHandling } from "../../helper/apiRequest";
import { validateEmail } from "../../utils/helper";

function ForgetPassword() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("");

    const handleInputChange = (e: string) => {
        setEmail(e);
    };

    const validateEmailId = () => {
        if (!email) {
            toast.error('Please enter your Email ID');
            return false;
        } else if (!validateEmail(email)) {
            toast.error('Invalid Email ID');
            return false;
        }
        return true;
    };



    const sendRequest = async () => {
        setLoading(true)
        const res = await apiRequest<any>({ path: "/api/auth/forgetpass/" + email, 'method': "POST" })
        toast.success(res.data.message);
        setLoading(false);
        setEmail("");
    };
    const onError = () => {
        setLoading(false)
    }
    const request = withErrorHandling(sendRequest, onError)


    const handleResetPassword = () => {
        if (validateEmailId()) {
            request();
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
                            <Button disabled={loading} className="w-full md:w-auto" onClick={handleResetPassword}>
                                {loading ? "Sending Mail..." : "Send Reset Password Link"}
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
