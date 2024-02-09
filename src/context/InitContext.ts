import { createContext } from "react";

// Define the context type
interface AdminTabContextType {
    adminTabIndex: number;
    setAdminTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

// Update the context creation to specify the type
export const AdminTabContext = createContext<AdminTabContextType>({
    adminTabIndex: 0,
    setAdminTabIndex: () => { },
});