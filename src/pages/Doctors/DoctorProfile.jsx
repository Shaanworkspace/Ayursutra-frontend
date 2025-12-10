/* eslint-disable no-unused-vars */
// File: doctor/DoctorProfile.jsx

import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Stethoscope,
    Award,
    BookOpen,
    FileText,
    MessageSquare,
    Activity,
    Shield,
    Camera,
    Edit2,
    Save,
    X,
    CheckCircle,
    AlertCircle,
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
    Star,
    Users,
    Video,
    Building2,
    GraduationCap,
    Briefcase,
    Languages,
    IndianRupee,
    DollarSign,
    CalendarCheck,
    TrendingUp,
    Heart,
    Sparkles,
    Plus,
    ExternalLink,
    Linkedin,
    Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DoctorLayout } from "./components/DoctorLayout";


export const DoctorProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const fileInputRef = useRef(null);
    const certificateInputRef = useRef(null);

    // State management
    const [activeTab, setActiveTab] = useState("professional");
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [saveStatus, setSaveStatus] = useState(null);

    // Profile data state
    const [profileData, setProfileData] = useState({
        // Basic Info
        firstName: "Amita",
        lastName: "Sharma",
        title: "Dr.",
        email: "dr.sharma@ayurveda.com",
        phone: "+1 (555) 234-5678",
        alternatePhone: "+1 (555) 234-5679",
        dateOfBirth: "1978-03-12",
        gender: "Female",

        // Professional Info
        specialization: "Ayurvedic Medicine & Panchakarma",
        subSpecialties: ["Panchakarma", "Yoga Therapy", "Herbal Medicine"],
        qualification: "BAMS, MD (Ayurveda)",
        experience: "15",
        licenseNumber: "AYU-2009-1234",
        licenseExpiry: "2026-12-31",
        registrationCouncil: "Central Council of Indian Medicine",
        registrationYear: "2009",

        // Practice Info
        clinicName: "Ayursutra Wellness Center",
        clinicAddress: "456 Healing Way, Wellness District",
        clinicCity: "San Francisco",
        clinicState: "California",
        clinicZip: "94102",
        consultationFee: "120",
        followUpFee: "80",
        currency: "USD",
        consultationDuration: "45",

        // Availability
        availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        availableTimeStart: "09:00",
        availableTimeEnd: "18:00",
        acceptingNewPatients: true,
        telemedicineAvailable: true,

        // Languages & Bio
        languages: ["English", "Hindi", "Sanskrit"],
        bio: "Dr. Amita Sharma is a renowned Ayurvedic physician with over 15 years of experience in traditional Indian medicine. She specializes in Panchakarma therapies and holistic wellness treatments.",

        // Education
        education: [
            {
                degree: "MD in Ayurveda",
                institution: "Gujarat Ayurved University",
                year: "2009",
            },
            {
                degree: "BAMS",
                institution: "Rajiv Gandhi University of Health Sciences",
                year: "2005",
            },
        ],

        // Awards & Certifications
        awards: [
            {
                title: "Best Ayurvedic Practitioner",
                year: "2022",
                organization: "National Ayurveda Association",
            },
            {
                title: "Excellence in Panchakarma",
                year: "2020",
                organization: "AAIM",
            },
        ],

        // Social & Online Presence
        linkedIn: "linkedin.com/in/dramitasharma",
        twitter: "@dramitasharma",
        website: "www.drsharmaayurveda.com",

        // Bank & Payment Info
        bankName: "Chase Bank",
        accountNumber: "****4567",
        routingNumber: "****8901",
        upiId: "dr.sharma@upi",

        // Notifications
        notifications: {
            email: true,
            sms: true,
            push: true,
            appointments: true,
            patientMessages: true,
            reviews: true,
            payments: true,
        },
    });

    // Stats data
    const stats = {
        totalPatients: 1247,
        totalConsultations: 3456,
        rating: 4.9,
        totalReviews: 312,
        completionRate: 98,
        responseTime: "< 2 hrs",
    };

    // Tabs configuration
    const tabs = [
        { id: "professional", label: "Professional", icon: Stethoscope },
        { id: "practice", label: "Practice", icon: Building2 },
        { id: "education", label: "Education & Awards", icon: GraduationCap },
        { id: "availability", label: "Availability", icon: Calendar },
        { id: "payments", label: "Payments", icon: CreditCard },
        { id: "security", label: "Security", icon: Shield },
    ];

    // Calculate profile completion
    const calculateCompletion = () => {
        const fields = [
            profileData.firstName,
            profileData.lastName,
            profileData.email,
            profileData.phone,
            profileData.specialization,
            profileData.qualification,
            profileData.licenseNumber,
            profileData.clinicName,
            profileData.bio,
            profileData.consultationFee,
        ];
        const filled = fields.filter(
            (f) => f && f.toString().trim() !== ""
        ).length;
        return Math.round((filled / fields.length) * 100);
    };

    const profileCompletion = calculateCompletion();

    // Handlers
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.startsWith("notifications.")) {
            const notifKey = name.split(".")[1];
            setProfileData({
                ...profileData,
                notifications: {
                    ...profileData.notifications,
                    [notifKey]: checked,
                },
            });
        } else {
            setProfileData({
                ...profileData,
                [name]: type === "checkbox" ? checked : value,
            });
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatarPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        setSaveStatus("saving");
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSaveStatus("saved");
            setIsEditing(false);
            setTimeout(() => setSaveStatus(null), 3000);
        } catch (error) {
            setSaveStatus("error");
            setTimeout(() => setSaveStatus(null), 3000);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setAvatarPreview(null);
    };

    return (
        <DoctorLayout>
            <div className="p-6 lg:p-8">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* ==================== HEADER ==================== */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                Doctor Profile
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Manage your professional information and
                                settings
                            </p>
                        </div>

                        {/* Save Status Indicator */}
                        {saveStatus && <SaveStatusBadge status={saveStatus} />}
                    </div>

                    {/* ==================== PROFILE CARD WITH STATS ==================== */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                        {/* Banner with Medical Pattern */}
                        <div className="h-40 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 relative overflow-hidden">
                            {/* Medical Pattern Overlay */}
                            <div className="absolute inset-0 opacity-10">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                    }}
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />

                            {/* Verification Badge */}
                            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                                <BadgeCheck className="w-4 h-4 text-white" />
                                <span className="text-sm font-medium text-white">
                                    Verified Doctor
                                </span>
                            </div>
                        </div>

                        {/* Profile Info Section */}
                        <div className="px-6 pb-6">
                            <div className="flex flex-col lg:flex-row gap-6 -mt-20 relative z-10">
                                {/* Avatar Section */}
                                <div className="relative group shrink-0">
                                    <div className="w-36 h-36 rounded-2xl border-4 border-white dark:border-gray-900 shadow-xl overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500">
                                        {avatarPreview ? (
                                            <img
                                                src={avatarPreview}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                                                {profileData.firstName[0]}
                                                {profileData.lastName[0]}
                                            </div>
                                        )}
                                    </div>

                                    {/* Online Status */}
                                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-3 border-white dark:border-gray-900 rounded-full" />

                                    {isEditing && (
                                        <button
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                            className="absolute -bottom-2 -right-2 p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:scale-110 transition-transform border border-gray-200 dark:border-gray-700"
                                        >
                                            <Camera className="w-5 h-5 text-gray-600 dark:text-gray-400" />
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

                                {/* Info & Stats */}
                                <div className="flex-1 pt-4 lg:pt-8 ">
                                    <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
                                        <div>
                                            {/* Name & Title */}
                                            <div className="flex items-center gap-3 flex-wrap mt-2">
                                                <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                                                    {profileData.title}{" "}
                                                    {profileData.firstName}{" "}
                                                    {profileData.lastName}
                                                </h2>
                                                <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-sm font-medium rounded-full">
                                                    {
                                                        profileData.specialization.split(
                                                            " & "
                                                        )[0]
                                                    }
                                                </span>
                                            </div>

                                            {/* Qualification */}
                                            <p className="text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
                                                <GraduationCap className="w-4 h-4" />
                                                {profileData.qualification} •{" "}
                                                {profileData.experience} Years
                                                Experience
                                            </p>

                                            {/* Rating */}
                                            <div className="flex items-center gap-4 mt-3">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map(
                                                        (_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-5 h-5 ${
                                                                    i <
                                                                    Math.floor(
                                                                        stats.rating
                                                                    )
                                                                        ? "text-yellow-400 fill-yellow-400"
                                                                        : "text-gray-300"
                                                                }`}
                                                            />
                                                        )
                                                    )}
                                                    <span className="ml-2 font-bold text-gray-900 dark:text-gray-100">
                                                        {stats.rating}
                                                    </span>
                                                    <span className="text-gray-500 dark:text-gray-400">
                                                        ({stats.totalReviews}{" "}
                                                        reviews)
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Contact & Badges */}
                                            <div className="flex flex-wrap items-center gap-3 mt-4">
                                                <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                                                    <Mail className="w-4 h-4" />
                                                    {profileData.email}
                                                </span>
                                                <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                                                    <Phone className="w-4 h-4" />
                                                    {profileData.phone}
                                                </span>
                                                {profileData.telemedicineAvailable && (
                                                    <span className="flex items-center gap-1.5 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                                                        <Video className="w-3 h-3" />
                                                        Telemedicine Available
                                                    </span>
                                                )}
                                                {profileData.acceptingNewPatients && (
                                                    <span className="flex items-center gap-1.5 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                                                        <CheckCircle className="w-3 h-3" />
                                                        Accepting New Patients
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-2">
                                            {isEditing ? (
                                                <>
                                                    <Button
                                                        onClick={handleSave}
                                                        className="bg-teal-600 hover:bg-teal-700"
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
                                                    >
                                                        <X className="w-4 h-4 mr-2" />
                                                        Cancel
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() =>
                                                            setIsEditing(true)
                                                        }
                                                    >
                                                        <Edit2 className="w-4 h-4 mr-2" />
                                                        Edit Profile
                                                    </Button>
                                                    <Link to="/doctor/preview">
                                                        <Button variant="outline">
                                                            <Eye className="w-4 h-4 mr-2" />
                                                            Preview
                                                        </Button>
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
                                <StatMiniCard
                                    label="Total Patients"
                                    value={stats.totalPatients.toLocaleString()}
                                    icon={Users}
                                    color="teal"
                                />
                                <StatMiniCard
                                    label="Consultations"
                                    value={stats.totalConsultations.toLocaleString()}
                                    icon={Stethoscope}
                                    color="blue"
                                />
                                <StatMiniCard
                                    label="Rating"
                                    value={stats.rating}
                                    icon={Star}
                                    color="yellow"
                                />
                                <StatMiniCard
                                    label="Reviews"
                                    value={stats.totalReviews}
                                    icon={MessageSquare}
                                    color="purple"
                                />
                                <StatMiniCard
                                    label="Completion"
                                    value={`${stats.completionRate}%`}
                                    icon={CheckCircle}
                                    color="green"
                                />
                                <StatMiniCard
                                    label="Response"
                                    value={stats.responseTime}
                                    icon={Clock}
                                    color="cyan"
                                />
                            </div>

                            {/* Profile Completion */}
                            {profileCompletion < 100 && (
                                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                                Complete Your Profile
                                            </span>
                                        </div>
                                        <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                                            {profileCompletion}%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-amber-200 dark:bg-amber-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${profileCompletion}%`,
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-2">
                                        Complete profiles get 40% more
                                        appointment requests
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ==================== TABS & CONTENT ==================== */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                        {/* Tabs Navigation */}
                        <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                            <div className="flex min-w-max">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                            activeTab === tab.id
                                                ? "border-teal-500 text-teal-600 dark:text-teal-400 bg-teal-50/50 dark:bg-teal-900/20"
                                                : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
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
                            {activeTab === "education" && (
                                <EducationTab
                                    profileData={profileData}
                                    isEditing={isEditing}
                                />
                            )}
                            {activeTab === "availability" && (
                                <AvailabilityTab
                                    profileData={profileData}
                                    isEditing={isEditing}
                                    onChange={handleInputChange}
                                />
                            )}
                            {activeTab === "payments" && (
                                <PaymentsTab
                                    profileData={profileData}
                                    isEditing={isEditing}
                                    onChange={handleInputChange}
                                />
                            )}
                            {activeTab === "security" && (
                                <SecurityTab
                                    profileData={profileData}
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                    onChange={handleInputChange}
                                />
                            )}
                        </div>
                    </div>

                    {/* ==================== QUICK LINKS ==================== */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <QuickLinkCard
                            icon={Calendar}
                            title="Manage Schedule"
                            description="Set your availability"
                            to="/doctor/schedule"
                            color="teal"
                        />
                        <QuickLinkCard
                            icon={Users}
                            title="My Patients"
                            description="View patient records"
                            to="/doctor/patients"
                            color="blue"
                        />
                        <QuickLinkCard
                            icon={Star}
                            title="Reviews"
                            description="See patient feedback"
                            to="/doctor/reviews"
                            color="yellow"
                        />
                        <QuickLinkCard
                            icon={TrendingUp}
                            title="Analytics"
                            description="Performance insights"
                            to="/doctor/analytics"
                            color="purple"
                        />
                    </div>
                </div>
            </div>
        </DoctorLayout>
    );
};

// ============================================
// TAB COMPONENTS
// ============================================

// Professional Tab
const ProfessionalTab = ({ profileData, isEditing, onChange }) => (
    <div className="space-y-8">
        {/* Basic Information */}
        <ProfileSection title="Basic Information" icon={User}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProfileSelect
                    label="Title"
                    name="title"
                    value={profileData.title}
                    options={["Dr.", "Prof.", "Mr.", "Ms.", "Mrs."]}
                    isEditing={isEditing}
                    onChange={onChange}
                />
                <ProfileInput
                    label="First Name"
                    name="firstName"
                    value={profileData.firstName}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={User}
                />
                <ProfileInput
                    label="Last Name"
                    name="lastName"
                    value={profileData.lastName}
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
                    name="phone"
                    type="tel"
                    value={profileData.phone}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Phone}
                />
                <ProfileInput
                    label="Alternate Phone"
                    name="alternatePhone"
                    type="tel"
                    value={profileData.alternatePhone}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Phone}
                />
            </div>
        </ProfileSection>

        {/* Specialization */}
        <ProfileSection title="Specialization & Expertise" icon={Stethoscope}>
            <div className="grid sm:grid-cols-2 gap-6">
                <ProfileInput
                    label="Primary Specialization"
                    name="specialization"
                    value={profileData.specialization}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Stethoscope}
                />
                <ProfileInput
                    label="Qualification"
                    name="qualification"
                    value={profileData.qualification}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={GraduationCap}
                />
                <ProfileInput
                    label="Years of Experience"
                    name="experience"
                    type="number"
                    value={profileData.experience}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Briefcase}
                />
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Sub-Specialties
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {profileData.subSpecialties.map((specialty, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1.5 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-sm font-medium rounded-full flex items-center gap-2"
                            >
                                {specialty}
                                {isEditing && (
                                    <button className="hover:text-teal-900">
                                        <X className="w-3 h-3" />
                                    </button>
                                )}
                            </span>
                        ))}
                        {isEditing && (
                            <button className="px-3 py-1.5 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 text-sm rounded-full hover:border-teal-500 hover:text-teal-500 flex items-center gap-1">
                                <Plus className="w-3 h-3" />
                                Add
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </ProfileSection>

        {/* License & Registration */}
        <ProfileSection
            title="License & Registration"
            icon={Shield}
            variant="warning"
        >
            <div className="grid sm:grid-cols-2 gap-6">
                <ProfileInput
                    label="License Number"
                    name="licenseNumber"
                    value={profileData.licenseNumber}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={FileText}
                />
                <ProfileInput
                    label="License Expiry Date"
                    name="licenseExpiry"
                    type="date"
                    value={profileData.licenseExpiry}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Calendar}
                />
                <ProfileInput
                    label="Registration Council"
                    name="registrationCouncil"
                    value={profileData.registrationCouncil}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Building2}
                />
                <ProfileInput
                    label="Registration Year"
                    name="registrationYear"
                    value={profileData.registrationYear}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Calendar}
                />
            </div>

            {/* License Warning */}
            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                        <p className="font-medium text-amber-800 dark:text-amber-300">
                            License expires on December 31, 2026
                        </p>
                        <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                            Make sure to renew your license before expiry to
                            continue practicing.
                        </p>
                    </div>
                </div>
            </div>
        </ProfileSection>

        {/* Languages & Bio */}
        <ProfileSection title="Languages & Bio" icon={Languages}>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Languages Spoken
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {profileData.languages.map((lang, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full flex items-center gap-2"
                            >
                                <Globe className="w-3 h-3" />
                                {lang}
                                {isEditing && (
                                    <button className="hover:text-blue-900">
                                        <X className="w-3 h-3" />
                                    </button>
                                )}
                            </span>
                        ))}
                        {isEditing && (
                            <button className="px-3 py-1.5 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 text-sm rounded-full hover:border-blue-500 hover:text-blue-500 flex items-center gap-1">
                                <Plus className="w-3 h-3" />
                                Add Language
                            </button>
                        )}
                    </div>
                </div>

                <ProfileTextarea
                    label="Professional Bio"
                    name="bio"
                    value={profileData.bio}
                    isEditing={isEditing}
                    onChange={onChange}
                    placeholder="Write a brief professional bio that will be displayed on your public profile..."
                    rows={4}
                />
            </div>
        </ProfileSection>

        {/* Online Presence */}
        <ProfileSection title="Online Presence" icon={Globe}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProfileInput
                    label="Website"
                    name="website"
                    value={profileData.website}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Globe}
                    placeholder="www.yourwebsite.com"
                />
                <ProfileInput
                    label="LinkedIn"
                    name="linkedIn"
                    value={profileData.linkedIn}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Linkedin}
                    placeholder="linkedin.com/in/yourprofile"
                />
                <ProfileInput
                    label="Twitter"
                    name="twitter"
                    value={profileData.twitter}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Twitter}
                    placeholder="@yourhandle"
                />
            </div>
        </ProfileSection>
    </div>
);

// Practice Tab
const PracticeTab = ({ profileData, isEditing, onChange }) => (
    <div className="space-y-8">
        {/* Clinic Information */}
        <ProfileSection title="Clinic Information" icon={Building2}>
            <div className="grid sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                    <ProfileInput
                        label="Clinic/Hospital Name"
                        name="clinicName"
                        value={profileData.clinicName}
                        isEditing={isEditing}
                        onChange={onChange}
                        icon={Building2}
                    />
                </div>
                <div className="sm:col-span-2">
                    <ProfileInput
                        label="Clinic Address"
                        name="clinicAddress"
                        value={profileData.clinicAddress}
                        isEditing={isEditing}
                        onChange={onChange}
                        icon={MapPin}
                    />
                </div>
                <ProfileInput
                    label="City"
                    name="clinicCity"
                    value={profileData.clinicCity}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={MapPin}
                />
                <ProfileInput
                    label="State"
                    name="clinicState"
                    value={profileData.clinicState}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={MapPin}
                />
                <ProfileInput
                    label="ZIP Code"
                    name="clinicZip"
                    value={profileData.clinicZip}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={MapPin}
                />
            </div>
        </ProfileSection>

        {/* Consultation Fees */}
        <ProfileSection title="Consultation Fees" icon={DollarSign}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <ProfileSelect
                    label="Currency"
                    name="currency"
                    value={profileData.currency}
                    options={["USD", "INR", "EUR", "GBP"]}
                    isEditing={isEditing}
                    onChange={onChange}
                />
                <ProfileInput
                    label="Consultation Fee"
                    name="consultationFee"
                    type="number"
                    value={profileData.consultationFee}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={DollarSign}
                />
                <ProfileInput
                    label="Follow-up Fee"
                    name="followUpFee"
                    type="number"
                    value={profileData.followUpFee}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={DollarSign}
                />
                <ProfileInput
                    label="Duration (mins)"
                    name="consultationDuration"
                    type="number"
                    value={profileData.consultationDuration}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Clock}
                />
            </div>

            {/* Fee Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <FeeCard
                    title="Standard Consultation"
                    fee={profileData.consultationFee}
                    currency={profileData.currency}
                    duration={profileData.consultationDuration}
                    features={[
                        "In-person or Video",
                        "Detailed Assessment",
                        "Treatment Plan",
                    ]}
                />
                <FeeCard
                    title="Follow-up Visit"
                    fee={profileData.followUpFee}
                    currency={profileData.currency}
                    duration="30"
                    features={[
                        "Progress Review",
                        "Plan Adjustment",
                        "Q&A Session",
                    ]}
                    variant="secondary"
                />
            </div>
        </ProfileSection>

        {/* Practice Settings */}
        <ProfileSection title="Practice Settings" icon={Settings}>
            <div className="space-y-4">
                <ToggleSwitch
                    label="Accepting New Patients"
                    description="Allow new patients to book appointments"
                    checked={profileData.acceptingNewPatients}
                    name="acceptingNewPatients"
                    onChange={onChange}
                />
                <ToggleSwitch
                    label="Telemedicine Available"
                    description="Offer video consultations to patients"
                    checked={profileData.telemedicineAvailable}
                    name="telemedicineAvailable"
                    onChange={onChange}
                />
            </div>
        </ProfileSection>
    </div>
);

// Education Tab
const EducationTab = ({ profileData, isEditing }) => (
    <div className="space-y-8">
        {/* Education */}
        <ProfileSection title="Education" icon={GraduationCap}>
            <div className="space-y-4">
                {profileData.education.map((edu, idx) => (
                    <EducationCard key={idx} {...edu} isEditing={isEditing} />
                ))}
                {isEditing && (
                    <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 hover:border-teal-500 hover:text-teal-500 flex items-center justify-center gap-2 transition-colors">
                        <Plus className="w-5 h-5" />
                        Add Education
                    </button>
                )}
            </div>
        </ProfileSection>

        {/* Awards & Certifications */}
        <ProfileSection title="Awards & Certifications" icon={Award}>
            <div className="space-y-4">
                {profileData.awards.map((award, idx) => (
                    <AwardCard key={idx} {...award} isEditing={isEditing} />
                ))}
                {isEditing && (
                    <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 hover:border-teal-500 hover:text-teal-500 flex items-center justify-center gap-2 transition-colors">
                        <Plus className="w-5 h-5" />
                        Add Award or Certification
                    </button>
                )}
            </div>
        </ProfileSection>

        {/* Upload Certificates */}
        <ProfileSection title="Certificates & Documents" icon={FileText}>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-teal-500 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Upload Certificates
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Upload your degrees, certifications, and licenses
                </p>
                <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                </Button>
                <p className="text-xs text-gray-400 mt-3">
                    Supports: PDF, JPG, PNG up to 10MB
                </p>
            </div>
        </ProfileSection>
    </div>
);

// Availability Tab
const AvailabilityTab = ({ profileData, isEditing, onChange }) => {
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    return (
        <div className="space-y-8">
            {/* Weekly Schedule */}
            <ProfileSection title="Weekly Schedule" icon={Calendar}>
                <div className="space-y-3">
                    {days.map((day) => (
                        <DayScheduleRow
                            key={day}
                            day={day}
                            isActive={profileData.availableDays.includes(day)}
                            startTime={profileData.availableTimeStart}
                            endTime={profileData.availableTimeEnd}
                            isEditing={isEditing}
                        />
                    ))}
                </div>
            </ProfileSection>

            {/* Time Slots */}
            <ProfileSection title="Default Time Slots" icon={Clock}>
                <div className="grid sm:grid-cols-2 gap-6">
                    <ProfileInput
                        label="Start Time"
                        name="availableTimeStart"
                        type="time"
                        value={profileData.availableTimeStart}
                        isEditing={isEditing}
                        onChange={onChange}
                        icon={Clock}
                    />
                    <ProfileInput
                        label="End Time"
                        name="availableTimeEnd"
                        type="time"
                        value={profileData.availableTimeEnd}
                        isEditing={isEditing}
                        onChange={onChange}
                        icon={Clock}
                    />
                </div>
            </ProfileSection>

            {/* Blocked Dates */}
            <ProfileSection
                title="Blocked Dates / Vacations"
                icon={CalendarCheck}
            >
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        No blocked dates scheduled
                    </p>
                    <Button variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Blocked Dates
                    </Button>
                </div>
            </ProfileSection>
        </div>
    );
};

// Payments Tab
const PaymentsTab = ({ profileData, isEditing, onChange }) => (
    <div className="space-y-8">
        {/* Bank Details */}
        <ProfileSection title="Bank Account" icon={Building2}>
            <div className="grid sm:grid-cols-2 gap-6">
                <ProfileInput
                    label="Bank Name"
                    name="bankName"
                    value={profileData.bankName}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Building2}
                />
                <ProfileInput
                    label="Account Number"
                    name="accountNumber"
                    value={profileData.accountNumber}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={CreditCard}
                    type="password"
                />
                <ProfileInput
                    label="Routing Number"
                    name="routingNumber"
                    value={profileData.routingNumber}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={FileText}
                    type="password"
                />
                <ProfileInput
                    label="UPI ID (Optional)"
                    name="upiId"
                    value={profileData.upiId}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={CreditCard}
                />
            </div>
        </ProfileSection>

        {/* Earnings Overview */}
        <ProfileSection title="Earnings Overview" icon={TrendingUp}>
            <div className="grid sm:grid-cols-3 gap-4">
                <EarningsCard
                    label="This Month"
                    amount="$4,850"
                    trend="+12%"
                    positive={true}
                />
                <EarningsCard
                    label="Last Month"
                    amount="$4,320"
                    trend="+8%"
                    positive={true}
                />
                <EarningsCard
                    label="Total Earnings"
                    amount="$52,400"
                    trend="2024"
                    positive={true}
                />
            </div>
        </ProfileSection>

        {/* Payout History */}
        <ProfileSection title="Recent Payouts" icon={DollarSign}>
            <div className="space-y-3">
                <PayoutRow
                    date="Dec 1, 2024"
                    amount="$3,200"
                    status="completed"
                />
                <PayoutRow
                    date="Nov 1, 2024"
                    amount="$2,950"
                    status="completed"
                />
                <PayoutRow
                    date="Oct 1, 2024"
                    amount="$3,450"
                    status="completed"
                />
            </div>
            <div className="mt-4 text-center">
                <Link
                    to="/doctor/earnings"
                    className="text-teal-600 dark:text-teal-400 text-sm font-medium hover:underline"
                >
                    View All Transactions →
                </Link>
            </div>
        </ProfileSection>
    </div>
);

// Security Tab
const SecurityTab = ({
    profileData,
    showPassword,
    setShowPassword,
    onChange,
}) => (
    <div className="space-y-8">
        {/* Password */}
        <ProfileSection title="Change Password" icon={Lock}>
            <div className="space-y-4 max-w-md">
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter current password"
                            className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        New Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700">
                    Update Password
                </Button>
            </div>
        </ProfileSection>

        {/* Two-Factor Authentication */}
        <ProfileSection title="Two-Factor Authentication" icon={Shield}>
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                        <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                            Two-Factor Authentication is Enabled
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Your account is protected with 2FA
                        </p>
                    </div>
                </div>
                <Button variant="outline">Manage</Button>
            </div>
        </ProfileSection>

        {/* Notification Preferences */}
        <ProfileSection title="Notification Preferences" icon={Bell}>
            <div className="space-y-4">
                <ToggleSwitch
                    label="Email Notifications"
                    description="Receive updates via email"
                    checked={profileData.notifications.email}
                    name="notifications.email"
                    onChange={onChange}
                />
                <ToggleSwitch
                    label="SMS Notifications"
                    description="Receive updates via text message"
                    checked={profileData.notifications.sms}
                    name="notifications.sms"
                    onChange={onChange}
                />
                <ToggleSwitch
                    label="Appointment Alerts"
                    description="Get notified about new appointments"
                    checked={profileData.notifications.appointments}
                    name="notifications.appointments"
                    onChange={onChange}
                />
                <ToggleSwitch
                    label="Patient Messages"
                    description="Get notified when patients message you"
                    checked={profileData.notifications.patientMessages}
                    name="notifications.patientMessages"
                    onChange={onChange}
                />
                <ToggleSwitch
                    label="New Reviews"
                    description="Get notified about new patient reviews"
                    checked={profileData.notifications.reviews}
                    name="notifications.reviews"
                    onChange={onChange}
                />
            </div>
        </ProfileSection>
    </div>
);

// ============================================
// REUSABLE COMPONENTS
// ============================================

// Save Status Badge
const SaveStatusBadge = ({ status }) => (
    <div
        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            status === "saving"
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : status === "saved"
                ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                : "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400"
        }`}
    >
        {status === "saving" && (
            <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium">Saving...</span>
            </>
        )}
        {status === "saved" && (
            <>
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Changes saved!</span>
            </>
        )}
        {status === "error" && (
            <>
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Save failed</span>
            </>
        )}
    </div>
);

// Stat Mini Card
const StatMiniCard = ({ label, value, icon: Icon, color }) => {
    const colorClasses = {
        teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
        blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
        yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
        purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
        green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
        cyan: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
    };

    return (
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
            <div
                className={`inline-flex p-2 rounded-lg ${colorClasses[color]} mb-2`}
            >
                <Icon className="w-5 h-5" />
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {value}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        </div>
    );
};

// Profile Section
const ProfileSection = ({
    title,
    icon: Icon,
    children,
    variant = "default",
}) => (
    <div>
        <div className="flex items-center gap-3 mb-4">
            <div
                className={`p-2 rounded-lg ${
                    variant === "warning"
                        ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                        : "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                }`}
            >
                <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
            </h3>
        </div>
        {children}
    </div>
);

// Profile Input
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                    className={`w-full py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-gray-900 dark:text-gray-100 ${
                        Icon ? "pl-12 pr-4" : "px-4"
                    }`}
                />
            </div>
        ) : (
            <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                {Icon && <Icon className="w-5 h-5 text-gray-400" />}
                <span className="text-gray-900 dark:text-gray-100">
                    {value || "Not provided"}
                </span>
            </div>
        )}
    </div>
);

// Profile Select
const ProfileSelect = ({
    label,
    name,
    value,
    options,
    isEditing,
    onChange,
    icon: Icon,
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
        </label>
        {isEditing ? (
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-gray-900 dark:text-gray-100"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        ) : (
            <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                {Icon && <Icon className="w-5 h-5 text-gray-400" />}
                <span className="text-gray-900 dark:text-gray-100">
                    {value}
                </span>
            </div>
        )}
    </div>
);

// Profile Textarea
const ProfileTextarea = ({
    label,
    name,
    value,
    isEditing,
    onChange,
    placeholder,
    rows = 3,
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
        </label>
        {isEditing ? (
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-gray-900 dark:text-gray-100 resize-none"
            />
        ) : (
            <div className="py-3 px-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl min-h-[80px]">
                <span className="text-gray-900 dark:text-gray-100">
                    {value || "Not provided"}
                </span>
            </div>
        )}
    </div>
);

// Toggle Switch
const ToggleSwitch = ({ label, description, checked, name, onChange }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
                {label}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {description}
            </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
        </label>
    </div>
);

// Fee Card
const FeeCard = ({
    title,
    fee,
    currency,
    duration,
    features,
    variant = "primary",
}) => (
    <div
        className={`p-6 rounded-xl border-2 ${
            variant === "primary"
                ? "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800"
                : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
        }`}
    >
        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {title}
        </h4>
        <div className="flex items-baseline gap-1 mb-3">
            <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {currency === "USD" ? "$" : currency === "INR" ? "₹" : currency}
                {fee}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
                / {duration} mins
            </span>
        </div>
        <ul className="space-y-2">
            {features.map((feature, idx) => (
                <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    {feature}
                </li>
            ))}
        </ul>
    </div>
);

// Education Card
const EducationCard = ({ degree, institution, year, isEditing }) => (
    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
            <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                {degree}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {institution}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                {year}
            </p>
        </div>
        {isEditing && (
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        )}
    </div>
);

// Award Card
const AwardCard = ({ title, year, organization, isEditing }) => (
    <div className="flex items-start gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
            <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                {title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {organization}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                {year}
            </p>
        </div>
        {isEditing && (
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        )}
    </div>
);

// Day Schedule Row
const DayScheduleRow = ({ day, isActive, startTime, endTime, isEditing }) => (
    <div
        className={`flex items-center justify-between p-4 rounded-xl border ${
            isActive
                ? "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800"
                : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
        }`}
    >
        <div className="flex items-center gap-4">
            {isEditing && (
                <input
                    type="checkbox"
                    checked={isActive}
                    className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    readOnly
                />
            )}
            <span
                className={`font-medium ${
                    isActive
                        ? "text-gray-900 dark:text-gray-100"
                        : "text-gray-400 dark:text-gray-500"
                }`}
            >
                {day}
            </span>
        </div>
        {isActive ? (
            <div className="flex items-center gap-2 text-sm">
                <span className="text-teal-600 dark:text-teal-400 font-medium">
                    {startTime} - {endTime}
                </span>
                {isEditing && (
                    <Button variant="ghost" size="sm">
                        <Edit2 className="w-3 h-3" />
                    </Button>
                )}
            </div>
        ) : (
            <span className="text-sm text-gray-400 dark:text-gray-500">
                Unavailable
            </span>
        )}
    </div>
);

// Earnings Card
const EarningsCard = ({ label, amount, trend, positive }) => (
    <div className="p-4 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl text-white">
        <p className="text-sm text-teal-100 mb-1">{label}</p>
        <p className="text-2xl font-bold mb-2">{amount}</p>
        <div className="flex items-center gap-1 text-sm text-teal-100">
            {positive && <TrendingUp className="w-4 h-4" />}
            <span>{trend}</span>
        </div>
    </div>
);

// Payout Row
const PayoutRow = ({ date, amount, status }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                    {amount}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {date}
                </p>
            </div>
        </div>
        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium rounded-full capitalize">
            {status}
        </span>
    </div>
);

// Quick Link Card
const QuickLinkCard = ({ icon: Icon, title, description, to, color }) => {
    const colorClasses = {
        teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 group-hover:bg-teal-200 dark:group-hover:bg-teal-900/50",
        blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50",
        yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-900/50",
        purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50",
    };

    return (
        <Link
            to={to}
            className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
        >
            <div
                className={`p-3 rounded-xl transition-colors ${colorClasses[color]}`}
            >
                <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {description}
                </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
        </Link>
    );
};

export default DoctorProfile;
