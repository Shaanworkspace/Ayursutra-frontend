/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { User, Calendar, Brain, FileText, Eye } from "lucide-react";
import TherapistNavbar from "../components/TherapistNavbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TherapistClientProfile() {
    const { patientId } = useParams();
    const profile = useSelector((state) => state.profile.data);

    const records = Array.isArray(profile?.medicalRecords)
        ? profile.medicalRecords
        : [];

    // Filter records for this patient
    const patientRecords = useMemo(
        () => records.filter((r) => r.patientId === patientId),
        [records, patientId],
    );

    if (patientRecords.length === 0) {
        return (
            <>
                <TherapistNavbar />
                <div className="min-h-screen bg-gray-950 text-gray-400 flex items-center justify-center">
                    Patient not found
                </div>
            </>
        );
    }

    const patient = patientRecords[0];

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    const activeTherapies = patientRecords
        .flatMap((r) => r.therapies || [])
        .filter(Boolean);

    return (
        <>
            <TherapistNavbar />

            <div className="min-h-screen bg-gray-950 text-gray-100 p-6 pt-28">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <header>
                        <h1 className="text-3xl font-bold">Client Profile</h1>
                        <p className="text-gray-400 mt-1">
                            Overview of therapy history and sessions
                        </p>
                    </header>

                    {/* Patient Info */}
                    <Card className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <div className="grid md:grid-cols-3 gap-4">
                            <InfoCard
                                icon={User}
                                label="Patient Name"
                                value={patient.patientName || "Patient"}
                            />
                            <InfoCard
                                icon={Calendar}
                                label="First Session"
                                value={formatDate(
                                    patientRecords.at(-1)?.createdDate,
                                )}
                            />
                            <InfoCard
                                icon={Brain}
                                label="Total Sessions"
                                value={patientRecords.length}
                            />
                        </div>
                    </Card>

                    {/* Active Therapies */}
                    <Card className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold mb-3">
                            Active Therapies
                        </h2>

                        {activeTherapies.length === 0 ? (
                            <p className="text-gray-400 text-sm">
                                No active therapies assigned
                            </p>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {Array.from(new Set(activeTherapies)).map(
                                    (t) => (
                                        <span
                                            key={t}
                                            className="px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30"
                                        >
                                            {t.replaceAll("_", " ")}
                                        </span>
                                    ),
                                )}
                            </div>
                        )}
                    </Card>

                    {/* Session History */}
                    <Card className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-gray-800">
                            <h2 className="text-xl font-semibold">
                                Session History
                            </h2>
                        </div>

                        <div className="divide-y divide-gray-800">
                            {patientRecords.map((r) => (
                                <div
                                    key={r.medicalRecordId}
                                    className="p-4 flex items-center justify-between hover:bg-gray-800/50"
                                >
                                    <div>
                                        <p className="font-medium">
                                            Therapy Session
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {formatDate(
                                                r.visitDate || r.createdDate,
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link
                                            to={`/therapist/sessions/${r.medicalRecordId}`}
                                            className="text-sm px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md flex items-center gap-1"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View
                                        </Link>

                                        <Link
                                            to={`/therapist/sessions/${r.medicalRecordId}/notes`}
                                            className="text-sm px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-md flex items-center gap-1"
                                        >
                                            <FileText className="w-4 h-4" />
                                            Notes
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Quick Action */}
                    <div className="flex justify-end">
                        <Button className="bg-purple-600 hover:bg-purple-700">
                            Start New Session
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

/* ---------- Small Components ---------- */

const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-4 bg-gray-950/60 border border-gray-800 rounded-xl p-4">
        <div className="p-3 bg-purple-500/10 rounded-xl">
            <Icon className="w-5 h-5 text-purple-400" />
        </div>
        <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
                {label}
            </p>
            <p className="font-medium text-white mt-0.5">{value}</p>
        </div>
    </div>
);
