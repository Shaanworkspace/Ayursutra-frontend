/* eslint-disable no-unused-vars */
// doctor/DoctorDashboard.jsx

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    Calendar,
    Users,
    Activity,
    Wallet,
    PlayCircle,
    Eye,
} from "lucide-react";
import { DoctorLayout } from "./components/DoctorLayout";

export default function DoctorDashboard() {
    const { user } = useSelector((state) => state.auth);
    const doctorName = user?.name?.split(" ")[0] || "Doctor";

    return (
        <DoctorLayout>
            <div className="min-h-screen bg-gray-950 text-gray-100 p-6 pt-28">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <header>
                        <h1 className="text-3xl font-bold">
                            Welcome back, Dr. {doctorName}
                        </h1>
                        <p className="text-gray-400 mt-1">
                            Here’s a quick overview of today
                        </p>
                    </header>

                    {/* Stats */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard
                            icon={Calendar}
                            label="Appointments"
                            value="12"
                        />
                        <StatCard icon={Users} label="Patients" value="128" />
                        <StatCard
                            icon={Activity}
                            label="Active Treatments"
                            value="34"
                        />
                        <StatCard
                            icon={Wallet}
                            label="Earnings"
                            value="₹45,000"
                        />
                    </section>

                    {/* Main Grid */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Appointments */}
                        <section className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl">
                            <div className="p-4 border-b border-gray-800">
                                <h2 className="text-lg font-semibold">
                                    Today’s Appointments
                                </h2>
                            </div>

                            <div className="divide-y divide-gray-800">
                                <AppointmentRow
                                    time="10:00 AM"
                                    patient="Rahul Sharma"
                                    type="Video"
                                />
                                <AppointmentRow
                                    time="11:30 AM"
                                    patient="Priya Patel"
                                    type="In-person"
                                />
                                <AppointmentRow
                                    time="02:00 PM"
                                    patient="Amit Kumar"
                                    type="Video"
                                />
                            </div>

                            <div className="p-4 text-center">
                                <Link
                                    to="/doctor/appointments"
                                    className="text-sm text-emerald-400 hover:underline"
                                >
                                    View full schedule
                                </Link>
                            </div>
                        </section>

                        {/* Quick Actions */}
                        <section className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                            <h2 className="text-lg font-semibold mb-4">
                                Quick Actions
                            </h2>

                            <div className="space-y-3">
                                <ActionButton
                                    to="/doctor/consultation/start"
                                    icon={PlayCircle}
                                    label="Start Consultation"
                                />
                                <ActionButton
                                    to="/doctor/patients"
                                    icon={Users}
                                    label="View Patients"
                                />
                                <ActionButton
                                    to="/doctor/appointments"
                                    icon={Calendar}
                                    label="Manage Schedule"
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </DoctorLayout>
    );
}

/* ---------------- Small Components ---------------- */

const StatCard = ({ icon: Icon, label, value }) => (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600/20 rounded-lg">
                <Icon className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
                <p className="text-sm text-gray-400">{label}</p>
                <p className="text-xl font-bold">{value}</p>
            </div>
        </div>
    </div>
);

const AppointmentRow = ({ time, patient, type }) => (
    <div className="flex items-center justify-between p-4 hover:bg-gray-800/50">
        <div>
            <p className="font-medium">{patient}</p>
            <p className="text-xs text-gray-400">{time}</p>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-gray-800 rounded-full">
                {type}
            </span>
            <Eye className="w-4 h-4 text-gray-400" />
        </div>
    </div>
);

const ActionButton = ({ to, icon: Icon, label }) => (
    <Link
        to={to}
        className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
    >
        <Icon className="w-5 h-5 text-emerald-400" />
        <span className="text-sm font-medium">{label}</span>
    </Link>
);
