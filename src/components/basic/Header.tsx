import { ContainerWrapper } from "../wrapper/Wrappers";
import { useEffect, useRef, useState } from "react";
import { FaCar } from "react-icons/fa";

import TripTab from "../formTab/TripTab";
import ExploreButton from "../formTab/ExploreButton";

function Header() {
    const divRef = useRef<HTMLDivElement | null>(null);
    const [divHeight, setDivHeight] = useState<number | null>(null);

    useEffect(() => {
        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                if (entry.target === divRef.current) {
                    const height = entry.contentRect.height;
                    setDivHeight(height);
                }
            }
        };

        const resizeObserver = new ResizeObserver(handleResize);

        if (divRef.current) {
            resizeObserver.observe(divRef.current);
        }

        return () => {
            if (divRef.current) {
                resizeObserver.unobserve(divRef.current);
            }
        };
    }, [divRef.current]);
    console.log(divHeight);

    return (

        <>
            <div className="relative w-full" id="book" >

                <ContainerWrapper className=" absolute h-auto   z-30  mt-56 right-0 left-0 m-auto md:overflow-visible overflow-hidden" >
                    <div className="bg-white w-full h-full shadow-lg rounded md:rounded-3xl p-1 md:pt-2" ref={divRef}>
                        <TripTab />
                    </div>

                    <ExploreButton className=" -mt-14  md:-mt-7" />
                </ContainerWrapper >
                <div className="relative h-[300px] w-full ">
                    <img src="https://media.istockphoto.com/id/996412132/photo/waiting-for-taxi.jpg?s=612x612&w=0&k=20&c=Q6ZD40QqHnd2B_4EC5TuR_i8MMDI04jROL2WMaWgyCw=" className="w-full h-full object-cover" alt="Waiting for Taxi" />
                    <div className="absolute bg-black inset-0 opacity-50"></div>
                    <ContainerWrapper>
                        <div className="absolute  inset-0 flex items-center justify-start mt-20 flex-col gap-6">
                            <p className="uppercase text-center font-extrabold text-4xl  md:text-5xl text-white">Book <span className="text-orange-600">cabs</span> for your ride</p>
                        </div>
                    </ContainerWrapper>

                </div>
            </div >

            <div style={{ marginTop: divHeight != null ? divHeight : 0 }} ></div>



        </>

    )
}
export default Header