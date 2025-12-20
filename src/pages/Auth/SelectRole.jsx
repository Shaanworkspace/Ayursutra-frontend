/* eslint-disable no-unused-vars */
// src/pages/Auth/SelectRole.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    UserCircle,
    Stethoscope,
    Heart,
    CheckCircle,
    ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router";

export default function SelectRole() {
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleRole = () => {
        console.log(role);
        navigate(`/signup?role=${role}`);
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-6xl">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Welcome! Choose Your Role
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                        Select how you'll be using our platform to get started
                        with a personalized experience
                    </p>
                </div>

                {/* Role Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
                    {/* Patient */}
                    <Card
                        onClick={() => setRole("PATIENT")}
                        className="hover:bg-gray-100 relative p-6 sm:p-8 bg-white border border-gray-200 rounded-xl"
                    >
                        {role == "PATIENT" && (
                            <div className="absolute top-4 right-4">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            </div>
                        )}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-4 sm:p-5 mb-4 sm:mb-6 mx-auto">
                            <UserCircle className="w-full h-full text-white" />
                        </div>
                        <div className="text-center space-y-4">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Patient
                                </h2>
                                <p className="text-sm font-medium text-cyan-600">
                                    Seeking Care
                                </p>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600">
                                Access therapy sessions, consultations, and
                                personalized wellness support
                            </p>
                        </div>
                    </Card>
                    {/* Doctor */}
                    <Card
                        onClick={() => setRole("DOCTOR")}
                        className="hover:bg-gray-100 relative p-6 sm:p-8 bg-white border border-gray-200 rounded-xl"
                    >
                        {role == "DOCTOR" && (
                            <div className="absolute top-4 right-4">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            </div>
                        )}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 p-4 sm:p-5 mb-4 sm:mb-6 mx-auto">
                            <Stethoscope className="w-full h-full text-white" />
                        </div>

                        <div className="text-center space-y-4">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Doctor
                                </h2>
                                <p className="text-sm font-medium text-teal-600">
                                    Medical Professional
                                </p>
                            </div>

                            <p className="text-sm sm:text-base text-gray-600">
                                Provide expert diagnosis, treatment plans, and
                                patient care management
                            </p>
                        </div>
                    </Card>

                    {/* Therapist */}
                    <Card
                        onClick={() => setRole("THERAPIST")}
                        className="relative p-6 sm:p-8 bg-white border border-gray-200 rounded-xl hover:bg-gray-100"
                    >
                        {role == "THERAPIST" && (
                            <div className="absolute top-4 right-4">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            </div>
                        )}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-4 sm:p-5 mb-4 sm:mb-6 mx-auto">
                            <Heart className="w-full h-full text-white" />
                        </div>

                        <div className="text-center space-y-4">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Therapist
                                </h2>
                                <p className="text-sm font-medium text-pink-600">
                                    Wellness Expert
                                </p>
                            </div>

                            <p className="text-sm sm:text-base text-gray-600">
                                Offer therapeutic support, counseling, and
                                mental wellness guidance
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Continue */}
                <div className="flex justify-center">
                    <Button
                        disable={!role}
                        onClick={handleRole}
                        size="lg"
                        className={`px-10 py-6 rounded-xl
                            ${
                                !role
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-gradient-to-r from-blue-600 to-cyan-600"
                            }
                        `}
                    >
                        Continue
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                    {role
                        ? `Selected role: ${role}`
                        : "Please select a role to continue"}
                </p>
            </div>
        </div>
    );
}
