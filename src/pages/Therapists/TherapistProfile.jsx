/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
    Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TherapistLayout } from "./components/TherapistLayout";
import axios from "@/lib/axios";
import { setProfile } from "@/Store/Slices/profileSlice";
import { toast } from "sonner";

export default function TherapistProfile() {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    // Redux state
    const reduxUser = useSelector((state) => state.auth.userResponse);
    const reduxProfile = useSelector((state) => state.profile.data);
    const auth = useSelector((state) => state.auth);

    // Local storage fallback
    const storedProfile = localStorage.getItem("profile");
    const storedUser = localStorage.getItem("userResponse");

    const profile = storedProfile
        ? JSON.parse(storedProfile).data
        : reduxProfile;
    const user = storedUser ? JSON.parse(storedUser) : reduxUser;

    const gateway = import.meta.env.VITE_API_GATEWAY_BASE_URL;

    // State
    const [activeTab, setActiveTab] = useState("personal");
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [saveStatus, setSaveStatus] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);

    const [profileData, setProfileData] = useState({
        therapistId: profile?.userId || "",
        therapistName: profile?.therapistName || user?.firstName || "",
        email: user?.email || "",
        phoneNumber: profile?.phoneNumber || "",
        expertise: profile?.expertise || "",
        yearsOfExperience: profile?.yearsOfExperience || "",
        qualifications: profile?.qualifications || "",
        licenseNumber: profile?.licenseNumber || "",
        consultationFee: profile?.consultationFee || "",
        bio: profile?.bio || "",
        location: profile?.location || "",
        rating: profile?.rating || "4.9",
        totalPatients: profile?.therapyPlans?.length || 0,
        totalSessions: profile?.therapySessions?.length || 0,
    });

    console.log("Profile:", profile);
    console.log("User:", user);
    console.log("Profile Data:", profileData);

    // Fetch therapist profile
    useEffect(() => {
        if (!auth.token || !user) return;

        const shouldFetch =
            profile?.email !== user?.email || !profile?.expertise;

        if (shouldFetch) {
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

                    setProfileData({
                        therapistId: res.data.userId,
                        therapistName:
                            res.data.therapistName || user?.firstName || "",
                        email: user?.email || "",
                        phoneNumber: res.data.phoneNumber || "",
                        expertise: res.data.expertise || "",
                        yearsOfExperience: res.data.yearsOfExperience || "",
                        qualifications: res.data.qualifications || "",
                        licenseNumber: res.data.licenseNumber || "",
                        consultationFee: res.data.consultationFee || "",
                        bio: res.data.bio || "",
                        location: res.data.location || "",
                        rating: res.data.rating || "4.9",
                        totalPatients: res.data.therapyPlans?.length || 0,
                        totalSessions: res.data.therapySessions?.length || 0,
                    });
                } catch (error) {
                    console.error("Error fetching therapist profile:", error);
                    toast.error("Failed to load profile");
                } finally {
                    setLoadingProfile(false);
                }
            };

            fetchTherapistProfile();
        }
    }, [auth.token, user?.email, profile?.email, gateway, dispatch]);

    const tabs = [
        { id: "personal", label: "Personal Info", icon: User },
        { id: "professional", label: "Professional", icon: Award },
        { id: "practice", label: "Practice Details", icon: Building2 },
        { id: "availability", label: "Availability", icon: Calendar },
        { id: "documents", label: "Documents", icon: FileText },
        { id: "security", label: "Security", icon: Shield },
        { id: "preferences", label: "Preferences", icon: Settings },
    ];

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value,
        });
    };

    // Handle avatar upload
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle save
    const handleSave = async () => {
        setSaveStatus("saving");
        try {
            await axios.put(
                `${gateway}/api/therapists/profile/update`,
                profileData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                },
            );
            setSaveStatus("saved");
            setIsEditing(false);
            toast.success("Profile updated successfully!");
            setTimeout(() => setSaveStatus(null), 3000);
        } catch (error) {
            console.error("Error saving profile:", error);
            setSaveStatus("error");
            toast.error("Failed to update profile");
            setTimeout(() => setSaveStatus(null), 3000);
        }
    };

    // Handle cancel
    const handleCancel = () => {
        setIsEditing(false);
        setAvatarPreview(null);
    };

    // Documents data
    const documents = [
        {
            name: "Therapy License",
            date: "Valid till Dec 2025",
            type: "License",
            size: "450 KB",
        },
        {
            name: "Professional Certificate",
            date: "Issued Jan 2020",
            type: "Certificate",
            size: "680 KB",
        },
        {
            name: "Degree Certificate",
            date: "Graduated 2015",
            type: "Education",
            size: "1.2 MB",
        },
    ];

    if (loadingProfile) {
        return (
            <TherapistLayout>
                <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 text-violet-400 animate-spin mx-auto mb-4" />
                        <p className="text-white text-lg">Loading profile...</p>
                    </div>
                </div>
            </TherapistLayout>
        );
    }

    return (
        <TherapistLayout>
            <div className="min-h-screen bg-gray-950 text-gray-100 p-6 pt-28">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* ==================== HEADER ==================== */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Therapist Profile
                            </h1>
                            <p className="text-gray-400 mt-1">
                                Manage your professional profile & settings
                            </p>
                        </div>

                        {/* Save Status */}
                        {saveStatus && (
                            <div
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                                    saveStatus === "saving"
                                        ? "bg-blue-900/30 text-blue-400"
                                        : saveStatus === "saved"
                                          ? "bg-green-900/30 text-green-400"
                                          : "bg-red-900/30 text-red-400"
                                }`}
                            >
                                {saveStatus === "saving" && (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span className="text-sm font-medium">
                                            Saving...
                                        </span>
                                    </>
                                )}
                                {saveStatus === "saved" && (
                                    <>
                                        <CheckCircle className="w-4 h-4" />
                                        <span className="text-sm font-medium">
                                            Changes saved!
                                        </span>
                                    </>
                                )}
                                {saveStatus === "error" && (
                                    <>
                                        <AlertCircle className="w-4 h-4" />
                                        <span className="text-sm font-medium">
                                            Save failed
                                        </span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ==================== PROFILE CARD ==================== */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                        {/* Banner */}
                        <div className="h-32 bg-gradient-to-r from-violet-600 to-purple-600 relative">
                            <div className="absolute inset-0 bg-black/10" />
                        </div>

                        {/* Profile Info */}
                        <div className="px-6 pb-6">
                            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 relative z-10">
                                {/* Avatar */}
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-2xl border-4 border-gray-900 shadow-xl overflow-hidden bg-gradient-to-br from-violet-500 to-purple-600">
                                        {avatarPreview ? (
                                            <img
                                                src={avatarPreview}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                                                {profileData
                                                    .therapistName?.[0] || "T"}
                                            </div>
                                        )}
                                    </div>

                                    {/* Upload Button */}
                                    {isEditing && (
                                        <button
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                            className="absolute bottom-2 right-2 p-2 bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform"
                                        >
                                            <Camera className="w-4 h-4 text-gray-400" />
                                        </button>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <h2 className="text-2xl font-bold text-white">
                                                    {profileData.therapistName}
                                                </h2>
                                                <BadgeCheck className="w-6 h-6 text-violet-400" />
                                            </div>
                                            <p className="text-gray-400 text-sm">
                                                {profileData.qualifications ||
                                                    "Therapist"}{" "}
                                                •{" "}
                                                {profileData.expertise ||
                                                    "Mental Health"}
                                            </p>

                                            {/* Contact */}
                                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
                                                <span className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4" />
                                                    {profileData.email}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4" />
                                                    {profileData.phoneNumber ||
                                                        "Not provided"}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    {profileData.location ||
                                                        "Not provided"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-2">
                                            {isEditing ? (
                                                <>
                                                    <Button
                                                        onClick={handleSave}
                                                        className="bg-violet-600 hover:bg-violet-700"
                                                        disabled={
                                                            saveStatus ===
                                                            "saving"
                                                        }
                                                    >
                                                        <Save className="w-4 h-4 mr-2" />
                                                        Save Changes
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        onClick={handleCancel}
                                                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                                                    >
                                                        <X className="w-4 h-4 mr-2" />
                                                        Cancel
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button
                                                    variant="outline"
                                                    onClick={() =>
                                                        setIsEditing(true)
                                                    }
                                                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                                                >
                                                    <Edit2 className="w-4 h-4 mr-2" />
                                                    Edit Profile
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                                <StatCard
                                    label="Total Patients"
                                    value={profileData.totalPatients}
                                    icon={Users}
                                />
                                <StatCard
                                    label="Sessions"
                                    value={profileData.totalSessions}
                                    icon={CalendarCheck}
                                />
                                <StatCard
                                    label="Rating"
                                    value={`${profileData.rating} / 5`}
                                    icon={Award}
                                />
                                <StatCard
                                    label="Experience"
                                    value={`${profileData.yearsOfExperience || 0} yrs`}
                                    icon={Briefcase}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ==================== TABS ==================== */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                        {/* Tabs Navigation */}
                        <div className="border-b border-gray-800 overflow-x-auto">
                            <div className="flex min-w-max">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                            activeTab === tab.id
                                                ? "border-violet-500 text-violet-400 bg-violet-900/20"
                                                : "border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                                        }`}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6">
                            {activeTab === "personal" && (
                                <PersonalInfoTab
                                    profileData={profileData}
                                    isEditing={isEditing}
                                    onChange={handleInputChange}
                                />
                            )}

                            {activeTab === "professional" && (
                                <ProfessionalTab
                                    profileData={profileData}
                                    isEditing={isEditing}
                                    onChange={handleInputChange}
                                />
                            )}

                            {activeTab === "practice" && (
                                <PracticeTab
                                    profileData={profileData}
                                    isEditing={isEditing}
                                    onChange={handleInputChange}
                                />
                            )}

                            {activeTab === "availability" && (
                                <AvailabilityTab />
                            )}

                            {activeTab === "documents" && (
                                <DocumentsTab documents={documents} />
                            )}

                            {activeTab === "security" && (
                                <SecurityTab
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                />
                            )}

                            {activeTab === "preferences" && <PreferencesTab />}
                        </div>
                    </div>

                    {/* ==================== DANGER ZONE ==================== */}
                    <div className="bg-gray-900 border border-red-900/50 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-900/30 rounded-xl">
                                <AlertTriangle className="w-6 h-6 text-red-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white">
                                    Danger Zone
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">
                                    Irreversible and destructive actions
                                </p>
                                <div className="flex flex-wrap gap-3 mt-4">
                                    <Button
                                        variant="outline"
                                        className="text-red-400 border-red-800 hover:bg-red-900/20"
                                    >
                                        Download My Data
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="text-red-400 border-red-800 hover:bg-red-900/20"
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

/* ==================== TAB COMPONENTS ==================== */

const PersonalInfoTab = ({ profileData, isEditing, onChange }) => (
    <div className="space-y-8">
        <ProfileSection title="Basic Information" icon={User}>
            <div className="grid sm:grid-cols-2 gap-6">
                <ProfileInput
                    label="Full Name"
                    name="therapistName"
                    value={profileData.therapistName}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={User}
                />
                <ProfileInput
                    label="Email Address"
                    name="email"
                    type="email"
                    value={profileData.email}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Mail}
                />
                <ProfileInput
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    value={profileData.phoneNumber}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Phone}
                />
                <ProfileInput
                    label="Location"
                    name="location"
                    value={profileData.location}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={MapPin}
                />
            </div>
        </ProfileSection>
    </div>
);

const ProfessionalTab = ({ profileData, isEditing, onChange }) => (
    <div className="space-y-8">
        <ProfileSection title="Professional Details" icon={Award}>
            <div className="grid sm:grid-cols-2 gap-6">
                <ProfileInput
                    label="Expertise/Specialization"
                    name="expertise"
                    value={profileData.expertise}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Brain}
                />
                <ProfileInput
                    label="Years of Experience"
                    name="yearsOfExperience"
                    type="number"
                    value={profileData.yearsOfExperience}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Briefcase}
                />
                <ProfileInput
                    label="Qualifications"
                    name="qualifications"
                    value={profileData.qualifications}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={GraduationCap}
                />
                <ProfileInput
                    label="License Number"
                    name="licenseNumber"
                    value={profileData.licenseNumber}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Shield}
                />
            </div>
        </ProfileSection>

        <ProfileSection title="Professional Bio" icon={FileText}>
            {isEditing ? (
                <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={onChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:ring-2 focus:ring-violet-500 outline-none resize-none"
                    placeholder="Write a brief professional summary..."
                />
            ) : (
                <p className="text-gray-400 leading-relaxed">
                    {profileData.bio || "No professional summary added yet."}
                </p>
            )}
        </ProfileSection>
    </div>
);

const PracticeTab = ({ profileData, isEditing, onChange }) => (
    <div className="space-y-8">
        <ProfileSection title="Practice Information" icon={Building2}>
            <div className="grid sm:grid-cols-2 gap-6">
                <ProfileInput
                    label="Consultation Fee (₹)"
                    name="consultationFee"
                    type="number"
                    value={profileData.consultationFee}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={DollarSign}
                />
                <div className="text-gray-400">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Session Duration
                    </label>
                    <div className="py-3 px-4 bg-gray-800/50 rounded-xl">
                        45 minutes (Standard)
                    </div>
                </div>
            </div>
        </ProfileSection>

        <ProfileSection title="Therapy Methods" icon={Stethoscope}>
            <div className="flex flex-wrap gap-2">
                {["CBT", "DBT", "Mindfulness", "EMDR", "Psychodynamic"].map(
                    (method) => (
                        <span
                            key={method}
                            className="px-3 py-1 bg-violet-900/30 text-violet-300 rounded-full text-sm border border-violet-500/30"
                        >
                            {method}
                        </span>
                    ),
                )}
            </div>
        </ProfileSection>
    </div>
);

const AvailabilityTab = () => (
    <div className="space-y-8">
        <ProfileSection title="Weekly Schedule" icon={Calendar}>
            <div className="space-y-3">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                    (day) => (
                        <div
                            key={day}
                            className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl"
                        >
                            <span className="font-medium text-white">
                                {day}
                            </span>
                            <span className="text-gray-400">
                                9:00 AM - 5:00 PM
                            </span>
                        </div>
                    ),
                )}
            </div>
        </ProfileSection>
    </div>
);

const DocumentsTab = ({ documents }) => (
    <div className="space-y-6">
        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-violet-500 transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
                Upload Documents
            </h3>
            <p className="text-sm text-gray-400 mb-4">
                Upload your professional certificates and licenses
            </p>
            <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
            </Button>
        </div>

        {/* Documents List */}
        <div>
            <h3 className="text-lg font-semibold text-white mb-4">
                Your Documents ({documents.length})
            </h3>
            <div className="space-y-3">
                {documents.map((doc, idx) => (
                    <DocumentCard key={idx} {...doc} />
                ))}
            </div>
        </div>
    </div>
);

const SecurityTab = ({ showPassword, setShowPassword }) => (
    <div className="space-y-8">
        <ProfileSection title="Password" icon={Lock}>
            <div className="space-y-4 max-w-md">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Current Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter current password"
                            className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:ring-2 focus:ring-violet-500 outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        New Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:ring-2 focus:ring-violet-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:ring-2 focus:ring-violet-500 outline-none"
                    />
                </div>
                <Button className="bg-violet-600 hover:bg-violet-700">
                    Update Password
                </Button>
            </div>
        </ProfileSection>

        <ProfileSection title="Two-Factor Authentication" icon={Shield}>
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-900/30 rounded-xl">
                        <Shield className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                        <p className="font-medium text-white">
                            Two-Factor Authentication
                        </p>
                        <p className="text-sm text-gray-400">
                            Add extra security to your account
                        </p>
                    </div>
                </div>
                <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                    Enable
                </Button>
            </div>
        </ProfileSection>
    </div>
);

const PreferencesTab = () => (
    <div className="space-y-8">
        <ProfileSection title="Notification Preferences" icon={Bell}>
            <div className="space-y-4">
                <NotificationToggle
                    label="Email Notifications"
                    description="Receive appointment updates via email"
                    checked={true}
                />
                <NotificationToggle
                    label="SMS Notifications"
                    description="Get text reminders for sessions"
                    checked={true}
                />
                <NotificationToggle
                    label="New Patient Alerts"
                    description="Notify when new patients book"
                    checked={false}
                />
            </div>
        </ProfileSection>
    </div>
);

/* ==================== REUSABLE COMPONENTS ==================== */

const ProfileSection = ({ title, icon: Icon, children }) => (
    <div>
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-violet-900/30 rounded-lg">
                <Icon className="w-5 h-5 text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        {children}
    </div>
);

const ProfileInput = ({
    label,
    name,
    value,
    type = "text",
    isEditing,
    onChange,
    icon: Icon,
    placeholder,
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
        </label>
        {isEditing ? (
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-gray-100 ${
                        Icon ? "pl-12 pr-4" : "px-4"
                    }`}
                />
            </div>
        ) : (
            <div className="flex items-center gap-3 py-3 px-4 bg-gray-800/50 rounded-xl">
                {Icon && <Icon className="w-5 h-5 text-gray-400" />}
                <span className="text-gray-100">{value || "Not provided"}</span>
            </div>
        )}
    </div>
);

const StatCard = ({ label, value, icon: Icon }) => (
    <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 flex items-center gap-3">
        <div className="p-2 bg-violet-900/30 rounded-lg">
            <Icon className="w-5 h-5 text-violet-400" />
        </div>
        <div>
            <p className="text-xl font-bold text-white">{value}</p>
            <p className="text-sm text-gray-400">{label}</p>
        </div>
    </div>
);

const DocumentCard = ({ name, date, type, size }) => (
    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-900/30 rounded-xl">
                <FileText className="w-6 h-6 text-violet-400" />
            </div>
            <div>
                <p className="font-medium text-white">{name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{type}</span>
                    <span>•</span>
                    <span>{size}</span>
                    <span>•</span>
                    <span>{date}</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-gray-700">
                <Download className="w-4 h-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="text-red-400 hover:text-red-500 hover:bg-gray-700"
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    </div>
);

const NotificationToggle = ({ label, description, checked }) => (
    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
        <div>
            <p className="font-medium text-white">{label}</p>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                className="sr-only peer"
                readOnly
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
        </label>
    </div>
);
