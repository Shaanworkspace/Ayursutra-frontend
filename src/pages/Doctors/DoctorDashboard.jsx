/* eslint-disable no-unused-vars */
// File: doctor/DoctorDashboard.jsx

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
    TrendingDown,
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
    Users,
    UserCheck,
    UserPlus,
    Stethoscope,
    ClipboardList,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    RefreshCw,
    Send,
    DollarSign,
    IndianRupee,
    Star,
    Target,
    Zap,
    Phone,
    Mail,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    Download,
    Share2,
    Settings,
    LogOut,
    ChevronDown,
    PlayCircle,
    PauseCircle,
    Forward,
    CheckCheck,
    Loader2,
    AlertTriangle,
    ThumbsUp,
    Award,
    Briefcase,
    BarChart3,
    PieChart,
    LineChart,
    CalendarDays,
    CalendarCheck,
    ClipboardCheck,
    FileEdit,
    FilePlus,
    UserCog,
    Clipboard,
    Banknote,
    Wallet,
    CreditCard,
    Receipt,
    TrendingUp as TrendUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { DoctorLayout } from "./components/DoctorLayout";

export const DoctorDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [activeAppointmentTab, setActiveAppointmentTab] = useState("today");
    const [activePatientTab, setActivePatientTab] = useState("running");
    const [selectedTimeRange, setSelectedTimeRange] = useState("today");

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
    const doctorName = user?.name?.split(" ")[0] || "Doctor";

    // Stats data
    const stats = {
        todayAppointments: 12,
        completedToday: 5,
        pendingToday: 7,
        totalPatients: 1284,
        newPatientsThisWeek: 23,
        patientsTrend: "+8%",
        runningTreatments: 45,
        curedThisMonth: 32,
        curedTrend: "+12%",
        forwardedCases: 8,
        monthlyEarnings: "₹2,45,000",
        earningsTrend: "+15%",
        avgRating: 4.8,
        totalReviews: 342,
    };

    // Today's appointments data
    const todayAppointments = [
        {
            id: 1,
            time: "09:00 AM",
            endTime: "09:30 AM",
            patientName: "Rahul Sharma",
            patientAge: 35,
            patientImage: null,
            type: "Follow-up",
            condition: "Digestive Issues",
            status: "completed",
            mode: "video",
            notes: "Regular checkup, improvement noted",
        },
        {
            id: 2,
            time: "09:45 AM",
            endTime: "10:15 AM",
            patientName: "Priya Patel",
            patientAge: 28,
            patientImage: null,
            type: "New Consultation",
            condition: "Stress & Anxiety",
            status: "completed",
            mode: "in-person",
            notes: "Prescribed Ashwagandha, yoga therapy",
        },
        {
            id: 3,
            time: "10:30 AM",
            endTime: "11:00 AM",
            patientName: "Amit Kumar",
            patientAge: 42,
            patientImage: null,
            type: "Treatment Review",
            condition: "Joint Pain",
            status: "in-progress",
            mode: "video",
            notes: "",
        },
        {
            id: 4,
            time: "11:15 AM",
            endTime: "11:45 AM",
            patientName: "Sunita Devi",
            patientAge: 55,
            patientImage: null,
            type: "Panchakarma Review",
            condition: "Arthritis",
            status: "waiting",
            mode: "in-person",
            notes: "",
        },
        {
            id: 5,
            time: "12:00 PM",
            endTime: "12:30 PM",
            patientName: "Vikram Singh",
            patientAge: 38,
            patientImage: null,
            type: "New Consultation",
            condition: "Skin Disorder",
            status: "scheduled",
            mode: "video",
            notes: "",
        },
        {
            id: 6,
            time: "02:00 PM",
            endTime: "02:30 PM",
            patientName: "Meera Joshi",
            patientAge: 31,
            patientImage: null,
            type: "Follow-up",
            condition: "PCOS Management",
            status: "scheduled",
            mode: "in-person",
            notes: "",
        },
    ];

    // Patient treatment status data
    const patientsByStatus = {
        running: [
            {
                id: 1,
                name: "Rahul Sharma",
                age: 35,
                condition: "Chronic Digestive Issues",
                startDate: "Nov 15, 2024",
                duration: "4 weeks",
                progress: 65,
                nextSession: "Today, 3:00 PM",
                therapyType: "Panchakarma + Diet",
                status: "on-track",
            },
            {
                id: 2,
                name: "Priya Patel",
                age: 28,
                condition: "Stress & Anxiety",
                startDate: "Dec 01, 2024",
                duration: "8 weeks",
                progress: 25,
                nextSession: "Tomorrow, 10:00 AM",
                therapyType: "Yoga + Herbs",
                status: "on-track",
            },
            {
                id: 3,
                name: "Amit Kumar",
                age: 42,
                condition: "Joint Pain & Inflammation",
                startDate: "Nov 20, 2024",
                duration: "6 weeks",
                progress: 50,
                nextSession: "Dec 18, 11:00 AM",
                therapyType: "Panchakarma",
                status: "needs-attention",
            },
            {
                id: 4,
                name: "Sunita Devi",
                age: 55,
                condition: "Arthritis",
                startDate: "Oct 10, 2024",
                duration: "12 weeks",
                progress: 75,
                nextSession: "Today, 4:00 PM",
                therapyType: "Panchakarma + Yoga",
                status: "on-track",
            },
        ],
        cured: [
            {
                id: 5,
                name: "Vikram Singh",
                age: 38,
                condition: "Migraine",
                startDate: "Sep 01, 2024",
                endDate: "Nov 30, 2024",
                duration: "12 weeks",
                therapyType: "Shirodhara + Herbs",
                outcome: "Fully Recovered",
                rating: 5,
            },
            {
                id: 6,
                name: "Meera Joshi",
                age: 31,
                condition: "Digestive Disorder",
                startDate: "Oct 15, 2024",
                endDate: "Dec 10, 2024",
                duration: "8 weeks",
                therapyType: "Diet + Herbs",
                outcome: "Fully Recovered",
                rating: 5,
            },
            {
                id: 7,
                name: "Kiran Reddy",
                age: 45,
                condition: "Insomnia",
                startDate: "Sep 20, 2024",
                endDate: "Nov 15, 2024",
                duration: "8 weeks",
                therapyType: "Yoga + Meditation",
                outcome: "Significant Improvement",
                rating: 4,
            },
        ],
        forwarded: [
            {
                id: 8,
                name: "Arun Mehta",
                age: 52,
                condition: "Cardiac Issues",
                forwardedTo: "Dr. Rajesh Cardio",
                forwardedDate: "Dec 10, 2024",
                reason: "Requires specialized cardiac care",
                status: "accepted",
            },
            {
                id: 9,
                name: "Neha Gupta",
                age: 29,
                condition: "Pregnancy Care",
                forwardedTo: "Dr. Shalini Gynec",
                forwardedDate: "Dec 08, 2024",
                reason: "High-risk pregnancy management",
                status: "in-treatment",
            },
            {
                id: 10,
                name: "Deepak Jain",
                age: 60,
                condition: "Neurological Issues",
                forwardedTo: "Dr. Anand Neuro",
                forwardedDate: "Dec 05, 2024",
                reason: "Advanced neurological assessment needed",
                status: "pending",
            },
        ],
        therapy: [
            {
                id: 11,
                name: "Pooja Sharma",
                age: 34,
                therapyType: "Panchakarma - Vamana",
                therapist: "Therapist Ravi",
                startDate: "Dec 12, 2024",
                sessions: "5/10",
                status: "in-progress",
                nextSession: "Dec 18, 9:00 AM",
            },
            {
                id: 12,
                name: "Rajesh Kumar",
                age: 48,
                therapyType: "Yoga Therapy",
                therapist: "Therapist Priya",
                startDate: "Dec 01, 2024",
                sessions: "8/15",
                status: "in-progress",
                nextSession: "Dec 17, 6:00 AM",
            },
            {
                id: 13,
                name: "Anita Singh",
                age: 40,
                therapyType: "Shirodhara",
                therapist: "Therapist Mohan",
                startDate: "Dec 10, 2024",
                sessions: "2/7",
                status: "in-progress",
                nextSession: "Dec 19, 10:00 AM",
            },
            {
                id: 14,
                name: "Suresh Patel",
                age: 55,
                therapyType: "Abhyanga Massage",
                therapist: "Therapist Lakshmi",
                startDate: "Dec 14, 2024",
                sessions: "1/5",
                status: "just-started",
                nextSession: "Dec 20, 11:00 AM",
            },
        ],
    };

    // Quick actions
    const quickActions = [
        {
            icon: PlayCircle,
            label: "Start Consultation",
            to: "/doctor/consultation/start",
            color: "from-green-500 to-emerald-500",
            description: "Begin video/in-person session",
        },
        {
            icon: FilePlus,
            label: "Write Prescription",
            to: "/doctor/prescriptions/new",
            color: "from-blue-500 to-indigo-500",
            description: "Create new prescription",
        },
        {
            icon: ClipboardCheck,
            label: "Create Report",
            to: "/doctor/reports/new",
            color: "from-purple-500 to-pink-500",
            description: "Generate patient report",
        },
        {
            icon: UserPlus,
            label: "Add Patient",
            to: "/doctor/patients/new",
            color: "from-teal-500 to-cyan-500",
            description: "Register new patient",
        },
        {
            icon: Send,
            label: "Forward Case",
            to: "/doctor/forward-case",
            color: "from-orange-500 to-amber-500",
            description: "Refer to specialist",
        },
        {
            icon: Calendar,
            label: "Schedule",
            to: "/doctor/schedule",
            color: "from-cyan-500 to-blue-500",
            description: "Manage availability",
        },
    ];

    // Recent activities
    const activities = [
        {
            icon: CheckCircle2,
            title: "Consultation Completed",
            description: "Rahul Sharma - Digestive Issues",
            time: "30 mins ago",
            color: "green",
            type: "completed",
        },
        {
            icon: FileText,
            title: "Prescription Sent",
            description: "Priya Patel - Stress Management",
            time: "1 hour ago",
            color: "blue",
            type: "prescription",
        },
        {
            icon: Forward,
            title: "Case Forwarded",
            description: "Arun Mehta to Dr. Rajesh Cardio",
            time: "2 hours ago",
            color: "orange",
            type: "forwarded",
        },
        {
            icon: MessageSquare,
            title: "New Message",
            description: "Query from Sunita Devi",
            time: "3 hours ago",
            color: "teal",
            type: "message",
            isNew: true,
        },
        {
            icon: Star,
            title: "New Review",
            description: "5-star rating from Vikram Singh",
            time: "5 hours ago",
            color: "yellow",
            type: "review",
        },
        {
            icon: UserPlus,
            title: "New Patient",
            description: "Meera Joshi registered",
            time: "1 day ago",
            color: "purple",
            type: "new-patient",
        },
    ];

    // Notifications
    const notifications = [
        {
            id: 1,
            type: "urgent",
            message: "Amit Kumar needs immediate attention - vitals abnormal",
            time: "5 mins ago",
        },
        {
            id: 2,
            type: "reminder",
            message: "Staff meeting at 5:00 PM today",
            time: "1 hour ago",
        },
        {
            id: 3,
            type: "info",
            message: "Monthly report is ready for review",
            time: "3 hours ago",
        },
    ];

    // Pending tasks
    const pendingTasks = [
        {
            id: 1,
            task: "Review lab reports for Sunita Devi",
            priority: "high",
            due: "Today",
        },
        {
            id: 2,
            task: "Complete treatment plan for Amit Kumar",
            priority: "high",
            due: "Today",
        },
        {
            id: 3,
            task: "Send follow-up notes to Priya Patel",
            priority: "medium",
            due: "Tomorrow",
        },
        {
            id: 4,
            task: "Review therapy progress - Batch A",
            priority: "medium",
            due: "Dec 18",
        },
        {
            id: 5,
            task: "Update medical records",
            priority: "low",
            due: "Dec 20",
        },
    ];

    return (
        <DoctorLayout>
            <div className="p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* ==================== HEADER SECTION ==================== */}
                    <section className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                            {/* Greeting */}
                            <div className="flex items-center gap-2 mb-2">
                                <greeting.icon
                                    className={`w-6 h-6 ${greeting.color}`}
                                />
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {greeting.text}
                                </span>
                                <span className="text-sm text-gray-400 dark:text-gray-500">
                                    •
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date().toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                                Welcome back, Dr. {doctorName}! 👋
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                You have{" "}
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                    {stats.todayAppointments} appointments
                                </span>{" "}
                                today.{" "}
                                <span className="text-gray-500">
                                    {stats.completedToday} completed,{" "}
                                    {stats.pendingToday} pending
                                </span>
                            </p>
                        </div>

                        {/* Quick Actions - Top */}
                        <div className="flex flex-wrap items-center gap-3">
                            <Button
                                variant="outline"
                                className="hidden sm:flex items-center gap-2"
                            >
                                <Search className="w-4 h-4" />
                                Search Patients
                            </Button>
                            <Button
                                variant="outline"
                                className="hidden sm:flex items-center gap-2 relative"
                            >
                                <Bell className="w-4 h-4" />
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                    3
                                </span>
                            </Button>
                            <Link to="/doctor/consultation/start">
                                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25">
                                    <PlayCircle className="w-4 h-4 mr-2" />
                                    Start Consultation
                                </Button>
                            </Link>
                        </div>
                    </section>

                    {/* ==================== URGENT NOTIFICATIONS ==================== */}
                    {notifications.some((n) => n.type === "urgent") && (
                        <section>
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
                                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-red-800 dark:text-red-300">
                                            Urgent Attention Required
                                        </h4>
                                        <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                                            {
                                                notifications.find(
                                                    (n) => n.type === "urgent"
                                                )?.message
                                            }
                                        </p>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        View Now
                                    </Button>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ==================== STATS GRID ==================== */}
                    <section>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {/* Today's Appointments */}
                            <StatsCard
                                icon={Calendar}
                                label="Today's Appointments"
                                value={stats.todayAppointments}
                                subtext={`${stats.completedToday} done, ${stats.pendingToday} pending`}
                                trend={null}
                                color="blue"
                            />

                            {/* Total Patients */}
                            <StatsCard
                                icon={Users}
                                label="Total Patients"
                                value={stats.totalPatients.toLocaleString()}
                                subtext={`+${stats.newPatientsThisWeek} this week`}
                                trend={stats.patientsTrend}
                                trendUp={true}
                                color="purple"
                            />

                            {/* Running Treatments */}
                            <StatsCard
                                icon={Activity}
                                label="Active Treatments"
                                value={stats.runningTreatments}
                                subtext="Ongoing cases"
                                trend={null}
                                color="teal"
                            />

                            {/* Cured This Month */}
                            <StatsCard
                                icon={CheckCircle2}
                                label="Cured This Month"
                                value={stats.curedThisMonth}
                                subtext="Successfully treated"
                                trend={stats.curedTrend}
                                trendUp={true}
                                color="green"
                            />

                            {/* Monthly Earnings */}
                            <StatsCard
                                icon={Wallet}
                                label="Monthly Earnings"
                                value={stats.monthlyEarnings}
                                subtext="This month"
                                trend={stats.earningsTrend}
                                trendUp={true}
                                color="amber"
                            />
                        </div>
                    </section>

                    {/* ==================== MAIN CONTENT GRID ==================== */}
                    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Today's Schedule */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                {/* Header */}
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                                Today's Schedule
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                {new Date().toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        weekday: "long",
                                                        month: "long",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </p>
                                        </div>

                                        {/* Filter Tabs */}
                                        <div className="flex items-center gap-2">
                                            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                                                {[
                                                    "all",
                                                    "pending",
                                                    "completed",
                                                ].map((tab) => (
                                                    <button
                                                        key={tab}
                                                        onClick={() =>
                                                            setActiveAppointmentTab(
                                                                tab
                                                            )
                                                        }
                                                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                                                            activeAppointmentTab ===
                                                            tab
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
                                </div>

                                {/* Appointments List */}
                                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {todayAppointments.map((apt) => (
                                        <AppointmentRow key={apt.id} {...apt} />
                                    ))}
                                </div>

                                {/* View All Link */}
                                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                                    <Link
                                        to="/doctor/appointments"
                                        className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group"
                                    >
                                        View full schedule
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            {/* Patient Treatment Status */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                {/* Header with Tabs */}
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                                Patient Management
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                Track treatment progress and
                                                patient status
                                            </p>
                                        </div>
                                    </div>

                                    {/* Status Tabs */}
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {[
                                            {
                                                key: "running",
                                                label: "Running",
                                                count: patientsByStatus.running
                                                    .length,
                                                icon: Activity,
                                                color: "emerald",
                                            },
                                            {
                                                key: "cured",
                                                label: "Cured",
                                                count: patientsByStatus.cured
                                                    .length,
                                                icon: CheckCircle2,
                                                color: "green",
                                            },
                                            {
                                                key: "forwarded",
                                                label: "Forwarded",
                                                count: patientsByStatus
                                                    .forwarded.length,
                                                icon: Forward,
                                                color: "orange",
                                            },
                                            {
                                                key: "therapy",
                                                label: "Therapy",
                                                count: patientsByStatus.therapy
                                                    .length,
                                                icon: Sparkles,
                                                color: "purple",
                                            },
                                        ].map((tab) => (
                                            <button
                                                key={tab.key}
                                                onClick={() =>
                                                    setActivePatientTab(tab.key)
                                                }
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                                    activePatientTab === tab.key
                                                        ? `bg-${tab.color}-100 dark:bg-${tab.color}-900/30 text-${tab.color}-700 dark:text-${tab.color}-300 border-2 border-${tab.color}-300 dark:border-${tab.color}-700`
                                                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-2 border-transparent hover:bg-gray-200 dark:hover:bg-gray-700"
                                                }`}
                                            >
                                                <tab.icon className="w-4 h-4" />
                                                {tab.label}
                                                <span
                                                    className={`px-2 py-0.5 rounded-full text-xs ${
                                                        activePatientTab ===
                                                        tab.key
                                                            ? `bg-${tab.color}-200 dark:bg-${tab.color}-800`
                                                            : "bg-gray-200 dark:bg-gray-700"
                                                    }`}
                                                >
                                                    {tab.count}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Content based on active tab */}
                                <div className="p-6">
                                    {activePatientTab === "running" && (
                                        <div className="space-y-4">
                                            {patientsByStatus.running.map(
                                                (patient) => (
                                                    <RunningPatientCard
                                                        key={patient.id}
                                                        {...patient}
                                                    />
                                                )
                                            )}
                                        </div>
                                    )}

                                    {activePatientTab === "cured" && (
                                        <div className="space-y-4">
                                            {patientsByStatus.cured.map(
                                                (patient) => (
                                                    <CuredPatientCard
                                                        key={patient.id}
                                                        {...patient}
                                                    />
                                                )
                                            )}
                                        </div>
                                    )}

                                    {activePatientTab === "forwarded" && (
                                        <div className="space-y-4">
                                            {patientsByStatus.forwarded.map(
                                                (patient) => (
                                                    <ForwardedPatientCard
                                                        key={patient.id}
                                                        {...patient}
                                                    />
                                                )
                                            )}
                                        </div>
                                    )}

                                    {activePatientTab === "therapy" && (
                                        <div className="space-y-4">
                                            {patientsByStatus.therapy.map(
                                                (patient) => (
                                                    <TherapyPatientCard
                                                        key={patient.id}
                                                        {...patient}
                                                    />
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                                    <Link
                                        to="/doctor/patients"
                                        className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group"
                                    >
                                        View all patients
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                                    Quick Actions
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {quickActions.map((action, idx) => (
                                        <QuickActionCard
                                            key={idx}
                                            {...action}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Pending Tasks */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                            <ClipboardList className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                            Pending Tasks
                                        </h3>
                                    </div>
                                    <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-xs font-bold rounded-full">
                                        {pendingTasks.length}
                                    </span>
                                </div>
                                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {pendingTasks.map((task) => (
                                        <TaskItem key={task.id} {...task} />
                                    ))}
                                </div>
                                <div className="p-4">
                                    <Link to="/doctor/tasks">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            View All Tasks
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                        Recent Activity
                                    </h3>
                                    <span className="flex items-center justify-center w-6 h-6 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full">
                                        {
                                            activities.filter((a) => a.isNew)
                                                .length
                                        }
                                    </span>
                                </div>
                                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {activities
                                        .slice(0, 5)
                                        .map((activity, idx) => (
                                            <ActivityRow
                                                key={idx}
                                                {...activity}
                                            />
                                        ))}
                                </div>
                                <div className="p-4">
                                    <Link
                                        to="/doctor/activity"
                                        className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                    >
                                        View all activity
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            {/* Performance Card */}
                            <PerformanceCard
                                rating={stats.avgRating}
                                reviews={stats.totalReviews}
                                curedPatients={stats.curedThisMonth}
                                successRate={94}
                            />

                            {/* Earnings Summary */}
                            <EarningsCard
                                monthlyEarnings={stats.monthlyEarnings}
                                trend={stats.earningsTrend}
                                pendingPayments="₹45,000"
                                consultations={stats.todayAppointments}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DoctorLayout>
    );
};

// ============================================
// SUB-COMPONENTS
// ============================================

// Stats Card
const StatsCard = ({
    icon: Icon,
    label,
    value,
    subtext,
    trend,
    trendUp,
    color,
}) => {
    const colorClasses = {
        blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
        purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
        teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
        green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
        amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
                    <Icon className="w-5 h-5" />
                </div>
                {trend && (
                    <div
                        className={`flex items-center gap-1 text-xs font-medium ${
                            trendUp
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                        }`}
                    >
                        {trendUp ? (
                            <TrendingUp className="w-3 h-3" />
                        ) : (
                            <TrendingDown className="w-3 h-3" />
                        )}
                        {trend}
                    </div>
                )}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {value}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {label}
            </p>
            {subtext && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {subtext}
                </p>
            )}
        </div>
    );
};

// Quick Action Card
const QuickActionCard = ({ icon: Icon, label, to, color, description }) => (
    <Link
        to={to}
        className="group flex flex-col p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all hover:shadow-md"
    >
        <div
            className={`p-3 bg-gradient-to-br ${color} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform self-start`}
        >
            <Icon className="w-5 h-5" />
        </div>
        <span className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
        </span>
        {description && (
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {description}
            </span>
        )}
    </Link>
);

// Appointment Row
const AppointmentRow = ({
    time,
    endTime,
    patientName,
    patientAge,
    type,
    condition,
    status,
    mode,
    notes,
}) => {
    const statusConfig = {
        completed: {
            bg: "bg-green-100 dark:bg-green-900/30",
            text: "text-green-700 dark:text-green-300",
            icon: CheckCircle2,
            label: "Completed",
        },
        "in-progress": {
            bg: "bg-blue-100 dark:bg-blue-900/30",
            text: "text-blue-700 dark:text-blue-300",
            icon: Loader2,
            label: "In Progress",
        },
        waiting: {
            bg: "bg-amber-100 dark:bg-amber-900/30",
            text: "text-amber-700 dark:text-amber-300",
            icon: Clock,
            label: "Waiting",
        },
        scheduled: {
            bg: "bg-gray-100 dark:bg-gray-800",
            text: "text-gray-700 dark:text-gray-300",
            icon: Calendar,
            label: "Scheduled",
        },
    };

    const config = statusConfig[status];
    const StatusIcon = config.icon;
    const isVideo = mode === "video";

    return (
        <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            {/* Time */}
            <div className="text-center min-w-[80px]">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {time}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {endTime}
                </p>
            </div>

            {/* Divider */}
            <div className="w-px h-12 bg-gray-200 dark:bg-gray-700" />

            {/* Patient Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm font-medium">
                        {patientName.charAt(0)}
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                            {patientName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {patientAge} yrs • {condition}
                        </p>
                    </div>
                </div>
            </div>

            {/* Type & Mode */}
            <div className="hidden sm:flex flex-col items-end gap-1">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {type}
                </span>
                <span
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        isVideo
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    }`}
                >
                    {isVideo ? (
                        <Video className="w-3 h-3" />
                    ) : (
                        <MapPin className="w-3 h-3" />
                    )}
                    {isVideo ? "Video" : "In-person"}
                </span>
            </div>

            {/* Status */}
            <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bg} ${config.text}`}
            >
                <StatusIcon
                    className={`w-4 h-4 ${
                        status === "in-progress" ? "animate-spin" : ""
                    }`}
                />
                <span className="text-xs font-medium hidden sm:inline">
                    {config.label}
                </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                {status === "waiting" && (
                    <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                        <PlayCircle className="w-4 h-4 mr-1" />
                        Start
                    </Button>
                )}
                {status === "in-progress" && (
                    <Button size="sm" variant="outline">
                        Continue
                    </Button>
                )}
                {status === "completed" && (
                    <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                    </Button>
                )}
                {status === "scheduled" && (
                    <Button size="sm" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                )}
            </div>
        </div>
    );
};

// Running Patient Card
const RunningPatientCard = ({
    name,
    age,
    condition,
    startDate,
    duration,
    progress,
    nextSession,
    therapyType,
    status,
}) => (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium">
                    {name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {age} yrs • {condition}
                    </p>
                </div>
            </div>
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                    status === "on-track"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                }`}
            >
                {status === "on-track" ? "On Track" : "Needs Attention"}
            </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
            <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">
                    Treatment Progress
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                    {progress}%
                </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
            <div>
                <p className="text-gray-500 dark:text-gray-400">Started</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                    {startDate}
                </p>
            </div>
            <div>
                <p className="text-gray-500 dark:text-gray-400">Duration</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                    {duration}
                </p>
            </div>
            <div>
                <p className="text-gray-500 dark:text-gray-400">Therapy</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                    {therapyType}
                </p>
            </div>
            <div>
                <p className="text-gray-500 dark:text-gray-400">Next Session</p>
                <p className="font-medium text-emerald-600 dark:text-emerald-400">
                    {nextSession}
                </p>
            </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-1" />
                View
            </Button>
            <Button
                size="sm"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
                <FileEdit className="w-4 h-4 mr-1" />
                Update
            </Button>
        </div>
    </div>
);

// Cured Patient Card
const CuredPatientCard = ({
    name,
    age,
    condition,
    startDate,
    endDate,
    duration,
    therapyType,
    outcome,
    rating,
}) => (
    <div className="p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-medium">
                    <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {age} yrs • {condition}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
                {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                ))}
            </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
            <div>
                <p className="text-gray-500 dark:text-gray-400">
                    Treatment Period
                </p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                    {startDate} - {endDate}
                </p>
            </div>
            <div>
                <p className="text-gray-500 dark:text-gray-400">Duration</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                    {duration}
                </p>
            </div>
            <div>
                <p className="text-gray-500 dark:text-gray-400">Therapy</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                    {therapyType}
                </p>
            </div>
            <div>
                <p className="text-gray-500 dark:text-gray-400">Outcome</p>
                <p className="font-medium text-green-600 dark:text-green-400">
                    {outcome}
                </p>
            </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1">
                <FileText className="w-4 h-4 mr-1" />
                View Report
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-1" />
                Export
            </Button>
        </div>
    </div>
);

// Forwarded Patient Card
const ForwardedPatientCard = ({
    name,
    age,
    condition,
    forwardedTo,
    forwardedDate,
    reason,
    status,
}) => {
    const statusConfig = {
        pending: {
            bg: "bg-amber-100 dark:bg-amber-900/30",
            text: "text-amber-700 dark:text-amber-300",
            label: "Pending Acceptance",
        },
        accepted: {
            bg: "bg-blue-100 dark:bg-blue-900/30",
            text: "text-blue-700 dark:text-blue-300",
            label: "Accepted",
        },
        "in-treatment": {
            bg: "bg-green-100 dark:bg-green-900/30",
            text: "text-green-700 dark:text-green-300",
            label: "In Treatment",
        },
    };

    const config = statusConfig[status];

    return (
        <div className="p-4 rounded-xl border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-medium">
                        <Forward className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                            {name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {age} yrs • {condition}
                        </p>
                    </div>
                </div>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
                >
                    {config.label}
                </span>
            </div>

            {/* Details */}
            <div className="space-y-2 text-sm mb-3">
                <div className="flex items-start gap-2">
                    <span className="text-gray-500 dark:text-gray-400 min-w-[100px]">
                        Forwarded to:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                        {forwardedTo}
                    </span>
                </div>
                <div className="flex items-start gap-2">
                    <span className="text-gray-500 dark:text-gray-400 min-w-[100px]">
                        Date:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                        {forwardedDate}
                    </span>
                </div>
                <div className="flex items-start gap-2">
                    <span className="text-gray-500 dark:text-gray-400 min-w-[100px]">
                        Reason:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                        {reason}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Contact
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Track
                </Button>
            </div>
        </div>
    );
};

// Therapy Patient Card
const TherapyPatientCard = ({
    name,
    age,
    therapyType,
    therapist,
    startDate,
    sessions,
    status,
    nextSession,
}) => {
    const [completed, total] = sessions.split("/").map(Number);
    const progress = (completed / total) * 100;

    return (
        <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-medium">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                            {name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {age} yrs • {therapyType}
                        </p>
                    </div>
                </div>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                        status === "just-started"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                    }`}
                >
                    {status === "just-started" ? "Just Started" : "In Progress"}
                </span>
            </div>

            {/* Progress */}
            <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">
                        Sessions: {sessions}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                        {Math.round(progress)}%
                    </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Therapist
                    </p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                        {therapist}
                    </p>
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-400">Started</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                        {startDate}
                    </p>
                </div>
            </div>

            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg mb-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Next Session
                </p>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    {nextSession}
                </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Message
                </Button>
            </div>
        </div>
    );
};

// Task Item
const TaskItem = ({ task, priority, due }) => {
    const priorityConfig = {
        high: {
            bg: "bg-red-100 dark:bg-red-900/30",
            text: "text-red-700 dark:text-red-300",
            dot: "bg-red-500",
        },
        medium: {
            bg: "bg-amber-100 dark:bg-amber-900/30",
            text: "text-amber-700 dark:text-amber-300",
            dot: "bg-amber-500",
        },
        low: {
            bg: "bg-gray-100 dark:bg-gray-800",
            text: "text-gray-700 dark:text-gray-300",
            dot: "bg-gray-400",
        },
    };

    const config = priorityConfig[priority];

    return (
        <div className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className={`w-2 h-2 rounded-full ${config.dot} shrink-0`} />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {task}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Due: {due}
                </p>
            </div>
            <Button size="sm" variant="ghost" className="shrink-0">
                <CheckCircle2 className="w-4 h-4" />
            </Button>
        </div>
    );
};

// Activity Row
const ActivityRow = ({
    icon: Icon,
    title,
    description,
    time,
    color,
    isNew,
}) => {
    const colorClasses = {
        green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
        blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
        orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
        teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
        yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
        purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    };

    return (
        <div className="flex gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
            <div className={`p-2 rounded-lg ${colorClasses[color]} shrink-0`}>
                <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {title}
                    </h4>
                    {isNew && (
                        <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                    )}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {description}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {time}
                </p>
            </div>
        </div>
    );
};

// Performance Card
const PerformanceCard = ({ rating, reviews, curedPatients, successRate }) => (
    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Your Performance</h3>
            <Award className="w-6 h-6 opacity-80" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
                <div className="flex items-center gap-1 mb-1">
                    <Star className="w-5 h-5 fill-current text-yellow-300" />
                    <span className="text-2xl font-bold">{rating}</span>
                </div>
                <p className="text-sm opacity-80">{reviews} reviews</p>
            </div>
            <div>
                <p className="text-2xl font-bold">{successRate}%</p>
                <p className="text-sm opacity-80">Success Rate</p>
            </div>
        </div>

        <div className="pt-4 border-t border-white/20">
            <div className="flex items-center justify-between text-sm">
                <span className="opacity-80">Cured this month</span>
                <span className="font-bold">{curedPatients} patients</span>
            </div>
        </div>

        <div className="mt-4">
            <Link
                to="/doctor/performance"
                className="flex items-center justify-center gap-2 text-sm font-medium hover:underline"
            >
                View Details
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    </div>
);

// Earnings Card
const EarningsCard = ({
    monthlyEarnings,
    trend,
    pendingPayments,
    consultations,
}) => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                    <Wallet className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Earnings
                </h3>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
                <TrendingUp className="w-4 h-4" />
                {trend}
            </span>
        </div>

        <div className="space-y-4">
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    This Month
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {monthlyEarnings}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Pending
                    </p>
                    <p className="text-lg font-semibold text-amber-600 dark:text-amber-400">
                        {pendingPayments}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Consultations
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {consultations} today
                    </p>
                </div>
            </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link to="/doctor/earnings">
                <Button variant="outline" className="w-full">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Earnings Report
                </Button>
            </Link>
        </div>
    </div>
);

export default DoctorDashboard;
