import { useState } from "react"
import IconPicker from "./IconPicker";
import { IconData } from "../../data/IconData";

function IconPickerBox({ onClick, index, className }: { index?: number, onClick: (e: number) => void, className?: string }) {
    const [Show, setShow] = useState<boolean>();
    return (
        <>
            <div onClick={() => setShow(true)} className={"bg-orange-600 text-white justify-center items-center flex cursor-pointer " + className}>
                {index != undefined ? IconData[index] : "Select Icon"}
            </div>
            {Show ? <IconPicker onClick={(e) => {
                onClick(e);
                setShow(false)
            }} index={index} onClose={() => setShow(false)} /> : null}
        </>
    )
}

export default IconPickerBox