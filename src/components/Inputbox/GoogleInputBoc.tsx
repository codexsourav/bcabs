import React, { useRef, useEffect, ChangeEvent, useState } from "react";
import { generateTimeArray } from "../../utils/times";
import { CiCircleRemove } from "react-icons/ci";
import { MyComponentProps } from "../wrapper/UserWrapper";


interface AutoCompleteProps {
    options: google.maps.places.AutocompleteOptions;
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
    onChange?: (e: string) => void;
    onClear?: () => void;

    className?: string,
    value?: string,
    placeholder?: string,
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ onClear, options, onPlaceSelect, value, className, placeholder }) => {
    const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = value || "";
        }
    }, [value])



    useEffect(() => {
        if (inputRef.current) {
            autoCompleteRef.current = new google.maps.places.Autocomplete(
                inputRef.current,
                options
            );

            autoCompleteRef.current.addListener("place_changed", () => {

                const selectedPlace = autoCompleteRef.current?.getPlace();
                if (selectedPlace?.name) {
                    console.log(selectedPlace);
                    onPlaceSelect(selectedPlace!);
                }

            });
        }
    }, [options, onPlaceSelect]);

    return <div className="relative w-full">
        <input ref={inputRef} onChange={(e) => { console.log("+=====", e.target.value); }} placeholder={placeholder} className={"border outline-none px-3 py-2 w-full h-[42px] focus:border-orange-300 transition-all " + className} />
        {
            inputRef.current?.value || value ? <div onClick={() => {
                onClear ? onClear() : null;
                if (inputRef.current) {
                    inputRef.current.value = '';
                }
            }} className="absolute top-0 right-0 bottom-0 cursor-pointer text-gray-400 mt-[10px] px-3"><CiCircleRemove size={22} /></div>
                : null
        }
    </div>

};

export default AutoComplete;
export const today = new Date().toISOString().split('T')[0];

export function DatePickMe({ selectedDate = today, setSelectedDate, className, placeholder }: { className?: string, selectedDate: string, placeholder?: string, setSelectedDate: (date: string) => void }) {

    return (

        <input type="date" min={today} value={selectedDate} placeholder={placeholder} onChange={(e) => setSelectedDate(e.target.value)} max="2030-12-01" className={"border outline-none px-3 py-2 w-full h-[42px] bg-white " + className} />


    );
}


interface TimePickerProps {
    className?: string;
    selectedTime: string;
    onChange?: (selectedTime: string) => void;
    placeholder?: string,
}

export function TimePicker({ className, onChange, selectedTime, placeholder }: TimePickerProps) {
    const now = new Date();

    now.setMinutes(now.getMinutes() + 30);

    const generatedTimeOptions = generateTimeArray();

    const handleTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newSelectedTime = event.target.value;
        if (onChange) {
            onChange(newSelectedTime);
        }
    };

    return (
        <select
            className={`border outline-none px-3 h-[42px] focus:border-orange-300 transition-all  w-full ${className}`}
            style={{ backgroundColor: '#fff' }}
            onChange={handleTimeChange}
            defaultValue={selectedTime}
            aria-placeholder={placeholder}
        >
            <option value="" disabled ></option>
            {generatedTimeOptions.map((time, index) => (
                <option key={index} value={time}>
                    {time}
                </option>
            ))}

        </select>
    );
}


interface ITripBox {
    className?: string;
    trip: number;
    onChange?: (trip: string) => void;
}

export function TripTypeBox({ className, onChange, trip }: ITripBox) {


    const handleTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newSelectedTime = event.target.value;
        if (onChange) {
            onChange(newSelectedTime);
        }
    };

    return (
        <select
            className={`border outline-none px-3 h-[42px] focus:border-orange-300 transition-all  w-full ${className}`}
            style={{ backgroundColor: '#fff' }}
            onChange={handleTimeChange}
            defaultValue={trip}
            defaultChecked={true}
        >
            <option value={0}>Drop Me Airport</option>
            <option value={1}>Pickup To Airport</option>
        </select>
    );
}


export function InputBox({ readOnly = false, type = "text", className, onChange, placeholder, value }: { type?: string, placeholder?: string, value: string | number | readonly string[] | undefined, readOnly?: boolean, onChange: (e: string) => void, className?: string }) {

    return <div className="relative w-full">
        <input readOnly={readOnly} type={type} onChange={(e) => onChange(e.target.value)} value={value} placeholder={placeholder} className={"border outline-none px-3 py-2 w-full h-[42px] focus:border-orange-300 transition-all " + className} />
        {
            value ? <div onClick={() => {
                onChange("")
            }} className="absolute top-0 right-0 bottom-0 select-none  cursor-pointer text-gray-400 mt-[10px] px-3"><CiCircleRemove size={22} /></div>
                : null
        }
    </div>
}


interface InputFileBoxProps {
    placeholder?: string;
    value?: string | number | readonly string[] | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    accept?: string; // Add accept prop
}

export const InputFileBox: React.FC<InputFileBoxProps> = ({ placeholder, value, onChange, className, accept }) => {
    return (
        <div className="relative w-full">
            <input
                type="file"
                onChange={(e) => onChange(e)}
                value={value}
                placeholder={placeholder}
                accept={accept}
                className={"border outline-none px-3 py-2 w-full h-[42px] focus:border-orange-300 transition-all text-[12px] " + className}
            />
        </div>
    );
};

import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";

export function PassInputBox({ className, onChange, placeholder, value }: { type?: string, placeholder?: string, value: string | number | readonly string[] | undefined, onChange: (e: string) => void, className?: string }) {
    const [show, setShow] = useState(false);
    return <div className="relative w-full">
        <input type={show ? "text" : "password"} onChange={(e) => onChange(e.target.value)} value={value} placeholder={placeholder} className={"border outline-none px-3 py-2 w-full h-[42px] focus:border-orange-300 transition-all " + className} />

        <div onClick={() => {
            setShow(!show)
        }} className="absolute select-none top-0 right-0 bottom-0  cursor-pointer text-gray-400 mt-[10px] px-3">
            {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </div>


    </div>
}


interface IInputSelectBox extends MyComponentProps {
    value: string | number | readonly string[] | undefined, onChange: (e: string) => void, className?: string
}

export function InputSelectBox({ children, className, onChange, value }: IInputSelectBox) {

    return <select
        className={`border outline-none px-3 h-[42px] focus:border-orange-300 transition-all  w-full ${className}`}
        style={{ backgroundColor: '#fff' }}
        onChange={(e) => onChange(e.target.value)}
        defaultValue={value}
        defaultChecked={true}
    >
        {children}
    </select>
}
