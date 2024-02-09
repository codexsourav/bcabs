import { ContainerWrapper } from "../wrapper/Wrappers"
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { scrollToElement } from "../../utils/helper";


function CallSection() {
    return (
        <div className="bg-orange-600 flex flex-col justify-between">
            <div className="bg-[url('/images/shape.png')]  h-10 w-full bg-orange-600 "></div>

            <ContainerWrapper className="grid md:grid-cols-5 grid-cols-1 py-10 md:h-80 w-full">
                <div className="col-span-3 flex justify-center items-center flex-col gap-8  ">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white ">Book Your Cab It's Simple And Affordable</h1>
                    <p className="text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout point of using is that it has normal distribution of letters.</p>
                </div>
                <div className="col-span-2 flex justify-center w-full md:items-end items-center gap-9 flex-col md:mt-10 mt-10">
                    <div className="flex md:justify-end md:items-end justify-center items-center w-full">
                        <div className="flex justify-center items-center text-4xl font-4xl font-extrabold gap-7 text-white">
                            <MdOutlineSupportAgent />
                            <span>01169266014</span>
                        </div>

                    </div>
                    <p onClick={() => scrollToElement("book")} className="h-14 rounded-full font-bold w-48 gap-5 uppercase bg-white hover:bg-gray-950 transition-all flex justify-center items-center text-orange-600 hover:text-white"> Book A Cab <FaArrowRightLong /></p>
                </div>

            </ContainerWrapper>
            <div className="bg-[url('/images/shape.png')]  h-10 w-full bg-orange-600 "></div>

        </div>
    )
}
export default CallSection