/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Store/Slices/authSlice";
import {
    Menu,
    X,
    User,
    Calendar,
    Users,
    Bell,
    Settings,
    LogOut,
    LayoutDashboard,
    MessageSquare,
    Video,
    Clock,
    TrendingUp,
    CreditCard,
    HelpCircle,
    ChevronDown,
    Search,
    Moon,
    Sun,
    BadgeCheck,
    Star,
    Heart,
    Sparkles,
    Leaf,
    Activity,
    BookOpen,
    ClipboardList,
    Smile,
    Brain,
    Palette,
    Music,
    Wind,
} from "lucide-react";

export const TherapistNavbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // State
    const [isOpen, setIsOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    // Refs
    const profileRef = useRef(null);
    const notificationRef = useRef(null);
    const previousPathname = useRef(location.pathname);

    // User info
    const userName =
        user?.name?.split(" ")[0] || user?.preferred_username || "Therapist";
    const userSpecialty = user?.specialty || "Yoga & Meditation Therapy";

    // Navigation items - Therapist specific
    const navItems = [
        {
            to: "/therapist/dashboard",
            icon: LayoutDashboard,
            label: "Dashboard",
        },
        {
            to: "/therapist/sessions",
            icon: Calendar,
            label: "Sessions",
            badge: 5,
        },
        {
            to: "/therapist/clients",
            icon: Users,
            label: "Clients",
        },
        {
            to: "/therapist/programs",
            icon: Sparkles,
            label: "Programs",
        },
    ];

    // More menu items
    const moreMenuItems = [
        { to: "/therapist/schedule", icon: Clock, label: "Schedule" },
        {
            to: "/therapist/assessments",
            icon: ClipboardList,
            label: "Assessments",
        },
        { to: "/therapist/earnings", icon: CreditCard, label: "Earnings" },
        { to: "/therapist/analytics", icon: TrendingUp, label: "Analytics" },
        { to: "/therapist/reviews", icon: Star, label: "Reviews" },
    ];

    // Notifications - Therapist specific
    const notifications = [
        {
            id: 1,
            type: "session",
            title: "New Session Booking",
            message: "Emma Wilson booked Yoga Therapy for 3:00 PM",
            time: "5 mins ago",
            isNew: true,
            icon: Calendar,
            color: "purple",
        },
        {
            id: 2,
            type: "message",
            title: "Client Message",
            message: "John asked about breathing exercises",
            time: "20 mins ago",
            isNew: true,
            icon: MessageSquare,
            color: "blue",
        },
        {
            id: 3,
            type: "progress",
            title: "Client Milestone",
            message: "Sarah completed 10 meditation sessions!",
            time: "1 hour ago",
            isNew: true,
            icon: Sparkles,
            color: "green",
        },
        {
            id: 4,
            type: "reminder",
            title: "Group Session",
            message: "Morning Yoga class starts in 30 mins",
            time: "30 mins ago",
            isNew: false,
            icon: Users,
            color: "orange",
        },
    ];

    const newNotificationsCount = notifications.filter((n) => n.isNew).length;

    // Handlers
    const handleLogout = useCallback(() => {
        dispatch(logout());
        navigate("/login");
    }, [dispatch, navigate]);

    const toggleDarkMode = useCallback(() => {
        setIsDarkMode((prev) => {
            const newMode = !prev;
            document.documentElement.classList.toggle("dark", newMode);
            return newMode;
        });
    }, []);

    const closeAllMenus = useCallback(() => {
        setIsOpen(false);
        setShowProfileMenu(false);
        setShowNotifications(false);
        setShowSearch(false);
    }, []);

    const handleProfileMenuToggle = useCallback(() => {
        setShowProfileMenu((prev) => !prev);
        setShowNotifications(false);
    }, []);

    const handleNotificationsToggle = useCallback(() => {
        setShowNotifications((prev) => !prev);
        setShowProfileMenu(false);
    }, []);

    const handleMobileMenuToggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const handleSearchToggle = useCallback(() => {
        setShowSearch((prev) => !prev);
    }, []);

    const isActiveLink = useCallback(
        (path) =>
            location.pathname === path ||
            location.pathname.startsWith(path + "/"),
        [location.pathname]
    );

    // Close menus on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowProfileMenu(false);
            }
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setShowNotifications(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* ==================== LOGO ==================== */}
                    <Link
                        to="/therapist/dashboard"
                        className="flex items-center gap-3 group"
                        onClick={closeAllMenus}
                    >
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                Ayursutra
                            </span>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 -mt-1">
                                Therapist Portal
                            </span>
                        </div>
                    </Link>

                    {/* ==================== DESKTOP NAVIGATION ==================== */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                icon={item.icon}
                                isActive={isActiveLink(item.to)}
                                badge={item.badge}
                                onClick={closeAllMenus}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                        <MoreDropdown
                            items={moreMenuItems}
                            onItemClick={closeAllMenus}
                        />
                    </div>

                    {/* ==================== DESKTOP RIGHT SECTION ==================== */}
                    <div className="hidden lg:flex items-center gap-2">
                        {/* Search */}
                        <button
                            onClick={handleSearchToggle}
                            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                            aria-label="Toggle search"
                        >
                            <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>

                        {/* Dark Mode */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? (
                                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            ) : (
                                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            )}
                        </button>

                        {/* Notifications */}
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={handleNotificationsToggle}
                                className="relative p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                                aria-label="Notifications"
                            >
                                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                {newNotificationsCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                        {newNotificationsCount}
                                    </span>
                                )}
                            </button>

                            {showNotifications && (
                                <NotificationsDropdown
                                    notifications={notifications}
                                    onClose={() => setShowNotifications(false)}
                                />
                            )}
                        </div>

                        {/* Profile */}
                        <div className="relative ml-2" ref={profileRef}>
                            <button
                                onClick={handleProfileMenuToggle}
                                className="flex items-center gap-3 p-1.5 pr-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                                aria-label="Profile menu"
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                                    {userName[0].toUpperCase()}
                                </div>
                                <div className="hidden xl:block text-left">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                            {userName}
                                        </span>
                                        <BadgeCheck className="w-4 h-4 text-purple-500" />
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {userSpecialty}
                                    </span>
                                </div>
                                <ChevronDown
                                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                                        showProfileMenu ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {showProfileMenu && (
                                <ProfileDropdown
                                    user={user}
                                    userName={userName}
                                    userSpecialty={userSpecialty}
                                    onLogout={handleLogout}
                                    onClose={() => setShowProfileMenu(false)}
                                />
                            )}
                        </div>
                    </div>

                    {/* ==================== MOBILE TOGGLE ==================== */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <button
                            onClick={handleNotificationsToggle}
                            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            aria-label="Notifications"
                        >
                            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            {newNotificationsCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {newNotificationsCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={handleMobileMenuToggle}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <X className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                {showSearch && (
                    <div className="hidden lg:block pb-4 animate-in slide-in-from-top duration-200">
                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search clients, sessions, programs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                autoFocus
                            />
                            <button
                                onClick={handleSearchToggle}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Mobile Menu */}
                {isOpen && (
                    <MobileMenu
                        user={user}
                        userName={userName}
                        userSpecialty={userSpecialty}
                        navItems={navItems}
                        moreMenuItems={moreMenuItems}
                        isActiveLink={isActiveLink}
                        onLogout={handleLogout}
                        onClose={closeAllMenus}
                        isDarkMode={isDarkMode}
                        toggleDarkMode={toggleDarkMode}
                    />
                )}
            </div>
        </nav>
    );
};

// ============================================
// SUB-COMPONENTS
// ============================================

// Desktop Nav Link
const NavLink = ({ to, icon: Icon, children, isActive, badge, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
            isActive
                ? "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
    >
        <Icon className="w-4 h-4" />
        {children}
        {badge && (
            <span className="ml-1 px-1.5 py-0.5 bg-purple-500 text-white text-xs font-bold rounded-full">
                {badge}
            </span>
        )}
    </Link>
);

// More Dropdown
const MoreDropdown = ({ items, onItemClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);
    const handleItemClick = useCallback(() => {
        setIsOpen(false);
        onItemClick?.();
    }, [onItemClick]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={handleToggle}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
            >
                More
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {items.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            onClick={handleItemClick}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

// Notifications Dropdown
const NotificationsDropdown = ({ notifications, onClose }) => (
    <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Notifications
            </h3>
            <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                Mark all read
            </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
                <NotificationItem key={notification.id} {...notification} />
            ))}
        </div>

        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 text-center">
            <Link
                to="/therapist/notifications"
                onClick={onClose}
                className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
            >
                View all notifications
            </Link>
        </div>
    </div>
);

// Notification Item
const NotificationItem = ({
    icon: Icon,
    title,
    message,
    time,
    isNew,
    color,
}) => {
    const colorClasses = {
        purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
        blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
        green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
        orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    };

    return (
        <div
            className={`flex gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${
                isNew ? "bg-purple-50/50 dark:bg-purple-900/10" : ""
            }`}
        >
            <div className={`p-2 rounded-xl shrink-0 ${colorClasses[color]}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {title}
                    </p>
                    {isNew && (
                        <span className="w-2 h-2 bg-purple-500 rounded-full shrink-0" />
                    )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {message}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {time}
                </p>
            </div>
        </div>
    );
};

// Profile Dropdown
const ProfileDropdown = ({
    user,
    userName,
    userSpecialty,
    onLogout,
    onClose,
}) => {
    const handleLogoutClick = useCallback(() => {
        onClose();
        onLogout();
    }, [onClose, onLogout]);

    return (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="px-4 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-bold">
                        {userName[0].toUpperCase()}
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <p className="font-semibold">{userName}</p>
                            <BadgeCheck className="w-4 h-4" />
                        </div>
                        <p className="text-sm text-purple-100">
                            {userSpecialty}
                        </p>
                        <p className="text-xs text-purple-200 mt-0.5">
                            {user?.email || "therapist@ayursutra.com"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Therapy Mode Toggle */}
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Available for Sessions
                        </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-300 peer-checked:bg-green-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                    </label>
                </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
                <ProfileMenuItem
                    to="/therapist/profile"
                    icon={User}
                    label="My Profile"
                    onClick={onClose}
                />
                <ProfileMenuItem
                    to="/therapist/schedule"
                    icon={Clock}
                    label="Manage Schedule"
                    onClick={onClose}
                />
                <ProfileMenuItem
                    to="/therapist/certifications"
                    icon={BadgeCheck}
                    label="Certifications"
                    onClick={onClose}
                />
                <ProfileMenuItem
                    to="/therapist/earnings"
                    icon={CreditCard}
                    label="Earnings"
                    onClick={onClose}
                />
                <ProfileMenuItem
                    to="/therapist/settings"
                    icon={Settings}
                    label="Settings"
                    onClick={onClose}
                />
                <ProfileMenuItem
                    to="/help"
                    icon={HelpCircle}
                    label="Help & Support"
                    onClick={onClose}
                />
            </div>

            {/* Logout */}
            <div className="px-3 py-3 border-t border-gray-100 dark:border-gray-700">
                <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

// Profile Menu Item
const ProfileMenuItem = ({ to, icon: Icon, label, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mx-2 rounded-lg"
    >
        <Icon className="w-4 h-4 text-gray-400" />
        {label}
    </Link>
);

// Mobile Menu
const MobileMenu = ({
    user,
    userName,
    userSpecialty,
    navItems,
    moreMenuItems,
    isActiveLink,
    onLogout,
    onClose,
    isDarkMode,
    toggleDarkMode,
}) => {
    const handleLogoutClick = useCallback(() => {
        onClose();
        onLogout();
    }, [onClose, onLogout]);

    return (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top duration-200">
            {/* User Card */}
            <div className="mx-4 mb-4 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white">
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-bold">
                        {userName[0].toUpperCase()}
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <p className="font-semibold text-lg">{userName}</p>
                            <BadgeCheck className="w-5 h-5" />
                        </div>
                        <p className="text-sm text-purple-100">
                            {userSpecialty}
                        </p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/20">
                    <div className="text-center">
                        <p className="text-lg font-bold">8</p>
                        <p className="text-xs text-purple-100">Today</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold">4.9</p>
                        <p className="text-xs text-purple-100">Rating</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold">89</p>
                        <p className="text-xs text-purple-100">Clients</p>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="px-4 mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search clients..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
                    />
                </div>
            </div>

            {/* Main Navigation */}
            <div className="px-4 space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                    Main Menu
                </p>
                {navItems.map((item) => (
                    <MobileNavLink
                        key={item.to}
                        to={item.to}
                        icon={item.icon}
                        isActive={isActiveLink(item.to)}
                        badge={item.badge}
                        onClick={onClose}
                    >
                        {item.label}
                    </MobileNavLink>
                ))}
            </div>

            {/* More Options */}
            <div className="px-4 mt-4 space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                    More Options
                </p>
                {moreMenuItems.map((item) => (
                    <MobileNavLink
                        key={item.to}
                        to={item.to}
                        icon={item.icon}
                        isActive={isActiveLink(item.to)}
                        onClick={onClose}
                    >
                        {item.label}
                    </MobileNavLink>
                ))}
            </div>

            {/* Account */}
            <div className="px-4 mt-4 space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                    Account
                </p>
                <MobileNavLink
                    to="/therapist/profile"
                    icon={User}
                    onClick={onClose}
                >
                    My Profile
                </MobileNavLink>
                <MobileNavLink
                    to="/therapist/certifications"
                    icon={BadgeCheck}
                    onClick={onClose}
                >
                    Certifications
                </MobileNavLink>
                <MobileNavLink
                    to="/therapist/settings"
                    icon={Settings}
                    onClick={onClose}
                >
                    Settings
                </MobileNavLink>
                <MobileNavLink to="/help" icon={HelpCircle} onClick={onClose}>
                    Help & Support
                </MobileNavLink>
            </div>

            {/* Dark Mode */}
            <div className="mx-4 mt-4">
                <button
                    onClick={toggleDarkMode}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl"
                >
                    <div className="flex items-center gap-3">
                        {isDarkMode ? (
                            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        ) : (
                            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        )}
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {isDarkMode ? "Dark Mode" : "Light Mode"}
                        </span>
                    </div>
                    <div
                        className={`w-10 h-6 rounded-full transition-colors ${
                            isDarkMode ? "bg-purple-500" : "bg-gray-300"
                        } relative`}
                    >
                        <div
                            className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                                isDarkMode ? "translate-x-5" : "translate-x-1"
                            }`}
                        />
                    </div>
                </button>
            </div>

            {/* Logout */}
            <div className="px-4 mt-4">
                <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

// Mobile Nav Link
const MobileNavLink = ({
    to,
    icon: Icon,
    children,
    isActive,
    badge,
    onClick,
}) => (
    <Link
        to={to}
        onClick={onClick}
        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
            isActive
                ? "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
    >
        <div className="flex items-center gap-3">
            <Icon className="w-5 h-5" />
            <span className="font-medium">{children}</span>
        </div>
        {badge && (
            <span className="px-2 py-0.5 bg-purple-500 text-white text-xs font-bold rounded-full">
                {badge}
            </span>
        )}
    </Link>
);

export default TherapistNavbar;
