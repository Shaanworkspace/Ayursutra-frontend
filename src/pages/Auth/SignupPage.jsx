/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    User,
    Phone,
    Stethoscope,
    Heart,
    Users,
    Check,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function SignupPage() {
    const emailRef = useRef(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phone: "",
        role: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => emailRef.current?.focus(), []);

    const roles = [
        {
            id: "PATIENT",
            label: "Patient",
            icon: Heart,
            description: "Book appointments and manage health",
            color: "cyan",
        },
        {
            id: "DOCTOR",
            label: "Doctor",
            icon: Stethoscope,
            description: "Provide consultations and treatment",
            color: "teal",
        },
        {
            id: "THERAPIST",
            label: "Therapist",
            icon: Users,
            description: "Offer therapy and wellness sessions",
            color: "blue",
        },
    ];

    const validate = () => {
        const errs = {};

        if (!formData.firstName.trim())
            errs.firstName = "First name is required.";
        if (!formData.email.trim()) errs.email = "Email is required.";
        else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                formData.email.trim()
            )
        )
            errs.email = "Enter a valid email address.";

        if (!formData.password) errs.password = "Password is required.";
        else if (formData.password.length < 1)
            errs.password = "Password must be at least 1 characters.";

        if (!formData.confirmPassword)
            errs.confirmPassword = "Please confirm your password.";
        else if (formData.password !== formData.confirmPassword)
            errs.confirmPassword = "Passwords do not match.";

        // if (!formData.phone.trim()) errs.phone = "Phone number is required.";
        // else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phone.trim()))
        //     errs.phone = "Enter a valid phone number.";

        if (!formData.role) errs.role = "Please select a role.";

        return errs;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleRoleSelect = (roleId) => {
        setFormData((prev) => ({ ...prev, role: roleId }));
        if (errors.role) {
            setErrors((prev) => ({ ...prev, role: "" }));
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const validation = validate();
        if (Object.keys(validation).length) {
            setErrors(validation);
            return;
        }

        setIsLoading(true);

        try {
            const res = await axios.post(
                `${
                    import.meta.env.VITE_API_GATEWAY_BASE_URL
                }/api/auth/register`,
                {
                    email: formData.email.trim(),
                    password: formData.password,
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    phone: formData.phone.trim(),
                    role: formData.role,
                }
            );

            toast.success("Registration successful! Please login.");
            navigate("/login");
        } catch (err) {
            const errorMsg =
                err.response?.data?.error ||
                "Registration failed. Please try again.";
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50/60 via-teal-50 to-cyan-100/50 dark:from-gray-950 dark:via-teal-950 dark:to-cyan-950 p-4 overflow-y-auto">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            </div>

            <div className="w-full max-w-2xl relative z-10 my-8">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/30 dark:border-gray-700/50">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl mb-3 shadow-lg">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                            Create Your Account
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs">
                            Join us and start your wellness journey
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                                >
                                    First Name *
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="John"
                                        className={`w-full pl-10 pr-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border-2 ${
                                            errors.firstName
                                                ? "border-red-400"
                                                : "border-gray-200 dark:border-gray-700"
                                        } rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:focus:ring-cyan-900/30 transition-all text-gray-900 dark:text-gray-100`}
                                    />
                                </div>
                                {errors.firstName && (
                                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                        {errors.firstName}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                                >
                                    Last Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:focus:ring-cyan-900/30 transition-all text-gray-900 dark:text-gray-100"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                            >
                                Email Address *
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    id="email"
                                    ref={emailRef}
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className={`w-full pl-10 pr-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border-2 ${
                                        errors.email
                                            ? "border-red-400"
                                            : "border-gray-200 dark:border-gray-700"
                                    } rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:focus:ring-cyan-900/30 transition-all text-gray-900 dark:text-gray-100`}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                            >
                                Phone Number *
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 123-4567"
                                    className={`w-full pl-10 pr-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border-2 ${
                                        errors.phone
                                            ? "border-red-400"
                                            : "border-gray-200 dark:border-gray-700"
                                    } rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:focus:ring-cyan-900/30 transition-all text-gray-900 dark:text-gray-100`}
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                                >
                                    Password *
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className={`w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border-2 ${
                                            errors.password
                                                ? "border-red-400"
                                                : "border-gray-200 dark:border-gray-700"
                                        } rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:focus:ring-cyan-900/30 transition-all text-gray-900 dark:text-gray-100`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((s) => !s)
                                        }
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

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                                >
                                    Confirm Password *
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className={`w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border-2 ${
                                            errors.confirmPassword
                                                ? "border-red-400"
                                                : "border-gray-200 dark:border-gray-700"
                                        } rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:focus:ring-cyan-900/30 transition-all text-gray-900 dark:text-gray-100`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword((s) => !s)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Select Your Role *
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {roles.map((role) => {
                                    const Icon = role.icon;
                                    const isSelected =
                                        formData.role === role.id;
                                    return (
                                        <button
                                            key={role.id}
                                            type="button"
                                            onClick={() =>
                                                handleRoleSelect(role.id)
                                            }
                                            className={`relative p-4 rounded-xl border-2 transition-all ${
                                                isSelected
                                                    ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20"
                                                    : "border-gray-200 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-700"
                                            }`}
                                        >
                                            {isSelected && (
                                                <div className="absolute top-2 right-2 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                                                    <Check className="w-3 h-3 text-white" />
                                                </div>
                                            )}
                                            <Icon
                                                className={`w-8 h-8 mx-auto mb-2 ${
                                                    isSelected
                                                        ? "text-cyan-600 dark:text-cyan-400"
                                                        : "text-gray-400"
                                                }`}
                                            />
                                            <h3
                                                className={`text-sm font-semibold mb-1 ${
                                                    isSelected
                                                        ? "text-cyan-700 dark:text-cyan-300"
                                                        : "text-gray-900 dark:text-gray-100"
                                                }`}
                                            >
                                                {role.label}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {role.description}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.role && (
                                <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                                    {errors.role}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="button"
                            onClick={handleSignup}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-6">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700"
                        >
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
