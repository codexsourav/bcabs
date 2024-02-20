import { useState } from "react";
import { apiRequest, withErrorHandling } from "../../helper/apiRequest";
import { StorageKEY, storeLocalStorageData } from "../../helper/storageKeys";
import { useNavigate } from "react-router-dom";

export interface AdminUser {
    _id: string;
    username: string;
    email: string;
    fullName: string;
    role: string;
    token: string;
}


const LoginAdmin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const sendRequest = async () => {
        setLoading(true);
        const data = await apiRequest<AdminUser>({
            path: "/api/admin/login", method: "POST", "data": {
                username: email,
                pass: pass,
            }
        });
        if (data.data.token) {
            storeLocalStorageData(StorageKEY.admin, data.data.token);
            navigate("/admin", { replace: true });
        } else {
            setLoading(false);
        }
    };

    const onError = () => {
        setLoading(false);
    };


    const onSubmit = withErrorHandling(sendRequest, onError);

    return (
        <section className="bg-gray-50 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                    <img className="w-60 h-32 object-contain mr-2" src="/images/logo.png" alt="logo" />
                </a>
                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-2.5  "
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-2.5  "
                                    required
                                />
                            </div>

                            <button
                                disabled={loading}

                                type="submit"
                                className="w-full mt-10 bg-orange-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                            >
                                {loading ? "Loading..." : "Sign in"}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default LoginAdmin;
