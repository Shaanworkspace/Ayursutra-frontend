/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Clock, Brain, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import TherapistNavbar from "../components/TherapistNavbar";

export default function TherapistSessions() {
    const profile = useSelector((state) => state.profile.data);

    const sessions = Array.isArray(profile?.medicalRecords)
        ? profile.medicalRecords
        : [];

    const [filter, setFilter] = useState("today"); // today | upcoming | past

    const today = new Date();
    const filteredSessions = sessions.filter((r) => {
        const date = r.visitDate
            ? new Date(r.visitDate)
            : new Date(r.createdDate);

        if (filter === "today") {
            return (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
            );
        }

        if (filter === "upcoming") {
            return date > today;
        }

        if (filter === "past") {
            return date < today;
        }

        return true;
    });

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    return (
        <>
            <TherapistNavbar />

            <div className="min-h-screen bg-gray-950 text-gray-100 p-6 pt-28">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold">Therapy Sessions</h1>
                        <p className="text-gray-400 mt-1">
                            Manage and review your therapy sessions
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2">
                        <FilterButton
                            active={filter === "today"}
                            onClick={() => setFilter("today")}
                        >
                            Today
                        </FilterButton>
                        <FilterButton
                            active={filter === "upcoming"}
                            onClick={() => setFilter("upcoming")}
                        >
                            Upcoming
                        </FilterButton>
                        <FilterButton
                            active={filter === "past"}
                            onClick={() => setFilter("past")}
                        >
                            Past
                        </FilterButton>
                    </div>

                    {/* Sessions List */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl max-h-[520px] overflow-y-auto divide-y divide-gray-800">
                        {filteredSessions.length === 0 && (
                            <p className="p-6 text-sm text-gray-400">
                                No sessions found
                            </p>
                        )}

                        {filteredSessions.map((record) => (
                            <div
                                key={record.medicalRecordId}
                                className="flex items-center justify-between p-4 hover:bg-gray-800/60 transition"
                            >
                                <div>
                                    <p className="font-medium">
                                        {record.patientName || "Patient"}
                                    </p>

                                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                        <Clock className="w-3 h-3" />
                                        {formatDate(
                                            record.visitDate ||
                                                record.createdDate,
                                        )}
                                    </p>

                                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 mt-2 bg-purple-500/20 text-purple-300 rounded-full">
                                        <Brain className="w-3 h-3" />
                                        Therapy Session
                                    </span>
                                </div>

                                <Link
                                    to={`/therapist/sessions/${record.medicalRecordId}`}
                                    className="text-sm px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center gap-2"
                                >
                                    <Eye className="w-4 h-4" />
                                    View
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

/* ---------- Helpers ---------- */

const FilterButton = ({ active, children, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-xl text-sm border transition ${
            active
                ? "bg-purple-600 border-purple-500 text-white"
                : "bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800"
        }`}
    >
        {children}
    </button>
);
