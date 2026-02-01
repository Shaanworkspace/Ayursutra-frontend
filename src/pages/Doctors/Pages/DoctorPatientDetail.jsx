/* eslint-disable no-unused-vars */
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { User, Calendar, FileText, Brain, ArrowLeft } from "lucide-react";
import { DoctorLayout } from "../components/DoctorLayout";

export default function DoctorPatientDetail() {
    const { patientId } = useParams();
    const profile = useSelector((state) => state.profile.data);

    const records = Array.isArray(profile?.medicalRecords)
        ? profile.medicalRecords.filter((r) => r.patientId === patientId)
        : [];

    const patientName = records[0]?.patientName || "Patient";

    return (
        <DoctorLayout>
            <div className="min-h-screen bg-gray-950 text-gray-100 p-6 pt-28">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* BACK */}
                    <Link
                        to="/doctor/patients"
                        className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:underline"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Patients
                    </Link>

                    {/* HEADER */}
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-emerald-500/15 rounded-2xl">
                            <User className="w-6 h-6 text-emerald-400" />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold">
                                {patientName}
                            </h1>
                            <p className="text-gray-400">
                                Complete medical history
                            </p>
                        </div>
                    </div>

                    {/* RECORDS */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl divide-y divide-gray-800">
                        {records.length === 0 && (
                            <p className="p-6 text-sm text-gray-400">
                                No records found
                            </p>
                        )}

                        {records.map((record) => (
                            <RecordRow
                                key={record.medicalRecordId}
                                record={record}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </DoctorLayout>
    );
}

/* ================= ROW ================= */

const RecordRow = ({ record }) => {
    const date = new Date(
        record.visitDate || record.createdDate,
    ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <div className="p-4 hover:bg-gray-800/60 transition flex justify-between items-center">
            <div>
                <p className="font-medium">
                    {record?.therapistId
                        ? "Therapy Assigned"
                        : "Need Review By Doctor"}
                </p>

                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" />
                    {date}
                </p>

                {record.needTherapy && (
                    <span className="mt-2 inline-flex items-center gap-1 text-xs px-2 py-1 bg-purple-500/15 text-purple-400 rounded-full">
                        <Brain className="w-3 h-3" />
                        Therapy involved
                    </span>
                )}
            </div>

            <Link
                to={`/doctor/appointments/${record.medicalRecordId}`}
                className="inline-flex items-center gap-2 text-xs px-3 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg"
            >
                <FileText className="w-4 h-4" />
                View Details
            </Link>
        </div>
    );
};
