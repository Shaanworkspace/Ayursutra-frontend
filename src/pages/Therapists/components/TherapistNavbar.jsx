/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Menu,
    X,
    User,
    Calendar,
    Users,
    Sparkles,
    Bell,
    Settings,
    Leaf,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Store/Slices/authSlice";

const TherapistNavbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        setIsOpen(false);
        setShowProfileMenu(false);
    };

    const userName =
        user?.name?.split(" ")[0] || user?.preferred_username || "Therapist";

    return (
        <nav className="fixed top-4 left-0 right-0 z-50 px-4">
            {/* GLASSY FLOATING NAV */}
            <div className="max-w-7xl mx-auto rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-white/10 shadow-2xl">
                <div className="px-4 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/therapist/dashboard"
                        className="flex items-center gap-3"
                    >
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-md">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-lg font-bold text-white">
                                Ayursutra
                            </p>
                            <p className="text-xs text-gray-300 -mt-1">
                                Therapist Portal
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1">
                        <NavLink to="/therapist/dashboard" icon={Calendar}>
                            Dashboard
                        </NavLink>
                        <NavLink to="/therapist/sessions" icon={Calendar}>
                            Sessions
                        </NavLink>
                        <NavLink to="/therapist/clients" icon={Users}>
                            Clients
                        </NavLink>
                        <NavLink to="/therapist/programs" icon={Sparkles}>
                            Programs
                        </NavLink>

                        {/* Notification */}
                        <button className="relative p-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/60 transition">
                            <Bell className="w-5 h-5 text-gray-200" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </button>

                        {/* Profile */}
                        <div className="relative ml-2">
                            <button
                                onClick={() =>
                                    setShowProfileMenu(!showProfileMenu)
                                }
                                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/60 transition"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
                                    {userName[0].toUpperCase()}
                                </div>
                                <span className="text-sm text-gray-200">
                                    {userName}
                                </span>
                            </button>

                            {showProfileMenu && (
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
                                        to="/therapist/profile"
                                        icon={User}
                                        onClick={() =>
                                            setShowProfileMenu(false)
                                        }
                                    >
                                        My Profile
                                    </DropdownLink>
                                    <DropdownLink
                                        to="/therapist/settings"
                                        icon={Settings}
                                        onClick={() =>
                                            setShowProfileMenu(false)
                                        }
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
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-gray-200"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-white/20 dark:border-gray-700/40 space-y-2">
                        <MobileNavLink
                            to="/therapist/dashboard"
                            icon={Calendar}
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </MobileNavLink>
                        <MobileNavLink
                            to="/therapist/sessions"
                            icon={Calendar}
                            onClick={() => setIsOpen(false)}
                        >
                            Sessions
                        </MobileNavLink>
                        <MobileNavLink
                            to="/therapist/clients"
                            icon={Users}
                            onClick={() => setIsOpen(false)}
                        >
                            Clients
                        </MobileNavLink>
                        <MobileNavLink
                            to="/therapist/programs"
                            icon={Sparkles}
                            onClick={() => setIsOpen(false)}
                        >
                            Programs
                        </MobileNavLink>
                        <MobileNavLink
                            to="/therapist/profile"
                            icon={User}
                            onClick={() => setIsOpen(false)}
                        >
                            Profile
                        </MobileNavLink>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition"
                        >
                            <X className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

/* ---------- Helpers ---------- */

const NavLink = ({ to, icon: Icon, children }) => (
    <Link
        to={to}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-200 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/60 transition"
    >
        <Icon className="w-4 h-4" />
        {children}
    </Link>
);

const MobileNavLink = ({ to, icon: Icon, children, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-200 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/60 transition"
    >
        <Icon className="w-4 h-4" />
        {children}
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

export default TherapistNavbar;
