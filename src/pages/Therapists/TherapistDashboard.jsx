/* eslint-disable no-unused-vars */
// File: therapist/TherapistDashboard.jsx

import React, { useState, useMemo } from "react";
import {
    Calendar,
    Clock,
    Users,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    Plus,
    Send,
    MessageSquare,
    Bell,
    Video,
    MapPin,
    Phone,
    Mail,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    Filter,
    Search,
    Download,
    RefreshCw,
    PlayCircle,
    PauseCircle,
    Settings,
    TrendingUp,
    Activity,
    Heart,
    Sparkles,
    Sun,
    Moon,
    CloudSun,
    ArrowRight,
    ChevronDown,
    Check,
    X,
    Copy,
    Zap,
    Target,
    Award,
    Star,
    FileText,
    ClipboardList,
    Wallet,
    BarChart3,
    Timer,
    UserCheck,
    CalendarDays,
    CalendarCheck,
    AlertTriangle,
    Info,
    Loader2,
    ExternalLink,
    Repeat,
    Coffee,
    Sunrise,
    Sunset,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { TherapistLayout } from "./components/TherapistLayout";

export const TherapistDashboard = () => {
    const today = useMemo(() => new Date(), []);
    const { user } = useSelector((state) => state.auth);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeTab, setActiveTab] = useState("today");
    const [showReminderModal, setShowReminderModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [viewMode, setViewMode] = useState("month"); // month, week, day

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
    const therapistName = user?.name?.split(" ")[0] || "Therapist";

    // Stats data
    const stats = {
        todaySessions: 8,
        completedToday: 3,
        upcomingToday: 5,
        weeklyPatients: 42,
        totalPatients: 156,
        monthlyEarnings: "₹85,000",
        avgSessionRating: 4.9,
        completionRate: 96,
    };

    // Time slots configuration
    const timeSlots = [
        { id: 1, time: "06:00 AM", period: "morning" },
        { id: 2, time: "07:00 AM", period: "morning" },
        { id: 3, time: "08:00 AM", period: "morning" },
        { id: 4, time: "09:00 AM", period: "morning" },
        { id: 5, time: "10:00 AM", period: "morning" },
        { id: 6, time: "11:00 AM", period: "morning" },
        { id: 7, time: "02:00 PM", period: "afternoon" },
        { id: 8, time: "03:00 PM", period: "afternoon" },
        { id: 9, time: "04:00 PM", period: "afternoon" },
        { id: 10, time: "05:00 PM", period: "evening" },
        { id: 11, time: "06:00 PM", period: "evening" },
        { id: 12, time: "07:00 PM", period: "evening" },
    ];

    // Sample appointments data with fixed pseudo‑random dates
    const allAppointments = [
        // Earlier this week
        {
            id: 1,
            date: "2024-06-03",
            slotId: 3,
            time: "08:00 AM",
            endTime: "09:00 AM",
            patientName: "Pooja Sharma",
            patientAge: 34,
            patientPhone: "+91 98765 43210",
            patientEmail: "pooja@email.com",
            therapyType: "Panchakarma - Vamana",
            sessionNumber: "5/10",
            status: "completed",
            mode: "in-person",
            notes: "Good progress, patient responding well",
            doctorName: "Dr. Amita Sharma",
            rating: 5,
        },
        {
            id: 2,
            date: "2024-06-04",
            slotId: 4,
            time: "09:00 AM",
            endTime: "10:00 AM",
            patientName: "Rajesh Kumar",
            patientAge: 48,
            patientPhone: "+91 98765 43211",
            patientEmail: "rajesh@email.com",
            therapyType: "Yoga Therapy",
            sessionNumber: "8/15",
            status: "completed",
            mode: "video",
            notes: "Flexibility improving",
            doctorName: "Dr. Rajesh Kumar",
            rating: 5,
        },
        {
            id: 3,
            date: "2024-06-05",
            slotId: 5,
            time: "10:00 AM",
            endTime: "11:00 AM",
            patientName: "Anita Singh",
            patientAge: 40,
            patientPhone: "+91 98765 43212",
            patientEmail: "anita@email.com",
            therapyType: "Shirodhara",
            sessionNumber: "2/7",
            status: "in-progress",
            mode: "in-person",
            notes: "",
            doctorName: "Dr. Amita Sharma",
        },
        {
            id: 4,
            date: "2024-06-06",
            slotId: 6,
            time: "11:00 AM",
            endTime: "12:00 PM",
            patientName: "Suresh Patel",
            patientAge: 55,
            patientPhone: "+91 98765 43213",
            patientEmail: "suresh@email.com",
            therapyType: "Abhyanga Massage",
            sessionNumber: "1/5",
            status: "waiting",
            mode: "in-person",
            notes: "First session – patient briefing needed",
            doctorName: "Dr. Priya Mehta",
        },
        // Today and next few days
        {
            id: 5,
            date: "2024-06-07",
            slotId: 7,
            time: "02:00 PM",
            endTime: "03:00 PM",
            patientName: "Meera Joshi",
            patientAge: 31,
            patientPhone: "+91 98765 43214",
            patientEmail: "meera@email.com",
            therapyType: "Yoga Therapy",
            sessionNumber: "4/12",
            status: "scheduled",
            mode: "video",
            notes: "",
            doctorName: "Dr. Rajesh Kumar",
        },
        {
            id: 6,
            date: "2024-06-08",
            slotId: 8,
            time: "03:00 PM",
            endTime: "04:00 PM",
            patientName: "Vikram Reddy",
            patientAge: 45,
            patientPhone: "+91 98765 43215",
            patientEmail: "vikram@email.com",
            therapyType: "Panchakarma - Basti",
            sessionNumber: "3/8",
            status: "scheduled",
            mode: "in-person",
            notes: "",
            doctorName: "Dr. Amita Sharma",
        },
        {
            id: 7,
            date: "2024-06-09",
            slotId: 10,
            time: "05:00 PM",
            endTime: "06:00 PM",
            patientName: "Kavita Nair",
            patientAge: 38,
            patientPhone: "+91 98765 43216",
            patientEmail: "kavita@email.com",
            therapyType: "Shirodhara",
            sessionNumber: "5/7",
            status: "scheduled",
            mode: "in-person",
            notes: "Final sessions, evaluate progress",
            doctorName: "Dr. Priya Mehta",
        },
        {
            id: 8,
            date: "2024-06-10",
            slotId: 11,
            time: "06:00 PM",
            endTime: "07:00 PM",
            patientName: "Arun Gupta",
            patientAge: 52,
            patientPhone: "+91 98765 43217",
            patientEmail: "arun@email.com",
            therapyType: "Yoga Therapy",
            sessionNumber: "10/15",
            status: "scheduled",
            mode: "video",
            notes: "",
            doctorName: "Dr. Rajesh Kumar",
        },
        {
            id: 9,
            date: "2024-06-11",
            slotId: 3,
            time: "08:00 AM",
            endTime: "09:00 AM",
            patientName: "Neha Sharma",
            patientAge: 29,
            patientPhone: "+91 98765 43218",
            patientEmail: "neha@email.com",
            therapyType: "Yoga Therapy",
            sessionNumber: "1/10",
            status: "scheduled",
            mode: "in-person",
            notes: "New patient",
            doctorName: "Dr. Rajesh Kumar",
        },
        {
            id: 10,
            date: "2024-06-12",
            slotId: 4,
            time: "09:00 AM",
            endTime: "10:00 AM",
            patientName: "Rohit Verma",
            patientAge: 35,
            patientPhone: "+91 98765 43219",
            patientEmail: "rohit@email.com",
            therapyType: "Abhyanga Massage",
            sessionNumber: "3/5",
            status: "scheduled",
            mode: "in-person",
            notes: "",
            doctorName: "Dr. Amita Sharma",
        },
        {
            id: 11,
            date: "2024-06-13",
            slotId: 5,
            time: "10:00 AM",
            endTime: "11:00 AM",
            patientName: "Priya Menon",
            patientAge: 42,
            patientPhone: "+91 98765 43220",
            patientEmail: "priya.m@email.com",
            therapyType: "Panchakarma - Virechana",
            sessionNumber: "2/6",
            status: "scheduled",
            mode: "in-person",
            notes: "",
            doctorName: "Dr. Priya Mehta",
        },
    ];

    // Get today's appointments
    const todayStr = new Date().toISOString().split("T")[0];
    const todayAppointments = allAppointments.filter(
        (apt) => apt.date === todayStr
    );

    // Get selected date appointments
    const selectedDateStr = selectedDate.toISOString().split("T")[0];
    const selectedDateAppointments = allAppointments.filter(
        (apt) => apt.date === selectedDateStr
    );

    // Calendar helper functions
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        const days = [];

        // Previous month days
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startingDay - 1; i >= 0; i--) {
            days.push({
                date: new Date(year, month - 1, prevMonthLastDay - i),
                isCurrentMonth: false,
            });
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                date: new Date(year, month, i),
                isCurrentMonth: true,
            });
        }

        // Next month days
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false,
            });
        }

        return days;
    };

    const calendarDays = getDaysInMonth(currentDate);

    // Get slot status for a specific date
    const getDateSlotStatus = (date) => {
        const dateStr = date.toISOString().split("T")[0];
        const dateAppointments = allAppointments.filter(
            (apt) => apt.date === dateStr
        );

        const totalSlots = timeSlots.length;
        const bookedSlots = dateAppointments.length;
        const vacantSlots = totalSlots - bookedSlots;

        if (bookedSlots === 0) return "vacant"; // All vacant - green
        if (bookedSlots === totalSlots) return "full"; // All booked - red
        if (bookedSlots >= totalSlots * 0.7) return "almost-full"; // >70% booked - orange
        return "partial"; // Partially booked - blue
    };

    // Get slot info for selected date
    const getSlotInfo = (slotId) => {
        return selectedDateAppointments.find((apt) => apt.slotId === slotId);
    };

    // Navigate months
    const prevMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        );
    };

    const nextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        );
    };

    const goToToday = () => {
        setCurrentDate(new Date());
        setSelectedDate(new Date());
    };

    // Reminder templates
    const reminderTemplates = [
        {
            id: 1,
            title: "Session Reminder",
            message:
                "Dear {patient_name}, this is a reminder for your {therapy_type} session scheduled for {date} at {time}. Please arrive 10 minutes early. Looking forward to seeing you!",
        },
        {
            id: 2,
            title: "Pre-Session Instructions",
            message:
                "Dear {patient_name}, for your upcoming {therapy_type} session on {date}, please ensure you haven't eaten for 2 hours before the session. Wear comfortable clothing. See you soon!",
        },
        {
            id: 3,
            title: "Follow-up Care",
            message:
                "Dear {patient_name}, after today's {therapy_type} session, please rest for at least 30 minutes. Avoid cold water and heavy meals for 2 hours. Contact us if you have any concerns.",
        },
        {
            id: 4,
            title: "Yoga Session Prep",
            message:
                "Dear {patient_name}, for your Yoga Therapy session on {date} at {time}, please bring your yoga mat and wear loose, comfortable clothes. Avoid eating 1 hour before the session.",
        },
        {
            id: 5,
            title: "Panchakarma Reminder",
            message:
                "Dear {patient_name}, your Panchakarma session is scheduled for {date} at {time}. Please follow the dietary guidelines provided. Arrive 15 minutes early for preparation.",
        },
    ];

    // Quick actions
    const quickActions = [
        {
            icon: PlayCircle,
            label: "Start Session",
            to: "/therapist/session/start",
            color: "from-green-500 to-emerald-500",
        },
        {
            icon: Calendar,
            label: "Manage Schedule",
            to: "/therapist/schedule",
            color: "from-blue-500 to-indigo-500",
        },
        {
            icon: FileText,
            label: "Session Notes",
            to: "/therapist/notes",
            color: "from-purple-500 to-pink-500",
        },
        {
            icon: Users,
            label: "My Patients",
            to: "/therapist/patients",
            color: "from-teal-500 to-cyan-500",
        },
        {
            icon: Bell,
            label: "Send Reminder",
            onClick: () => setShowReminderModal(true),
            color: "from-orange-500 to-amber-500",
        },
        {
            icon: BarChart3,
            label: "Reports",
            to: "/therapist/reports",
            color: "from-cyan-500 to-blue-500",
        },
    ];

    // Upcoming sessions (next 3)
    const upcomingSessions = todayAppointments
        .filter((apt) => apt.status === "scheduled" || apt.status === "waiting")
        .slice(0, 3);

    // Handle send reminder
    const handleSendReminder = (appointment, template) => {
        // Replace placeholders in template
        const message = template.message
            .replace("{patient_name}", appointment.patientName)
            .replace("{therapy_type}", appointment.therapyType)
            .replace("{date}", appointment.date)
            .replace("{time}", appointment.time);

        console.log("Sending reminder:", message);
        // API call would go here
        setShowReminderModal(false);
        setSelectedAppointment(null);
    };

    return (
        <TherapistLayout>
            <div className="p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* ==================== HEADER SECTION ==================== */}
                    <section className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
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
                                Welcome, {therapistName}! 🙏
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                You have{" "}
                                <span className="font-semibold text-purple-600 dark:text-purple-400">
                                    {stats.todaySessions} sessions
                                </span>{" "}
                                scheduled today.{" "}
                                <span className="text-gray-500">
                                    {stats.completedToday} completed,{" "}
                                    {stats.upcomingToday} upcoming
                                </span>
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <Button
                                variant="outline"
                                className="hidden sm:flex items-center gap-2"
                                onClick={() => setShowReminderModal(true)}
                            >
                                <Bell className="w-4 h-4" />
                                Send Reminder
                            </Button>
                            <Link to="/therapist/session/start">
                                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25">
                                    <PlayCircle className="w-4 h-4 mr-2" />
                                    Start Session
                                </Button>
                            </Link>
                        </div>
                    </section>

                    {/* ==================== STATS GRID ==================== */}
                    <section>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            <StatsCard
                                icon={CalendarCheck}
                                label="Today's Sessions"
                                value={stats.todaySessions}
                                subtext={`${stats.completedToday} done, ${stats.upcomingToday} left`}
                                color="purple"
                            />
                            <StatsCard
                                icon={Users}
                                label="Weekly Patients"
                                value={stats.weeklyPatients}
                                subtext={`${stats.totalPatients} total`}
                                color="blue"
                            />
                            <StatsCard
                                icon={Target}
                                label="Completion Rate"
                                value={`${stats.completionRate}%`}
                                subtext="This month"
                                trend="+2%"
                                trendUp={true}
                                color="green"
                            />
                            <StatsCard
                                icon={Star}
                                label="Avg. Rating"
                                value={stats.avgSessionRating}
                                subtext="From patients"
                                color="amber"
                            />
                            <StatsCard
                                icon={Wallet}
                                label="This Month"
                                value={stats.monthlyEarnings}
                                subtext="Earnings"
                                trend="+12%"
                                trendUp={true}
                                color="teal"
                            />
                        </div>
                    </section>

                    {/* ==================== MAIN CONTENT GRID ==================== */}
                    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Left Column - Calendar */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Calendar Card */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                {/* Calendar Header */}
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                                {currentDate.toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        month: "long",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </h3>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={prevMonth}
                                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                                >
                                                    <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                                </button>
                                                <button
                                                    onClick={nextMonth}
                                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                                >
                                                    <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={goToToday}
                                            >
                                                Today
                                            </Button>
                                            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                                                {["month", "week", "day"].map(
                                                    (mode) => (
                                                        <button
                                                            key={mode}
                                                            onClick={() =>
                                                                setViewMode(
                                                                    mode
                                                                )
                                                            }
                                                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                                                                viewMode ===
                                                                mode
                                                                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                                                                    : "text-gray-600 dark:text-gray-400"
                                                            }`}
                                                        >
                                                            {mode
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                mode.slice(1)}
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Legend */}
                                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                            <span className="text-gray-600 dark:text-gray-400">
                                                All Vacant
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Partially Booked
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-orange-500" />
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Almost Full
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Fully Booked
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Calendar Grid */}
                                <div className="p-6">
                                    {/* Day Headers */}
                                    <div className="grid grid-cols-7 gap-1 mb-2">
                                        {[
                                            "Sun",
                                            "Mon",
                                            "Tue",
                                            "Wed",
                                            "Thu",
                                            "Fri",
                                            "Sat",
                                        ].map((day) => (
                                            <div
                                                key={day}
                                                className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2"
                                            >
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Calendar Days */}
                                    <div className="grid grid-cols-7 gap-1">
                                        {calendarDays.map((day, idx) => {
                                            const isToday =
                                                day.date.toDateString() ===
                                                new Date().toDateString();
                                            const isSelected =
                                                day.date.toDateString() ===
                                                selectedDate.toDateString();
                                            const slotStatus =
                                                getDateSlotStatus(day.date);

                                            const statusColors = {
                                                vacant: "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700",
                                                partial:
                                                    "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700",
                                                "almost-full":
                                                    "bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700",
                                                full: "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700",
                                            };

                                            const dotColors = {
                                                vacant: "bg-green-500",
                                                partial: "bg-blue-500",
                                                "almost-full": "bg-orange-500",
                                                full: "bg-red-500",
                                            };

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() =>
                                                        setSelectedDate(
                                                            day.date
                                                        )
                                                    }
                                                    className={`
                                                        relative p-2 h-14 rounded-lg border-2 transition-all
                                                        ${
                                                            !day.isCurrentMonth
                                                                ? "opacity-40"
                                                                : ""
                                                        }
                                                        ${
                                                            isSelected
                                                                ? "ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-gray-900"
                                                                : ""
                                                        }
                                                        ${
                                                            isToday
                                                                ? "border-purple-500 dark:border-purple-400"
                                                                : day.isCurrentMonth
                                                                ? statusColors[
                                                                      slotStatus
                                                                  ]
                                                                : "border-transparent"
                                                        }
                                                        hover:scale-105 hover:shadow-md
                                                    `}
                                                >
                                                    <span
                                                        className={`
                                                        text-sm font-medium
                                                        ${
                                                            isToday
                                                                ? "text-purple-600 dark:text-purple-400"
                                                                : day.isCurrentMonth
                                                                ? "text-gray-900 dark:text-gray-100"
                                                                : "text-gray-400 dark:text-gray-600"
                                                        }
                                                    `}
                                                    >
                                                        {day.date.getDate()}
                                                    </span>
                                                    {day.isCurrentMonth && (
                                                        <div
                                                            className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${dotColors[slotStatus]}`}
                                                        />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Selected Date Slots */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                                {selectedDate.toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        weekday: "long",
                                                        month: "long",
                                                        day: "numeric",
                                                    }
                                                )}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {
                                                    selectedDateAppointments.length
                                                }{" "}
                                                booked,{" "}
                                                {timeSlots.length -
                                                    selectedDateAppointments.length}{" "}
                                                vacant slots
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <Plus className="w-4 h-4 mr-1" />
                                            Block Slot
                                        </Button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {/* Time Period Sections */}
                                    {["morning", "afternoon", "evening"].map(
                                        (period) => {
                                            const periodSlots =
                                                timeSlots.filter(
                                                    (slot) =>
                                                        slot.period === period
                                                );
                                            const periodIcons = {
                                                morning: Sunrise,
                                                afternoon: Sun,
                                                evening: Sunset,
                                            };
                                            const PeriodIcon =
                                                periodIcons[period];

                                            return (
                                                <div
                                                    key={period}
                                                    className="mb-6 last:mb-0"
                                                >
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <PeriodIcon className="w-4 h-4 text-gray-500" />
                                                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                                            {period}
                                                        </h4>
                                                    </div>
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                                        {periodSlots.map(
                                                            (slot) => {
                                                                const appointment =
                                                                    getSlotInfo(
                                                                        slot.id
                                                                    );
                                                                const isBooked =
                                                                    !!appointment;

                                                                return (
                                                                    <SlotCard
                                                                        key={
                                                                            slot.id
                                                                        }
                                                                        slot={
                                                                            slot
                                                                        }
                                                                        appointment={
                                                                            appointment
                                                                        }
                                                                        isBooked={
                                                                            isBooked
                                                                        }
                                                                        onSendReminder={() => {
                                                                            setSelectedAppointment(
                                                                                appointment
                                                                            );
                                                                            setShowReminderModal(
                                                                                true
                                                                            );
                                                                        }}
                                                                    />
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>

                            {/* Today's Sessions Tab */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                                Today's Sessions
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                All your appointments for today
                                            </p>
                                        </div>

                                        {/* Filter Tabs */}
                                        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                                            {[
                                                { key: "all", label: "All" },
                                                {
                                                    key: "upcoming",
                                                    label: "Upcoming",
                                                },
                                                {
                                                    key: "completed",
                                                    label: "Completed",
                                                },
                                            ].map((tab) => (
                                                <button
                                                    key={tab.key}
                                                    onClick={() =>
                                                        setActiveTab(tab.key)
                                                    }
                                                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                                                        activeTab === tab.key
                                                            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                                                            : "text-gray-600 dark:text-gray-400"
                                                    }`}
                                                >
                                                    {tab.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Sessions List */}
                                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {todayAppointments
                                        .filter((apt) => {
                                            if (activeTab === "all")
                                                return true;
                                            if (activeTab === "upcoming")
                                                return (
                                                    apt.status ===
                                                        "scheduled" ||
                                                    apt.status === "waiting" ||
                                                    apt.status === "in-progress"
                                                );
                                            if (activeTab === "completed")
                                                return (
                                                    apt.status === "completed"
                                                );
                                            return true;
                                        })
                                        .map((apt) => (
                                            <SessionRow
                                                key={apt.id}
                                                {...apt}
                                                onSendReminder={() => {
                                                    setSelectedAppointment(apt);
                                                    setShowReminderModal(true);
                                                }}
                                            />
                                        ))}
                                </div>

                                {/* View All */}
                                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                                    <Link
                                        to="/therapist/sessions"
                                        className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group"
                                    >
                                        View all sessions
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

                            {/* Upcoming Sessions */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                            Next Up
                                        </h3>
                                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full">
                                            {upcomingSessions.length}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 space-y-3">
                                    {upcomingSessions.map((session) => (
                                        <UpcomingSessionCard
                                            key={session.id}
                                            {...session}
                                            onSendReminder={() => {
                                                setSelectedAppointment(session);
                                                setShowReminderModal(true);
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Patient Messages */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                            <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                            Messages
                                        </h3>
                                    </div>
                                    <span className="flex items-center justify-center w-6 h-6 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 text-xs font-bold rounded-full">
                                        2
                                    </span>
                                </div>
                                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                    <MessageItem
                                        name="Pooja Sharma"
                                        message="Thank you for today's session! Feeling much better."
                                        time="1 hour ago"
                                        unread={true}
                                    />
                                    <MessageItem
                                        name="Rajesh Kumar"
                                        message="Can we reschedule tomorrow's session?"
                                        time="3 hours ago"
                                        unread={true}
                                    />
                                    <MessageItem
                                        name="Dr. Amita Sharma"
                                        message="Please update notes for Sunita's progress"
                                        time="5 hours ago"
                                        unread={false}
                                    />
                                </div>
                                <div className="p-4">
                                    <Link to="/therapist/messages">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            View All Messages
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Today's Summary */}
                            <TodaySummaryCard
                                completed={stats.completedToday}
                                upcoming={stats.upcomingToday}
                                total={stats.todaySessions}
                            />

                            {/* Performance Card */}
                            <PerformanceCard
                                rating={stats.avgSessionRating}
                                completionRate={stats.completionRate}
                                totalPatients={stats.totalPatients}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Reminder Modal */}
            {showReminderModal && (
                <ReminderModal
                    appointment={selectedAppointment}
                    templates={reminderTemplates}
                    onClose={() => {
                        setShowReminderModal(false);
                        setSelectedAppointment(null);
                    }}
                    onSend={handleSendReminder}
                />
            )}
        </TherapistLayout>
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
        purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
        blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
        green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
        amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
        teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
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
                        <TrendingUp className="w-3 h-3" />
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
const QuickActionCard = ({ icon: Icon, label, to, color, onClick }) => {
    const content = (
        <div className="group flex flex-col p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all hover:shadow-md cursor-pointer">
            <div
                className={`p-3 bg-gradient-to-br ${color} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform self-start`}
            >
                <Icon className="w-5 h-5" />
            </div>
            <span className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </span>
        </div>
    );

    if (onClick) {
        return <div onClick={onClick}>{content}</div>;
    }

    return <Link to={to}>{content}</Link>;
};

// Slot Card
const SlotCard = ({ slot, appointment, isBooked, onSendReminder }) => {
    const getStatusConfig = () => {
        if (!isBooked) {
            return {
                bg: "bg-green-50 dark:bg-green-900/20",
                border: "border-green-200 dark:border-green-800",
                text: "text-green-700 dark:text-green-300",
                label: "Vacant",
            };
        }

        switch (appointment?.status) {
            case "completed":
                return {
                    bg: "bg-gray-50 dark:bg-gray-800",
                    border: "border-gray-200 dark:border-gray-700",
                    text: "text-gray-600 dark:text-gray-400",
                    label: "Completed",
                };
            case "in-progress":
                return {
                    bg: "bg-blue-50 dark:bg-blue-900/20",
                    border: "border-blue-200 dark:border-blue-800",
                    text: "text-blue-700 dark:text-blue-300",
                    label: "In Progress",
                };
            case "waiting":
                return {
                    bg: "bg-amber-50 dark:bg-amber-900/20",
                    border: "border-amber-200 dark:border-amber-800",
                    text: "text-amber-700 dark:text-amber-300",
                    label: "Waiting",
                };
            default:
                return {
                    bg: "bg-purple-50 dark:bg-purple-900/20",
                    border: "border-purple-200 dark:border-purple-800",
                    text: "text-purple-700 dark:text-purple-300",
                    label: "Scheduled",
                };
        }
    };

    const config = getStatusConfig();

    return (
        <div
            className={`p-3 rounded-xl border-2 ${config.bg} ${config.border} transition-all hover:shadow-md`}
        >
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {slot.time}
                </span>
                <span className={`text-xs font-medium ${config.text}`}>
                    {config.label}
                </span>
            </div>

            {isBooked ? (
                <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                        {appointment.patientName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {appointment.therapyType}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                        {appointment.status === "scheduled" && (
                            <button
                                onClick={onSendReminder}
                                className="flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded text-xs hover:bg-purple-200 dark:hover:bg-purple-900 transition-colors"
                            >
                                <Bell className="w-3 h-3" />
                                Remind
                            </button>
                        )}
                        {appointment.mode === "video" && (
                            <Video className="w-3 h-3 text-blue-500" />
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-center py-2">
                    <button className="text-xs text-green-600 dark:text-green-400 hover:underline">
                        + Add Appointment
                    </button>
                </div>
            )}
        </div>
    );
};

// Session Row
const SessionRow = ({
    time,
    endTime,
    patientName,
    patientAge,
    patientPhone,
    therapyType,
    sessionNumber,
    status,
    mode,
    doctorName,
    rating,
    onSendReminder,
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
            bg: "bg-purple-100 dark:bg-purple-900/30",
            text: "text-purple-700 dark:text-purple-300",
            icon: Calendar,
            label: "Scheduled",
        },
    };

    const config = statusConfig[status];
    const StatusIcon = config.icon;

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
            <div
                className={`w-1 h-12 rounded-full ${
                    status === "completed"
                        ? "bg-green-500"
                        : status === "in-progress"
                        ? "bg-blue-500"
                        : status === "waiting"
                        ? "bg-amber-500"
                        : "bg-purple-500"
                }`}
            />

            {/* Patient Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                        {patientName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                            {patientName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {therapyType} • Session {sessionNumber}
                        </p>
                    </div>
                </div>
            </div>

            {/* Mode & Doctor */}
            <div className="hidden sm:flex flex-col items-end gap-1">
                <span
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        mode === "video"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    }`}
                >
                    {mode === "video" ? (
                        <Video className="w-3 h-3" />
                    ) : (
                        <MapPin className="w-3 h-3" />
                    )}
                    {mode === "video" ? "Video" : "In-person"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    by {doctorName}
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
                        className="bg-purple-600 hover:bg-purple-700 text-white"
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
                {status === "scheduled" && (
                    <>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={onSendReminder}
                        >
                            <Bell className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </>
                )}
                {status === "completed" && rating && (
                    <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{rating}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

// Upcoming Session Card
const UpcomingSessionCard = ({
    time,
    patientName,
    therapyType,
    sessionNumber,
    mode,
    status,
    onSendReminder,
}) => (
    <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-800">
        <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-purple-700 dark:text-purple-300">
                {time}
            </span>
            <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    status === "waiting"
                        ? "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300"
                        : "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
                }`}
            >
                {status === "waiting" ? "Waiting" : "Scheduled"}
            </span>
        </div>
        <p className="font-medium text-gray-900 dark:text-gray-100">
            {patientName}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
            {therapyType}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Session {sessionNumber}
        </p>
        <div className="flex items-center gap-2 mt-3">
            <Button size="sm" variant="outline" className="flex-1 text-xs">
                <Eye className="w-3 h-3 mr-1" />
                View
            </Button>
            <Button
                size="sm"
                variant="outline"
                className="flex-1 text-xs"
                onClick={onSendReminder}
            >
                <Bell className="w-3 h-3 mr-1" />
                Remind
            </Button>
        </div>
    </div>
);

// Message Item
const MessageItem = ({ name, message, time, unread }) => (
    <div
        className={`flex gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer ${
            unread ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
        }`}
    >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-sm font-medium shrink-0">
            {name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {name}
                </p>
                {unread && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {message}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {time}
            </p>
        </div>
    </div>
);

// Today Summary Card
const TodaySummaryCard = ({ completed, upcoming, total }) => {
    const progress = (completed / total) * 100;

    return (
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Today's Progress</h3>
                <Activity className="w-6 h-6 opacity-80" />
            </div>

            <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-bold">{completed}</span>
                <span className="text-xl opacity-80 mb-1">/{total}</span>
                <span className="text-sm opacity-80 mb-1 ml-2">completed</span>
            </div>

            {/* Progress Bar */}
            <div className="h-3 bg-white/20 rounded-full overflow-hidden mb-2">
                <div
                    className="h-full bg-white rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex justify-between text-sm">
                <span className="opacity-80">{upcoming} remaining</span>
                <span className="font-medium">{Math.round(progress)}%</span>
            </div>
        </div>
    );
};

// Performance Card
const PerformanceCard = ({ rating, completionRate, totalPatients }) => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Performance
            </h3>
            <Award className="w-6 h-6 text-purple-500" />
        </div>

        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Avg Rating
                    </span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {rating}
                </span>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Completion
                    </span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {completionRate}%
                </span>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Total Patients
                    </span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {totalPatients}
                </span>
            </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link to="/therapist/performance">
                <Button variant="outline" className="w-full">
                    View Full Report
                </Button>
            </Link>
        </div>
    </div>
);

// Reminder Modal
const ReminderModal = ({ appointment, templates, onClose, onSend }) => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [customMessage, setCustomMessage] = useState("");
    const [activeTemplateTab, setActiveTemplateTab] = useState("templates");

    const formatMessage = (template) => {
        if (!appointment) return template.message;
        return template.message
            .replace("{patient_name}", appointment.patientName)
            .replace("{therapy_type}", appointment.therapyType)
            .replace("{date}", appointment.date)
            .replace("{time}", appointment.time);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                Send Reminder
                            </h2>
                            {appointment && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    To: {appointment.patientName} •{" "}
                                    {appointment.therapyType}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {/* Tabs */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setActiveTemplateTab("templates")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                activeTemplateTab === "templates"
                                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                            }`}
                        >
                            Use Template
                        </button>
                        <button
                            onClick={() => setActiveTemplateTab("custom")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                activeTemplateTab === "custom"
                                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                            }`}
                        >
                            Custom Message
                        </button>
                    </div>

                    {activeTemplateTab === "templates" ? (
                        <div className="space-y-3">
                            {templates.map((template) => (
                                <div
                                    key={template.id}
                                    onClick={() =>
                                        setSelectedTemplate(template)
                                    }
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                        selectedTemplate?.id === template.id
                                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                                            : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                            {template.title}
                                        </h4>
                                        {selectedTemplate?.id ===
                                            template.id && (
                                            <CheckCircle2 className="w-5 h-5 text-purple-500" />
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {formatMessage(template)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Custom Message
                            </label>
                            <textarea
                                value={customMessage}
                                onChange={(e) =>
                                    setCustomMessage(e.target.value)
                                }
                                placeholder="Type your custom reminder message..."
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Available placeholders: {"{patient_name}"},{" "}
                                {"{therapy_type}"}, {"{date}"}, {"{time}"}
                            </p>
                        </div>
                    )}

                    {/* Preview */}
                    {(selectedTemplate || customMessage) && (
                        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <Eye className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Preview
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {selectedTemplate
                                    ? formatMessage(selectedTemplate)
                                    : customMessage}
                            </p>
                        </div>
                    )}

                    {/* Send Options */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Send via
                        </label>
                        <div className="flex flex-wrap gap-3">
                            <label className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="w-4 h-4 text-purple-600 rounded"
                                />
                                <MessageSquare className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    WhatsApp
                                </span>
                            </label>
                            <label className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="w-4 h-4 text-purple-600 rounded"
                                />
                                <Phone className="w-4 h-4 text-blue-500" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    SMS
                                </span>
                            </label>
                            <label className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-purple-600 rounded"
                                />
                                <Mail className="w-4 h-4 text-red-500" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    Email
                                </span>
                            </label>
                            <label className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-purple-600 rounded"
                                />
                                <Bell className="w-4 h-4 text-purple-500" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    Push Notification
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <div className="flex items-center gap-3">
                        <Button variant="outline">
                            <Clock className="w-4 h-4 mr-2" />
                            Schedule
                        </Button>
                        <Button
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                            onClick={() =>
                                onSend(
                                    appointment,
                                    selectedTemplate || {
                                        message: customMessage,
                                    }
                                )
                            }
                            disabled={!selectedTemplate && !customMessage}
                        >
                            <Send className="w-4 h-4 mr-2" />
                            Send Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TherapistDashboard;
