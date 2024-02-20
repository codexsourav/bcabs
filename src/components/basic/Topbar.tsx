import { ContainerWrapper } from "../wrapper/Wrappers"
import { MdMarkEmailRead } from "react-icons/md";
import { CgPhone } from "react-icons/cg";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";

function Topbar() {
    return (
        <div className="h-10 bg-black border-b-2 border-orange-600 ">
            <ContainerWrapper className="flex justify-between items-center h-full text-white">
                <div className="flex gap-8">
                    <a href="mailto:support@babagcabs.com" className="hidden md:flex justify-center items-center gap-2">
                        <MdMarkEmailRead className="text-orange-600" size={20} />
                        <p className="font-bold text-sm">support@babagcabs.com</p>
                    </a>
                    <a href="tel:01169266014" className="flex justify-center items-center gap-2">
                        <CgPhone className="text-orange-600" size={20} />
                        <p className="font-bold text-sm">01169266014</p>
                    </a>
                </div>
                <div className="flex gap-5 text-orange-500">
                    <a href="" target="_blank"><FaFacebook /></a>
                    <a href="" target="_blank"><AiFillInstagram /></a>
                    <a href="" target="_blank"><FaSquareXTwitter /></a>
                    <a href="" target="_blank"><IoLogoYoutube /></a>
                </div>
            </ContainerWrapper>
        </div>
    )
}
export default Topbar;