/* eslint-disable no-unused-vars */
// src/pages/Auth/LoginPage.jsx
import React, { use, useEffect, useState } from "react";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    Github,
    Chrome,
} from "lucide-react";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/Store/Slices/authSlice";
import { warmupService } from "@/utils/warmupService";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatcher = useDispatch();

    const baseApi = import.meta.env.VITE_API_GATEWAY_BASE_URL;
    useEffect(() => {
        const warmupAll = async () => {
            await Promise.allSettled([
                warmupService({
                    url: `${baseApi}/api/user/health`,
                    label: "User",
                }),
                warmupService({
                    url: `${baseApi}/api/patients/health`,
                    label: "Patient",
                }),
                warmupService({
                    url: `${baseApi}/api/doctors/health`,
                    label: "Doctor",
                }),
                warmupService({
                    url: `${baseApi}/api/therapists/health`,
                    label: "Therapist",
                }),
            ]);
        };

        warmupAll();
    }, []);

    const handleLogin = async () => {
        const loginObject = {
            email: email,
            password: password,
        };
        const config = {
            header: {
                "Content-Type": "application/json",
            },
            timeout: 320000,
        };
        try {
            const res = await axios.post(
                `${baseApi}/api/user/login`,
                loginObject,
                config
            );
            dispatcher(
                setCredentials({ user: res.data, userId: res.data.authId })
            );
            console.log(res.data);
            const currRole = res.data.roles;
            console.log(currRole);
            switch (currRole[0]) {
                case "DOCTOR":
                    navigate("/doctor/dashboard");
                    break;
                case "PATIENT":
                    navigate("/patient/dashboard");
                    break;
                case "THERAPIST":
                    navigate("/therapist/dashboard");
                    break;
                default:
                    navigate("/select-role");
            }
        } catch (error) {
            if (error.code === "ECONNABORTED") {
                console.log("Render is taking time to wake up ! Please Retry");
            } else {
                toast.error("Please Login with correct Email");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 overflow-y-auto">
            {/* Background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-20"></div>
            </div>

            <div className="w-full max-w-md relative z-10 my-4">
                <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mb-3">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600 mt-1 text-xs">
                            Sign in to continue your journey
                        </p>
                    </div>

                    {/* Social Login */}
                    <div className="space-y-2 mb-5">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-xl">
                            <Chrome className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">
                                Continue with Google
                            </span>
                        </button>

                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-xl">
                            <Github className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">
                                Continue with GitHub
                            </span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="text-xs text-gray-500">OR</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    {/* Email / Password */}
                    <div className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-xl"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Eye className="w-4 h-4" />
                                </span>
                            </div>
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between text-xs">
                            <label className="flex items-center gap-1.5">
                                <input
                                    type="checkbox"
                                    className="w-3.5 h-3.5 rounded border-gray-300"
                                />
                                <span className="text-gray-600">
                                    Remember me
                                </span>
                            </label>
                            <a
                                href="/forgot-password"
                                className="font-medium text-indigo-600"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            onClick={handleLogin}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-xl shadow-lg"
                        >
                            <span>Log In</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-xs text-gray-600 mt-5">
                        Don't have an account?{" "}
                        <a
                            href="/select-role"
                            className="font-semibold text-indigo-600"
                        >
                            Create one
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
