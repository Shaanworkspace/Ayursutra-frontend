/* eslint-disable no-unused-vars */
// src/pages/Auth/SelectRole.jsx
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { UserCircle, Stethoscope, Heart, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { warmupSingleService } from "@/utils/warmupSingleService";
import { toast } from "sonner";

export default function SelectRole() {
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const baseApi = import.meta.env.VITE_API_GATEWAY_BASE_URL;

    const handleRoleClick = async (selectedRole) => {
        setRole(selectedRole);

        toast.info(`Selected ${selectedRole}. Preparing signup...`);

        setTimeout(async () => {
            let serviceUrl;
            let label;

            if (selectedRole === "PATIENT") {
                serviceUrl = `${baseApi}/api/patients/health`;
                label = "Patient";
            } else if (selectedRole === "DOCTOR") {
                serviceUrl = `${baseApi}/api/doctors/health`;
                label = "Doctor";
            } else if (selectedRole === "THERAPIST") {
                serviceUrl = `${baseApi}/api/therapists/health`;
                label = "Therapist";
            }

            try {
                await warmupSingleService({ url: serviceUrl, label });
                navigate(`/signup?role=${selectedRole}`);
            } catch {
                toast.info(
                    "Some issue from Render (free-tier). Please visit Github"
                );
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-6">
            <div className="w-full max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-3">
                        Choose Your Role
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Select how you'll be using the platform
                    </p>
                </div>

                {/* Role Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Patient */}
                    <Card
                        onClick={() => handleRoleClick("PATIENT")}
                        className="cursor-pointer relative p-8 bg-gray-900 border border-gray-800 rounded-xl
                        hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 transition"
                    >
                        {role === "PATIENT" && (
                            <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-cyan-400" />
                        )}
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 p-5 mb-6 mx-auto">
                            <UserCircle className="w-full h-full text-white" />
                        </div>
                        <div className="text-center space-y-3">
                            <h2 className="text-2xl font-bold text-white">
                                Patient
                            </h2>
                            <p className="text-gray-400 text-sm">
                                Seek care and consultations
                            </p>
                        </div>
                    </Card>

                    {/* Doctor */}
                    <Card
                        onClick={() => handleRoleClick("DOCTOR")}
                        className="cursor-pointer relative p-8 bg-gray-900 border border-gray-800 rounded-xl
                        hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 transition"
                    >
                        {role === "DOCTOR" && (
                            <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-emerald-400" />
                        )}
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 p-5 mb-6 mx-auto">
                            <Stethoscope className="w-full h-full text-white" />
                        </div>
                        <div className="text-center space-y-3">
                            <h2 className="text-2xl font-bold text-white">
                                Doctor
                            </h2>
                            <p className="text-gray-400 text-sm">
                                Manage patients & treatments
                            </p>
                        </div>
                    </Card>

                    {/* Therapist */}
                    <Card
                        onClick={() => handleRoleClick("THERAPIST")}
                        className="cursor-pointer relative p-8 bg-gray-900 border border-gray-800 rounded-xl
                        hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/20 transition"
                    >
                        {role === "THERAPIST" && (
                            <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-pink-400" />
                        )}
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 p-5 mb-6 mx-auto">
                            <Heart className="w-full h-full text-white" />
                        </div>
                        <div className="text-center space-y-3">
                            <h2 className="text-2xl font-bold text-white">
                                Therapist
                            </h2>
                            <p className="text-gray-400 text-sm">
                                Provide mental wellness support
                            </p>
                        </div>
                    </Card>
                </div>

                <p className="text-center text-sm text-gray-500 mt-8">
                    Click a role to continue
                </p>
            </div>
        </div>
    );
}
