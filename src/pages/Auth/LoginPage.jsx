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

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const baseApi = import.meta.env.VITE_API_GATEWAY_BASE_URL;

    useEffect(() => {
        let cancelled = false;

        const toastId = toast.info("Render (free-tier): Starting services...");

        const warmupAll = async () => {
            try {
                await Promise.all([
                    warmupSilent({ url: `${baseApi}/api/patients/health` }),
                    warmupSilent({ url: `${baseApi}/api/doctors/health` }),
                    warmupSilent({ url: `${baseApi}/api/therapists/health` }),
                ]);

                if (!cancelled) {
                    toast.success("All services are ready", { id: toastId });
                }
            } catch (err) {
                if (!cancelled) {
                    toast.error("Failed to wake services", { id: toastId });
                }
            }
        };

        warmupAll();

        return () => {
            cancelled = true;
        };
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
            toast.error("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4">
            <div className="w-full max-w-md bg-gray-900 rounded-3xl shadow-2xl p-8 text-gray-100">
                {/* Header */}
                <div className="text-center mb-6">
                    <div
                        className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-xl
                        bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg"
                    >
                        <Lock className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-indigo-400">
                        Sign in
                    </h1>
                    <p className="text-xs text-gray-500">Welcome back</p>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="text-xs text-gray-400">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl
                                bg-gray-800 border border-gray-700
                                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                hover:border-gray-500 transition"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-xs text-gray-400">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                placeholder="Enter Password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl
                                bg-gray-800 border border-gray-700
                                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                hover:border-gray-500 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2
                                text-gray-400 hover:text-indigo-400 transition"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleLogin}
                        className="w-full flex items-center justify-center gap-2 py-2.5
                        bg-gradient-to-r from-indigo-600 to-purple-600
                        text-white font-semibold rounded-xl shadow-lg
                        hover:from-indigo-500 hover:to-purple-500
                        hover:-translate-y-[1px] hover:shadow-xl
                        active:translate-y-0 transition"
                    >
                        Log In
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <a
                        href="/select-role"
                        className="text-indigo-400 font-semibold hover:text-indigo-300 hover:underline transition"
                    >
                        Create one
                    </a>
                </p>
            </div>
        </div>
    );
}
