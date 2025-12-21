/* eslint-disable no-unused-vars */
// doctor/components/DoctorNavbar.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Store/Slices/authSlice";
import {
    Menu,
    X,
    Stethoscope,
    LayoutDashboard,
    Calendar,
    Users,
    Video,
    Moon,
    Sun,
    LogOut,
    User,
    ChevronDown,
    Settings,
} from "lucide-react";

export default function DoctorNavbar() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    const userName = user?.name?.split(" ")[0] || "Doctor";

    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            document.documentElement.classList.toggle("dark", !prev);
            return !prev;
        });
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="fixed top-4 left-0 right-0 z-50 px-4">
            {/* GLASSY FLOATING NAV */}
            <nav className="max-w-7xl mx-auto rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-white/10 shadow-2xl">
                <div className="px-4 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/patient/dashboard"
                        className="flex items-center gap-3"
                    >
                        <div className="p-2 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl shadow">
                            <img
                                src="/logo.svg"
                                alt="Ayursutra Logo"
                                className="w-5 h-5 object-contain"
                            />
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-lg font-bold text-white">
                                Ayursutra
                            </p>
                            <p className="text-xs text-gray-300 -mt-1">
                                Doctor Portal
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6 text-sm">
                        <NavLink
                            to="/doctor/dashboard"
                            icon={LayoutDashboard}
                            label="Dashboard"
                        />
                        <NavLink
                            to="/doctor/appointments"
                            icon={Calendar}
                            label="Appointments"
                        />
                        <NavLink
                            to="/doctor/patients"
                            icon={Users}
                            label="Patients"
                        />
                        <NavLink
                            to="/doctor/consultations"
                            icon={Video}
                            label="Consultations"
                        />
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                        {/* Dark Mode */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-xl hover:bg-white/10 transition"
                        >
                            {darkMode ? (
                                <Sun className="w-5 h-5 text-gray-300" />
                            ) : (
                                <Moon className="w-5 h-5 text-gray-300" />
                            )}
                        </button>

                        {/* Profile */}
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen((prev) => !prev)}
                                className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/10 transition"
                            >
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-semibold">
                                    {userName[0]}
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-3 w-44 rounded-xl bg-gray-900/90 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
                                    <div className="px-4 py-3 border-b border-white/20 dark:border-gray-700">
                                        <p className="text-sm font-medium text-white">
                                            {user?.name || userName}
                                        </p>
                                        <p className="text-xs text-gray-300">
                                            {user?.email}
                                        </p>
                                    </div>

                                    <DropdownLink
                                        to="/doctor/profile"
                                        icon={User}
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        My Profile
                                    </DropdownLink>
                                    <DropdownLink
                                        to="/doctor/settings"
                                        icon={Settings}
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        Settings
                                    </DropdownLink>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
                                    >
                                        <X className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded-xl hover:bg-white/10 transition"
                        >
                            {menuOpen ? (
                                <X className="w-6 h-6 text-gray-300" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-300" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden border-t border-white/10">
                        <MobileLink to="/doctor/dashboard" label="Dashboard" />
                        <MobileLink
                            to="/doctor/appointments"
                            label="Appointments"
                        />
                        <MobileLink to="/doctor/patients" label="Patients" />
                        <MobileLink
                            to="/doctor/consultations"
                            label="Consultations"
                        />
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 text-red-400 hover:bg-white/10"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </nav>
        </div>
    );
}

/* ---------- Small Components ---------- */

const NavLink = ({ to, icon: Icon, label }) => (
    <Link
        to={to}
        className="flex items-center gap-2 text-gray-300 hover:text-white transition"
    >
        <Icon className="w-4 h-4" />
        {label}
    </Link>
);

const MobileLink = ({ to, label }) => (
    <Link
        to={to}
        className="block px-4 py-3 text-gray-300 hover:bg-white/10 transition"
    >
        {label}
    </Link>
);
const DropdownLink = ({ to, icon: Icon, children, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-white/20 dark:hover:bg-gray-800/60 transition"
    >
        <Icon className="w-4 h-4" />
        {children}
    </Link>
);
