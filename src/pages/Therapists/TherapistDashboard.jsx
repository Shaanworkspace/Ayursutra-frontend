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
} from "lucide-react";
import TherapistNavbar from "./components/TherapistNavbar";
import { Button } from "@/components/ui/button";
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

    const sessions = Array.isArray(profile?.medicalRecords)
        ? profile.medicalRecords
        : [];

    const sortedSessions = [...sessions].sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate),
    );
    const visibleSessions = showAll
        ? sortedSessions
        : sortedSessions.slice(0, 10);

    const formatDate = (date) =>
        date
            ? new Date(date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
              })
            : "Not Scheduled";

    console.log("token :", auth.token);
    console.log(reduxProfileRole, " : ", profile);
    console.log(roleU, " :  ", user);

    const gateway = import.meta.env.VITE_API_GATEWAY_BASE_URL;
    const therapistName =
        profile?.therapistName || user?.firstName || "Therapist";

    useEffect(() => {
        if (!auth.token || !user) return;

        const profileUserId = profile?.email;
        const authUserId = user?.email;

        const shouldFetch =
            profileUserId !== authUserId ||
            reduxProfileRole?.toLowerCase() !== roleU?.toLowerCase();

        if (!shouldFetch) return;

        axios
            .get(`${gateway}/api/therapists/profile/me`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then((res) => {
                dispatch(
                    setProfile({
                        role: "THERAPIST",
                        data: res.data,
                    }),
                );
            })
            .catch((error) => {
                console.error("Error fetching Therapist profile:", error);
            });
    }, [auth.token, user, profile?.userId, reduxProfileRole, dispatch]);

    if (!profile) {
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
                            <p className="text-gray-400 mt-2 text-lg">
                                You have {sessions.length} session
                                {sessions.length !== 1 ? "s" : ""} scheduled
                            </p>
                        </div>

                        <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 h-12 px-6">
                            <PlayCircle className="w-5 h-5 mr-2" />
                            Start Session
                        </Button>
                    </header>

                    {/* ================= QUICK STATS ================= */}
                    <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            icon={Calendar}
                            title="Today's Sessions"
                            value={sessions.length.toString()}
                            iconBg="bg-purple-500/10"
                            iconColor="text-purple-400"
                        />
                        <StatCard
                            icon={Users}
                            title="Total Patients"
                            value="156"
                            iconBg="bg-blue-500/10"
                            iconColor="text-blue-400"
                        />
                        <StatCard
                            icon={Star}
                            title="Rating"
                            value="4.9 ★"
                            iconBg="bg-yellow-500/10"
                            iconColor="text-yellow-400"
                        />
                        <StatCard
                            icon={Wallet}
                            title="This Month"
                            value="₹85,000"
                            iconBg="bg-green-500/10"
                            iconColor="text-green-400"
                        />
                    </section>

                    {/* ================= MAIN GRID ================= */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* LEFT - Sessions List */}
                        <section className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-xl">
                            <div className="p-6 border-b border-gray-700">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
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
                                {visibleSessions.length === 0 && (
                                    <div className="p-8 text-center">
                                        <Brain className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                        <p className="text-gray-400">
                                            No sessions found
                                        </p>
                                    </div>
                                )}

                                {visibleSessions.map((record) => (
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
                                ))}
                            </div>

                            {sortedSessions.length > 10 && (
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
                                        label="Manage Schedule"
                                    />
                                    <QuickAction
                                        to="/therapist/patients"
                                        icon={Users}
                                        label="My Patients"
                                    />
                                    <QuickAction
                                        to="/therapist/notes"
                                        icon={Activity}
                                        label="Session Notes"
                                    />
                                    <QuickAction
                                        to="/therapist/earnings"
                                        icon={Wallet}
                                        label="Earnings"
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
