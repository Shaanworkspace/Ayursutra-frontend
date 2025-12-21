/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
    Eye,
    EyeOff,
    User,
    Mail,
    Lock,
    ArrowRight,
    Github,
    Chrome,
    Sun,
    Moon,
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import axios from "@/lib/axios";

export default function SignupPage() {
    const navigate = useNavigate();
    const url = new URL(window.location.href);

    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const role = url.searchParams.get("role");
    const baseApi = import.meta.env.VITE_API_GATEWAY_BASE_URL;

    const passwordsMismatch =
        password && confirmPassword && password !== confirmPassword;

    useEffect(() => {
        if (!role) {
            toast.info("Select Role Please");
            setTimeout(() => navigate("/select-role"), 2000);
        }
    }, [role]);

    const handleSignUp = async () => {
        const signUpRequest = {
            firstName: fName,
            lastName: lName,
            email,
            password,
            role,
        };

        const toastId = toast.loading("Sending request to server...");

        const coldStartTimer = setTimeout(() => {
            toast.loading(
                "Server is waking up (Render free-tier). Please wait...",
                { id: toastId }
            );
        }, 6000);

        try {
            await axios.post(`${baseApi}/api/user/register`, signUpRequest, {
                timeout: 120000,
            });

            clearTimeout(coldStartTimer);
            toast.success("Account created successfully!", { id: toastId });

            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            clearTimeout(coldStartTimer);

            if (error.code === "ECONNABORTED") {
                toast.error("Server still waking up. Try again.", {
                    id: toastId,
                });
            } else if (error.response) {
                toast.error(error.response.data.message, { id: toastId });
            } else {
                toast.error("Network error", { id: toastId });
            }
        }
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center p-4
            ${
                isDark
                    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
                    : "bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50"
            }`}
        >
            <div className="w-full max-w-md">
                <div
                    className={`rounded-3xl p-6 sm:p-8 shadow-2xl transition-all
                    ${
                        isDark
                            ? "bg-gray-900 text-gray-100"
                            : "bg-white text-gray-900"
                    }`}
                >
                    {/* Theme toggle */}
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="absolute -top-10 right-2 p-2 rounded-full
                        bg-white/80 dark:bg-gray-800 shadow hover:scale-110 transition"
                    >
                        {isDark ? (
                            <Sun className="w-5 h-5 text-yellow-400" />
                        ) : (
                            <Moon className="w-5 h-5 text-gray-800" />
                        )}
                    </button>

                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 bg-gradient-to-br from-cyan-500 to-teal-600">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-cyan-600">
                            Create Account
                        </h1>
                        <p className="text-xs text-gray-500">Join Ayursutra</p>
                    </div>

                    {/* Social */}
                    <div className="space-y-2 mb-5">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border rounded-xl hover:bg-gray-600 dark:hover:bg-gray-800 transition">
                            <Chrome className="w-4 h-4" /> Google
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border rounded-xl hover:bg-gray-600 dark:hover:bg-gray-800 transition">
                            <Github className="w-4 h-4" /> GitHub
                        </button>
                    </div>

                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px bg-gray-300" />
                        <span className="text-xs text-gray-500">OR</span>
                        <div className="flex-1 h-px bg-gray-300" />
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                value={fName}
                                onChange={(e) => setFName(e.target.value)}
                                placeholder="First name"
                                className="px-3 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800"
                            />
                            <input
                                value={lName}
                                onChange={(e) => setLName(e.target.value)}
                                placeholder="Last name"
                                className="px-3 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800"
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            className="w-full px-3 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800"
                        />

                        {passwordsMismatch && (
                            <p className="text-xs text-red-500">
                                Passwords do not match
                            </p>
                        )}

                        <button
                            disabled={passwordsMismatch}
                            onClick={handleSignUp}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5
                            bg-gradient-to-r from-cyan-600 to-teal-600 text-white
                            font-semibold rounded-xl shadow-lg"
                        >
                            Create Account
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-5">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="font-semibold text-cyan-600 hover:underline"
                        >
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
