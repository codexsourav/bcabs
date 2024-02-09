import { InputFileBox } from "../Inputbox/GoogleInputBoc";
import Button from "../Inputbox/Button";
import { useEffect, useState } from "react";
import { apiRequest, baseUrl, uploadImage } from "../../helper/apiRequest";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/stote";
import { FileMetadata } from "../../interface/cabs/Files";
import { pushImage, setImages } from "../../store/provider/images/imagesProvider";
import { CiCircleRemove } from "react-icons/ci";



export function PickImageFile({ className, onChange, placeholder, value }: { type?: string, placeholder?: string, value: string | number | readonly string[] | undefined, onChange: (e: string) => void, className?: string }) {
    const [show, setShow] = useState(false);
    return <>
        <div className="relative w-full" >
            <input
                type="text"
                onClick={() => setShow(true)}
                value={value}
                placeholder={placeholder || "Select A File"}
                readOnly={true}
                className={"border outline-none cursor-pointer px-3 py-2 w-full h-[42px] focus:border-orange-300 transition-all text-[12px] " + className}
            />
            {
                value ? <div onClick={() => {
                    onChange("")
                }} className="absolute top-0 right-0 bottom-0 select-none  cursor-pointer text-gray-400 mt-[10px] px-3"><CiCircleRemove size={22} /></div>
                    : null
            }

        </div>

        {show ? <ImagePicker
            onClose={() => setShow(false)}
            onclick={(e) => {
                onChange(e);
                setShow(false);
            }} /> : null}
    </>
}

function ImagePicker({ onclick, onClose }: { onClose: (() => void), onclick: ((e: string) => void) }) {

    return (
        <div className="w-screen h-screen  bg-white fixed top-0 right-0 z-50  border-2 p-10 overflow-y-auto">
            <UploadImage onclick={onclick} />
            <ShowFiles onclick={onclick} />
            <div onClick={onClose} className="w-16 h-16 cursor-pointer rounded-full fixed bottom-4 right-4 bg-red-500 text-white  border-2  flex justify-center items-center">
                <CiCircleRemove size={32} />
            </div>
        </div>
    )
}

function UploadImage({ onclick }: { onclick: ((e: string) => void) }) {
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const dispatch = useDispatch();
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            setLoading(true)
            try {
                const image = await uploadImage(selectedFile);
                toast.success(image.data.message || "Image Upload Successfully");

                setLoading(false)
                onclick(image.data.filename)
                if (image.data.metadata) dispatch(pushImage({ data: image.data.metadata }));
            } catch (error) {
                toast.error("Error uploading image:" + error);
                setLoading(false)
            }
        }
    };

    return (
        <div className="grid grid-cols-6 gap-5 ">
            <div className="col-span-4 md:col-span-5">
                <InputFileBox onChange={handleFileChange} />
            </div>
            <Button disabled={loading} onClick={handleUpload} className="md:col-span-1 col-span-2">{loading ? "Uploading.." : "Upload File"}</Button>
        </div>
    )
}


function ShowFiles({ onclick }: { onclick: ((e: string) => void) }) {
    const state = useSelector((state: RootState) => state.imagesprovider);
    const dispatch = useDispatch();
    const loadImages = async () => {
        try {
            const res = await apiRequest({ path: "/list-files", method: "GET" });
            dispatch(setImages({ data: res.data as any[] }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        if (state.length == 0) {
            loadImages();
        }

    }, []);
    console.log(state);

    return (
        <div className="flex flex-wrap gap-5 justify-between items-start mt-8 ">
            {state.map((e: FileMetadata, i) => <div onClick={() => onclick(e.name)} key={"image-" + i + "-" + (e.name || "")} className="h-32 w-32 border-2 shadow cursor-pointer rounded-xl overflow-hidden">
                <img src={baseUrl + "/uploads/" + (e.name || "")} alt="" className="w-full h-full object-cover " />
            </div>)
            }
        </div >
    )
}
