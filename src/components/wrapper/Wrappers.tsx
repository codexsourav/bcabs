import { ReactNode } from "react";

interface MyComponentProps {
    children: ReactNode;
    className?: string,
    id?: string,
}
export const ContainerWrapper: React.FC<MyComponentProps> = ({ children, className, id }) => {
    return (
        <div className={`m-auto max-w-[1400px] px-5 md:px-10 ${className}`} id={id}>
            {children}
        </div>
    )
}