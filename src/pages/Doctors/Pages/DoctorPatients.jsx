/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { User, Search, Calendar, Brain, FileText } from "lucide-react";
import { DoctorLayout } from "../components/DoctorLayout";

export default function DoctorPatients() {
    const profile = useSelector((state) => state.profile.data);
    const records = Array.isArray(profile?.medicalRecords)
        ? profile.medicalRecords
        : [];

    const [search, setSearch] = useState("");

    // ---------- UNIQUE PATIENTS ----------
    const patients = useMemo(() => {
        const map = new Map();

        records.forEach((r) => {
            if (!r.patientId) return;

            if (!map.has(r.patientId)) {
                map.set(r.patientId, {
                    patientId: r.patientId,
                    name: r.patientName || "Patient",
                    lastVisit: r.visitDate || r.createdDate,
                    needTherapy: r.needTherapy === true,
                });
            } else {
                // Update last visit if newer
                const existing = map.get(r.patientId);
                const currentDate = new Date(r.visitDate || r.createdDate);
                const existingDate = new Date(existing.lastVisit);

                if (currentDate > existingDate) {
                    existing.lastVisit = r.visitDate || r.createdDate;
                }
            }
        });

        return Array.from(map.values());
    }, [records]);

    // ---------- SEARCH ----------
    const filteredPatients = patients.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <DoctorLayout>
            <div className="min-h-screen bg-gray-950 text-gray-100 p-6 pt-28">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* HEADER */}
                    <div>
                        <h1 className="text-3xl font-bold">Patients</h1>
                        <p className="text-gray-400 mt-1">
                            Patients you have consulted
                        </p>
                    </div>

                    {/* SEARCH */}
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search patient..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-900/70 backdrop-blur border border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                    </div>

                    {/* PATIENT LIST */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredPatients.length === 0 && (
                            <p className="text-sm text-gray-400">
                                No patients found
                            </p>
                        )}

                        {filteredPatients.map((patient) => (
                            <PatientCard
                                key={patient.patientId}
                                patient={patient}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </DoctorLayout>
    );
}

/* ================= COMPONENT ================= */

const PatientCard = ({ patient }) => {
    const lastVisit = patient.lastVisit
        ? new Date(patient.lastVisit).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "N/A";

    return (
        <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl p-4 hover:border-gray-700 transition">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/15 rounded-xl">
                    <User className="w-5 h-5 text-emerald-400" />
                </div>

                <div>
                    <p className="font-semibold">{patient.name}</p>

                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        Last visit: {lastVisit}
                    </p>
                </div>
            </div>

            {/* TAGS */}
            <div className="mt-3 flex gap-2">
                {patient.needTherapy && (
                    <span className="text-xs px-2 py-1 bg-purple-500/15 text-purple-400 rounded-full flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        Therapy
                    </span>
                )}
            </div>

            {/* ACTION */}
            <div className="mt-4">
                <Link
                    to={`/doctor/patients/${patient.patientId}`}
                    className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg"
                >
                    <FileText className="w-4 h-4" />
                    View Records
                </Link>
            </div>
        </div>
    );
};
