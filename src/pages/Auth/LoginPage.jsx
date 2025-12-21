/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
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
    const [servicesLoading, setServicesLoading] = useState(true);
    const [showLoadingPopup, setShowLoadingPopup] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const baseApi = import.meta.env.VITE_API_GATEWAY_BASE_URL;

    useEffect(() => {
        let cancelled = false;

        const warmupAll = async () => {
            try {
                await Promise.all([
                    warmupSilent({ url: `${baseApi}/api/patients/health` }),
                    warmupSilent({ url: `${baseApi}/api/doctors/health` }),
                    warmupSilent({ url: `${baseApi}/api/therapists/health` }),
                ]);

                if (!cancelled) {
                    setServicesLoading(false);
                    setShowLoadingPopup(false);
                    toast.success("Services started successfully");
                }
            } catch {
                if (!cancelled) {
                    setServicesLoading(false);
                    setShowLoadingPopup(false);
                    toast.error("Failed to start services");
                }
            }
        };

        warmupAll();
        return () => (cancelled = true);
    }, []);

    const handleLogin = async () => {
        if (servicesLoading) {
            setShowLoadingPopup(true);
            return;
        }

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
            toast.error("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4 relative">
            {/* FLOATING LOADING POPUP */}
            {showLoadingPopup && servicesLoading && (
                <div className="fixed top-6 right-6 z-50">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 shadow-xl">
                        <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                        <p className="text-sm text-gray-300">
                            Render (free-tier) takes time to wake server, please
                            wait…
                        </p>
                    </div>
                </div>
            )}

            {/* LOGIN CARD */}
            <div className="w-full max-w-md bg-gray-900 rounded-3xl shadow-2xl p-8 text-gray-100">
                <div className="text-center mb-6">
                    <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg">
                        <Lock className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-indigo-400">
                        Sign in
                    </h1>
                    <p className="text-xs text-gray-500">Welcome back</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-400">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={servicesLoading}
                                className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                                placeholder="Email"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-gray-400">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={servicesLoading}
                                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                                placeholder="Enter password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={servicesLoading}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:from-indigo-500 hover:to-purple-500 transition"
                    >
                        Log In
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <p className="text-center text-xs text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <a
                        href="/select-role"
                        className="text-indigo-400 font-semibold hover:underline"
                    >
                        Create one
                    </a>
                </p>
            </div>
        </div>
    );
}
