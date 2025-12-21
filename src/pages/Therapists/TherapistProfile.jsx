/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Shield,
    Camera,
    Edit2,
    Save,
    X,
    CheckCircle,
    AlertCircle,
    FileText,
    Clock,
    Globe,
    Lock,
    Bell,
    CreditCard,
    ChevronRight,
    Download,
    Upload,
    Trash2,
    Eye,
    EyeOff,
    AlertTriangle,
    BadgeCheck,
    Settings,
    Sparkles,
    Award,
    GraduationCap,
    Briefcase,
    Building2,
    DollarSign,
    Users,
    Video,
    MessageSquare,
    CalendarCheck,
    Brain,
    Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TherapistLayout } from "./components/TherapistLayout";

export default function TherapistProfile() {
    const { user } = useSelector((state) => state.auth);
    const fileInputRef = useRef(null);

    const [activeTab, setActiveTab] = useState("personal");
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [saveStatus, setSaveStatus] = useState(null);

    const [profileData] = useState({
        firstName: "Dr. Emily",
        lastName: "Thompson",
        email: "emily.thompson@mindcare.com",
        phone: "+1 (555) 789-0123",
        city: "New York",
        state: "NY",
        degree: "Ph.D. Clinical Psychology",
        specialization: "CBT & Mindfulness",
    });

    const tabs = [
        { id: "personal", label: "Personal Info", icon: User },
        { id: "professional", label: "Professional", icon: Award },
        { id: "practice", label: "Practice", icon: Building2 },
        { id: "availability", label: "Availability", icon: Calendar },
        { id: "documents", label: "Documents", icon: FileText },
        { id: "security", label: "Security", icon: Shield },
        { id: "preferences", label: "Preferences", icon: Settings },
    ];

    return (
        <TherapistLayout>
            <div className="p-6 lg:p-8 bg-gray-950 min-h-screen text-gray-100">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* HEADER */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold">My Profile</h1>
                            <p className="text-gray-400">
                                Manage your therapist profile & settings
                            </p>
                        </div>

                        {isEditing ? (
                            <div className="flex gap-2">
                                <Button
                                    className="bg-violet-600 hover:bg-violet-700"
                                    onClick={() => setIsEditing(false)}
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditing(false)}
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="outline"
                                onClick={() => setIsEditing(true)}
                            >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit Profile
                            </Button>
                        )}
                    </div>

                    {/* PROFILE CARD */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-violet-600 to-purple-600 relative">
                            <div className="absolute inset-0 bg-black/20" />
                        </div>

                        <div className="px-6 pb-6 -mt-16 relative">
                            <div className="flex items-end gap-4">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-4xl font-bold">
                                        E
                                    </div>
                                    {isEditing && (
                                        <button className="absolute bottom-2 right-2 p-2 bg-gray-900 rounded-full">
                                            <Camera className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold flex items-center gap-2">
                                        {profileData.firstName}{" "}
                                        {profileData.lastName}
                                        <BadgeCheck className="text-violet-400" />
                                    </h2>
                                    <p className="text-gray-400">
                                        {profileData.degree} •{" "}
                                        {profileData.specialization}
                                    </p>
                                    <div className="flex gap-4 text-sm text-gray-400 mt-2">
                                        <span className="flex items-center gap-1">
                                            <Mail className="w-4 h-4" />
                                            {profileData.email}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Phone className="w-4 h-4" />
                                            {profileData.phone}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {profileData.city},{" "}
                                            {profileData.state}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* STATS */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                                <Stat label="Patients" value="248" />
                                <Stat label="Sessions" value="1520" />
                                <Stat label="Rating" value="4.9 / 5" />
                                <Stat label="Reviews" value="156" />
                            </div>
                        </div>
                    </div>

                    {/* TABS */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl">
                        <div className="flex overflow-x-auto border-b border-gray-800">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 text-sm border-b-2 ${
                                        activeTab === tab.id
                                            ? "border-violet-500 text-violet-400 bg-violet-900/30"
                                            : "border-transparent text-gray-400 hover:bg-gray-800"
                                    }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="p-6 text-gray-400">
                            {activeTab} content goes here
                        </div>
                    </div>

                    {/* DANGER ZONE */}
                    <div className="bg-gray-900 border border-red-900/50 rounded-2xl p-6">
                        <div className="flex gap-4">
                            <div className="p-3 bg-red-900/30 rounded-xl">
                                <AlertTriangle className="text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Danger Zone
                                </h3>
                                <p className="text-sm text-gray-400">
                                    Irreversible actions
                                </p>
                                <div className="flex gap-3 mt-4">
                                    <Button
                                        variant="outline"
                                        className="border-red-800 text-red-400"
                                    >
                                        Deactivate Account
                                    </Button>
                                    <Button variant="destructive">
                                        Delete Account
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TherapistLayout>
    );
}

/* ---------- SMALL COMPONENT ---------- */

const Stat = ({ label, value }) => (
    <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4">
        <p className="text-xl font-bold text-gray-100">{value}</p>
        <p className="text-sm text-gray-400">{label}</p>
    </div>
);
