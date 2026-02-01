/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Calendar, Clock, CheckCircle2, Search, Eye } from "lucide-react";
import { DoctorLayout } from "../components/DoctorLayout";

export default function DoctorAppointments() {
    const profile = useSelector((state) => state.profile.data);

    const appointments = Array.isArray(profile?.medicalRecords)
        ? profile.medicalRecords
        : [];

    const [search, setSearch] = useState("");

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const todayList = [];
    const upcoming = [];
    const past = [];

    appointments.forEach((r) => {
        // Search filter
        const matchesSearch =
            r.patientName?.toLowerCase().includes(search.toLowerCase()) ?? true;

        if (!matchesSearch) return;

        // If visitDate missing → past
        if (!r.visitDate) {
            past.push(r);
            return;
        }

        const apptDate = new Date(r.visitDate);
        apptDate.setHours(0, 0, 0, 0);

        if (apptDate.getTime() === today.getTime()) {
            todayList.push(r);
        } else if (apptDate > today) {
            upcoming.push(r);
        } else {
            past.push(r);
        }
    });

    const classified = { todayList, upcoming, past };

    return (
        <DoctorLayout>
            <div className="min-h-screen bg-gray-950 text-gray-100 p-6 pt-28">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* HEADER */}
                    <div>
                        <h1 className="text-3xl font-bold">Appointments</h1>
                        <p className="text-gray-400 mt-1">
                            Manage your consultations efficiently
                        </p>
                    </div>

                    {/* SEARCH */}
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search patient..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-900/70 backdrop-blur border border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                    </div>

                    {/* GRID */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        <AppointmentColumn
                            title="Today"
                            subtitle="Scheduled for today"
                            data={classified.todayList}
                            highlight
                        />

                        <AppointmentColumn
                            title="Upcoming"
                            subtitle="Future appointments"
                            data={classified.upcoming}
                        />

                        <AppointmentColumn
                            title="Past"
                            subtitle="Completed consultations"
                            data={classified.past}
                        />
                    </div>
                </div>
            </div>
        </DoctorLayout>
    );
}

/* ================================================= */
/* ================= COMPONENTS ==================== */
/* ================================================= */

const AppointmentColumn = ({ title, subtitle, data, highlight }) => (
    <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden">
        <div
            className={`p-4 border-b border-gray-800 ${
                highlight ? "bg-emerald-500/10" : ""
            }`}
        >
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-xs text-gray-400">{subtitle}</p>
        </div>

        <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-800">
            {data.length === 0 && (
                <p className="p-4 text-sm text-gray-400">No appointments</p>
            )}

            {data.map((record) => (
                <AppointmentCard key={record.medicalRecordId} record={record} />
            ))}
        </div>
    </div>
);

const AppointmentCard = ({ record }) => {
    const date = record.visitDate || record.createdDate;

    const formattedDate = new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const markDone = () => {
        // TEMP: frontend-only
        alert("Marked as done (connect backend later)");
    };

    return (
        <div className="p-4 hover:bg-gray-800/50 transition">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-medium">
                        {record.patientName || "Patient"}
                    </p>

                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {formattedDate}
                    </p>
                </div>

                <span className="text-xs px-2 py-1 bg-gray-800 rounded-full">
                    {record.needTherapy ? "Therapy" : "Consultation"}
                </span>
            </div>

            <div className="mt-3 flex items-center gap-2">
                <Link
                    to={`/doctor/appointments/${record.medicalRecordId}`}
                    className="flex items-center gap-1 text-xs px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md"
                >
                    <Eye className="w-3 h-3" />
                    View
                </Link>

                {!record.completed && (
                    <button
                        onClick={markDone}
                        className="flex items-center gap-1 text-xs px-3 py-1 bg-emerald-600 hover:bg-emerald-700 rounded-md"
                    >
                        <CheckCircle2 className="w-3 h-3" />
                        Mark Done
                    </button>
                )}
            </div>
        </div>
    );
};
