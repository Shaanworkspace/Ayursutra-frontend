/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    Github,
    Chrome,
    Sun,
    Moon,
} from "lucide-react";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/Store/Slices/authSlice";
import { warmupSilent } from "@/utils/warmupSilent";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const baseApi = import.meta.env.VITE_API_GATEWAY_BASE_URL;

    useEffect(() => {
        let cancelled = false;
        const toastId = toast.loading("Starting services… (Render free tier)");

        const warmupAll = async () => {
            await Promise.all([
                warmupSilent({ url: `${baseApi}/api/patients/health` }),
                warmupSilent({ url: `${baseApi}/api/doctors/health` }),
                warmupSilent({ url: `${baseApi}/api/therapists/health` }),
            ]);

            if (!cancelled) toast.success("Services ready", { id: toastId });
        };

        warmupAll();
        return () => (cancelled = true);
    }, []);

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                `${baseApi}/api/user/login`,
                { email, password },
                { timeout: 320000 }
            );

            dispatch(
                setCredentials({ user: res.data, userId: res.data.authId })
            );

            const role = res.data.roles[0];
            if (role === "DOCTOR") navigate("/doctor/dashboard");
            else if (role === "PATIENT") navigate("/patient/dashboard");
            else if (role === "THERAPIST") navigate("/therapist/dashboard");
            else navigate("/select-role");
        } catch {
            toast.error("Please login with correct email");
        }
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center p-4
            ${
                isDark
                    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
                    : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
            }`}
        >
            <div className="absolute w-full max-w-md">
                <div
                    className={`rounded-3xl p-6 sm:p-8 shadow-2xl transition-all
                    ${
                        isDark
                            ? "bg-gray-900 text-gray-100"
                            : "bg-white text-gray-900"
                    }`}
                >
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className=" -top-10 right-2 p-2 rounded-full
                    bg-white/80 dark:bg-gray-800 shadow hover:scale-110 transition"
                    >
                        {isDark ? (
                            <Sun className="w-5 h-5 text-yellow-400" />
                        ) : (
                            <Moon className="w-5 h-5 text-gray-800" />
                        )}
                    </button>
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 bg-gradient-to-br from-indigo-500 to-purple-600">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-indigo-600">
                            Sign in
                        </h1>
                        <p className="text-xs text-gray-500">Welcome Back</p>
                    </div>

                    <div className="space-y-2 mb-5">
                        <button
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border rounded-xl
                        hover:bg-gray-600 dark:hover:bg-gray-800 transition"
                        >
                            <Chrome className="w-4 h-4" />
                            Google
                        </button>
                        <button
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border rounded-xl
                        hover:bg-gray-600 dark:hover:bg-gray-800 transition"
                        >
                            <Github className="w-4 h-4" />
                            GitHub
                        </button>
                    </div>

                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px bg-gray-300" />
                        <span className="text-xs text-gray-500">OR</span>
                        <div className="flex-1 h-px bg-gray-300" />
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-medium">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm
                                    ${
                                        isDark
                                            ? "bg-gray-800 border-gray-700"
                                            : "bg-gray-50 border-gray-200"
                                    }
                                    focus:ring-2 focus:ring-indigo-500`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm
                                    ${
                                        isDark
                                            ? "bg-gray-800 border-gray-700"
                                            : "bg-gray-50 border-gray-200"
                                    }
                                    focus:ring-2 focus:ring-indigo-500`}
                                />
                                <button
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleLogin}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5
                            bg-gradient-to-r from-indigo-600 to-purple-600 text-white
                            font-semibold rounded-xl shadow-lg
                            hover:shadow-xl hover:-translate-y-[1px]
                            active:translate-y-0 transition"
                        >
                            Log In
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-5">
                        Don’t have an account?{" "}
                        <a
                            href="/select-role"
                            className="font-semibold text-indigo-600 hover:underline"
                        >
                            Create one
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
