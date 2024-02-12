import { MyComponentProps } from "../wrapper/UserWrapper"
import { ContainerWrapper } from "../wrapper/Wrappers"

export const ExploreWrapper: React.FC<MyComponentProps> = ({ children, className }) => {
    return (
        <ContainerWrapper className={"grid grid-cols-1 lg:grid-cols-12 mt-10 gap-4 mb-60 w-full " + className}>
            {children}
        </ContainerWrapper>
    )
}

export const TripInfoWrapper: React.FC<MyComponentProps> = ({ children, className }) => {
    return <div className={"col-span-1 lg:col-span-3 w-full " + className}>
        {children}
    </div>
}

export const CabExploreWrapper: React.FC<MyComponentProps> = ({ children, className }) => {
    return <div className="col-span-1 lg:col-span-9">
        <div className={"grid grid-cols-1 lg:grid-cols-2 gap-5 " + className}>
            {children}
        </div>
    </div>
}


export const CabViewWrapper: React.FC<MyComponentProps> = ({ children, className }) => {
    return <div className={"flex flex-col gap-5 " + className}>
        {children}
    </div>

}


export const NoCabsFound: React.FC<MyComponentProps> = ({ className }) => {
    return <div className={"col-span-1 md:col-span-3 w-full flex justify-center mt-40 items-center flex-col " + className}>
        <h1 className="font-bold text-xl">No Cabs Found : (</h1>
    </div>
}
