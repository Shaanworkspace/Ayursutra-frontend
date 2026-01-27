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
    Droplets,
    Weight,
    Ruler,
    Pill,
    Stethoscope,
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
    HelpCircle,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PatientLayout } from "../components/PatientLayout";

export const PatientProfile = () => {
    const user = useSelector((state) => state.auth.userResponse);
    const fileInputRef = useRef(null);
    const profile = useSelector((state) => state.profile.data);
    console.log("Profile : ", profile);
    console.log("user : ", user);

    // State management
    const [activeTab, setActiveTab] = useState("personal");
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [saveStatus, setSaveStatus] = useState(null);

    const [profileData, setProfileData] = useState({
        patientId: profile?.userId || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: profile?.phoneNumber || "",
        dateOfBirth: profile?.dateOfBirth || "",
        gender: profile?.gender || "",
        address: profile?.address || "",
        bloodGroup: profile?.bloodGroup || "",
        height: profile?.height || "",
        weight: profile?.weight || "",
        emergencyName: profile?.emergencyName || "",
        emergencyRelation: profile?.emergencyRelation || "",
        emergencyPhone: profile?.emergencyPhone || "",
        notifications: {
            email: true,
            sms: true,
            push: true,
            appointments: true,
            reports: true,
            wellness: false,
        },
    });

    // Calculate profile completion
    const calculateCompletion = () => {
        const fields = [
            profileData.firstName,
            profileData.lastName,
            profileData.email,
            profileData.phone,
            profileData.dateOfBirth,
            profileData.gender,
            profileData.address,
            profileData.bloodGroup,
            profileData.emergencyName,
            profileData.emergencyPhone,
        ];
        const filled = fields.filter((f) => f && f.trim() !== "").length;
        return Math.round((filled / fields.length) * 100);
    };

    const profileCompletion = calculateCompletion();

    // Tabs configuration
    const tabs = [
        { id: "personal", label: "Personal Info", icon: User },
        { id: "medical", label: "Medical Info", icon: Heart },
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
            // Simulate API call
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
        // Reset to original data if needed
    };

    // Documents data
    const documents = [
        {
            name: "Blood Test Report",
            date: "Dec 10, 2024",
            type: "Lab Report",
            size: "2.4 MB",
        },
        {
            name: "Prescription - Dr. Sharma",
            date: "Dec 5, 2024",
            type: "Prescription",
            size: "156 KB",
        },
        {
            name: "Insurance Card",
            date: "Nov 28, 2024",
            type: "Insurance",
            size: "1.1 MB",
        },
        {
            name: "Allergy Test Results",
            date: "Nov 15, 2024",
            type: "Lab Report",
            size: "890 KB",
        },
    ];

    return (
        <PatientLayout>
            <div className="p-6 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-6  mt-20">
                    {/* ==================== HEADER ==================== */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                My Profile
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Manage your personal information and preferences
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
                        <div className="h-32 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 relative">
                            <div className="absolute inset-0 bg-black/10" />
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>

                        {/* Profile Info Section */}
                        <div className="px-6 pb-6">
                            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 relative z-10">
                                {/* Avatar */}
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-2xl border-4 border-white dark:border-gray-900 shadow-xl overflow-hidden bg-gradient-to-br from-cyan-400 to-teal-500">
                                        {avatarPreview ? (
                                            <img
                                                src={avatarPreview}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                                                {profileData.firstName?.[0] ||
                                                    ""}
                                                {profileData.lastName?.[0] ||
                                                    ""}
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
                                            <div className="flex items-center gap-2 mb-3">
                                                <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                                                    {profileData.firstName}{" "}
                                                    {profileData.lastName}
                                                </h2>
                                                <BadgeCheck className="w-6 h-6 text-cyan-500" />
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                                Patient ID:{" "}
                                                {profileData.patientId}
                                            </p>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <Mail className="w-4 h-4" />
                                                    {profileData.email}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Phone className="w-4 h-4" />
                                                    {profileData.phone}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-2">
                                            {isEditing ? (
                                                <>
                                                    <Button
                                                        onClick={handleSave}
                                                        className="bg-cyan-600 hover:bg-cyan-700"
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

                            {/* Profile Completion */}
                            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-cyan-500" />
                                        <span className="font-medium text-gray-900 dark:text-gray-100">
                                            Profile Completion
                                        </span>
                                    </div>
                                    <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                                        {profileCompletion}%
                                    </span>
                                </div>
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${profileCompletion}%`,
                                        }}
                                    />
                                </div>
                                {profileCompletion < 100 && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        Complete your profile to get
                                        personalized health recommendations
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
                                                ? "border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-cyan-50/50 dark:bg-cyan-900/20"
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
                            {/* Personal Info Tab */}
                            {activeTab === "personal" && (
                                <PersonalInfoTab
                                    profileData={profileData}
                                    isEditing={isEditing}
                                    onChange={handleInputChange}
                                />
                            )}

                            {/* Medical Info Tab */}
                            {activeTab === "medical" && (
                                <MedicalInfoTab
                                    profileData={profileData}
                                    isEditing={isEditing}
                                    onChange={handleInputChange}
                                />
                            )}

                            {/* Documents Tab */}
                            {activeTab === "documents" && (
                                <DocumentsTab documents={documents} />
                            )}

                            {/* Security Tab */}
                            {activeTab === "security" && (
                                <SecurityTab
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                />
                            )}

                            {/* Preferences Tab */}
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
        </PatientLayout>
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
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Calendar}
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

        {/* Address Information */}
        <ProfileSection title="Address Information" icon={MapPin}>
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

        {/* Emergency Contact */}
        <ProfileSection
            title="Emergency Contact"
            icon={Phone}
            variant="warning"
        >
            <div className="grid sm:grid-cols-2 gap-6">
                <ProfileInput
                    label="Contact Name"
                    name="emergencyName"
                    value={profileData.emergencyName}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={User}
                />
                <ProfileInput
                    label="Relationship"
                    name="emergencyRelation"
                    value={profileData.emergencyRelation}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Heart}
                />
                <ProfileInput
                    label="Phone Number"
                    name="emergencyPhone"
                    type="tel"
                    value={profileData.emergencyPhone}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Phone}
                />
            </div>
        </ProfileSection>
    </div>
);

// Medical Info Tab
const MedicalInfoTab = ({ profileData, isEditing, onChange }) => (
    <div className="space-y-8">
        {/* Vital Information */}
        <ProfileSection title="Vital Information" icon={Heart}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <VitalCard
                    label="Blood Group"
                    value={profileData.bloodGroup}
                    icon={Droplets}
                    color="red"
                />
                <VitalCard
                    label="Height"
                    value={profileData.height}
                    icon={Ruler}
                    color="blue"
                />
                <VitalCard
                    label="Weight"
                    value={profileData.weight}
                    icon={Weight}
                    color="green"
                />
                <VitalCard
                    label="BMI"
                    value="22.4"
                    icon={Activity}
                    color="purple"
                    subtext="Normal"
                />
            </div>
        </ProfileSection>

        {/* Medical History */}
        <ProfileSection title="Medical History" icon={Stethoscope}>
            <div className="grid sm:grid-cols-2 gap-6">
                <ProfileTextarea
                    label="Known Allergies"
                    name="allergies"
                    value={profileData.allergies}
                    isEditing={isEditing}
                    onChange={onChange}
                    placeholder="List any known allergies..."
                />
                <ProfileTextarea
                    label="Chronic Conditions"
                    name="chronicConditions"
                    value={profileData.chronicConditions}
                    isEditing={isEditing}
                    onChange={onChange}
                    placeholder="List any chronic conditions..."
                />
                <ProfileTextarea
                    label="Current Medications"
                    name="currentMedications"
                    value={profileData.currentMedications}
                    isEditing={isEditing}
                    onChange={onChange}
                    placeholder="List current medications..."
                />
                <ProfileTextarea
                    label="Family Medical History"
                    name="familyHistory"
                    value={profileData.familyHistory}
                    isEditing={isEditing}
                    onChange={onChange}
                    placeholder="Relevant family history..."
                />
            </div>
        </ProfileSection>

        {/* Insurance Information */}
        <ProfileSection title="Insurance Information" icon={Shield}>
            <div className="grid sm:grid-cols-2 gap-6">
                <ProfileInput
                    label="Insurance Provider"
                    name="insuranceProvider"
                    value={profileData.insuranceProvider}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={CreditCard}
                />
                <ProfileInput
                    label="Policy Number"
                    name="insuranceNumber"
                    value={profileData.insuranceNumber}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={FileText}
                />
                <ProfileInput
                    label="Primary Physician"
                    name="primaryPhysician"
                    value={profileData.primaryPhysician}
                    isEditing={isEditing}
                    onChange={onChange}
                    icon={Stethoscope}
                />
            </div>
        </ProfileSection>
    </div>
);

// Documents Tab
const DocumentsTab = ({ documents }) => (
    <div className="space-y-6">
        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Upload Documents
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Drag and drop files here, or click to browse
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
                            className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 outline-none"
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
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 outline-none"
                    />
                </div>
                <Button className="bg-cyan-600 hover:bg-cyan-700">
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
                    location="San Francisco, CA"
                    lastActive="Active now"
                    isCurrent={true}
                />
                <SessionItem
                    device="Safari on iPhone"
                    location="San Francisco, CA"
                    lastActive="2 hours ago"
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
                        "America/Los_Angeles",
                        "America/New_York",
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
                    label="Appointment Reminders"
                    description="Get reminded about upcoming appointments"
                    name="notifications.appointments"
                    checked={profileData.notifications.appointments}
                    onChange={onChange}
                />
                <NotificationToggle
                    label="Report Notifications"
                    description="Get notified when new reports are available"
                    name="notifications.reports"
                    checked={profileData.notifications.reports}
                    onChange={onChange}
                />
                <NotificationToggle
                    label="Wellness Tips"
                    description="Receive daily wellness tips and reminders"
                    name="notifications.wellness"
                    checked={profileData.notifications.wellness}
                    onChange={onChange}
                />
            </div>
        </ProfileSection>
    </div>
);

// ============================================
// REUSABLE COMPONENTS
// ============================================

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
                        : "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
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
                    className={`w-full py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 outline-none text-gray-900 dark:text-gray-100 ${
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
                    className={`w-full py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 outline-none text-gray-900 dark:text-gray-100 appearance-none ${
                        Icon ? "pl-12 pr-4" : "px-4"
                    }`}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
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
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 outline-none text-gray-900 dark:text-gray-100 resize-none"
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

// Vital Card
const VitalCard = ({ label, value, icon: Icon, color, subtext }) => {
    const colorClasses = {
        red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
        blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
        green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
        purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    };

    return (
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
            <div
                className={`inline-flex p-3 rounded-xl ${colorClasses[color]} mb-3`}
            >
                <Icon className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {value}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            {subtext && (
                <p
                    className={`text-xs mt-1 ${
                        colorClasses[color].split(" ")[2]
                    }`}
                >
                    {subtext}
                </p>
            )}
        </div>
    );
};

// Document Card
const DocumentCard = ({ name, date, type, size }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                    {name}
                </p>
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
            <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 dark:peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
        </label>
    </div>
);

export default PatientProfile;
