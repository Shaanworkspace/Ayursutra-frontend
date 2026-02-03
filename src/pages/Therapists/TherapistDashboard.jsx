/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
    Eye,
    Brain,
    Loader2,
} from "lucide-react";
import TherapistNavbar from "./components/TherapistNavbar";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import PatientFooter from "../Home/components/Footer";
import axios from "axios";
import { setProfile } from "@/Store/Slices/profileSlice";
import LoadingScreen from "@/components/common/LoadingScreen";

export default function TherapistDashboard() {
    const dispatch = useDispatch();

    const reduxUser = useSelector((state) => state.auth.userResponse);
    const reduxProfile = useSelector((state) => state.profile.data);
    const reduxRole = useSelector((state) => state.auth.role);
    const reduxProfileRole = useSelector((state) => state.profile.role);
    const auth = useSelector((state) => state.auth);
    const storedProfile = localStorage.getItem("profile");
    const storedUser = localStorage.getItem("userResponse");
    const [showAll, setShowAll] = useState(false);

    const profile = storedProfile
        ? JSON.parse(storedProfile).data
        : reduxProfile;
    const user = storedUser ? JSON.parse(storedUser) : reduxUser;
    const roleU = localStorage.getItem("role") || reduxRole;

    const [medicalRecords, setMedicalRecords] = useState([]);
    const [loadingRecords, setLoadingRecords] = useState(true);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const sessions = medicalRecords;

    const gateway = import.meta.env.VITE_API_GATEWAY_BASE_URL;

    useEffect(() => {
        if (!auth.token || !profile?.userId) return;

        const fetchMedicalRecords = async () => {
            try {
                setLoadingRecords(true);
                const res = await axios.get(
                    `${gateway}/api/therapists/medical-records/${profile.userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                    },
                );
                setMedicalRecords(res.data || []);
            } catch (err) {
                console.error("Failed to fetch medical records", err);
                setMedicalRecords([]);
            } finally {
                setLoadingRecords(false);
            }
        };

        fetchMedicalRecords();
    }, [profile?.userId, auth.token, gateway]);

    const sortedSessions = [...sessions].sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate),
    );

    const formatDate = (date) =>
        date
            ? new Date(date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
              })
            : "Not Scheduled";

    const therapistName =
        profile?.therapistName || user?.firstName || "Therapist";

    const today = new Date();
    const totalSessions = sessions.length;
    const todaysSessions = sessions.filter((r) => {
        if (!r.visitDate) return false;
        const d = new Date(r.visitDate);
        return (
            d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear()
        );
    }).length;

    const uniquePatients = new Set(
        sessions.map((r) => r.patientId).filter(Boolean),
    ).size;
    const activeTherapyCases = sessions.filter(
        (r) => r.needTherapy === true,
    ).length;
    const monthlyEarnings = totalSessions * 1200;
    const therapistRating = 4.9;

    const pendingSessions = sessions.filter(
        (r) => r.therapistPlans?.therapistDecisionStatus === "PENDING",
    );

    const approvedSessions = sessions.filter(
        (r) => r.therapistPlans?.therapistDecisionStatus === "APPROVED",
    );

    const visibleSessions = showAll
        ? approvedSessions
        : approvedSessions.slice(0, 10);

    useEffect(() => {
        if (!auth.token || !user) return;

        const profileUserId = profile?.email;
        const authUserId = user?.email;

        const shouldFetch =
            profileUserId !== authUserId ||
            reduxProfileRole?.toLowerCase() !== roleU?.toLowerCase();

        if (!shouldFetch) return;

        const fetchTherapistProfile = async () => {
            try {
                setLoadingProfile(true);
                const res = await axios.get(
                    `${gateway}/api/therapists/profile/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                    },
                );
                dispatch(
                    setProfile({
                        role: "THERAPIST",
                        data: res.data,
                    }),
                );
            } catch (error) {
                console.error("Error fetching Therapist profile:", error);
            } finally {
                setLoadingProfile(false);
            }
        };

        fetchTherapistProfile();
    }, [
        auth.token,
        user?.email,
        profile?.email,
        reduxProfileRole,
        roleU,
        gateway,
        dispatch,
    ]);

    const approve = async (therapyPlanId) => {
        await axios.put(
            `${gateway}/api/therapists/therapy-plans/${therapyPlanId}/decision`,
            null,
            {
                params: { status: "APPROVED" },
                headers: { Authorization: `Bearer ${auth.token}` },
            },
        );
        window.location.reload();
    };

    const reject = async (therapyPlanId) => {
        await axios.put(
            `${gateway}/api/therapists/therapy-plans/${therapyPlanId}/decision`,
            null,
            {
                params: { status: "REJECTED" },
                headers: { Authorization: `Bearer ${auth.token}` },
            },
        );
        window.location.reload();
    };

    if (!profile && loadingProfile) {
        return <LoadingScreen />;
    }

    return (
        <>
            <TherapistNavbar />

            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6 pt-28">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* ================= HEADER ================= */}
                    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div>
                            <p className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4 text-purple-400" />
                                Good Day
                            </p>
                            <h1 className="text-4xl font-bold text-white">
                                Therapist, {therapistName}
                            </h1>
                            {loadingRecords ? (
                                <div className="h-6 bg-gray-800 rounded w-48 mt-2 animate-pulse"></div>
                            ) : (
                                <p className="text-gray-400 mt-2 text-lg">
                                    {todaysSessions > 0
                                        ? `You have ${todaysSessions} session${todaysSessions > 1 ? "s" : ""} today`
                                        : "No sessions scheduled for today"}
                                </p>
                            )}
                        </div>

                        <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 h-12 px-6">
                            <PlayCircle className="w-5 h-5 mr-2" />
                            Start Session
                        </Button>
                    </header>

                    {/* ================= QUICK STATS ================= */}
                    <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {loadingRecords ? (
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
                                    title="Today's Sessions"
                                    value={todaysSessions}
                                    iconBg="bg-purple-500/10"
                                    iconColor="text-purple-400"
                                />

                                <StatCard
                                    icon={Users}
                                    title="Patients Treated"
                                    value={uniquePatients}
                                    iconBg="bg-blue-500/10"
                                    iconColor="text-blue-400"
                                />

                                <StatCard
                                    icon={Brain}
                                    title="Active Therapy Cases"
                                    value={activeTherapyCases}
                                    iconBg="bg-pink-500/10"
                                    iconColor="text-pink-400"
                                />

                                <StatCard
                                    icon={Wallet}
                                    title="This Month"
                                    value={`₹${monthlyEarnings.toLocaleString("en-IN")}`}
                                    iconBg="bg-green-500/10"
                                    iconColor="text-green-400"
                                />
                            </>
                        )}
                    </section>

                    {/* ================= PENDING APPROVALS ================= */}
                    <section className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-xl">
                        <div className="p-6 border-b border-gray-700">
                            <h2 className="text-2xl font-bold text-white">
                                Pending Approvals
                            </h2>
                            <p className="text-sm text-gray-400">
                                Therapy plans awaiting your decision
                            </p>
                        </div>

                        {loadingRecords ? (
                            <div className="p-6 space-y-4">
                                <PendingApprovalSkeleton />
                                <PendingApprovalSkeleton />
                            </div>
                        ) : pendingSessions.length === 0 ? (
                            <div className="p-6 text-gray-400 text-center">
                                No pending approvals
                            </div>
                        ) : (
                            pendingSessions.map((record) => (
                                <div
                                    key={record.medicalRecordId}
                                    className="flex justify-between items-center p-5 border-t border-gray-700"
                                >
                                    <div>
                                        <p className="text-white font-semibold">
                                            {record.patientName}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Medical ID: {record.medicalRecordId}
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            className="bg-green-600 hover:bg-green-700"
                                            onClick={() =>
                                                approve(
                                                    record.therapistPlans
                                                        .therapyPlanId,
                                                )
                                            }
                                        >
                                            Approve
                                        </Button>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive">
                                                    Reject
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="bg-gray-900 border-gray-700">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle className="text-white">
                                                        Confirm Rejection
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription className="text-gray-400">
                                                        Are you sure you want to
                                                        reject the therapy plan
                                                        for{" "}
                                                        <span className="font-semibold text-white">
                                                            {record.patientName}
                                                        </span>
                                                        ? This action cannot be
                                                        undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        className="bg-red-600 hover:bg-red-700 text-white"
                                                        onClick={() =>
                                                            reject(
                                                                record
                                                                    .therapistPlans
                                                                    .therapyPlanId,
                                                            )
                                                        }
                                                    >
                                                        Confirm Reject
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            ))
                        )}
                    </section>

                    {/* ================= MAIN GRID ================= */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* LEFT - Sessions List */}
                        <section className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-xl">
                            <div className="p-6 border-b border-gray-700">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                        <Brain className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">
                                            My Sessions
                                        </h2>
                                        <p className="text-sm text-gray-400">
                                            Your scheduled therapy sessions
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="divide-y divide-gray-700">
                                {loadingRecords ? (
                                    <div className="p-6 space-y-4">
                                        <SessionSkeleton />
                                        <SessionSkeleton />
                                        <SessionSkeleton />
                                    </div>
                                ) : visibleSessions.length === 0 ? (
                                    <div className="p-8 text-center">
                                        <Brain className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                        <p className="text-gray-400">
                                            No sessions found
                                        </p>
                                    </div>
                                ) : (
                                    visibleSessions.map((record) => (
                                        <SessionRow
                                            key={record.medicalRecordId}
                                            record={record}
                                            time={formatDate(
                                                record.visitDate ||
                                                    record.createdDate,
                                            )}
                                            patient={
                                                record.patientName ?? "Patient"
                                            }
                                        />
                                    ))
                                )}
                            </div>

                            {!loadingRecords && sortedSessions.length > 10 && (
                                <div className="p-4 text-center border-t border-gray-700">
                                    <button
                                        onClick={() => setShowAll(!showAll)}
                                        className="text-sm text-purple-400 hover:text-purple-300 hover:underline font-medium"
                                    >
                                        {showAll
                                            ? "Show less"
                                            : "View all sessions"}
                                    </button>
                                </div>
                            )}
                        </section>

                        {/* RIGHT - Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-xl">
                                <h3 className="text-xl font-bold text-white mb-4">
                                    Quick Actions
                                </h3>
                                <div className="space-y-3">
                                    <QuickAction
                                        to="/therapist/schedule"
                                        icon={Calendar}
                                        label="Manage Availability"
                                    />
                                    <QuickAction
                                        to="/therapist/clients"
                                        icon={Users}
                                        label="My Clients"
                                    />
                                    <QuickAction
                                        to="/therapist/notes"
                                        icon={Activity}
                                        label="Session Notes"
                                    />
                                    <QuickAction
                                        to="/therapist/earnings"
                                        icon={Wallet}
                                        label="Earnings Overview"
                                    />
                                </div>
                            </div>

                            {/* Performance Card */}
                            <div className="rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600 p-6 shadow-xl">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold text-white">
                                        Performance
                                    </h3>
                                    <TrendingUp className="w-6 h-6 text-white/80" />
                                </div>
                                {loadingRecords ? (
                                    <div className="space-y-3">
                                        <div className="h-16 bg-white/20 rounded w-32 animate-pulse"></div>
                                        <div className="h-4 bg-white/20 rounded w-40 animate-pulse"></div>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-6xl font-bold text-white mb-2">
                                            4.9
                                            <span className="text-2xl text-white/70">
                                                /5
                                            </span>
                                        </p>
                                        <div className="flex items-center gap-2 text-white/90">
                                            <Star className="w-5 h-5 fill-white" />
                                            <span className="font-medium">
                                                Excellent feedback
                                            </span>
                                        </div>
                                        <p className="text-sm text-white/70 mt-3">
                                            Based on 156 patient reviews
                                        </p>
                                    </>
                                )}
                            </div>

                            {/* Calendar Mini Preview */}
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-xl">
                                <h3 className="text-xl font-bold text-white mb-4">
                                    This Week
                                </h3>
                                <div className="grid grid-cols-7 gap-2">
                                    {Array.from({ length: 7 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="aspect-square rounded-lg bg-gray-950/50 border border-gray-700 flex flex-col items-center justify-center hover:border-purple-500 transition-colors"
                                        >
                                            <span className="text-xs font-medium text-white">
                                                {i + 20}
                                            </span>
                                            {i < 5 && (
                                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1" />
                                            )}
                                        </div>
                                    ))}
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

/* ================= SKELETON COMPONENTS ================= */

const StatCardSkeleton = () => (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-5 shadow-lg animate-pulse">
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-700 rounded-xl"></div>
            <div className="flex-1">
                <div className="h-3 bg-gray-700 rounded w-24 mb-2"></div>
                <div className="h-6 bg-gray-700 rounded w-16"></div>
            </div>
        </div>
    </div>
);

const PendingApprovalSkeleton = () => (
    <div className="flex justify-between items-center p-5 border-t border-gray-700 animate-pulse">
        <div className="flex-1">
            <div className="h-5 bg-gray-700 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-48"></div>
        </div>
        <div className="flex gap-3">
            <div className="h-9 bg-gray-700 rounded w-20"></div>
            <div className="h-9 bg-gray-700 rounded w-20"></div>
        </div>
    </div>
);

const SessionSkeleton = () => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-4 animate-pulse">
        <div className="flex-1 w-full">
            <div className="h-5 bg-gray-700 rounded w-40 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
            <div className="h-6 bg-gray-700 rounded-full w-28"></div>
        </div>
        <div className="flex items-center gap-3">
            <div className="h-9 bg-gray-700 rounded w-16"></div>
            <div className="h-9 bg-gray-700 rounded w-16"></div>
            <div className="h-9 bg-gray-700 rounded w-16"></div>
        </div>
    </div>
);

/* ================= SUB COMPONENTS ================= */

const StatCard = ({ icon: Icon, title, value, iconBg, iconColor }) => (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-3">
            <div
                className={`p-3 ${iconBg} rounded-xl border ${iconColor.replace("text-", "border-")}/20`}
            >
                <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <div>
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                    {title}
                </p>
                <p className="text-2xl font-bold text-white mt-1">{value}</p>
            </div>
        </div>
    </div>
);

const SessionRow = ({ record, time, patient }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 hover:bg-gray-800/50 transition-colors gap-4">
        <div className="flex-1">
            <p className="font-semibold text-white text-lg">{patient}</p>
            <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {time}
            </p>
            <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                    Therapy Session
                </span>
            </div>
        </div>

        <div className="flex items-center gap-3">
            <Link
                to={`/therapist/sessions/${record.medicalRecordId}/notes`}
                className="inline-flex items-center gap-1 text-sm px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors font-medium"
            >
                Notes
            </Link>

            <Button
                size="sm"
                variant="outline"
                className="border-gray-600 bg-gray-800/50 hover:bg-gray-700 text-white"
            >
                <Video className="w-4 h-4 mr-1" />
                Join
            </Button>

            <Link
                to={`/therapist/sessions/${record.medicalRecordId}`}
                className="inline-flex items-center gap-1 text-sm px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors font-medium"
            >
                <Eye className="w-4 h-4" />
                View
            </Link>
        </div>
    </div>
);

const QuickAction = ({ to, icon: Icon, label }) => (
    <Link
        to={to}
        className="flex items-center gap-3 p-4 rounded-xl bg-gray-950/50 border border-gray-700 hover:bg-gray-800 hover:border-purple-500/50 transition-all group"
    >
        <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
            <Icon className="w-5 h-5 text-purple-400" />
        </div>
        <span className="text-sm font-medium text-white">{label}</span>
    </Link>
);
