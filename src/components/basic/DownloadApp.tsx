import { ContainerWrapper } from "../wrapper/Wrappers"
import { FaGooglePlay } from "react-icons/fa";
import { IoLogoAppleAppstore } from "react-icons/io5";


function DownloadApp() {
    return (
        <ContainerWrapper>
            <div className="w-full h-full md:h-96 bg-[url('/assets/shape-7.png')] mb-28 mt-28 rounded-3xl bg-cover bg-no-repeat overflow-hidden">
                <div className="h-full flex justify-between items-center md:flex-row flex-col">
                    <div className=" p-6 flex flex-col gap-4">
                        <h1 className="font-bold text-orange-600  text-xl">GET OUR APP</h1>
                        <h1 className="font-extrabold text-3xl md:text-5xl ">Download Our <span className="text-orange-600">Babagcabs</span> App For Free</h1>

                        <div className="flex mt-6 gap-5 md:flex-row flex-col justify-center items-center md:justify-start">
                            <a href="#" className="flex justify-start items-center gap-3 text-white bg-orange-600 rounded-full px-6 py-2">
                                <FaGooglePlay size={28} />
                                <div className="">
                                    <p>Get it on</p>
                                    <p className="font-bold text-2lg">Google Play</p>
                                </div>
                            </a>
                            <a href="#" className="flex justify-start items-center gap-3 text-white bg-gray-950 rounded-full px-6 py-2">
                                <IoLogoAppleAppstore size={30} />
                                <div className="">
                                    <p>Get it on</p>
                                    <p className="font-bold text-2lg">App Store</p>
                                </div>
                            </a>
                        </div>

                    </div>
                    <img src="/images/app.png" className="h-full md:mt-0 mt-10" />
                </div>
            </div>
        </ContainerWrapper>
    )
}
export default DownloadApp