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
    if (typeof window === "undefined") return false; // SSR safety
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

    // Use lazy initialization instead of useEffect for initial state
    const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

    // Sync dark mode class with DOM (external system)
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    // Toggle theme
    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem("theme", newMode ? "dark" : "light");
    };

    // Main logout action
    const handleLogout = () => {
        dispatch(logout());
        setIsOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border-b border-white/20 dark:border-gray-700/30 transition-all duration-300">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold tracking-tight text-cyan-700 dark:text-cyan-300 hover:opacity-90"
                >
                    Ayursutra
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
                        Therapists
                    </Link>
                    <Link
                        to="/appointments"
                        className="hover:text-cyan-600 transition-colors"
                    >
                        Appointments
                    </Link>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? (
                            <Sun className="h-5 w-5 text-yellow-500" />
                        ) : (
                            <Moon className="h-5 w-5 text-gray-600" />
                        )}
                    </button>

                    {/* Login / Profile Buttons */}
                    {user ? (
                        <div className="flex items-center space-x-3">
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

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center space-x-2">
                    {/* Theme Toggle Mobile */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? (
                            <Sun className="h-5 w-5 text-yellow-500" />
                        ) : (
                            <Moon className="h-5 w-5 text-gray-600 dark:text-gray-200" />
                        )}
                    </button>

                    <button
                        className="text-gray-800 dark:text-gray-200 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
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
                <div className="md:hidden bg-white/50 dark:bg-gray-900/60 backdrop-blur-lg border-t border-white/20 dark:border-gray-700/30 py-4 shadow-lg">
                    <div className="flex flex-col items-center space-y-4 font-medium text-gray-800 dark:text-gray-200">
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="hover:text-cyan-600 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/home/therapists"
                            onClick={() => setIsOpen(false)}
                            className="hover:text-cyan-600 transition-colors"
                        >
                            Therapists
                        </Link>
                        <Link
                            to="/appointments"
                            onClick={() => setIsOpen(false)}
                            className="hover:text-cyan-600 transition-colors"
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
    );
}
