/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Heart,
    Activity,
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
    Languages,
    Star,
    Users,
    Video,
    MessageSquare,
    CalendarCheck,
    Brain,
    Stethoscope,
    ClipboardList,
    TrendingUp,
    BookOpen,
    Linkedin,
    Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TherapistLayout } from "./components/TherapistLayout";

export const TherapistProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const fileInputRef = useRef(null);

    // State management
    const [activeTab, setActiveTab] = useState("personal");
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [saveStatus, setSaveStatus] = useState(null);

    // Profile data state
    const [profileData, setProfileData] = useState({
        // Personal Info
        firstName: "Dr. Emily",
        lastName: "Thompson",
        email: "emily.thompson@mindcare.com",
        phone: "+1 (555) 789-0123",
        alternatePhone: "+1 (555) 789-0124",
        dateOfBirth: "1985-08-22",
        gender: "Female",
        address: "456 Wellness Boulevard",
        city: "Mental Health City",
        state: "New York",
        zipCode: "10001",
        country: "United States",
        bio: "Experienced clinical psychologist specializing in cognitive behavioral therapy and mindfulness-based interventions. Passionate about helping individuals overcome anxiety, depression, and trauma.",

        // Professional Info
        licenseNumber: "PSY-NY-12345",
        licenseState: "New York",
        licenseExpiry: "2026-12-31",
        npiNumber: "1234567890",
        degree: "Ph.D. in Clinical Psychology",
        university: "Columbia University",
        graduationYear: "2012",
        yearsOfExperience: "12",
        specializations: [
            "Anxiety Disorders",
            "Depression",
            "Trauma & PTSD",
            "Relationship Issues",
        ],
        therapyApproaches: [
            "Cognitive Behavioral Therapy (CBT)",
            "Mindfulness-Based Therapy",
            "EMDR",
            "Psychodynamic Therapy",
        ],
        ageGroups: ["Adults (18-65)", "Seniors (65+)"],
        languages: ["English", "Spanish"],

        // Practice Info
        practiceName: "MindCare Wellness Center",
        practiceAddress: "456 Wellness Boulevard, Suite 200",
        practiceCity: "New York",
        practiceState: "NY",
        practiceZip: "10001",
        practicePhone: "+1 (555) 789-0100",
        practiceEmail: "contact@mindcarewellness.com",
        practiceWebsite: "www.mindcarewellness.com",

        // Consultation Info
        sessionDuration: "50 minutes",
        consultationFee: "150",
        currency: "USD",
        acceptsInsurance: true,
        insuranceProviders: [
            "Blue Cross Blue Shield",
            "Aetna",
            "United Healthcare",
            "Cigna",
        ],
        offersSlidingScale: true,
        slidingScaleRange: "$80 - $150",
        offersFreeConsultation: true,
        freeConsultationDuration: "15 minutes",

        // Availability
        timezone: "America/New_York",
        consultationModes: ["In-Person", "Video Call", "Phone Call"],
        availability: {
            monday: { enabled: true, start: "09:00", end: "17:00" },
            tuesday: { enabled: true, start: "09:00", end: "17:00" },
            wednesday: { enabled: true, start: "09:00", end: "17:00" },
            thursday: { enabled: true, start: "09:00", end: "19:00" },
            friday: { enabled: true, start: "09:00", end: "15:00" },
            saturday: { enabled: false, start: "10:00", end: "14:00" },
            sunday: { enabled: false, start: "", end: "" },
        },

        // Social Links
        linkedIn: "linkedin.com/in/dr-emily-thompson",
        twitter: "@DrEmilyTherapy",
        website: "www.dremilyThompson.com",

        // Preferences
        language: "English",
        notifications: {
            email: true,
            sms: true,
            push: true,
            appointments: true,
            reminders: true,
            patientMessages: true,
            reviews: true,
            marketing: false,
        },
    });

    // Calculate profile completion
    const calculateCompletion = () => {
        const fields = [
            profileData.firstName,
            profileData.lastName,
            profileData.email,
            profileData.phone,
            profileData.licenseNumber,
            profileData.degree,
            profileData.specializations.length > 0,
            profileData.therapyApproaches.length > 0,
            profileData.consultationFee,
            profileData.bio,
            profileData.practiceName,
        ];
        const filled = fields.filter(
            (f) =>
                f && (typeof f === "boolean" ? f : f.toString().trim() !== "")
        ).length;
        return Math.round((filled / fields.length) * 100);
    };

    const profileCompletion = calculateCompletion();

    // Stats
    const stats = {
        totalPatients: 248,
        totalSessions: 1520,
        avgRating: 4.9,
        reviewCount: 156,
    };

    // Tabs configuration
    const tabs = [
        { id: "personal", label: "Personal Info", icon: User },
        { id: "professional", label: "Professional", icon: Award },
        { id: "practice", label: "Practice Info", icon: Building2 },
        { id: "availability", label: "Availability", icon: Calendar },
        { id: "documents", label: "Documents", icon: FileText },
        { id: "security", label: "Security", icon: Shield },
        { id: "preferences", label: "Preferences", icon: Settings },
    ];

    // Handle input changes
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
        } else if (name.startsWith("availability.")) {
            const [, day, field] = name.split(".");
            setProfileData({
                ...profileData,
                availability: {
                    ...profileData.availability,
                    [day]: {
                        ...profileData.availability[day],
                        [field]: field === "enabled" ? checked : value,
                    },
                },
            });
        } else {
            setProfileData({
                ...profileData,
                [name]: type === "checkbox" ? checked : value,
            });
        }
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
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSaveStatus("saved");
            setIsEditing(false);
            setTimeout(() => setSaveStatus(null), 3000);
        } catch (error) {
            setSaveStatus("error");
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
            name: "Psychology License",
            date: "Jan 15, 2024",
            type: "License",
            size: "1.2 MB",
            status: "verified",
        },
        {
            name: "Ph.D. Certificate",
            date: "May 20, 2012",
            type: "Certificate",
            size: "2.4 MB",
            status: "verified",
        },
        {
            name: "CBT Certification",
            date: "Aug 10, 2015",
            type: "Certification",
            size: "890 KB",
            status: "verified",
        },
        {
            name: "EMDR Training Certificate",
            date: "Mar 5, 2018",
            type: "Certification",
            size: "1.1 MB",
            status: "pending",
        },
        {
            name: "Malpractice Insurance",
            date: "Dec 1, 2024",
            type: "Insurance",
            size: "456 KB",
            status: "verified",
        },
    ];

    return (
        <TherapistLayout>
            <div className="p-6 lg:p-8">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* ==================== HEADER ==================== */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                My Profile
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Manage your professional information and
                                practice settings
                            </p>
                        </div>

                        {/* Save Status Indicator */}
                        {saveStatus && (
                            <div
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                                    saveStatus === "saving"
                                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                        : saveStatus === "saved"
                                        ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                        : "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                                }`}
                            >
                                {saveStatus === "saving" && (
                                    <>
                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
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
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                        {/* Profile Header Banner */}
                        <div className="h-32 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 relative">
                            <div className="absolute inset-0 bg-black/10" />
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>

                        {/* Profile Info Section */}
                        <div className="px-6 pb-6">
                            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 relative z-10">
                                {/* Avatar */}
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-2xl border-4 border-white dark:border-gray-900 shadow-xl overflow-hidden bg-gradient-to-br from-violet-400 to-purple-500">
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

                                    {/* Upload Button */}
                                    {isEditing && (
                                        <button
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                            className="absolute bottom-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform"
                                        >
                                            <Camera className="w-4 h-4 text-gray-600 dark:text-gray-400" />
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

                                {/* Name & Basic Info */}
                                <div className="flex-1 pt-4 sm:pt-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-6">
                                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
                                                    {profileData.firstName}{" "}
                                                    {profileData.lastName}
                                                </h2>
                                                <BadgeCheck className="w-6 h-6 text-violet-500" />
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {profileData.degree} •{" "}
                                                {profileData.specializations[0]}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
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
                                                >
                                                    <Edit2 className="w-4 h-4 mr-2" />
                                                    Edit Profile
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                                <StatCard
                                    icon={Users}
                                    value={stats.totalPatients}
                                    label="Total Patients"
                                    color="violet"
                                />
                                <StatCard
                                    icon={CalendarCheck}
                                    value={stats.totalSessions}
                                    label="Sessions Completed"
                                    color="purple"
                                />
                                <StatCard
                                    icon={Star}
                                    value={stats.avgRating}
                                    label="Average Rating"
                                    color="amber"
                                    suffix="/5"
                                />
                                <StatCard
                                    icon={MessageSquare}
                                    value={stats.reviewCount}
                                    label="Patient Reviews"
                                    color="green"
                                />
                            </div>

                            {/* Profile Completion */}
                            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-violet-500" />
                                        <span className="font-medium text-gray-900 dark:text-gray-100">
                                            Profile Completion
                                        </span>
                                    </div>
                                    <span className="text-sm font-bold text-violet-600 dark:text-violet-400">
                                        {profileCompletion}%
                                    </span>
                                </div>
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${profileCompletion}%`,
                                        }}
                                    />
                                </div>
                                {profileCompletion < 100 && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        Complete your profile to increase
                                        visibility and attract more patients
                                    </p>
                                )}
                            </div>
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
                                                ? "border-violet-500 text-violet-600 dark:text-violet-400 bg-violet-50/50 dark:bg-violet-900/20"
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
                            {activeTab === "personal" && (
                                <PersonalInfoTab
                                    profileData={profileData}
                                    isEditing={isEditing}
                                    onChange={handleInputChange}
                                />
                            )}

                            {activeTab === "professional" && (
                                <ProfessionalInfoTab
                                    profileData={profileData}
                                    isEditing={isEditing}
                                    onChange={handleInputChange}
                                />
                            )}

                            {activeTab === "practice" && (
                                <PracticeInfoTab
                                    profileData={profileData}
                                    isEditing={isEditing}
                                    onChange={handleInputChange}
                                />
                            )}

                            {activeTab === "availability" && (
                                <AvailabilityTab
                                    profileData={profileData}
                                    isEditing={isEditing}
                                    onChange={handleInputChange}
                                />
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

                            {activeTab === "preferences" && (
                                <PreferencesTab
                                    profileData={profileData}
                                    isEditing={isEditing}
                                    onChange={handleInputChange}
                                />
                            )}
                        </div>
                    </div>

                    {/* ==================== DANGER ZONE ==================== */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-red-200 dark:border-red-900/50 shadow-sm overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        Danger Zone
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Irreversible and destructive actions
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        <Button
                                            variant="outline"
                                            className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                                        >
                                            Download My Data
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
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
            </div>
        </TherapistLayout>
    );
};

// ============================================
// TAB COMPONENTS
// ============================================

// Personal Info Tab
const PersonalInfoTab = ({ profileData, isEditing, onChange }) => (
    <div className="space-y-8">
        {/* Basic Information */}
        <ProfileSection title="Basic Information" icon={User}>
            <div className="grid sm:grid-cols-2 gap-6">
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
                <ProfileSelect
                    label="Gender"
                    name="gender"
                    value={profileData.gender}
                    options={[
                        "Male",
                        "Female",
                        "Non-binary",
                        "Prefer not to say",
                    ]}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={User}
                />
            </div>
        </ProfileSection>

        {/* Bio */}
        <ProfileSection title="Professional Bio" icon={BookOpen}>
            <ProfileTextarea
                label="About Me"
                name="bio"
                value={profileData.bio}
                isEditing={isEditing}
                onChange={onChange}
                placeholder="Write a compelling bio that describes your approach, experience, and what patients can expect..."
                rows={5}
            />
        </ProfileSection>

        {/* Address Information */}
        <ProfileSection title="Personal Address" icon={MapPin}>
            <div className="grid sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                    <ProfileInput
                        label="Street Address"
                        name="address"
                        value={profileData.address}
                        isEditing={isEditing}
                        onChange={onChange}
                        icon={MapPin}
                    />
                </div>
                <ProfileInput
                    label="City"
                    name="city"
                    value={profileData.city}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={MapPin}
                />
                <ProfileInput
                    label="State/Province"
                    name="state"
                    value={profileData.state}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={MapPin}
                />
                <ProfileInput
                    label="ZIP/Postal Code"
                    name="zipCode"
                    value={profileData.zipCode}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={MapPin}
                />
                <ProfileInput
                    label="Country"
                    name="country"
                    value={profileData.country}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Globe}
                />
            </div>
        </ProfileSection>

        {/* Social Links */}
        <ProfileSection title="Social & Online Presence" icon={Globe}>
            <div className="grid sm:grid-cols-2 gap-6">
                <ProfileInput
                    label="LinkedIn Profile"
                    name="linkedIn"
                    value={profileData.linkedIn}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Linkedin}
                    placeholder="linkedin.com/in/your-profile"
                />
                <ProfileInput
                    label="Twitter Handle"
                    name="twitter"
                    value={profileData.twitter}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Twitter}
                    placeholder="@yourusername"
                />
                <ProfileInput
                    label="Personal Website"
                    name="website"
                    value={profileData.website}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Globe}
                    placeholder="www.yourwebsite.com"
                />
            </div>
        </ProfileSection>
    </div>
);

// Professional Info Tab
const ProfessionalInfoTab = ({ profileData, isEditing, onChange }) => (
    <div className="space-y-8">
        {/* License Information */}
        <ProfileSection
            title="License & Credentials"
            icon={Award}
            variant="success"
        >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProfileInput
                    label="License Number"
                    name="licenseNumber"
                    value={profileData.licenseNumber}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={FileText}
                />
                <ProfileInput
                    label="License State"
                    name="licenseState"
                    value={profileData.licenseState}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={MapPin}
                />
                <ProfileInput
                    label="License Expiry"
                    name="licenseExpiry"
                    type="date"
                    value={profileData.licenseExpiry}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Calendar}
                />
                <ProfileInput
                    label="NPI Number"
                    name="npiNumber"
                    value={profileData.npiNumber}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={CreditCard}
                />
            </div>
        </ProfileSection>

        {/* Education */}
        <ProfileSection title="Education & Training" icon={GraduationCap}>
            <div className="grid sm:grid-cols-2 gap-6">
                <ProfileInput
                    label="Highest Degree"
                    name="degree"
                    value={profileData.degree}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={GraduationCap}
                />
                <ProfileInput
                    label="University/Institution"
                    name="university"
                    value={profileData.university}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Building2}
                />
                <ProfileInput
                    label="Graduation Year"
                    name="graduationYear"
                    value={profileData.graduationYear}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Calendar}
                />
                <ProfileInput
                    label="Years of Experience"
                    name="yearsOfExperience"
                    value={profileData.yearsOfExperience}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Briefcase}
                />
            </div>
        </ProfileSection>

        {/* Specializations */}
        <ProfileSection title="Specializations" icon={Brain}>
            <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Areas of expertise and focus in your practice
                </p>
                <div className="flex flex-wrap gap-2">
                    {profileData.specializations.map((spec, idx) => (
                        <SpecializationBadge
                            key={idx}
                            label={spec}
                            color="violet"
                        />
                    ))}
                    {isEditing && (
                        <button className="px-3 py-1.5 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 rounded-full text-sm hover:border-violet-500 hover:text-violet-500 transition-colors">
                            + Add Specialization
                        </button>
                    )}
                </div>
            </div>
        </ProfileSection>

        {/* Therapy Approaches */}
        <ProfileSection title="Therapy Approaches" icon={Stethoscope}>
            <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Treatment modalities and therapeutic techniques you use
                </p>
                <div className="flex flex-wrap gap-2">
                    {profileData.therapyApproaches.map((approach, idx) => (
                        <SpecializationBadge
                            key={idx}
                            label={approach}
                            color="purple"
                        />
                    ))}
                    {isEditing && (
                        <button className="px-3 py-1.5 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 rounded-full text-sm hover:border-purple-500 hover:text-purple-500 transition-colors">
                            + Add Approach
                        </button>
                    )}
                </div>
            </div>
        </ProfileSection>

        {/* Age Groups & Languages */}
        <ProfileSection title="Client Demographics" icon={Users}>
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Age Groups Served
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {profileData.ageGroups.map((group, idx) => (
                            <SpecializationBadge
                                key={idx}
                                label={group}
                                color="blue"
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Languages Spoken
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {profileData.languages.map((lang, idx) => (
                            <SpecializationBadge
                                key={idx}
                                label={lang}
                                color="green"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </ProfileSection>
    </div>
);

// Practice Info Tab
const PracticeInfoTab = ({ profileData, isEditing, onChange }) => (
    <div className="space-y-8">
        {/* Practice Details */}
        <ProfileSection title="Practice Information" icon={Building2}>
            <div className="grid sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                    <ProfileInput
                        label="Practice Name"
                        name="practiceName"
                        value={profileData.practiceName}
                        isEditing={isEditing}
                        onChange={onChange}
                        icon={Building2}
                    />
                </div>
                <div className="sm:col-span-2">
                    <ProfileInput
                        label="Practice Address"
                        name="practiceAddress"
                        value={profileData.practiceAddress}
                        isEditing={isEditing}
                        onChange={onChange}
                        icon={MapPin}
                    />
                </div>
                <ProfileInput
                    label="City"
                    name="practiceCity"
                    value={profileData.practiceCity}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={MapPin}
                />
                <ProfileInput
                    label="State"
                    name="practiceState"
                    value={profileData.practiceState}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={MapPin}
                />
                <ProfileInput
                    label="Practice Phone"
                    name="practicePhone"
                    type="tel"
                    value={profileData.practicePhone}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Phone}
                />
                <ProfileInput
                    label="Practice Email"
                    name="practiceEmail"
                    type="email"
                    value={profileData.practiceEmail}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Mail}
                />
                <ProfileInput
                    label="Practice Website"
                    name="practiceWebsite"
                    value={profileData.practiceWebsite}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Globe}
                />
            </div>
        </ProfileSection>

        {/* Consultation Modes */}
        <ProfileSection title="Consultation Modes" icon={Video}>
            <div className="grid sm:grid-cols-3 gap-4">
                {["In-Person", "Video Call", "Phone Call"].map((mode) => (
                    <ConsultationModeCard
                        key={mode}
                        mode={mode}
                        isActive={profileData.consultationModes.includes(mode)}
                        isEditing={isEditing}
                    />
                ))}
            </div>
        </ProfileSection>

        {/* Pricing */}
        <ProfileSection title="Pricing & Fees" icon={DollarSign}>
            <div className="grid sm:grid-cols-2 gap-6">
                <ProfileInput
                    label="Session Duration"
                    name="sessionDuration"
                    value={profileData.sessionDuration}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Clock}
                />
                <div className="flex gap-4">
                    <div className="flex-1">
                        <ProfileInput
                            label="Consultation Fee"
                            name="consultationFee"
                            value={profileData.consultationFee}
                            isEditing={isEditing}
                            onChange={onChange}
                            icon={DollarSign}
                        />
                    </div>
                    <div className="w-32">
                        <ProfileSelect
                            label="Currency"
                            name="currency"
                            value={profileData.currency}
                            options={["USD", "EUR", "GBP", "INR", "CAD"]}
                            isEditing={isEditing}
                            onChange={onChange}
                        />
                    </div>
                </div>
            </div>

            {/* Additional Pricing Options */}
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                Sliding Scale Fees
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Offer flexible pricing based on income
                            </p>
                        </div>
                        <ToggleSwitch
                            checked={profileData.offersSlidingScale}
                            disabled={!isEditing}
                        />
                    </div>
                    {profileData.offersSlidingScale && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Range: {profileData.slidingScaleRange}
                            </span>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                Free Initial Consultation
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Offer a brief free consultation
                            </p>
                        </div>
                        <ToggleSwitch
                            checked={profileData.offersFreeConsultation}
                            disabled={!isEditing}
                        />
                    </div>
                    {profileData.offersFreeConsultation && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Duration: {profileData.freeConsultationDuration}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </ProfileSection>

        {/* Insurance */}
        <ProfileSection title="Insurance" icon={Shield}>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                            Accept Insurance
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Accept payments from insurance providers
                        </p>
                    </div>
                    <ToggleSwitch
                        checked={profileData.acceptsInsurance}
                        disabled={!isEditing}
                    />
                </div>

                {profileData.acceptsInsurance && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Accepted Insurance Providers
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {profileData.insuranceProviders.map(
                                (provider, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium"
                                    >
                                        {provider}
                                    </span>
                                )
                            )}
                            {isEditing && (
                                <button className="px-3 py-1.5 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 rounded-full text-sm hover:border-green-500 hover:text-green-500 transition-colors">
                                    + Add Provider
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </ProfileSection>
    </div>
);

// Availability Tab
const AvailabilityTab = ({ profileData, isEditing, onChange }) => {
    const days = [
        { key: "monday", label: "Monday" },
        { key: "tuesday", label: "Tuesday" },
        { key: "wednesday", label: "Wednesday" },
        { key: "thursday", label: "Thursday" },
        { key: "friday", label: "Friday" },
        { key: "saturday", label: "Saturday" },
        { key: "sunday", label: "Sunday" },
    ];

    return (
        <div className="space-y-8">
            {/* Timezone */}
            <ProfileSection title="Timezone Settings" icon={Globe}>
                <div className="max-w-md">
                    <ProfileSelect
                        label="Your Timezone"
                        name="timezone"
                        value={profileData.timezone}
                        options={[
                            "America/New_York",
                            "America/Chicago",
                            "America/Denver",
                            "America/Los_Angeles",
                            "Europe/London",
                            "Europe/Paris",
                            "Asia/Tokyo",
                            "Asia/Kolkata",
                            "Australia/Sydney",
                        ]}
                        isEditing={isEditing}
                        onChange={onChange}
                        icon={Globe}
                    />
                </div>
            </ProfileSection>

            {/* Weekly Schedule */}
            <ProfileSection title="Weekly Availability" icon={Calendar}>
                <div className="space-y-4">
                    {days.map((day) => (
                        <AvailabilityRow
                            key={day.key}
                            day={day}
                            availability={profileData.availability[day.key]}
                            isEditing={isEditing}
                            onChange={onChange}
                        />
                    ))}
                </div>
            </ProfileSection>

            {/* Quick Stats */}
            <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-200 dark:border-violet-800">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                        <Clock className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                        <p className="font-medium text-violet-900 dark:text-violet-100">
                            Weekly Availability Summary
                        </p>
                        <p className="text-sm text-violet-600 dark:text-violet-400">
                            {
                                Object.values(profileData.availability).filter(
                                    (a) => a.enabled
                                ).length
                            }{" "}
                            days available • Approximately 40 hours per week
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Documents Tab
const DocumentsTab = ({ documents }) => (
    <div className="space-y-6">
        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:border-violet-500 dark:hover:border-violet-500 transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Upload Documents
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Upload your licenses, certifications, and other professional
                documents
            </p>
            <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
            </Button>
            <p className="text-xs text-gray-400 mt-3">
                Supports: PDF, JPG, PNG up to 10MB
            </p>
        </div>

        {/* Documents List */}
        <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
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

// Security Tab
const SecurityTab = ({ showPassword, setShowPassword }) => (
    <div className="space-y-8">
        {/* Password Section */}
        <ProfileSection title="Password" icon={Lock}>
            <div className="space-y-4 max-w-md">
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter current password"
                            className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 outline-none"
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
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 outline-none"
                    />
                </div>
                <Button className="bg-violet-600 hover:bg-violet-700">
                    Update Password
                </Button>
            </div>
        </ProfileSection>

        {/* Two-Factor Authentication */}
        <ProfileSection title="Two-Factor Authentication" icon={Shield}>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                        <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                            Two-Factor Authentication
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Add an extra layer of security to your account
                        </p>
                    </div>
                </div>
                <Button variant="outline">Enable</Button>
            </div>
        </ProfileSection>

        {/* Active Sessions */}
        <ProfileSection title="Active Sessions" icon={Clock}>
            <div className="space-y-3">
                <SessionItem
                    device="Chrome on MacOS"
                    location="New York, NY"
                    lastActive="Active now"
                    isCurrent={true}
                />
                <SessionItem
                    device="Safari on iPhone"
                    location="New York, NY"
                    lastActive="2 hours ago"
                    isCurrent={false}
                />
                <SessionItem
                    device="Firefox on Windows"
                    location="Brooklyn, NY"
                    lastActive="1 day ago"
                    isCurrent={false}
                />
            </div>
        </ProfileSection>
    </div>
);

// Preferences Tab
const PreferencesTab = ({ profileData, isEditing, onChange }) => (
    <div className="space-y-8">
        {/* Language & Region */}
        <ProfileSection title="Language & Region" icon={Globe}>
            <div className="grid sm:grid-cols-2 gap-6">
                <ProfileSelect
                    label="Language"
                    name="language"
                    value={profileData.language}
                    options={[
                        "English",
                        "Hindi",
                        "Spanish",
                        "French",
                        "German",
                        "Mandarin",
                    ]}
                    isEditing={true}
                    onChange={onChange}
                    icon={Globe}
                />
                <ProfileSelect
                    label="Timezone"
                    name="timezone"
                    value={profileData.timezone}
                    options={[
                        "America/New_York",
                        "America/Los_Angeles",
                        "Europe/London",
                        "Asia/Kolkata",
                    ]}
                    isEditing={true}
                    onChange={onChange}
                    icon={Clock}
                />
            </div>
        </ProfileSection>

        {/* Notification Settings */}
        <ProfileSection title="Notification Preferences" icon={Bell}>
            <div className="space-y-4">
                <NotificationToggle
                    label="Email Notifications"
                    description="Receive updates via email"
                    name="notifications.email"
                    checked={profileData.notifications.email}
                    onChange={onChange}
                />
                <NotificationToggle
                    label="SMS Notifications"
                    description="Receive updates via text message"
                    name="notifications.sms"
                    checked={profileData.notifications.sms}
                    onChange={onChange}
                />
                <NotificationToggle
                    label="Push Notifications"
                    description="Receive push notifications on your device"
                    name="notifications.push"
                    checked={profileData.notifications.push}
                    onChange={onChange}
                />
                <NotificationToggle
                    label="Appointment Notifications"
                    description="Get notified about new and upcoming appointments"
                    name="notifications.appointments"
                    checked={profileData.notifications.appointments}
                    onChange={onChange}
                />
                <NotificationToggle
                    label="Appointment Reminders"
                    description="Receive reminders before scheduled sessions"
                    name="notifications.reminders"
                    checked={profileData.notifications.reminders}
                    onChange={onChange}
                />
                <NotificationToggle
                    label="Patient Messages"
                    description="Get notified when patients send you messages"
                    name="notifications.patientMessages"
                    checked={profileData.notifications.patientMessages}
                    onChange={onChange}
                />
                <NotificationToggle
                    label="Reviews & Feedback"
                    description="Get notified when patients leave reviews"
                    name="notifications.reviews"
                    checked={profileData.notifications.reviews}
                    onChange={onChange}
                />
                <NotificationToggle
                    label="Marketing & Updates"
                    description="Receive platform updates and promotional content"
                    name="notifications.marketing"
                    checked={profileData.notifications.marketing}
                    onChange={onChange}
                />
            </div>
        </ProfileSection>
    </div>
);

// ============================================
// REUSABLE COMPONENTS
// ============================================

// Stat Card
const StatCard = ({ icon: Icon, value, label, color, suffix = "" }) => {
    const colorClasses = {
        violet: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
        purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
        amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
        green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    };

    return (
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {value}
                        {suffix}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {label}
                    </p>
                </div>
            </div>
        </div>
    );
};

// Profile Section
const ProfileSection = ({
    title,
    icon: Icon,
    children,
    variant = "default",
}) => {
    const variantClasses = {
        default:
            "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
        success:
            "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
        warning:
            "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    };

    return (
        <div>
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${variantClasses[variant]}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                </h3>
            </div>
            {children}
        </div>
    );
};

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
                    className={`w-full py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 outline-none text-gray-900 dark:text-gray-100 ${
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
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                )}
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`w-full py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 outline-none text-gray-900 dark:text-gray-100 appearance-none ${
                        Icon ? "pl-12 pr-4" : "px-4"
                    }`}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90" />
            </div>
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
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 outline-none text-gray-900 dark:text-gray-100 resize-none"
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

// Specialization Badge
const SpecializationBadge = ({ label, color }) => {
    const colorClasses = {
        violet: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400",
        purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
        blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
        green: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    };

    return (
        <span
            className={`px-3 py-1.5 ${colorClasses[color]} rounded-full text-sm font-medium`}
        >
            {label}
        </span>
    );
};

// Consultation Mode Card
const ConsultationModeCard = ({ mode, isActive, isEditing }) => {
    const icons = {
        "In-Person": Building2,
        "Video Call": Video,
        "Phone Call": Phone,
    };
    const Icon = icons[mode];

    return (
        <div
            className={`p-4 rounded-xl border-2 transition-colors ${
                isActive
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
            } ${isEditing ? "cursor-pointer hover:border-violet-400" : ""}`}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`p-2 rounded-lg ${
                        isActive
                            ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    }`}
                >
                    <Icon className="w-5 h-5" />
                </div>
                <span
                    className={`font-medium ${
                        isActive
                            ? "text-violet-900 dark:text-violet-100"
                            : "text-gray-600 dark:text-gray-400"
                    }`}
                >
                    {mode}
                </span>
                {isActive && (
                    <CheckCircle className="w-5 h-5 text-violet-600 ml-auto" />
                )}
            </div>
        </div>
    );
};

// Toggle Switch
const ToggleSwitch = ({ checked, disabled }) => (
    <div
        className={`w-11 h-6 rounded-full transition-colors ${
            checked ? "bg-violet-600" : "bg-gray-300 dark:bg-gray-600"
        } ${disabled ? "opacity-60" : "cursor-pointer"}`}
    >
        <div
            className={`w-5 h-5 bg-white rounded-full shadow transition-transform mt-0.5 ${
                checked ? "translate-x-5 ml-0.5" : "translate-x-0.5"
            }`}
        />
    </div>
);

// Availability Row
const AvailabilityRow = ({ day, availability, isEditing, onChange }) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <div className="flex items-center gap-3 sm:w-32">
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    name={`availability.${day.key}.enabled`}
                    checked={availability.enabled}
                    onChange={onChange}
                    disabled={!isEditing}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
            </label>
            <span
                className={`font-medium ${
                    availability.enabled
                        ? "text-gray-900 dark:text-gray-100"
                        : "text-gray-400 dark:text-gray-500"
                }`}
            >
                {day.label}
            </span>
        </div>

        {availability.enabled && (
            <div className="flex items-center gap-2 flex-1">
                <input
                    type="time"
                    name={`availability.${day.key}.start`}
                    value={availability.start}
                    onChange={onChange}
                    disabled={!isEditing}
                    className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 disabled:opacity-60"
                />
                <span className="text-gray-500">to</span>
                <input
                    type="time"
                    name={`availability.${day.key}.end`}
                    value={availability.end}
                    onChange={onChange}
                    disabled={!isEditing}
                    className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 disabled:opacity-60"
                />
            </div>
        )}

        {!availability.enabled && (
            <span className="text-gray-400 dark:text-gray-500 text-sm">
                Unavailable
            </span>
        )}
    </div>
);

// Document Card
const DocumentCard = ({ name, date, type, size, status }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
                <FileText className="w-6 h-6 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                        {name}
                    </p>
                    {status === "verified" && (
                        <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium rounded-full flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                        </span>
                    )}
                    {status === "pending" && (
                        <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-medium rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Pending
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{type}</span>
                    <span>•</span>
                    <span>{size}</span>
                    <span>•</span>
                    <span>{date}</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
                <Download className="w-4 h-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600"
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    </div>
);

// Session Item
const SessionItem = ({ device, location, lastActive, isCurrent }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-xl">
                <Globe className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                        {device}
                    </p>
                    {isCurrent && (
                        <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium rounded-full">
                            Current
                        </span>
                    )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {location} • {lastActive}
                </p>
            </div>
        </div>
        {!isCurrent && (
            <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600"
            >
                Revoke
            </Button>
        )}
    </div>
);

// Notification Toggle
const NotificationToggle = ({
    label,
    description,
    name,
    checked,
    onChange,
}) => (
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
            <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
        </label>
    </div>
);

export default TherapistProfile;
