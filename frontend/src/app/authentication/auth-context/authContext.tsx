// Import Statements
import { parse } from "path";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";

// Define adminData
interface Admin {
    id: string;
    username: string;
};

// Define AuthContext
interface AuthContextType {
    admin: Admin | null;
    isAdminLoggedIn: boolean;
    loginAdmin: (adminData: Admin) => void;
    logoutAdmin: () => void;
    currentPath: string;
    setCurrentPath: (path: string) => void;
};

// Create AuthContext with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider!");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
    const [currentPath, setCurrentPath] = useState<string>("");

    useEffect(() => {
        const storedAdmin = localStorage.getItem("adminData");
        if (storedAdmin) {
            const parsedAdmin: Admin = JSON.parse(storedAdmin);
            setAdmin(parsedAdmin);
            setIsAdminLoggedIn(true);
        }
    }, []);

    const loginAdmin = (adminData: Admin) => {
        setAdmin(adminData);
        setIsAdminLoggedIn(true);
        localStorage.setItem("adminData", JSON.stringify(adminData));
    };

    const logoutAdmin = () => {
        setAdmin(null);
        setIsAdminLoggedIn(false);
        localStorage.removeItem("adminData");
        localStorage.clear();
    };
    
    return (
        <AuthContext.Provider
            value = {{
                admin,
                isAdminLoggedIn, 
                loginAdmin,
                logoutAdmin, 
                currentPath,
                setCurrentPath,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};