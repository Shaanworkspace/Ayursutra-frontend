/* eslint-disable no-unused-vars */
// doctor/DoctorDashboard.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    Calendar,
    Users,
    Activity,
    Wallet,
    PlayCircle,
    Eye,
    Loader2,
} from "lucide-react";
import { DoctorLayout } from "./components/DoctorLayout";
import axios from "axios";
import { setProfile } from "@/Store/Slices/profileSlice";
import DoctorUpdatePage from "./Pages/DoctorUpdatePage";

export default function DoctorDashboard() {
    const dispatch = useDispatch();

    const reduxUser = useSelector((state) => state.auth.userResponse);
    const reduxProfile = useSelector((state) => state.profile.data);
    const reduxRole = useSelector((state) => state.auth.role);
    const reduxProfileRole = useSelector((state) => state.profile.role);
    const auth = useSelector((state) => state.auth);
    const storedProfile = localStorage.getItem("profile");
    const storedUser = localStorage.getItem("userResponse");
    const [showAll, setShowAll] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [loadingRecords, setLoadingRecords] = useState(false);
    const profile = storedProfile
        ? JSON.parse(storedProfile).data
        : reduxProfile;

    const needsProfileUpdate =
        !profile?.specialization || !profile?.availability;

    const user = storedUser ? JSON.parse(storedUser) : reduxUser;
    const roleU = localStorage.getItem("role") || reduxRole;

    const sortedAppointments = [...medicalRecords].sort(
        (a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime),
    );
    const visibleAppointments = showAll
        ? sortedAppointments
        : sortedAppointments.slice(0, 10);
    const formatDate = (date) =>
        date
            ? new Date(date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
              })
            : "Not Scheduled";

    console.log("token :", auth.token);
    console.log("profile:  ", profile);
    console.log("user :  ", user);

    const gateway = import.meta.env.VITE_API_GATEWAY_BASE_URL;
    const doctorFName = user?.firstName || "Doctor";
    const today = new Date();

    const totalAppointments = medicalRecords?.length;

    const uniquePatients = new Set(medicalRecords?.map((r) => r.patientId))
        .size;

    const activeTreatments = medicalRecords?.filter(
        (r) => r.needTherapy === true,
    ).length;
    const earnings = totalAppointments * 1500;

    useEffect(() => {
        if (!auth.token || !user) return;

        const profileUserId = profile?.email;
        const authUserId = user?.email;

        const shouldFetch =
            profileUserId !== authUserId ||
            reduxProfileRole?.toLowerCase() !== roleU?.toLowerCase();

        if (shouldFetch) {
            const fetchDoctorProfile = async () => {
                try {
                    setLoadingProfile(true);
                    const res = await axios.get(
                        `${gateway}/api/doctors/profile/me`,
                        {
                            headers: {
                                Authorization: `Bearer ${auth.token}`,
                            },
                        },
                    );
                    dispatch(
                        setProfile({
                            role: "DOCTOR",
                            data: res.data,
                        }),
                    );
                } catch (error) {
                    console.error("Error fetching doctor profile:", error);
                } finally {
                    setLoadingProfile(false);
                }
            };

            fetchDoctorProfile();
        }
    }, [
        auth.token,
        user?.email,
        profile?.email,
        reduxProfileRole,
        roleU,
        gateway,
        dispatch,
    ]);

    useEffect(() => {
        if (!auth.token || !user?.id) return;

        const fetchDoctorMedicalRecords = async () => {
            try {
                setLoadingRecords(true);

                const res = await axios.get(
                    `${gateway}/api/patients/medical-records/doc/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                    },
                );
                console.log("records : ", res.data);
                setMedicalRecords(res.data || []);
            } catch (e) {
                console.error("Failed to load doctor medical records", e);
                setMedicalRecords([]);
            } finally {
                setLoadingRecords(false);
            }
        };

        fetchDoctorMedicalRecords();
    }, [auth.token, user?.userId, gateway]);

    if (!loadingProfile && profile && needsProfileUpdate) {
        return <DoctorUpdatePage />;
    }

    return (
        <DoctorLayout>
            <div className="min-h-screen bg-gray-950 text-gray-100 p-6 pt-28">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <header>
                        <h1 className="text-3xl font-bold">
                            Welcome back, Dr. {doctorFName}
                        </h1>
                        <p className="text-gray-400 mt-1">
                            Here's a quick overview of today
                        </p>
                    </header>

                    {/* Stats */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {loadingProfile ? (
                            <>
                                <StatCardSkeleton />
                                <StatCardSkeleton />
                                <StatCardSkeleton />
                                <StatCardSkeleton />
                            </>
                        ) : (
                            <>
                                <StatCard
                                    icon={Calendar}
                                    label="Total Appointments"
                                    value={totalAppointments}
                                    accent="emerald"
                                />

                                <StatCard
                                    icon={Users}
                                    label="Patients Treated"
                                    value={uniquePatients}
                                    accent="cyan"
                                />

                                <StatCard
                                    icon={Activity}
                                    label="Active Treatments"
                                    value={activeTreatments}
                                    accent="purple"
                                />

                                <StatCard
                                    icon={Wallet}
                                    label="Estimated Earnings"
                                    value={`₹${earnings.toLocaleString("en-IN")}`}
                                    accent="yellow"
                                />
                            </>
                        )}
                    </section>

                    {/* Main Grid */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Appointments */}
                        <section className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl">
                            <div className="p-4 border-b border-gray-800">
                                <h2 className="text-lg font-semibold">
                                    My Appointments
                                </h2>
                                <p className="text-sm text-gray-400">
                                    Your scheduled consultations
                                </p>
                            </div>

                            <div className="divide-y divide-gray-800">
                                {loadingRecords ? (
                                    <div className="p-8">
                                        <AppointmentSkeleton />
                                        <AppointmentSkeleton />
                                        <AppointmentSkeleton />
                                    </div>
                                ) : (
                                    <>
                                        {visibleAppointments.length === 0 && (
                                            <div className="p-8 text-center">
                                                <p className="text-sm text-gray-400">
                                                    No appointments found
                                                </p>
                                            </div>
                                        )}

                                        {visibleAppointments.map((record) => (
                                            <AppointmentRow
                                                key={record.medicalRecordId}
                                                record={record}
                                                time={formatDate(
                                                    record.visitDate ||
                                                        record.createdDateTime,
                                                )}
                                                patient={
                                                    record.patientName ??
                                                    "Patient"
                                                }
                                                type={
                                                    record.needTherapy
                                                        ? "Therapy Session"
                                                        : "Consultation"
                                                }
                                            />
                                        ))}
                                    </>
                                )}
                            </div>

                            {!loadingProfile &&
                                sortedAppointments.length >= 1 && (
                                    <div className="p-4 text-center">
                                        <button
                                            onClick={() => setShowAll(!showAll)}
                                            className="text-sm text-emerald-400 hover:underline"
                                        >
                                            {showAll
                                                ? "Show less"
                                                : "View all appointments"}
                                        </button>
                                    </div>
                                )}
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

/* ---------------- Skeleton Components ---------------- */

const StatCardSkeleton = () => (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 animate-pulse">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-800 rounded-xl"></div>
            <div className="flex-1">
                <div className="h-3 bg-gray-800 rounded w-20 mb-2"></div>
                <div className="h-6 bg-gray-800 rounded w-16"></div>
            </div>
        </div>
    </div>
);

const AppointmentSkeleton = () => (
    <div className="flex items-center justify-between p-4 animate-pulse">
        <div className="flex-1">
            <div className="h-4 bg-gray-800 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-800 rounded w-24"></div>
        </div>
        <div className="flex items-center gap-3">
            <div className="h-6 bg-gray-800 rounded-full w-20"></div>
            <div className="h-6 bg-gray-800 rounded w-12"></div>
        </div>
    </div>
);

/* ---------------- Small Components ---------------- */

const StatCard = ({ icon: Icon, label, value, accent }) => {
    const accentMap = {
        emerald: "text-emerald-400 bg-emerald-500/15",
        cyan: "text-cyan-400 bg-cyan-500/15",
        purple: "text-purple-400 bg-purple-500/15",
        yellow: "text-yellow-400 bg-yellow-500/15",
    };

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 hover:border-gray-700 transition">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${accentMap[accent]}`}>
                    <Icon className="w-6 h-6" />
                </div>

                <div>
                    <p className="text-sm text-gray-400">{label}</p>
                    <p className="text-2xl font-bold mt-1">{value}</p>
                </div>
            </div>
        </div>
    );
};

const AppointmentRow = ({ record, time, patient, type }) => (
    <div className="flex items-center justify-between p-4 hover:bg-gray-800/50">
        <div>
            <p className="font-medium">{patient}</p>
            <p className="text-xs text-gray-400">{time}</p>
        </div>

        <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 bg-gray-800 rounded-full">
                {type}
            </span>

            <Link
                to={`/doctor/appointments/${record.medicalRecordId}`}
                className="text-xs px-3 py-1 bg-emerald-600 hover:bg-emerald-700 rounded-md"
            >
                View
            </Link>
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
