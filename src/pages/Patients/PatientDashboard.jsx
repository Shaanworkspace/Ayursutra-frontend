/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import {
    Calendar,
    FileText,
    Heart,
    MessageSquare,
    Pill,
    Clock,
    Video,
    MapPin,
    TrendingUp,
    Activity,
    ArrowRight,
    Sparkles,
    Plus,
    Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PatientLayout } from "./components/PatientLayout";
import { useDispatch, useSelector } from "react-redux";
import axios from "@/lib/axios";
import { setProfile } from "@/Store/Slices/profileSlice";

export default function PatientDashboard() {
    const dispatch = useDispatch();

    const reduxUser = useSelector((state) => state.auth.userResponse);
    const reduxProfile = useSelector((state) => state.profile.data);
    const reduxRole = useSelector((state) => state.auth.role);
    const reduxProfileRole = useSelector((state) => state.profile.role);
    const auth = useSelector((state) => state.auth);
    const storedProfile = localStorage.getItem("profile");
    const storedUser = localStorage.getItem("userResponse");

    const profile = storedProfile
        ? JSON.parse(storedProfile).data
        : reduxProfile;
    const user = storedUser ? JSON.parse(storedUser) : reduxUser;
    const roleU = localStorage.getItem("role") || reduxRole;

    const gateway = import.meta.env.VITE_API_GATEWAY_BASE_URL;

    const fname = user?.firstName || "";
    const authUserId = user?.userId || user?.email;
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [loadingRecords, setLoadingRecords] = useState(true);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [showAllAppointments, setShowAllAppointments] = useState(false);

    const sortedAppointments = [...medicalRecords].sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate),
    );

    const visibleAppointments = showAllAppointments
        ? sortedAppointments
        : sortedAppointments.slice(0, 3);

    const today = new Date();

    const upcomingSessions = medicalRecords.filter((r) => {
        if (!r.visitDate) return false;
        return new Date(r.visitDate) >= today;
    }).length;

    const completedSessions = medicalRecords.filter((r) => {
        if (!r.visitDate) return false;
        return new Date(r.visitDate) < today;
    }).length;

    const healthReports = medicalRecords.length;

    const calculateWellnessScore = () => {
        let score = 10;

        medicalRecords.forEach((r) => {
            if (r.needTherapy) score -= 1;
            if (r.followUpRequired) score -= 0.5;
            if (Array.isArray(r.therapies) && r.therapies.length > 0)
                score += 0.5;
        });

        if (score < 0) score = 0;
        if (score > 10) score = 10;

        return score.toFixed(1);
    };

    const wellnessScore = calculateWellnessScore();

    const fetchMedicalRecords = useCallback(async () => {
        if (!auth.token || !authUserId) return;

        setLoadingRecords(true);

        try {
            const res = await axios.get(
                `${gateway}/api/patients/all/medical-records/${profile?.userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                },
            );
            console.log("Appointments : ", res.data);

            setMedicalRecords(res.data || []);
        } catch (err) {
            console.error("Failed to fetch medical records", err);
            setMedicalRecords([]);
        } finally {
            setLoadingRecords(false);
        }
    }, [auth.token, authUserId]);

    useEffect(() => {
        fetchMedicalRecords();
    }, [fetchMedicalRecords]);

    const PatientAppointmentRow = ({ record }) => {
        const updatedAt = record.updatedDateTime;

        const time = updatedAt
            ? new Date(updatedAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
              })
            : "Not updated";

        const isTherapy = record.needTherapy === true;

        const title = isTherapy ? "Therapy Session" : "Doctor Consultation";

        const name = record?.sessionMedicalRecordStatus || "No Medical Status";

        const mode = "video";

        return (
            <div className="flex items-center justify-between p-4 hover:bg-gray-800/50 rounded-xl">
                <div>
                    <p className="font-medium">{name}</p>

                    <p className="text-xs text-gray-400">{title}</p>

                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {time}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-1 bg-gray-800 rounded-full flex items-center gap-1">
                        {mode === "video" ? (
                            <>
                                <Video className="w-3 h-3" />
                                Video
                            </>
                        ) : (
                            <>
                                <MapPin className="w-3 h-3" />
                                In-person
                            </>
                        )}
                    </span>

                    <Link
                        to={`/patient/medical-records/${record.medicalRecordId}`}
                        className="text-xs px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded-md"
                    >
                        View
                    </Link>
                </div>
            </div>
        );
    };

    const profileUserId = profile?.email;

    const shouldFetch =
        profileUserId !== authUserId ||
        reduxProfileRole?.toLowerCase() !== roleU?.toLowerCase();

    const fetchPatientProfile = () => {
        if (!shouldFetch) return;
        setLoadingProfile(true);
        axios
            .get(`${gateway}/api/patients/profile/me`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then((res) => {
                dispatch(
                    setProfile({
                        role: "PATIENT",
                        data: res.data,
                    }),
                );
            })
            .catch((error) => {
                console.error("Error fetching patient profile:", error);
            })
            .finally(() => {
                setLoadingProfile(false);
            });
    };

    useEffect(() => {
        fetchPatientProfile();
    }, [shouldFetch]);

    if (!profile && loadingProfile) {
        return (
            <PatientLayout>
                <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
                        <p className="text-white text-lg">
                            Loading patient dashboard...
                        </p>
                    </div>
                </div>
            </PatientLayout>
        );
    }

    return (
        <PatientLayout>
            <div className="min-h-screen bg-gray-950 text-gray-100 p-6 pt-28">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* ================= HEADER ================= */}
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                        <div>
                            <p className="text-sm text-gray-400 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-cyan-400" />
                                Good Day
                            </p>
                            <h1 className="text-3xl lg:text-4xl font-bold">
                                Welcome back, {fname} 👋
                            </h1>
                            <p className="text-gray-400 mt-2">
                                Here is your health overview
                            </p>
                        </div>

                        <Link to="/patient/appointment-doc">
                            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                                <Plus className="w-4 h-4 mr-2" />
                                Book Appointment
                            </Button>
                        </Link>
                    </div>

                    {/* ================= QUICK STATS ================= */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {loadingRecords ? (
                            <>
                                {[...Array(4)].map((_, i) => (
                                    <StatCardSkeleton key={i} />
                                ))}
                            </>
                        ) : (
                            <>
                                <StatCard
                                    title="Upcoming Sessions"
                                    value={upcomingSessions}
                                />
                                <StatCard
                                    title="Completed Sessions"
                                    value={completedSessions}
                                />
                                <StatCard
                                    title="Health Reports"
                                    value={healthReports}
                                />
                                <StatCard
                                    title="Wellness Score"
                                    value={`${wellnessScore} / 10`}
                                />
                            </>
                        )}
                    </div>

                    {/* ================= MAIN GRID ================= */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* LEFT */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Appointments */}
                            <Card title="Appointments">
                                {loadingRecords ? (
                                    <div className="space-y-3">
                                        <AppointmentSkeleton />
                                        <AppointmentSkeleton />
                                        <AppointmentSkeleton />
                                    </div>
                                ) : (
                                    <>
                                        {visibleAppointments.length === 0 && (
                                            <p className="text-sm text-gray-400 text-center py-8">
                                                No appointments found
                                            </p>
                                        )}

                                        <div
                                            className={
                                                showAllAppointments
                                                    ? "max-h-[420px] overflow-y-auto space-y-2 pr-2"
                                                    : "space-y-2"
                                            }
                                        >
                                            {visibleAppointments.map(
                                                (record) => (
                                                    <PatientAppointmentRow
                                                        key={
                                                            record.medicalRecordId
                                                        }
                                                        record={record}
                                                    />
                                                ),
                                            )}
                                        </div>

                                        {sortedAppointments.length > 3 && (
                                            <button
                                                onClick={() =>
                                                    setShowAllAppointments(
                                                        (prev) => !prev,
                                                    )
                                                }
                                                className="flex justify-center items-center gap-2 text-sm text-cyan-400 hover:underline mt-4 w-full"
                                            >
                                                {showAllAppointments
                                                    ? "Show Less"
                                                    : "View All"}
                                                <ArrowRight
                                                    className={`w-4 h-4 transition-transform ${
                                                        showAllAppointments
                                                            ? "rotate-90"
                                                            : ""
                                                    }`}
                                                />
                                            </button>
                                        )}
                                    </>
                                )}
                            </Card>

                            {/* Wellness Tips */}
                            <Card title="Wellness Tips">
                                <WellnessItem
                                    icon={Sparkles}
                                    title="Morning Routine"
                                    desc="Drink warm water after waking up"
                                />
                                <WellnessItem
                                    icon={Heart}
                                    title="Stress Relief"
                                    desc="5-minute breathing exercise"
                                />
                            </Card>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <Card title="Quick Actions">
                                <QuickAction
                                    icon={Calendar}
                                    label="Appointments"
                                />
                                <QuickAction
                                    icon={FileText}
                                    label="Health Records"
                                />
                                <QuickAction
                                    icon={MessageSquare}
                                    label="Messages"
                                />
                                <QuickAction icon={Pill} label="Medications" />
                            </Card>

                            {/* Activity */}
                            <Card title="Recent Activity">
                                {loadingRecords ? (
                                    <div className="space-y-2">
                                        <ActivitySkeleton />
                                        <ActivitySkeleton />
                                        <ActivitySkeleton />
                                    </div>
                                ) : (
                                    <>
                                        <ActivityItem
                                            icon={FileText}
                                            text="New report uploaded"
                                        />
                                        <ActivityItem
                                            icon={MessageSquare}
                                            text="Doctor replied"
                                        />
                                        <ActivityItem
                                            icon={Pill}
                                            text="Medication reminder"
                                        />
                                    </>
                                )}
                            </Card>

                            {/* Health Score */}
                            <div className="rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-600 p-6 shadow-xl">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-lg font-semibold">
                                        Wellness Score
                                    </h3>
                                    <Activity className="w-6 h-6 opacity-80" />
                                </div>
                                {loadingRecords ? (
                                    <div className="animate-pulse">
                                        <div className="h-16 bg-white/20 rounded w-32 mb-2"></div>
                                        <div className="h-4 bg-white/20 rounded w-40"></div>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-5xl font-bold">
                                            {wellnessScore}
                                            <span className="text-xl opacity-70">
                                                /10
                                            </span>
                                        </p>
                                        <div className="flex items-center gap-2 mt-2 text-sm">
                                            <TrendingUp className="w-4 h-4" />
                                            Improving this month
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PatientLayout>
    );
}

/* ================= SKELETON COMPONENTS ================= */

const StatCardSkeleton = () => (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
        <div className="h-8 bg-gray-700 rounded w-16"></div>
    </div>
);

const AppointmentSkeleton = () => (
    <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl animate-pulse">
        <div className="flex-1">
            <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-24 mb-1"></div>
            <div className="h-3 bg-gray-700 rounded w-20"></div>
        </div>
        <div className="flex items-center gap-3">
            <div className="h-6 bg-gray-700 rounded-full w-16"></div>
            <div className="h-6 bg-gray-700 rounded w-12"></div>
        </div>
    </div>
);

const ActivitySkeleton = () => (
    <div className="flex items-center gap-3 p-3 rounded-lg animate-pulse">
        <div className="w-4 h-4 bg-gray-700 rounded"></div>
        <div className="h-3 bg-gray-700 rounded w-32"></div>
    </div>
);

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

const WellnessItem = ({ icon: Icon, title, desc }) => (
    <div className="flex gap-4 p-4 bg-gray-800/60 rounded-xl border border-gray-700">
        <div className="p-2 bg-cyan-900/40 rounded-lg">
            <Icon className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
            <p className="font-medium">{title}</p>
            <p className="text-sm text-gray-400">{desc}</p>
        </div>
    </div>
);

const QuickAction = ({ icon: Icon, label }) => (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/60 border border-gray-700 hover:bg-gray-800 transition cursor-pointer">
        <Icon className="w-5 h-5 text-cyan-400" />
        <span className="text-sm">{label}</span>
    </div>
);

const ActivityItem = ({ icon: Icon, text }) => (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition">
        <Icon className="w-4 h-4 text-cyan-400" />
        <span className="text-sm text-gray-300">{text}</span>
    </div>
);
