/* eslint-disable no-unused-vars */
// File: doctor/DoctorProfile.jsx

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Mail,
    Phone,
    MapPin,
    Star,
    Stethoscope,
    Users,
    Calendar,
    Shield,
    GraduationCap,
    CreditCard,
    Camera,
    Edit2,
    Save,
    X,
    CheckCircle,
    AlertCircle,
    Sparkles,
    BadgeCheck,
    Globe,
    Lock,
    Bell,
    Settings,
    AlertTriangle,
    Download,
    Loader2,
} from "lucide-react";
import { DoctorLayout } from "./components/DoctorLayout";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { setProfile } from "@/Store/Slices/profileSlice";
import { toast } from "sonner";

export default function DoctorProfile() {
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

    // Local state
    const [activeTab, setActiveTab] = useState("personal");
    const [isEditing, setIsEditing] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [saveStatus, setSaveStatus] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);

    const [profileData, setProfileData] = useState({
        doctorId: profile?.userId || "",
        name: profile?.name || user?.firstName || "",
        email: user?.email || "",
        phoneNumber: profile?.phoneNumber || "",
        speciality: profile?.speciality || "",
        yearsOfExperience: profile?.yearsOfExperience || "",
        qualifications: profile?.qualifications || "",
        location: profile?.location || "",
        consultationFee: profile?.consultationFee || "",
        bio: profile?.bio || "",
        licenseNumber: profile?.licenseNumber || "",
        rating: profile?.rating || "4.9",
        totalPatients: profile?.medicalRecords?.length || 0,
        totalConsultations:
            profile?.medicalRecords?.filter((r) => r.prescribedTreatment)
                .length || 0,
    });

    console.log("Profile:", profile);
    console.log("User:", user);
    console.log("Profile Data:", profileData);

    // Fetch doctor profile
    useEffect(() => {
        if (!auth.token || !user) return;

        const shouldFetch =
            profile?.email !== user?.email || !profile?.speciality;

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

                    // Update profile data
                    setProfileData({
                        doctorId: res.data.userId,
                        name: res.data.name || user?.firstName || "",
                        email: user?.email || "",
                        phoneNumber: res.data.phoneNumber || "",
                        speciality: res.data.speciality || "",
                        yearsOfExperience: res.data.yearsOfExperience || "",
                        qualifications: res.data.qualifications || "",
                        location: res.data.location || "",
                        consultationFee: res.data.consultationFee || "",
                        bio: res.data.bio || "",
                        licenseNumber: res.data.licenseNumber || "",
                        rating: res.data.rating || "4.9",
                        totalPatients: res.data.medicalRecords?.length || 0,
                        totalConsultations:
                            res.data.medicalRecords?.filter(
                                (r) => r.prescribedTreatment,
                            ).length || 0,
                    });
                } catch (error) {
                    console.error("Error fetching doctor profile:", error);
                    toast.error("Failed to load profile");
                } finally {
                    setLoadingProfile(false);
                }
            };

            fetchDoctorProfile();
        }
    }, [auth.token, user?.email, profile?.email, gateway, dispatch]);

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
                `${gateway}/api/doctors/profile/update`,
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

    if (loadingProfile) {
        return (
            <DoctorLayout>
                <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
                        <p className="text-white text-lg">Loading profile...</p>
                    </div>
                </div>
            </DoctorLayout>
        );
    }

    return (
        <DoctorLayout>
            <div className="min-h-screen bg-gray-950 text-gray-100 p-6 pt-28">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* ==================== HEADER ==================== */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Doctor Profile
                            </h1>
                            <p className="text-gray-400 mt-1">
                                View and manage your professional profile
                            </p>
                        </div>

                        {/* Save Status Indicator */}
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
                        <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-600 relative">
                            <div className="absolute inset-0 bg-black/10" />
                        </div>

                        {/* Profile Info */}
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 relative z-10">
                                {/* Avatar */}
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-2xl border-4 border-gray-900 shadow-xl overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-500">
                                        {avatarPreview ? (
                                            <img
                                                src={avatarPreview}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                                                {profileData.name?.[0] || "D"}
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
                                                    Dr. {profileData.name}
                                                </h2>
                                                <BadgeCheck className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <span className="px-3 py-1 text-sm rounded-full bg-emerald-900/40 text-emerald-300 inline-block mb-2">
                                                {profileData.speciality ||
                                                    "Specialist"}
                                            </span>
                                            <p className="text-gray-400 text-sm">
                                                {profileData.qualifications ||
                                                    "MBBS, MD"}{" "}
                                                •{" "}
                                                {profileData.yearsOfExperience ||
                                                    "0"}
                                                + Years Experience
                                            </p>

                                            {/* Rating */}
                                            <div className="flex items-center gap-1 mt-3">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <Star
                                                        key={i}
                                                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                                                    />
                                                ))}
                                                <span className="ml-2 text-sm text-gray-300">
                                                    {profileData.rating} (312
                                                    reviews)
                                                </span>
                                            </div>

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
                                                        className="bg-emerald-600 hover:bg-emerald-700"
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
                                                        className="border-gray-700"
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
                                                    className="border-gray-700"
                                                >
                                                    <Edit2 className="w-4 h-4 mr-2" />
                                                    Edit Profile
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ==================== STATS ==================== */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard
                            icon={Users}
                            label="Total Patients"
                            value={profileData.totalPatients}
                        />
                        <StatCard
                            icon={Stethoscope}
                            label="Consultations"
                            value={profileData.totalConsultations}
                        />
                        <StatCard
                            icon={Calendar}
                            label="Experience"
                            value={`${profileData.yearsOfExperience || 0} yrs`}
                        />
                        <StatCard
                            icon={Star}
                            label="Rating"
                            value={profileData.rating}
                        />
                    </div>

                    {/* ==================== SECTIONS ==================== */}
                    <Section title="Professional Summary">
                        {isEditing ? (
                            <textarea
                                name="bio"
                                value={profileData.bio}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                                placeholder="Write a brief professional summary..."
                            />
                        ) : (
                            <p className="text-gray-400 leading-relaxed">
                                {profileData.bio ||
                                    "No professional summary added yet."}
                            </p>
                        )}
                    </Section>

                    <Section title="Education & Certification">
                        {isEditing ? (
                            <input
                                name="qualifications"
                                value={profileData.qualifications}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="e.g., MBBS, MD (Cardiology)"
                            />
                        ) : (
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li>• {profileData.qualifications || "N/A"}</li>
                                <li>
                                    • License Number:{" "}
                                    {profileData.licenseNumber || "N/A"}
                                </li>
                            </ul>
                        )}
                    </Section>

                    <Section title="Practice & Fees">
                        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-400">
                            {isEditing ? (
                                <>
                                    <div>
                                        <label className="block text-gray-300 mb-2">
                                            Consultation Fee
                                        </label>
                                        <input
                                            name="consultationFee"
                                            value={profileData.consultationFee}
                                            onChange={handleInputChange}
                                            type="number"
                                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                                            placeholder="₹500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 mb-2">
                                            Location
                                        </label>
                                        <input
                                            name="location"
                                            value={profileData.location}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                                            placeholder="City, State"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        Consultation Fee: ₹
                                        {profileData.consultationFee || "N/A"}
                                    </div>
                                    <div>
                                        Location:{" "}
                                        {profileData.location || "N/A"}
                                    </div>
                                </>
                            )}
                            <div>Duration: 45 minutes</div>
                            <div>Telemedicine: Available</div>
                        </div>
                    </Section>

                    <Section title="Security & Payments">
                        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-emerald-400" />
                                Two-factor authentication enabled
                            </div>
                            <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-emerald-400" />
                                Secure payouts enabled
                            </div>
                        </div>
                    </Section>
                </div>
            </div>
        </DoctorLayout>
    );
}

/* ==================== UI HELPERS ==================== */

const StatCard = ({ icon: Icon, label, value }) => (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
        <div className="p-3 bg-emerald-900/40 rounded-lg">
            <Icon className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
            <p className="text-xl font-bold text-white">{value}</p>
            <p className="text-sm text-gray-400">{label}</p>
        </div>
    </div>
);

const Section = ({ title, children }) => (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
        {children}
    </div>
);
