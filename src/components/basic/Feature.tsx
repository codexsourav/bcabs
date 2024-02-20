import React from 'react';
import { ContainerWrapper } from '../wrapper/Wrappers';

const Feature: React.FC = () => {
    return (
        <div className="relative group overflow-hidden" id='Feature'>

            <img
                src="https://live.themewild.com/taxica/assets/img/service/01.jpg"
                alt="Your Image"
                className="w-full h-[1800px] md:h-[800px]  object-cover"
            />

            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center flex-col justify-between text-white text-2xl font-bold z-10 ">
                <div className="flex w-full flex-col justify-center items-center text-center gap-5 mt-36">
                    <h1 className="font-bold text-orange-600  text-2xl">FEATURE</h1>
                    <h1 className="font-extrabold text-5xl">Our Awesome Feature</h1>
                </div>
                <ContainerWrapper className='w-full'>
                    <div className="grid md:grid-cols-4 gap-5 w-full">
                        <FeatureBox />
                        <FeatureBox />
                        <FeatureBox />
                        <FeatureBox />
                    </div>
                </ContainerWrapper>
                <div className="bg-[url('/images/shape.png')]  h-10 w-full bg-orange-600 "></div>

            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0  bg-black opacity-85 z-5"></div>
        </div>
    );
};

export default Feature;

function FeatureBox() {
    return (
        <div className={`w-full  rounded-3xl bg-white flex justify-start p-7 items-center flex-col gap-3 text-center`}>
            <div className="w-28 h-28 flex justify-center items-center bg-orange-600 rounded-full border-[4px] border-black"><img src="/assets/taxi-safety.svg" className='h-16 w-16' /></div>
            <h1 className="font-bold text-gray-950 text-lg">Safety Guarantee</h1>
            <p className='text-gray-500 text-sm font-normal line-clamp-6 leading-7'>There are many variations of majority have suffered alteration in some form injected humour randomised words.</p>
        </div>
    )
}

