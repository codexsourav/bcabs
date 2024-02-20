import { ReactNode } from "react";
import Topbar from "../basic/Topbar";
import Navbar from "../basic/Navbar";
import Fottet from "../basic/Fottet";

export interface MyComponentProps {
    children?: ReactNode;
    className?: string;
}
export const UserWrapper: React.FC<MyComponentProps> = ({ children, className }) => {
    return (
        <>
            <Topbar />
            <Navbar />
            <div className={"min-h-[90vh] " + className}>
                {children}
            </div>
            <Fottet />
        </>
    )
}