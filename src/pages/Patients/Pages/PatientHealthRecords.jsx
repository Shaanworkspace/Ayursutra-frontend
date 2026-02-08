/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { FileText, Stethoscope, Brain, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { PatientLayout } from "../components/PatientLayout";

export default function PatientHealthRecords() {
    const profile = useSelector((state) => state.profile.data);

    const records = Array.isArray(profile?.medicalRecords)
        ? profile.medicalRecords
        : [];

    const sortedRecords = [...records].sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate),
    );

    return (
        <PatientLayout>
            <div className="min-h-screen bg-gray-950 text-gray-100 p-6 pt-28">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* HEADER */}
                    <div>
                        <h1 className="text-3xl font-bold">Health Records</h1>
                        <p className="text-gray-400 mt-1">
                            Your complete medical history
                        </p>
                    </div>

                    {/* RECORD LIST */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                        {sortedRecords.length === 0 && (
                            <p className="p-6 text-sm text-gray-400">
                                No medical records found
                            </p>
                        )}

                        {sortedRecords.map((record) => (
                            <RecordRow
                                key={record.medicalRecordId}
                                record={record}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </PatientLayout>
    );
}

/* ================= ROW ================= */

const RecordRow = ({ record }) => {
    const date = record.createdDate
        ? new Date(record.createdDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "N/A";

    const isTherapy = record.needTherapy === true;

    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-800 hover:bg-gray-800/60 transition">
            <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-gray-800">
                    {isTherapy ? (
                        <Brain className="w-5 h-5 text-purple-400" />
                    ) : (
                        <Stethoscope className="w-5 h-5 text-cyan-400" />
                    )}
                </div>

                <div>
                    <p className="font-medium">
                        {isTherapy ? "Therapy Session" : "Doctor Consultation"}
                    </p>

                    <p className="text-sm text-gray-400">
                        Symptoms: {record.symptoms || "Not specified"}
                    </p>

                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {date}
                    </p>
                </div>
            </div>

            <Link
                to={`/patient/medical-records/${record.medicalRecordId}`}
                className="text-sm px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg"
            >
                View
            </Link>
        </div>
    );
};
