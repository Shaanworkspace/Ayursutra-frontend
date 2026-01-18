/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ProtectedRoute({ children, role }) {
    const navigate = useNavigate();

    const { token, role: userRole } = useSelector((state) => state.auth);

    useEffect(() => {
        // Not logged in
        if (!token) {
            toast.error("Please log in first.");
            navigate("/login", { replace: true });
            return;
        }

        // Role mismatch
        if (role && userRole !== role) {
            toast.error("Access denied for this role.");
            navigate("/login", { replace: true });
        }
    }, [token, userRole, role, navigate]);

    return children;
}
