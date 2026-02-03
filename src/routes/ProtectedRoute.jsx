/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ProtectedRoute({ children, role }) {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);

    const { token, role: userRole } = useSelector((state) => state.auth);

    useEffect(() => {
        const checkAuth = () => {
            if (!token) {
                navigate("/login", { replace: true });
                return;
            }

            // Wrong role
            if (role && userRole !== role) {
                toast.error("Access denied for this role.");
                navigate("/login", { replace: true });
                return;
            }

            // All good
            setIsChecking(false);
        };

        checkAuth();
    }, [token, userRole, role, navigate]);

    if (isChecking) {
        return null;
    }

    return children;
}
