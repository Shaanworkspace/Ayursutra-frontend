/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { toast } from "sonner";

export default function ProtectedRoute({ children, role }) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        // If not logged in
        if (!user) {
            toast.error("Please log in first.");
            navigate("/login", { replace: true });
            return;
        }

        // If logged in but role doesn't match (guard with ?.)
        if (role && !user.roles?.includes(role)) {
            toast.error("Access denied for this role.");
            navigate("/login", { replace: true });
        }
    }, [user, role, navigate]);

    // While redirecting, just render nothing (optional placeholder)
    if (!user || (role && !user.roles?.includes(role))) {
        return null;
    }

    return children;
}
