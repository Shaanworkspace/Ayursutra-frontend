/* eslint-disable no-unused-vars */
// File: patient/PatientDashboard.jsx

import React, { useState } from "react";
import {
    FileText,
    MessageSquare,
    Heart,
    Calendar,
    Clock,
    ArrowRight,
    Bell,
    TrendingUp,
    Activity,
    Pill,
    Video,
    MapPin,
    ChevronRight,
    Sparkles,
    Sun,
    Moon,
    CloudSun,
    Plus,
    Filter,
    Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { PatientLayout } from "./components/PatientLayout";
import { PatientStatsGrid } from "./components/PatientStatsGrid";
import { PatientAppointmentCard } from "./components/PatientAppointmentCard";
import { ActivityItem } from "@/components/shared/ActivityItem";

export const PatientDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState("upcoming");

    // Get greeting based on time of day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12)
            return { text: "Good Morning", icon: Sun, color: "text-amber-500" };
        if (hour < 17)
            return {
                text: "Good Afternoon",
                icon: CloudSun,
                color: "text-orange-500",
            };
        return { text: "Good Evening", icon: Moon, color: "text-indigo-500" };
    };

    const greeting = getGreeting();
    const userName = user?.name?.split(" ")[0] || "Patient";

    // Stats data
    const stats = {
        upcomingSessions: "3",
        completedSessions: "12",
        sessionsTrend: "+2",
        healthReports: "8",
        wellnessScore: "8.5/10",
        wellnessTrend: "+0.5",
    };

    // Appointments data
    const appointments = [
        {
            id: 1,
            date: "15",
            month: "DEC",
            day: "Friday",
            doctorName: "Dr. Amita Sharma",
            doctorImage: null,
            specialty: "Ayurvedic Medicine",
            type: "Ayurvedic Consultation",
            time: "10:00 AM - 11:00 AM",
            status: "upcoming",
            mode: "video",
            actionLabel: "Join Now",
        },
        {
            id: 2,
            date: "18",
            month: "DEC",
            day: "Monday",
            doctorName: "Therapist Priya Mehta",
            doctorImage: null,
            specialty: "Yoga Therapy",
            type: "Yoga Therapy Session",
            time: "2:00 PM - 3:00 PM",
            status: "scheduled",
            mode: "in-person",
            actionLabel: "Reschedule",
        },
        {
            id: 3,
            date: "22",
            month: "DEC",
            day: "Friday",
            doctorName: "Dr. Rajesh Kumar",
            doctorImage: null,
            specialty: "Panchakarma",
            type: "Treatment Follow-up",
            time: "11:00 AM - 12:00 PM",
            status: "scheduled",
            mode: "video",
            actionLabel: "View Details",
        },
    ];

    // Recent activities
    const activities = [
        {
            icon: FileText,
            title: "Report Available",
            description: "Blood test results uploaded",
            time: "2 hours ago",
            color: "cyan",
            isNew: true,
        },
        {
            icon: MessageSquare,
            title: "New Message",
            description: "Dr. Sharma replied to your query",
            time: "5 hours ago",
            color: "teal",
            isNew: true,
        },
        {
            icon: Heart,
            title: "Wellness Tip",
            description: "Daily meditation reminder",
            time: "1 day ago",
            color: "blue",
            isNew: false,
        },
        {
            icon: Pill,
            title: "Medication Reminder",
            description: "Time for evening herbs",
            time: "1 day ago",
            color: "green",
            isNew: false,
        },
    ];

    // Quick actions
    const quickActions = [
        {
            icon: Calendar,
            label: "Book Appointment",
            to: "/patient/appointments/new",
            color: "from-cyan-500 to-teal-500",
        },
        {
            icon: FileText,
            label: "View Reports",
            to: "/patient/health-records",
            color: "from-blue-500 to-indigo-500",
        },
        {
            icon: MessageSquare,
            label: "Message Doctor",
            to: "/patient/messages",
            color: "from-teal-500 to-emerald-500",
        },
        {
            icon: Pill,
            label: "My Medications",
            to: "/patient/medications",
            color: "from-purple-500 to-pink-500",
        },
    ];

    // Wellness tips
    const wellnessTips = [
        {
            title: "Morning Routine",
            description:
                "Start your day with warm water and lemon for better digestion",
            icon: Sun,
            color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
        },
        {
            title: "Herbal Tea Time",
            description:
                "Enjoy tulsi tea in the evening to reduce stress and boost immunity",
            icon: Sparkles,
            color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
        },
    ];

    // Upcoming medications
    const medications = [
        { name: "Ashwagandha", time: "8:00 AM", taken: true },
        { name: "Triphala", time: "9:00 PM", taken: false },
        { name: "Brahmi", time: "2:00 PM", taken: false },
    ];

    return (
        <PatientLayout>
            <div className="p-6 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* ==================== HEADER SECTION ==================== */}
                    <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            {/* Greeting */}
                            <div className="flex items-center gap-2 mb-2">
                                <greeting.icon
                                    className={`w-6 h-6 ${greeting.color}`}
                                />
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {greeting.text}
                                </span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                                Welcome back, {userName}! 👋
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Here's your health overview for today. You have{" "}
                                <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                                    {stats.upcomingSessions} upcoming
                                    appointments
                                </span>
                            </p>
                        </div>

                        {/* Quick Actions - Desktop */}
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                className="hidden sm:flex items-center gap-2"
                            >
                                <Search className="w-4 h-4" />
                                Search
                            </Button>
                            <Link to="/patient/appointments/new">
                                <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-lg shadow-cyan-500/25">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Book Appointment
                                </Button>
                            </Link>
                        </div>
                    </section>

                    {/* ==================== QUICK ACTIONS - MOBILE ==================== */}
                    <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:hidden">
                        {quickActions.map((action, idx) => (
                            <QuickActionCard key={idx} {...action} />
                        ))}
                    </section>

                    {/* ==================== STATS SECTION ==================== */}
                    <section>
                        <PatientStatsGrid stats={stats} />
                    </section>

                    {/* ==================== MAIN CONTENT GRID ==================== */}
                    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Left Column - Appointments */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Appointments Card */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                {/* Header with Tabs */}
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                                Appointments
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                Manage your upcoming and past
                                                appointments
                                            </p>
                                        </div>

                                        {/* Tabs */}
                                        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                                            {["upcoming", "past"].map((tab) => (
                                                <button
                                                    key={tab}
                                                    onClick={() =>
                                                        setActiveTab(tab)
                                                    }
                                                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                                        activeTab === tab
                                                            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                                                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                                    }`}
                                                >
                                                    {tab
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        tab.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Appointments List */}
                                <div className="p-6 space-y-4">
                                    {appointments.map((apt) => (
                                        <EnhancedAppointmentCard
                                            key={apt.id}
                                            {...apt}
                                            onAction={() =>
                                                console.log(
                                                    "Action clicked for",
                                                    apt.doctorName
                                                )
                                            }
                                        />
                                    ))}

                                    {/* View All Link */}
                                    <Link
                                        to="/patient/appointments"
                                        className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors group"
                                    >
                                        View all appointments
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            {/* Wellness Tips Card */}
                            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-2xl border border-cyan-100 dark:border-cyan-800/50 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                            <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                            Today's Wellness Tips
                                        </h3>
                                    </div>
                                    <Link
                                        to="/patient/wellness"
                                        className="text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:underline"
                                    >
                                        See all
                                    </Link>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {wellnessTips.map((tip, idx) => (
                                        <WellnessTipCard key={idx} {...tip} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions - Desktop */}
                            <div className="hidden lg:block bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                                    Quick Actions
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {quickActions.map((action, idx) => (
                                        <QuickActionCard
                                            key={idx}
                                            {...action}
                                            compact
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                        Recent Activity
                                    </h3>
                                    <span className="flex items-center justify-center w-6 h-6 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 text-xs font-bold rounded-full">
                                        {
                                            activities.filter((a) => a.isNew)
                                                .length
                                        }
                                    </span>
                                </div>
                                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {activities.map((activity, idx) => (
                                        <EnhancedActivityItem
                                            key={idx}
                                            {...activity}
                                        />
                                    ))}
                                </div>
                                <div className="p-4">
                                    <Link
                                        to="/patient/notifications"
                                        className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                    >
                                        View all activity
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            {/* Medications Reminder */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                            <Pill className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                            Today's Medications
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-4 space-y-3">
                                    {medications.map((med, idx) => (
                                        <MedicationItem key={idx} {...med} />
                                    ))}
                                </div>
                                <div className="px-6 pb-6">
                                    <Link to="/patient/medications">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Manage Medications
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Health Score Card */}
                            <HealthScoreCard
                                score={8.5}
                                maxScore={10}
                                trend="+0.5"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PatientLayout>
    );
};

// ============================================
// SUB-COMPONENTS
// ============================================

// Quick Action Card
const QuickActionCard = ({ icon: Icon, label, to, color, compact = false }) => (
    <Link
        to={to}
        className={`group flex ${
            compact ? "flex-col" : "items-center gap-3"
        } p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all hover:shadow-md`}
    >
        <div
            className={`p-3 bg-gradient-to-br ${color} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform`}
        >
            <Icon className="w-5 h-5" />
        </div>
        <span
            className={`${
                compact ? "mt-2 text-center" : ""
            } text-sm font-medium text-gray-700 dark:text-gray-300`}
        >
            {label}
        </span>
    </Link>
);

// Enhanced Appointment Card
const EnhancedAppointmentCard = ({
    date,
    month,
    day,
    doctorName,
    specialty,
    type,
    time,
    status,
    mode,
    actionLabel,
    onAction,
}) => {
    const isUpcoming = status === "upcoming";
    const isVideo = mode === "video";

    return (
        <div
            className={`flex flex-col sm:flex-row gap-4 p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                isUpcoming
                    ? "bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 border-cyan-200 dark:border-cyan-800"
                    : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
            }`}
        >
            {/* Date Block */}
            <div className="flex sm:flex-col items-center sm:items-center gap-2 sm:gap-0 sm:min-w-[70px]">
                <div
                    className={`text-3xl font-bold ${
                        isUpcoming
                            ? "text-cyan-600 dark:text-cyan-400"
                            : "text-gray-600 dark:text-gray-400"
                    }`}
                >
                    {date}
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {month}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
                    {day}
                </div>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                            {doctorName}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {specialty}
                        </p>
                    </div>
                    {isUpcoming && (
                        <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 text-xs font-medium rounded-full">
                            Next Up
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        {time}
                    </span>
                    <span
                        className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                            isVideo
                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        }`}
                    >
                        {isVideo ? (
                            <>
                                <Video className="w-3 h-3" /> Video Call
                            </>
                        ) : (
                            <>
                                <MapPin className="w-3 h-3" /> In-person
                            </>
                        )}
                    </span>
                </div>
            </div>

            {/* Action Button */}
            <div className="flex sm:items-center">
                <Button
                    size="sm"
                    onClick={onAction}
                    className={
                        isUpcoming
                            ? "bg-cyan-600 hover:bg-cyan-700 text-white w-full sm:w-auto"
                            : "w-full sm:w-auto"
                    }
                    variant={isUpcoming ? "default" : "outline"}
                >
                    {actionLabel}
                </Button>
            </div>
        </div>
    );
};

// Enhanced Activity Item
const EnhancedActivityItem = ({
    icon: Icon,
    title,
    description,
    time,
    color,
    isNew,
}) => {
    const colorClasses = {
        cyan: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
        teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
        blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
        green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    };

    return (
        <div className="flex gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
            <div className={`p-2.5 rounded-xl ${colorClasses[color]} shrink-0`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {title}
                    </h4>
                    {isNew && (
                        <span className="w-2 h-2 bg-cyan-500 rounded-full shrink-0" />
                    )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {description}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {time}
                </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 shrink-0 self-center" />
        </div>
    );
};

// Wellness Tip Card
const WellnessTipCard = ({ title, description, icon: Icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className={`inline-flex p-2 rounded-lg ${color} mb-3`}>
            <Icon className="w-5 h-5" />
        </div>
        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {title}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
        </p>
    </div>
);

// Medication Item
const MedicationItem = ({ name, time, taken }) => (
    <div
        className={`flex items-center justify-between p-3 rounded-lg border ${
            taken
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
        }`}
    >
        <div className="flex items-center gap-3">
            <div
                className={`w-3 h-3 rounded-full ${
                    taken ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                }`}
            />
            <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                    {name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {time}
                </p>
            </div>
        </div>
        {taken ? (
            <span className="text-xs font-medium text-green-600 dark:text-green-400">
                Taken ✓
            </span>
        ) : (
            <Button size="sm" variant="ghost" className="text-xs h-7">
                Mark Done
            </Button>
        )}
    </div>
);

// Health Score Card
const HealthScoreCard = ({ score, maxScore, trend }) => (
    <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Wellness Score</h3>
            <Activity className="w-6 h-6 opacity-80" />
        </div>

        <div className="flex items-end gap-2 mb-2">
            <span className="text-5xl font-bold">{score}</span>
            <span className="text-xl opacity-80 mb-1">/{maxScore}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span>{trend} this month</span>
            </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/20">
            <Link
                to="/patient/wellness"
                className="flex items-center justify-center gap-2 text-sm font-medium hover:underline"
            >
                View Details
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    </div>
);

export default PatientDashboard;
