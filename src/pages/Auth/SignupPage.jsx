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
    const [showCPassword, setShowCPassword] = useState(false);
    const [showLoadingPopup, setShowLoadingPopup] = useState(false);

    const role = url.searchParams.get("role");
    const baseApi = import.meta.env.VITE_API_GATEWAY_BASE_URL;

    const passwordsMismatch =
        password && confirmPassword && password !== confirmPassword;

    useEffect(() => {
        if (!role) {
            toast.info("Please select a role first");
            setTimeout(() => navigate("/select-role"), 2000);
        }
    }, [role]);

    const validateForm = () => {
        if (
            !fName.trim() ||
            !lName.trim() ||
            !email.trim() ||
            !password.trim() ||
            !confirmPassword.trim()
        ) {
            toast.error("Please fill in all fields.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long.");
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return false;
        }

        return true;
    };

    const handleSignUp = async () => {
        if (!validateForm()) return;

        const signUpRequest = {
            firstName: fName,
            lastName: lName,
            email,
            password,
            role,
        };

        setShowLoadingPopup(true);

        try {
            await axios.post(`${baseApi}/api/user/register`, signUpRequest, {
                timeout: 120000,
            });

            setShowLoadingPopup(false);
            toast.success("Account created successfully");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setShowLoadingPopup(false);

            if (error.code === "ECONNABORTED") {
                toast.error("Server waking up. Please retry.");
            } else if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Network error");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4 relative">
            {/* FLOATING LOADING POPUP */}
            {showLoadingPopup && (
                <div className="fixed top-6 right-6 z-50">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 shadow-xl">
                        <div className="w-4 h-4 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
                        <p className="text-sm text-gray-300">
                            Render (free-tier) takes time to wake server, please
                            wait…
                        </p>
                    </div>
                </div>
            )}

            <div className="w-full max-w-md">
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-6">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-600 to-teal-600">
                            <User className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-semibold text-white">
                            Create Account
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Join Ayursutra securely
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                value={fName}
                                onChange={(e) => setFName(e.target.value)}
                                placeholder="First name"
                                className="rounded-xl bg-gray-800 border border-gray-700 px-3 py-2.5 text-sm text-white"
                            />
                            <input
                                value={lName}
                                onChange={(e) => setLName(e.target.value)}
                                placeholder="Last name"
                                className="rounded-xl bg-gray-800 border border-gray-700 px-3 py-2.5 text-sm text-white"
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                className="w-full pl-10 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type={showCPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="Confirm Password"
                                className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-800 text-sm text-white ${
                                    passwordsMismatch
                                        ? "border border-red-500"
                                        : "border border-gray-700"
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowCPassword(!showCPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showCPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        <button
                            disabled={passwordsMismatch}
                            onClick={handleSignUp}
                            className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold disabled:opacity-50"
                        >
                            Create Account
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <p className="mt-6 text-center text-xs text-gray-400">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-cyan-400 hover:underline"
                        >
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
