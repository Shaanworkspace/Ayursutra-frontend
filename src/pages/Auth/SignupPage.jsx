/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { Eye, EyeOff, ArrowRight, User } from "lucide-react";
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
    const role = url.searchParams.get("role");
    const baseApi = import.meta.env.VITE_API_GATEWAY_BASE_URL;
    const passwordsMatch =
        password.length > 0 &&
        confirmPassword.length > 0 &&
        password !== confirmPassword;

    useEffect(() => {
        if (!role) {
            toast.info("Select Role Please");
            setTimeout(() => {
                navigate("/select-role");
            }, 2000);
            return;
        }
    }, [role, navigate]);

    const handleSignUp = async () => {
        const SignUpRequest = {
            firstName: fName,
            lastName: lName,
            email,
            password,
            role,
        };
        const config = {
            header: {
                "Content-Type": "application/json",
            },
            timeout: 320000,
        };
        try {
            const res = await axios.post(
                `${baseApi}/api/user/register`,
                SignUpRequest,
                config
            );
            const status = res.status;
            console.log(res.status);
            if (status == 201) {
                toast.success(
                    "Account Created Successfully !! Navigating to Login Page"
                );
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (error) {
            if (error.code === "ECONNABORTED") {
                console.log("Render is taking time to wake up ! Please Retry");
            } else if (error.response) {
                const message =
                    error.response.data.message ||
                    "An unexpected error occurred.";
                toast.error(message);
            } else {
                console.log("Other error", error);
            }
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-teal-100 p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl mb-3">
                        <User className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-cyan-600">
                        Sign Up
                    </h1>
                </div>

                {/* Form */}
                <form className="space-y-4">
                    {/* Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={fName}
                            onChange={(e) => setFName(e.target.value)}
                            placeholder="First name*"
                            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-xl"
                        />
                        <input
                            type="text"
                            value={lName}
                            onChange={(e) => setLName(e.target.value)}
                            placeholder="Last name"
                            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-xl"
                        />
                    </div>

                    {/* Email */}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address*"
                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-xl"
                    />
                    {/* Passwords */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password*"
                                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-xl pr-10"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Eye size={16} />
                            </span>
                        </div>

                        <div className="relative">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="Confirm password*"
                                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-xl pr-10"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <EyeOff size={16} />
                            </span>
                        </div>
                    </div>
                    {passwordsMatch && (
                        <p className="text-xs text-red-500 mt-1">
                            Passwords do not match
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        disabled={passwordsMatch}
                        onClick={handleSignUp}
                        type="button"
                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl shadow-lg
                                            ${
                                                !passwordsMatch
                                                    ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white"
                                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            }`}
                    >
                        <span>Create Account</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Social buttons */}
                    <div className="flex flex-col gap-2 mt-4">
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl"
                        >
                            <span>Continue with Google</span>
                        </button>

                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl"
                        >
                            <span>Continue with GitHub</span>
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <p className="text-center text-xs text-gray-600 mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="font-semibold text-cyan-600">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}
