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

export default function SelectRole() {
    const [selectedRole, setSelectedRole] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const roles = [
        {
            id: "patient",
            title: "Patient",
            subtitle: "Seeking Care",
            description:
                "Access therapy sessions, consultations, and personalized wellness support",
            icon: UserCircle,
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-50 dark:bg-blue-950/30",
            borderColor: "border-blue-200 dark:border-blue-800",
            features: [
                "Book appointments",
                "Track progress",
                "Secure messaging",
            ],
        },
        {
            id: "doctor",
            title: "Doctor",
            subtitle: "Medical Professional",
            description:
                "Provide expert diagnosis, treatment plans, and patient care management",
            icon: Stethoscope,
            color: "from-emerald-500 to-teal-500",
            bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
            borderColor: "border-emerald-200 dark:border-emerald-800",
            features: [
                "Manage patients",
                "Prescribe treatments",
                "Video consultations",
            ],
        },
        {
            id: "therapist",
            title: "Therapist",
            subtitle: "Wellness Expert",
            description:
                "Offer therapeutic support, counseling, and mental wellness guidance",
            icon: Heart,
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-50 dark:bg-purple-950/30",
            borderColor: "border-purple-200 dark:border-purple-800",
            features: [
                "Conduct sessions",
                "Treatment plans",
                "Client insights",
            ],
        },
    ];

    const handleRoleSelect = (roleId) => {
        setSelectedRole(roleId);
    };

    const handleContinue = () => {
        if (!selectedRole) return;

        setIsAnimating(true);

        // Simulate navigation after animation
        setTimeout(() => {
            console.log(`Navigating to ${selectedRole} dashboard`);
            // navigate(`/${selectedRole}/dashboard`);
        }, 600);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 p-4 sm:p-6 lg:p-8">
            <div
                className={`w-full max-w-6xl transition-all duration-500 ${
                    isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"
                }`}
            >
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                        Welcome! Choose Your Role
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                        Select how you'll be using our platform to get started
                        with a personalized experience
                    </p>
                </div>

                {/* Role Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
                    {roles.map((role) => {
                        const Icon = role.icon;
                        const isSelected = selectedRole === role.id;

                        return (
                            <Card
                                key={role.id}
                                onClick={() => handleRoleSelect(role.id)}
                                className={`
                  relative p-6 sm:p-8 cursor-pointer transition-all duration-300 overflow-hidden
                  ${
                      isSelected
                          ? `${role.bgColor} ${role.borderColor} border-2 shadow-2xl scale-105 ring-4 ring-opacity-50`
                          : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-102"
                  }
                `}
                            >
                                {/* Selection Indicator */}
                                {isSelected && (
                                    <div className="absolute top-4 right-4">
                                        <CheckCircle className="w-7 h-7 text-green-600 dark:text-green-400 fill-current" />
                                    </div>
                                )}

                                {/* Icon with Gradient */}
                                <div
                                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${
                                        role.color
                                    } p-4 sm:p-5 mb-4 sm:mb-6 mx-auto transition-transform ${
                                        isSelected ? "scale-110" : ""
                                    }`}
                                >
                                    <Icon
                                        className="w-full h-full text-white"
                                        strokeWidth={1.5}
                                    />
                                </div>

                                {/* Content */}
                                <div className="text-center space-y-3 sm:space-y-4">
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                            {role.title}
                                        </h2>
                                        <p
                                            className={`text-xs sm:text-sm font-medium bg-gradient-to-r ${role.color} bg-clip-text text-transparent`}
                                        >
                                            {role.subtitle}
                                        </p>
                                    </div>

                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed min-h-[3rem] sm:min-h-[4rem]">
                                        {role.description}
                                    </p>

                                    {/* Features */}
                                    <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <ul className="space-y-2 text-xs sm:text-sm text-left">
                                            {role.features.map(
                                                (feature, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-center text-gray-700 dark:text-gray-300"
                                                    >
                                                        <div
                                                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${role.color} mr-2`}
                                                        />
                                                        {feature}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                {/* Hover Effect Overlay */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 hover:opacity-5 transition-opacity pointer-events-none`}
                                />
                            </Card>
                        );
                    })}
                </div>

                {/* Continue Button */}
                <div className="flex justify-center">
                    <Button
                        onClick={handleContinue}
                        disabled={!selectedRole}
                        size="lg"
                        className={`
              px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-xl
              transition-all duration-300 shadow-lg
              ${
                  selectedRole
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white hover:shadow-xl hover:scale-105"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              }
            `}
                    >
                        Continue
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>

                {/* Helper Text */}
                {!selectedRole && (
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 animate-pulse">
                        Please select a role to continue
                    </p>
                )}
            </div>
        </div>
    );
}
