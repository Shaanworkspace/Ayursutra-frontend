/* eslint-disable no-irregular-whitespace */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function TherapistCard({ therapist }) {
    return (
        <Card className="bg-white/50 dark:bg-gray-900/40 backdrop-blur-md border border-white/20 dark:border-gray-700/40 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden">
            {/* ───────────── Header ───────────── */}
            <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {therapist.firstName} {therapist.lastName}
                </CardTitle>
                <p className="text-sm text-cyan-600 dark:text-cyan-400">
                    {therapist.qualification || "—"}
                </p>
            </CardHeader>

            {/* ───────────── Content ───────────── */}
            <CardContent className="px-5 pb-6 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                {/* Experience */}
                <p>
                    <strong>Experience:</strong>{" "}
                    {therapist.yearsOfExperience ?? 0} years
                </p>

                {/* Expertise */}
                <p>
                    <strong>Expertise:</strong>{" "}
                    {therapist.expertise || "—"}
                </p>

                {/* Languages */}
                <p>
                    <strong>Languages:</strong>{" "}
                    {therapist.languagesSpoken || "—"}
                </p>

                {/* Location */}
                <p className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-cyan-600" />
                    {therapist.clinicLocation || "Location not added"}
                </p>

                {/* Specializations */}
                {therapist.specializations && therapist.specializations.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-3">
                        {therapist.specializations.map((spec, index) => (
                            <Badge
                                key={index}
                                variant="outline"
                                className="px-3 py-1 border-cyan-600/30 text-cyan-700 dark:text-cyan-300"
                            >
                                {spec.name}
                            </Badge>
                        ))}
                    </div>
                )}

                <div className="border-t border-white/30 my-3"></div>

                {/* Bio */}
                <p className="text-sm italic opacity-90 leading-relaxed text-justify">
                    {therapist.bio
                        ? therapist.bio.length > 140
                            ? `${therapist.bio.slice(0, 140)}…`
                            : therapist.bio
                        : "Bio not available."}
                </p>

                {/* Therapy Plans */}
                {therapist.therapyPlanIds && therapist.therapyPlanIds.length > 0 && (
                    <div className="mt-4">
                        <strong>Therapies Offered:</strong>
                        <ul className="mt-1 list-disc list-inside text-gray-600 dark:text-gray-400 text-[0.9rem]">
                            {therapist.therapyPlanIds.map((plan, idx) => (
                                <li key={idx}>{plan.title || plan.name || plan.id}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Schedule Slots */}
                {therapist.scheduleSlots && therapist.scheduleSlots.length > 0 && (
                    <div className="mt-4">
                        <strong>Available Slots:</strong>
                        <ul className="mt-1 list-disc list-inside text-gray-600 dark:text-gray-400 text-[0.9rem]">
                            {therapist.scheduleSlots.slice(0, 3).map((slot, idx) => (
                                <li key={idx}>
                                    {slot.date
                                        ? `${slot.date} – ${slot.startTime} to ${slot.endTime}`
                                        : "Slot info"}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Contact */}
                <div className="mt-4 flex flex-col gap-2">
                    <a
                        href={`mailto:${therapist.email}`}
                        className="flex items-center justify-center text-cyan-700 dark:text-cyan-300 hover:underline"
                    >
                        <Mail className="h-4 w-4 mr-2" />
                        {therapist.email}
                    </a>
                    <a
                        href={`tel:${therapist.phoneNumber}`}
                        className="flex items-center justify-center text-cyan-700 dark:text-cyan-300 hover:underline"
                    >
                        <Phone className="h-4 w-4 mr-2" />
                        {therapist.phoneNumber}
                    </a>
                </div>

                {/* CTA */}
                <Button
                    asChild
                    className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white shadow-md"
                >
                    <a href={`/therapist/${therapist.id}`}>View Profile</a>
                </Button>
            </CardContent>
        </Card>
    );
}