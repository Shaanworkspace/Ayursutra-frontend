/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
    const { token } = useSelector((state) => state.auth);
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}