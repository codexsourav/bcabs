import { IconData } from "../../data/IconData"
import { IoMdClose } from "react-icons/io";


function IconPicker({ index, onClick, onClose }: { index?: number, onClick: (e: number) => void, onClose: () => void }) {
    return (
        <div className="w-screen h-screen bg-black/60 fixed top-0 right-0 z-50 flex justify-center items-center ">
            <div className="w-screen max-w-[1100px] h-screen md:rounded-[40px] border-2 shadow-2xl max-h-[800px] bg-white flex flex-wrap gap-5 justify-between p-5 items-center overflow-x-auto  ">
                {
                    IconData.map((e, i) => <div onClick={() => onClick(i)} className={`hover:text-white transition-all cursor-pointer rounded-full shadow-xl hover:bg-gray-900 p-5 text-5xl text-gray-900 ${index == i ? "bg-gray-900 text-white" : ""}`} key={"icon-" + i}>{e}</div>)
                }
            </div>
            <div onClick={onClose} className="absolute top-3 transition-all hover:bg-red-600 hover:text-white hover:border-red-800 cursor-pointer  border-2 w-20 h-20 bg-white rounded-full shadow-xl flex justify-center items-center text-4xl">
                <IoMdClose />
            </div>
        </div>
    )
}
export default IconPicker