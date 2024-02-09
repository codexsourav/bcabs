import { ContainerWrapper } from "../wrapper/Wrappers"
import { FaArrowRightLong } from "react-icons/fa6";
interface IServiceData {
    image: string;
    logo: string;
    desc: string;
    link?: string;
    title: string;
}

const data: IServiceData[] = [
    {
        image: '/images/service/01.jpg',
        logo: '/assets/service/taxi.svg',
        desc: 'Explore your city with our Local Service. Wherever you want to go, we are here to make your journey comfortable and convenient. Hop on board and experience the city like never before!',
        link: '/local-service',
        title: 'Local Transport',
    },
    {
        image: '/images/service/02.jpg',
        logo: '/assets/service/city-taxi.svg',
        desc: 'Embark on a seamless journey with our Round Trip Service. We take care of the details, so you can focus on creating lasting memories. Whether it\'s a weekend getaway or a holiday escape, we are your travel companion!',
        link: '/round-trip-service',
        title: 'Round Trip',
    },
    {
        image: '/images/service/03.jpg',
        logo: '/assets/service/taxi-2.svg',
        desc: 'Enjoy the simplicity and ease of our One Way Service. Reach your destination without the hassle of planning a return trip. Your journey is our priority, and we strive to make it smooth and stress-free!',
        link: '/one-way-service',
        title: 'One Way Transport',
    },
    {
        image: '/images/service/04.jpg',
        logo: '/assets/service/airport.svg',
        desc: 'Fly hassle-free with our Airport Service. We ensure timely arrivals and departures, making your travel experience stress-free. Your comfort and punctuality are our top priorities as you soar to new destinations!',
        link: '/airport-service',
        title: 'Airport Transport',
    },
    {
        image: '/images/service/05.jpg',
        logo: '/assets/service/taxi-booking-1.svg',
        desc: 'Book your journey effortlessly with our Online Booking Service. Our user-friendly platform allows you to plan and reserve your trips with just a few clicks. Your convenience is our commitment to a seamless travel experience!',
        link: '/online-booking-service',
        title: 'Online Booking',
    },
    {
        image: '/images/service/06.jpg',
        logo: '/assets/service/business.svg',
        desc: 'Experience reliability with our Regular Transport Service. Whether it\'s your daily commute or routine travel, we ensure punctuality and comfort. Let us be your trusted companion for all your regular transportation needs!',
        link: '/regular-transport-service',
        title: 'Regular Transport',
    },
];



function Services() {
    return (
        <ContainerWrapper className="pt-20 mt-16 pb-20 bg-orange-50" id="service">
            <div className="flex w-full flex-col justify-center items-center text-center gap-5">
                <h1 className="font-bold text-orange-600  text-2xl">ABOUT US</h1>
                <h1 className="font-extrabold text-5xl ">Our Best Services For You</h1>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-20">
                {
                    data.map((e, i) => {
                        return <ServiceBox key={"service-" + i} desc={e.desc} image={e.image} title={e.title} logo={e.logo} link="#" />;
                    })
                }




            </div>
        </ContainerWrapper>
    )
}
export default Services;




function ServiceBox({ desc, image, link, logo, title }: IServiceData) {
    return (
        <>
            <div className="shadow-xl shadow-gray-200  bg-white p-4 rounded-[30px] flex flex-col gap-3 pb-5 mt-32 transition-transform duration-500 transform hover:-translate-y-2">
                <div className="-mt-32 mb-3 relative" >
                    <img src={image} className="h-72 md:h-56 w-full rounded-[50px]" />
                    <div className="w-20 h-20 right-4 -mt-12 bg-orange-600 flex justify-center items-center rounded-full absolute"><img src={logo} className="w-11 h-11" /></div>
                </div>
                <h1 className="font-bold text-2xl">{title}</h1>
                <p className=" text-gray-500 line-clamp-3 leading-7 ">{desc}</p>
                <a href={link || "#"} className="h-12 rounded-full font-bold w-40 mt-5 gap-4 bg-orange-600 hover:bg-gray-950 transition-all flex justify-center  items-center text-white">Read More <FaArrowRightLong /></a>
            </div>

        </>
    )
}
