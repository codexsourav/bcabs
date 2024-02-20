import { FaArrowRightLong } from "react-icons/fa6";
import { ContainerWrapper } from "../wrapper/Wrappers"
import { FaRegUserCircle } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";


function Blogs() {
    return (


        <div className="pt-28  pb-20 bg-orange-50">

            <ContainerWrapper>
                <div className="flex w-full flex-col justify-center items-center text-center gap-5">
                    <h1 className="font-bold text-orange-600  text-2xl">OUR BLOG</h1>
                    <h1 className="font-extrabold text-5xl ">Latest News & Blog</h1>
                </div>
                <div className="grid md:grid-cols-3 gap-5 mt-10">
                    <BlogBox image="/images/service/01.jpg" date="02/02/2024" link="#" name="Admin" title="There Are Many Variations Of Passage Available." />
                    <BlogBox image="/images/service/02.jpg" date="02/02/2024" link="#" name="Admin" title="There Are Many Variations Of Passage Available." />
                    <BlogBox image="/images/service/03.jpg" date="02/02/2024" link="#" name="Admin" title="There Are Many Variations Of Passage Available." />


                </div>
            </ContainerWrapper>

        </div>


    )
}
export default Blogs;

function BlogBox({ date, link, name, title, image }: { image: string, name: string, title: string, date: string, link: string }) {
    return (
        <>
            <div className="shadow-xl shadow-gray-200  bg-white p-4 rounded-[30px] flex flex-col gap-3 pb-5 mt-32 transition-transform duration-500 transform hover:-translate-y-2">
                <div className="-mt-32 mb-3 relative" >
                    <img src={image} className="h-72 md:h-56 w-full rounded-[18px]" />
                </div>
                <div className="flex w-full justify-between items-center border-b pb-3">
                    <div className="font-bold text-gray-800 flex justify-center items-center gap-3"><FaRegUserCircle size={20} className="text-orange-600" /> By {name}</div>
                    <div className="font-bold text-gray-800 flex justify-center items-center gap-3"><BsCalendar2Date size={20} className="text-orange-600" /> {date}</div>

                </div>
                <h1 className="font-bold text-2xl">{title}</h1>
                <a href={link} className="h-12 rounded-full font-bold w-40 mt-2 gap-4 bg-orange-600 hover:bg-gray-950 transition-all flex justify-center  items-center text-white">Read More <FaArrowRightLong /></a>
            </div>

        </>
    )
}
