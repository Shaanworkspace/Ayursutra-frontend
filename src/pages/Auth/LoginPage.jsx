/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    Github,
    Chrome,
} from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/Store/Slices/authSlice";
import { toast } from "sonner";
import {  useNavigate } from "react-router";
import {jwtDecode} from "jwt-decode";


export default function LoginPage() {
    const emailRef = useRef(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    useEffect(() => emailRef.current?.focus(), []);

    const validate = () => {
        const errs = {};
        if (!email) errs.email = "Email is required.";
        // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim()))
        //     errs.email = "Enter a valid email address.";

        if (!password) errs.password = "Password is required.";
        else if (password.length < 2)
            errs.password = "Password must be at least 2 characters.";

        return errs;
    };

    const handleBackendLogin = async (e) => {
        e.preventDefault();
        const validation = validate();
        if (Object.keys(validation).length) {
            setErrors(validation);
            emailRef.current?.focus();
            return;
        }
        setIsLoading(true);

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_GATEWAY_BASE_URL}/api/auth/login`,
                {
                    email: email.trim(),
                    password: password,
                }
            );

            const data = res.data;
            const decoded = jwtDecode(data.access_token);
            console.log(decoded);

            //Extracting the role
            let userRole = null;
            const roles = decoded.realm_access?.roles || [];
            if (roles.includes("PATIENT")) userRole = "PATIENT";
            else if (roles.includes("DOCTOR")) userRole = "DOCTOR";
            else if (roles.includes("THERAPIST")) userRole = "THERAPIST";
            if (!userRole && decoded.role) {
                userRole = decoded.role;
            }
            console.log("Role: ",userRole)

            // Save to Redux + LocalStorage
            dispatch(
                setCredentials({
                    token: data.access_token,
                    user: decoded,
                })
            );
            toast.success("Login successful!");
            
            switch (userRole) {
                case "PATIENT":
                    navigate("/patient/dashboard");
                    break;
                case "DOCTOR":
                    navigate("/doctor/dashboard");
                    break;
                case "THERAPIST":
                    navigate("/therapist/dashboard");
                    break;
                default:
                    navigate("/login"); // fallback if no role
            }
        } catch (err) {
            console.error(err);
            toast.error("Invalid credentials or login failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOAuthLogin = (provider) => {
        alert(`Redirecting to ${provider}...`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-950 dark:to-indigo-950 p-4 overflow-y-auto">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            </div>

            <div className="w-full max-w-md relative z-10 my-4">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/30 dark:border-gray-700/50">
                    {/* Header - Compact */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mb-3 shadow-lg">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs">
                            Sign in to continue your journey
                        </p>
                    </div>

                    {/* Social Login - Compact */}
                    <div className="space-y-2 mb-5">
                        <button
                            onClick={() => handleOAuthLogin("Google")}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all group"
                        >
                            <Chrome className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Continue with Google
                            </span>
                        </button>

                        <button
                            onClick={() => handleOAuthLogin("GitHub")}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-400 dark:hover:border-purple-500 transition-all group"
                        >
                            <Github className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-purple-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Continue with GitHub
                            </span>
                        </button>
                    </div>

                    {/* Divider - Compact */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            OR
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                    </div>

                    {/* Email/Password Form - Compact */}
                    <div className="space-y-4">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    id="email"
                                    ref={emailRef}
                                    type="email"
                                    value={email}
                                    placeholder="you@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full pl-10 pr-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border-2 ${
                                        errors.email
                                            ? "border-red-400"
                                            : "border-gray-200 dark:border-gray-700"
                                    } rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 transition-all text-gray-900 dark:text-gray-100`}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    placeholder="Enter your password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className={`w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border-2 ${
                                        errors.password
                                            ? "border-red-400"
                                            : "border-gray-200 dark:border-gray-700"
                                    } rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 transition-all text-gray-900 dark:text-gray-100`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between text-xs">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) =>
                                        setRememberMe(e.target.checked)
                                    }
                                    className="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-gray-600 dark:text-gray-400">
                                    Remember me
                                </span>
                            </label>
                            <a
                                href="/forgot-password"
                                className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            onClick={handleBackendLogin}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-5">
                        Don't have an account?{" "}
                        <a
                            href="/signup"
                            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
                        >
                            Create one
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
