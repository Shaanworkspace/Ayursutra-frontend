/* eslint-disable no-unused-vars */
// File: doctor/DoctorProfile.jsx
// UI-ONLY VERSION (dark, clean, professional)

import React from "react";
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
} from "lucide-react";
import PatientFooter from "../Home/components/Footer";
import DoctorNavbar from "./components/DoctorNavbar";

export default function DoctorProfile() {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-200 p-6">
            <DoctorNavbar />
            <div className="max-w-6xl mx-auto space-y-6 pt-26">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Doctor Profile
                    </h1>
                    <p className="text-gray-400">
                        View and manage your professional profile
                    </p>
                </div>
                {/* Profile Card */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-teal-600 to-cyan-600" />
                    <div className="p-6 -mt-16 flex flex-col md:flex-row gap-6">
                        {/* Avatar */}
                        <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-4xl font-bold text-white border-4 border-gray-900">
                            DS
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h2 className="text-2xl font-bold text-white">
                                    Dr. Amita Sharma
                                </h2>
                                <span className="px-3 py-1 text-sm rounded-full bg-teal-900/40 text-teal-300">
                                    Ayurvedic Specialist
                                </span>
                            </div>

                            <p className="text-gray-400 mt-1">
                                BAMS, MD (Ayurveda) • 15+ Years Experience
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
                                    4.9 (312 reviews)
                                </span>
                            </div>

                            {/* Contact */}
                            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
                                <span className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    dr.sharma@ayurveda.com
                                </span>
                                <span className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    +1 555 234 5678
                                </span>
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    San Francisco, CA
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard icon={Users} label="Patients" value="1,247" />
                    <StatCard
                        icon={Stethoscope}
                        label="Consultations"
                        value="3,456"
                    />
                    <StatCard
                        icon={Calendar}
                        label="Experience"
                        value="15 yrs"
                    />
                    <StatCard icon={Star} label="Rating" value="4.9" />
                </div>
                {/* Sections */}
                <Section title="Professional Summary">
                    <p className="text-gray-400 leading-relaxed">
                        Experienced Ayurvedic physician specializing in
                        Panchakarma and holistic wellness therapies. Focused on
                        long-term patient health using traditional and modern
                        approaches.
                    </p>
                </Section>
                <Section title="Education & Certification">
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li>• MD (Ayurveda) – Gujarat Ayurved University</li>
                        <li>• BAMS – RGUHS</li>
                        <li>• Certified Panchakarma Specialist</li>
                    </ul>
                </Section>
                <Section title="Practice & Fees">
                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-400">
                        <div>Consultation Fee: $120</div>
                        <div>Follow-up Fee: $80</div>
                        <div>Duration: 45 minutes</div>
                        <div>Telemedicine: Available</div>
                    </div>
                </Section>
                <Section title="Security & Payments">
                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-teal-400" />
                            Two-factor authentication enabled
                        </div>
                        <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-teal-400" />
                            Secure payouts enabled
                        </div>
                    </div>
                </Section>
                <PatientFooter />
            </div>
        </div>
    );
}

/* ---------- UI Helpers ---------- */

const StatCard = ({ icon: Icon, label, value }) => (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
        <div className="p-3 bg-teal-900/40 rounded-lg">
            <Icon className="w-5 h-5 text-teal-400" />
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
