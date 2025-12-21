/* eslint-disable no-unused-vars */
// File: therapist/TherapistDashboard.jsx
// UI-ONLY VERSION (static, dark, no business logic)

import React from "react";
import {
    Calendar,
    Users,
    Star,
    Wallet,
    Clock,
    Video,
    TrendingUp,
    Activity,
    PlayCircle,
    Sparkles,
} from "lucide-react";
import TherapistNavbar from "./components/TherapistNavbar";
import { Button } from "@/components/ui/button";
import PatientFooter from "../Home/components/Footer";

export default function TherapistDashboard() {
    return (
        <>
            <TherapistNavbar />

            <div className="min-h-screen bg-gray-950 text-gray-100 p-6 pt-28">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* ================= HEADER ================= */}
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                        <div>
                            <p className="text-sm text-gray-400 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-purple-400" />
                                Good Day
                            </p>
                            <h1 className="text-3xl lg:text-4xl font-bold">
                                Welcome, Therapist
                            </h1>
                            <p className="text-gray-400 mt-2">
                                You have 8 sessions scheduled today
                            </p>
                        </div>

                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Start Session
                        </Button>
                    </div>

                    {/* ================= QUICK STATS ================= */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard title="Today's Sessions" value="8" />
                        <StatCard title="Total Patients" value="156" />
                        <StatCard title="Rating" value="4.9 ★" />
                        <StatCard title="This Month" value="₹85,000" />
                    </div>

                    {/* ================= MAIN GRID ================= */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* LEFT */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Today's Sessions */}
                            <Card title="Today's Sessions">
                                <SessionItem />
                                <SessionItem />
                                <SessionItem />
                            </Card>

                            {/* Calendar Overview */}
                            <Card title="Calendar Overview">
                                <div className="grid grid-cols-7 gap-2">
                                    {Array.from({ length: 28 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-14 rounded-xl bg-gray-800/60 border border-gray-700 flex flex-col items-center justify-center"
                                        >
                                            <span className="text-sm font-medium">
                                                {i + 1}
                                            </span>
                                            <span className="w-2 h-2 bg-purple-500 rounded-full mt-1" />
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <Card title="Quick Actions">
                                <QuickAction
                                    icon={Calendar}
                                    label="Manage Schedule"
                                />
                                <QuickAction icon={Users} label="My Patients" />
                                <QuickAction
                                    icon={Activity}
                                    label="Session Notes"
                                />
                                <QuickAction icon={Wallet} label="Earnings" />
                            </Card>

                            {/* Upcoming */}
                            <Card title="Upcoming Sessions">
                                <UpcomingItem />
                                <UpcomingItem />
                            </Card>

                            {/* Performance */}
                            <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 p-6 shadow-xl">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-lg font-semibold">
                                        Performance
                                    </h3>
                                    <TrendingUp className="w-6 h-6 opacity-80" />
                                </div>
                                <p className="text-5xl font-bold">
                                    4.9
                                    <span className="text-xl opacity-70">
                                        /5
                                    </span>
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-sm">
                                    <Star className="w-4 h-4" />
                                    Excellent feedback
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PatientFooter />
        </>
    );
}

/* ================= SUB COMPONENTS ================= */

const Card = ({ title, children }) => (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {children}
    </div>
);

const StatCard = ({ title, value }) => (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
);

const SessionItem = () => (
    <div className="flex justify-between items-center p-4 rounded-xl bg-gray-800/60 border border-gray-700">
        <div>
            <p className="font-medium">Patient Name</p>
            <p className="text-sm text-gray-400">Yoga Therapy • Session 3/10</p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                10:00 AM – 11:00 AM
            </p>
        </div>

        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
            <Video className="w-4 h-4 mr-1" />
            Join
        </Button>
    </div>
);

const UpcomingItem = () => (
    <div className="p-4 rounded-xl bg-gray-800/60 border border-gray-700">
        <p className="font-medium">04:00 PM – Patient Name</p>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <Video className="w-3 h-3" />
            Video Session
        </p>
    </div>
);

const QuickAction = ({ icon: Icon, label }) => (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/60 border border-gray-700 hover:bg-gray-800 transition">
        <Icon className="w-5 h-5 text-purple-400" />
        <span className="text-sm">{label}</span>
    </div>
);
