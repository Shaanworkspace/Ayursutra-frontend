/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User } from "lucide-react";

import axios from "@/lib/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/Store/Slices/authSlice";

import ColdStartNotice from "@/components/common/ColdStartNotice";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [showLoadingPopup, setShowLoadingPopup] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");
    const [isGithubLoading, setIsGithubLoading] = useState(false);
    const [githubStatusText, setGithubStatusText] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const baseApi = import.meta.env.VITE_API_GATEWAY_BASE_URL;
    const baseGithubApi = import.meta.env.VITE_API_GATEWAY_GITHUB_URL;
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    useEffect(() => {
        const handleMessage = (event) => {
            console.log("RAW MESSAGE EVENT:", event);

            if (!event.data) {
                toast.error("OAuth failed: empty response");
                return;
            }

            if (!event.data.approvalStatus) {
                toast.error("OAuth failed: invalid payload");
                console.error("Invalid OAuth payload:", event.data);
                return;
            }

            const data = event.data;
            if (data.error) {
                toast.error(data.message || "OAuth login failed");
                return;
            }

            if (!data) return;

            console.log("OAuth data:", data);
            console.log("user : ", data.userResponse);

            if (data.approvalStatus === "PENDING") {
                navigate("/under-review");
                return;
            }

            if (data.approvalStatus === "REJECTED") {
                navigate("/rejected", {
                    state: { reason: data.rejectionReason },
                });
                return;
            }

            if (data.approvalStatus === "APPROVED") {
                dispatch(
                    setCredentials({
                        jwt: data.jwt,
                        role: data.role,
                        userResponse: data.userResponse,
                    }),
                );
                console.log(data);
                if (data.role === "DOCTOR") navigate("/doctor/dashboard");
                else if (data.role === "PATIENT")
                    navigate("/patient/dashboard");
                else if (data.role === "THERAPIST")
                    navigate("/therapist/dashboard");
                else navigate("/select-role");
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    const handleLogin = async () => {
        if (isProcessing) return;
        setIsProcessing(true);

        const toastId = toast.info(
            "Request sent. Server is waking up, response coming…",
        );

        try {
            const res = await axios.post(
                `${baseApi}/api/user/login`,
                { email, password, role: selectedRole },
                { timeout: 420000 },
            );
            console.log(res);
            if (res.status === 202) {
                navigate("/under-review");
            }

            if (res.status === 403) {
                navigate("/rejected", {
                    state: { reason: res.data.rejectionReason },
                });
            }

            toast.success("Login successful", { id: toastId });
            console.log(res.data);
            dispatch(
                setCredentials({
                    jwt: res.data.jwt,
                    role: res.data.role,
                }),
            );

            console.log("Login gave to Slice: ", res.data);

            const role = res.data.role;
            if (role === "DOCTOR") navigate("/doctor/dashboard");
            else if (role === "PATIENT") navigate("/patient/dashboard");
            else if (role === "THERAPIST") navigate("/therapist/dashboard");
            else navigate("/select-role");
        } catch {
            toast.error("Login failed or server unavailable", { id: toastId });
        } finally {
            setIsProcessing(false);
        }
    };

	const checkRole = () => {
		if (!selectedRole) {
			toast.warning("Please Select a Role ");
			return false;
		} else {
			return true;
		}
	}
	const handleGithubLogin = async () => {
		if (!checkRole() || isGithubLoading) {
			return;
		}

        setIsGithubLoading(true);
        setGithubStatusText("Redirecting to GitHub…");

        const oauthUrl = `${baseGithubApi}/api/user/oauth2/start/github?role=${selectedRole}`;

        window.open(oauthUrl, "githubLogin", "width=600,height=700");

        setTimeout(() => {
            setIsGithubLoading(false);
            setGithubStatusText("");
        }, 10000);
    };

    const handleGoogleLogin = async () => {
        if (!checkRole() || isGoogleLoading) return;

        setIsGoogleLoading(true);
        const oauthUrl = `${baseGithubApi}/api/user/oauth2/start/google?role=${selectedRole}`;
        window.open(oauthUrl, "googleLogin", "width=600,height=700");
        setTimeout(() => {
            setIsGoogleLoading(false);
        }, 10000);
    };

    const canLogin =
        email.trim() !== "" &&
        password.trim() !== "" &&
        selectedRole.trim() !== "" &&
        !isProcessing;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4 relative">
            {/* FLOATING LOADING POPUP */}
            {isProcessing && (
                <div className="fixed top-6 right-6 z-50">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 shadow-xl">
                        <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                        <p className="text-sm text-gray-300">
                            Server waking up, Render (Free-Tier) response
                            incoming…
                        </p>
                    </div>
                </div>
            )}

            {/* LOGIN CARD */}
            <div className="w-full max-w-md bg-gray-900 rounded-3xl shadow-2xl p-8 text-gray-100">
                <div className="text-center mb-6">
                    {/* <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg">
                        <Lock className="w-6 h-6 text-white" />
                    </div> */}
                    <h1 className="text-2xl font-bold text-indigo-400">
                        Sign in
                    </h1>
                    {/* <p className="text-xs text-gray-500">Welcome back</p> */}
                </div>

                <div className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="text-xs text-gray-400">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
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
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-400"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Role Selection Section */}
                    <div>
                        <label className="text-xs font-medium text-gray-400 mb-2 block">
                            Select Role
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { id: "DOCTOR", label: "Doctor", icon: "🩺" },
                                { id: "PATIENT", label: "Patient", icon: "💊" },
                                {
                                    id: "THERAPIST",
                                    label: "Therapist",
                                    icon: "🧠",
                                },
                            ].map((role) => {
                                const isSelected = selectedRole === role.id;
                                return (
                                    <button
                                        key={role.id}
                                        type="button"
                                        onClick={() => setSelectedRole(role.id)}
                                        className={`relative group flex flex-col items-center justify-center py-4 px-2 rounded-xl border transition-all duration-300
                        ${
                            isSelected
                                ? "border-indigo-500 bg-gradient-to-tr from-indigo-600/40 to-purple-600/30"
                                : "border-gray-700 bg-gray-800/60 hover:border-indigo-400 hover:bg-gray-800"
                        }
                    `}
                                    >
                                        {/* Tick Icon When Selected */}
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 bg-indigo-500 p-1 rounded-full">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2.5}
                                                    stroke="white"
                                                    className="w-3 h-3"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                        )}

                                        {/* Icon + Label */}
                                        <span className="text-2xl mb-1">
                                            {role.icon}
                                        </span>
                                        <span
                                            className={`text-sm font-medium ${
                                                isSelected
                                                    ? "text-indigo-300"
                                                    : "text-gray-400"
                                            }`}
                                        >
                                            {role.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* LOGIN BUTTON */}
                    <ColdStartNotice />
                    <button
                        onClick={handleLogin}
                        disabled={!canLogin}
                        className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl
                            bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg transition
                            ${
                                canLogin
                                    ? "hover:from-indigo-500 hover:to-purple-500"
                                    : "opacity-50 cursor-not-allowed"
                            }
                        `}
                    >
                        {isProcessing ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Processing…
                            </>
                        ) : (
                            <>
                                Log In
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={ isGoogleLoading}
                        className={`w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-xl
        bg-gray-800 border border-gray-700 text-gray-200 font-semibold
        transition-all duration-300 ease-in-out
        ${
            isGoogleLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-gray-700 hover:border-gray-600 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] active:scale-[0.98]"
        }
    `}
                    >
                        {isGoogleLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                <span className="animate-pulse">
                                    Redirecting to Google...
                                </span>
                            </>
                        ) : (
                            <>
                                {/* Standard Google Multi-color Icon */}
                                <svg
                                    className="w-5 h-5 mr-1"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="#EA4335"
                                        d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M16.04 18.013c-1.09.593-2.325.914-3.64.914-2.827 0-5.242-1.896-6.135-4.481L2.24 17.56C4.198 21.502 8.27 24 12 24c3.055 0 5.782-1.145 7.91-3L16.04 18.013z"
                                    />
                                    <path
                                        fill="#4285F4"
                                        d="M19.91 21c2.128-1.855 3.59-4.582 3.59-8.455 0-.58-.053-1.145-.155-1.69H12v4.63h6.49c-.28 1.51-1.137 2.782-2.41 3.633L19.91 21z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.266 14.235A7.077 7.077 0 0 1 4.909 12c0-.79.13-1.554.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.24 5.35l4.026-3.115z"
                                    />
                                </svg>
                                <span>Login with Google</span>
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleGithubLogin}
                        disabled={isGithubLoading}
                        className={`w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-xl
        bg-gray-800 border border-gray-700 text-gray-200 font-semibold
        transition-all duration-300 hover:shadow-2xs
        ${
            isGithubLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-gray-700"
        }
    `}
                    >
                        {isGithubLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                                <span>{githubStatusText || "Working…"}</span>
                            </>
                        ) : (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path d="M12 .5C5.73.5.5 5.74.5 12.03c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.1c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.02 1.76 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.29-5.23-5.73 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.45.11-3.03 0 0 .97-.31 3.18 1.19a10.8 10.8 0 0 1 2.9-.4c.98 0 1.97.14 2.9.4 2.2-1.5 3.18-1.19 3.18-1.19.62 1.58.23 2.74.11 3.03.73.81 1.18 1.85 1.18 3.11 0 4.45-2.68 5.43-5.24 5.71.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.79.56 4.57-1.53 7.86-5.85 7.86-10.95C23.5 5.74 18.27.5 12 .5Z" />
                                </svg>
                                Login with GitHub
                            </>
                        )}
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
