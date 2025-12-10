/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
    Menu,
    X,
    User,
    Calendar,
    FileText,
    Heart,
    Bell,
    Settings,
    Stethoscope,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Store/Slices/authSlice";

export const PatientNavbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        setIsOpen(false);
        setShowProfileMenu(false);
    };

    // Get user's first name or email
    const userName =
        user?.name?.split(" ")[0] ||
        user?.preferred_username ||
        user?.email?.split("@")[0] ||
        "Patient";

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    {/* ==================== LOGO ==================== */}
                    <Link
                        to="/patient/dashboard"
                        className="flex items-center gap-3 group"
                    >
                        <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow">
                            <Stethoscope className="w-6 h-6 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                Ayursutra
                            </span>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 -mt-1">
                                Patient Portal
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        <NavLink to="/patient/dashboard" icon={Calendar}>
                            Dashboard
                        </NavLink>
                        <NavLink to="/patient/appointments" icon={Calendar}>
                            Appointments
                        </NavLink>
                        <NavLink to="/patient/health-records" icon={FileText}>
                            Health Records
                        </NavLink>
                        <NavLink to="/patient/wellness" icon={Heart}>
                            Wellness
                        </NavLink>

                        {/* Notifications */}
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative">
                            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Profile Menu */}
                        <div className="relative ml-3">
                            <button
                                onClick={() =>
                                    setShowProfileMenu(!showProfileMenu)
                                }
                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    {userName[0].toUpperCase()}
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {userName}
                                </span>
                            </button>

                            {/* Dropdown */}
                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {user?.name || userName}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {user?.email ||
                                                "patient@example.com"}
                                        </p>
                                    </div>

                                    <Link
                                        to="/patient/profile"
                                        onClick={() =>
                                            setShowProfileMenu(false)
                                        }
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <User className="w-4 h-4" />
                                        My Profile
                                    </Link>

                                    <Link
                                        to="/patient/settings"
                                        onClick={() =>
                                            setShowProfileMenu(false)
                                        }
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </Link>

                                    <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                            <X className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex flex-col space-y-2">
                            {/* User Info */}
                            <div className="flex items-center gap-3 px-3 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {userName[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {user?.name || userName}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {user?.email || "patient@example.com"}
                                    </p>
                                </div>
                            </div>

                            <MobileNavLink
                                to="/patient/dashboard"
                                icon={Calendar}
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </MobileNavLink>
                            <MobileNavLink
                                to="/patient/appointments"
                                icon={Calendar}
                                onClick={() => setIsOpen(false)}
                            >
                                Appointments
                            </MobileNavLink>
                            <MobileNavLink
                                to="/patient/health-records"
                                icon={FileText}
                                onClick={() => setIsOpen(false)}
                            >
                                Health Records
                            </MobileNavLink>
                            <MobileNavLink
                                to="/patient/wellness"
                                icon={Heart}
                                onClick={() => setIsOpen(false)}
                            >
                                Wellness
                            </MobileNavLink>
                            <MobileNavLink
                                to="/patient/profile"
                                icon={User}
                                onClick={() => setIsOpen(false)}
                            >
                                My Profile
                            </MobileNavLink>
                            <MobileNavLink
                                to="/patient/settings"
                                icon={Settings}
                                onClick={() => setIsOpen(false)}
                            >
                                Settings
                            </MobileNavLink>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors mt-2"
                            >
                                <X className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

// Desktop Nav Link Component
const NavLink = ({ to, icon: Icon, children }) => (
    <Link
        to={to}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
    >
        <Icon className="w-4 h-4" />
        {children}
    </Link>
);

// Mobile Nav Link Component
const MobileNavLink = ({ to, icon: Icon, children, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
    >
        <Icon className="w-4 h-4" />
        {children}
    </Link>
);
