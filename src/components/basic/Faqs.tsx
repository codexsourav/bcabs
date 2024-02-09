import { ContainerWrapper } from "../wrapper/Wrappers";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";

function Faqs() {
    return (
        <ContainerWrapper className="pt-28  pb-20 bg-white grid md:grid-cols-2 gap-10">
            <div className="flex w-full flex-col justify-start items-start text-left gap-5">
                <h1 className="font-bold text-orange-600  text-2xl">FAQ'S</h1>
                <h1 className="font-extrabold text-6xl ">General <span className="text-orange-500">Frequently</span> Asked Questions</h1>
                <p className="leading-7 text-gray-600">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even.</p>
                <img src="https://live.themewild.com/taxica/assets/img/faq/01.jpg" className="w-full h-64 object-cover rounded-3xl" />
            </div>
            <div className="">
                <Faq />
            </div>
        </ContainerWrapper>
    )
}
export default Faqs;

import React, { useState } from 'react';

interface FaqItem {
    question: string;
    answer: string;
}

const Faq: React.FC = () => {
    const [faqItems, _] = useState<FaqItem[]>([
        {
            question: 'What is Tailwind CSS?',
            answer: 'Tailwind CSS is a utility-first CSS framework for quickly building modern and responsive designs.'
        },
        {
            question: 'How can I install Tailwind CSS in my project?',
            answer: 'You can install Tailwind CSS using npm or yarn. Check the official documentation for detailed instructions.'
        },
        {
            question: 'Can I customize the styles in Tailwind CSS?',
            answer: 'Yes, Tailwind CSS is highly customizable. You can configure the styles in the tailwind.config.js file.'
        },
        {
            question: 'What is Tailwind CSS?',
            answer: 'Tailwind CSS is a utility-first CSS framework for quickly building modern and responsive designs.'
        },
        {
            question: 'How can I install Tailwind CSS in my project?',
            answer: 'You can install Tailwind CSS using npm or yarn. Check the official documentation for detailed instructions.'
        },
        {
            question: 'Can I customize the styles in Tailwind CSS?',
            answer: 'Yes, Tailwind CSS is highly customizable. You can configure the styles in the tailwind.config.js file.'
        },
        // Add more FAQ items as needed
    ]);

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleAnswer = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="max-w-2xl mx-auto mt-16">

            <div className="space-y-6">
                {faqItems.map((item, index) => (
                    <div key={index} className=" p-4 rounded border">
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => toggleAnswer(index)}
                        >
                            <h2 className="text-lg font-semibold">{item.question}</h2>
                            {expandedIndex === index ? (
                                <span className="text-gray-800"><SlArrowUp /></span>
                            ) : (
                                <span className="text-gray-800"><SlArrowDown /></span>
                            )}
                        </div>
                        {expandedIndex === index && <p className="pt-5 mt-5 border-t">{item.answer}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};



