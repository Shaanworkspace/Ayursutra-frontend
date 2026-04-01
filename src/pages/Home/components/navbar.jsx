/* eslint-disable no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Store/Slices/authSlice";

// Helper function to get initial theme (runs only once)
const getInitialTheme = () => {
    if (typeof window === "undefined") return false;
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;
    return savedTheme === "dark" || (!savedTheme && prefersDark);
};

export default function Navbar() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem("theme", newMode ? "dark" : "light");
    };

    const handleLogout = () => {
        dispatch(logout());
        setIsOpen(false);
    };

    return (
        <div className="fixed top-4 left-0 right-0 z-50 px-4">
            {/* FLOATING GLASS NAVBAR */}
            <nav className="max-w-7xl mx-auto rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-2xl transition-all duration-300">
                <div className="px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/doctor/dashboard"
                        className="flex flex-row items-center gap-2"
                    >
                        <div className="p-2 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl shadow">
                            <img
                                src="/logo.svg"
                                alt="Ayursutra Logo"
                                className="w-5 h-5 object-contain"
                            />
                        </div>

                        <span className="text-2xl font-bold transition-colors">
                            Ayursutra
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6 text-gray-800 dark:text-gray-200 font-medium">
                        <Link
                            to="/"
                            className="hover:text-cyan-600 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/home/therapists"
                            className="hover:text-cyan-600 transition-colors"
                        >
                            Hospitals
                        </Link>
                        <Link
                            to="https://ors.gov.in/healthid/index.jsp?NICSecurityORS=695I-GWGL-CHQY-481B-3N07-C98I-5ZDA-I36X"
                            className="hover:text-cyan-600 transition-colors"
                        >
                            Create ABHA (Health ID)
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition"
                            aria-label="Toggle theme"
                        >
                            {isDarkMode ? (
                                <Sun className="h-5 w-5 text-yellow-500" />
                            ) : (
                                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-200" />
                            )}
                        </button>

                        {/* Login / Profile */}
                        {user ? (
                            <div className="flex items-center gap-3">
                                <Button variant="outline" size="sm" asChild>
                                    <Link to="/profile">
                                        Hi, {user?.name || user?.email}
                                    </Link>
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <Button variant="outline" size="sm" asChild>
                                <Link to="/login">Login</Link>
                            </Button>
                        )}
                    </div>

                    {/* Mobile Controls */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition"
                        >
                            {isDarkMode ? (
                                <Sun className="h-5 w-5 text-yellow-500" />
                            ) : (
                                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-200" />
                            )}
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                {isOpen && (
                    <div className="md:hidden border-t border-white/20 dark:border-white/10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-b-2xl">
                        <div className="flex flex-col items-center py-4 space-y-4 font-medium text-gray-800 dark:text-gray-200">
                            <Link to="/" onClick={() => setIsOpen(false)}>
                                Home
                            </Link>
                            <Link
                                to="/home/therapists"
                                onClick={() => setIsOpen(false)}
                            >
                                Therapists
                            </Link>
                            <Link
                                to="/appointments"
                                onClick={() => setIsOpen(false)}
                            >
                                Appointments
                            </Link>

                            {user ? (
                                <>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Hi, {user?.name || user?.email}
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <Button variant="outline" size="sm" asChild>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Login
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}
