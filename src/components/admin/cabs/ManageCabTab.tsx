function ManageCabTab({ index, onChange }: { index: number, onChange: (e: number) => void }) {
    const activeClass = " text-white bg-orange-600 hover:bg-orange-600 ";
    const inactiveClass = " text-gray-700";
    const baseClass = "flex justify-center items-center  hover:bg-orange-100 transition-all cursor-pointer  select-none "

    const applyClass = (i: number) => {
        return index == i ? baseClass + activeClass : baseClass + inactiveClass;
    }

    return (
        <div className="w-full h-11 border grid grid-cols-4">
            <div onClick={() => onChange(0)} className={`${applyClass(0)}`}>One Way</div>
            <div onClick={() => onChange(1)} className={`${applyClass(1)} border-l `} >Local</div>
            <div onClick={() => onChange(2)} className={`${applyClass(2)} border-l`} >Round Trip</div>
            <div onClick={() => onChange(3)} className={`${applyClass(3)} border-l`} >Airport</div>
        </div>
    )
}

export default ManageCabTab