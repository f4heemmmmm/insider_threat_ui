// Import Statements
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth-context/AuthContext";

interface AdminRouteProps {
    children: ReactNode;
};

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { isAdminLoggedIn } = useAuth();
    return isAdminLoggedIn ? children : <Navigate to = "/administrator-login" replace />
};

export default AdminRoute;