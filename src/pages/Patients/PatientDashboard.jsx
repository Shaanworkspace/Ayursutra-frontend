/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
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

    console.log("token :", auth.token);
    console.log(reduxProfileRole, " : ", profile);
    console.log(roleU, " :  ", user);
    const gateway = import.meta.env.VITE_API_GATEWAY_BASE_URL;

    const fname = user?.firstName || "";
    const lname = user?.lastName || "";
    const email = user?.email || "";
    const authUserId = user?.userId || user?.email;
    useEffect(() => {
        if (!auth.token || !user) return;

        const profileUserId = profile?.email;
        const authUserId = user?.email;

        const shouldFetch =
            profileUserId !== authUserId ||
            reduxProfileRole?.toLowerCase() !== roleU?.toLowerCase();

        if (!shouldFetch) return;

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
            });
    }, [auth.token, user, profile?.userId, reduxProfileRole, dispatch]);

    if (!profile) {
        return (
            <div className="text-white p-6">Loading patient dashboard...</div>
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
                        <StatCard title="Upcoming Sessions" value="3" />
                        <StatCard title="Completed Sessions" value="12" />
                        <StatCard title="Health Reports" value="8" />
                        <StatCard title="Wellness Score" value="8.5 / 10" />
                    </div>

                    {/* ================= MAIN GRID ================= */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* LEFT */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Appointments */}
                            <Card title="Appointments">
                                <AppointmentItem
                                    name="Dr. Amita Sharma"
                                    type="Video Consultation"
                                    time="10:00 AM – 11:00 AM"
                                    mode="video"
                                />
                                <AppointmentItem
                                    name="Therapist Priya Mehta"
                                    type="Yoga Therapy"
                                    time="2:00 PM – 3:00 PM"
                                    mode="inperson"
                                />
                                <Link
                                    to="#"
                                    className="flex justify-center items-center gap-2 text-sm text-cyan-400 hover:underline mt-4"
                                >
                                    View all
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
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
                            </Card>

                            {/* Health Score */}
                            <div className="rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-600 p-6 shadow-xl">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-lg font-semibold">
                                        Wellness Score
                                    </h3>
                                    <Activity className="w-6 h-6 opacity-80" />
                                </div>
                                <p className="text-5xl font-bold">
                                    8.5
                                    <span className="text-xl opacity-70">
                                        /10
                                    </span>
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-sm">
                                    <TrendingUp className="w-4 h-4" />
                                    Improving this month
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PatientLayout>
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

const AppointmentItem = ({ name, type, time, mode }) => (
    <div className="flex justify-between items-center p-4 rounded-xl bg-gray-800/60 border border-gray-700">
        <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-gray-400">{type}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                {time}
            </p>
        </div>
        <div className="flex items-center gap-2 text-xs px-2 py-1 rounded-full bg-gray-700">
            {mode === "video" ? (
                <>
                    <Video className="w-3 h-3" /> Video
                </>
            ) : (
                <>
                    <MapPin className="w-3 h-3" /> In-person
                </>
            )}
        </div>
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
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/60 border border-gray-700 hover:bg-gray-800 transition">
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
