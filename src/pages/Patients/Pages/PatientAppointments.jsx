/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
    Clock,
    Video,
    MapPin,
    Calendar,
    User,
    ChevronRight,
    SearchX,
    Stethoscope,
    BrainCircuit,
    Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "@/lib/axios";
import { PatientLayout } from "../components/PatientLayout";
import { Badge } from "@/components/ui/badge";

export default function PatientAppointments() {
    // Redux & Environment Data
    const auth = useSelector((state) => state.auth);
    const reduxUser = useSelector((state) => state.auth.userResponse);
    const reduxProfile = useSelector((state) => state.profile.data);
    const storedUser = localStorage.getItem("userResponse");

    const user = storedUser ? JSON.parse(storedUser) : reduxUser;
    const gateway = import.meta.env.VITE_API_GATEWAY_BASE_URL;

    // Correct Patient ID
    const patientId = user?.id || user?.userId || reduxProfile?.userId;

    // Local State
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("upcoming");

    const today = new Date();

    // ================= FETCH DATA FROM DATABASE =================
    const fetchAppointments = useCallback(async () => {
        if (!auth.token || !patientId) return;

        setLoading(true);
        try {
            const res = await axios.get(
                `${gateway}/api/patients/all/medical-records/${patientId}`,
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                },
            );
            console.log("Fetched Appointments:", res.data);
            setMedicalRecords(res.data || []);
        } catch (err) {
            console.error("Error fetching appointments:", err);
            setMedicalRecords([]);
        } finally {
            setLoading(false);
        }
    }, [auth.token, patientId, gateway]);

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    // ================= FILTER & SORT LOGIC =================
    const filteredAppointments = useMemo(() => {
        const sorted = [...medicalRecords].sort(
            (a, b) => new Date(b.visitDate) - new Date(a.visitDate),
        );

        return sorted.filter((r) => {
            const appointmentDate = new Date(r.visitDate);
            const isCompleted = r.sessionMedicalRecordStatus === "COMPLETED";

            if (filter === "upcoming") {
                // Future dates that are NOT marked as completed
                return (
                    appointmentDate >= today.setHours(0, 0, 0, 0) &&
                    !isCompleted
                );
            } else {
                // Past dates OR items marked as completed
                return (
                    appointmentDate < today.setHours(0, 0, 0, 0) || isCompleted
                );
            }
        });
    }, [medicalRecords, filter]);

    return (
        <PatientLayout>
            <div className="min-h-screen bg-gray-950 text-gray-100 p-6 pt-28">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* HEADER SECTION */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight">
                                Appointments
                            </h1>
                            <p className="text-gray-400 mt-2">
                                Keep track of your health journey and upcoming
                                consultations
                            </p>
                        </div>

                        {/* TABS/FILTER */}
                        <div className="inline-flex p-1 bg-gray-900 border border-gray-800 rounded-2xl shadow-inner">
                            <button
                                onClick={() => setFilter("upcoming")}
                                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                    filter === "upcoming"
                                        ? "bg-cyan-600 text-white shadow-lg"
                                        : "text-gray-400 hover:text-gray-200"
                                }`}
                            >
                                Upcoming
                            </button>
                            <button
                                onClick={() => setFilter("past")}
                                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                    filter === "past"
                                        ? "bg-cyan-600 text-white shadow-lg"
                                        : "text-gray-400 hover:text-gray-200"
                                }`}
                            >
                                Past History
                            </button>
                        </div>
                    </div>

                    {/* LOADING STATE */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" />
                            <p className="text-gray-400">
                                Loading your appointments...
                            </p>
                        </div>
                    ) : (
                        /* APPOINTMENTS LIST */
                        <div className="space-y-4">
                            {filteredAppointments.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 bg-gray-900/50 border border-dashed border-gray-800 rounded-3xl">
                                    <SearchX className="w-16 h-16 text-gray-700 mb-4" />
                                    <h3 className="text-xl font-medium text-gray-400">
                                        No {filter} appointments found
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Once you schedule a session, it will
                                        appear here.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {filteredAppointments.map((record) => (
                                        <AppointmentCard
                                            key={record.medicalRecordId}
                                            record={record}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </PatientLayout>
    );
}

/* ================== SUB-COMPONENTS ================== */

const AppointmentCard = ({ record }) => {
    const isTherapy = record.needTherapy === true;
    const isCompleted = record.sessionMedicalRecordStatus === "COMPLETED";

    // Provider name logic based on session type
    const providerName = isTherapy
        ? record.therapistPlans?.therapistName
        : record.doctorName;

    const sessionType = isTherapy ? "Therapy Session" : "Medical Consultation";

    return (
        <div
            className={`group relative flex flex-col md:flex-row md:items-center justify-between p-5 bg-gray-900 border border-gray-800 rounded-2xl transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] ${isCompleted ? "opacity-80" : ""}`}
        >
            <div className="flex gap-5 items-center">
                {/* ICON BLOCK */}
                <div
                    className={`hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl border ${
                        isTherapy
                            ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                            : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                    }`}
                >
                    {isTherapy ? (
                        <BrainCircuit className="w-7 h-7" />
                    ) : (
                        <Stethoscope className="w-7 h-7" />
                    )}
                </div>

                {/* INFO BLOCK */}
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold tracking-widest uppercase text-cyan-500/80">
                            {sessionType}
                        </span>
                        {isCompleted && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/20 pointer-events-none">
                                Completed
                            </Badge>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-gray-100 flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        {providerName || "Assigned Provider"}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-cyan-500" />
                            {new Date(record.visitDate).toLocaleDateString(
                                "en-IN",
                                {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                },
                            )}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-cyan-500" />
                            {record.appointmentTime || "Time TBD"}
                        </span>
                    </div>
                </div>
            </div>

            {/* ACTION BLOCK */}
            <div className="mt-4 md:mt-0 flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-950 rounded-xl border border-gray-800 text-xs text-gray-400">
                    <Video className="w-3.5 h-3.5" />
                    Video Call
                </div>

                <Link
                    to={`/patient/medical-records/${record.medicalRecordId}`}
                    className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all group-hover:px-6"
                >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};
