/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Clock, Video, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PatientLayout } from "../components/PatientLayout";

export default function PatientAppointments() {
    const profile = useSelector((state) => state.profile.data);

    const appointments = Array.isArray(profile?.medicalRecords)
        ? profile.medicalRecords
        : [];

    const [filter, setFilter] = useState("upcoming"); // upcoming | past

    const today = new Date();

    const filteredAppointments = useMemo(() => {
        return appointments.filter((r) => {
            if (!r.visitDate) return filter === "upcoming";
            const date = new Date(r.visitDate);
            return filter === "upcoming" ? date >= today : date < today;
        });
    }, [appointments, filter]);

    return (
        <PatientLayout>
            <div className="min-h-screen bg-gray-950 text-gray-100 p-6 pt-28">
                <div className="max-w-5xl mx-auto space-y-6">
                    {/* HEADER */}
                    <div>
                        <h1 className="text-3xl font-bold">Appointments</h1>
                        <p className="text-gray-400 mt-1">
                            View and manage your consultations
                        </p>
                    </div>

                    {/* FILTER */}
                    <div className="flex gap-2">
                        <FilterButton
                            active={filter === "upcoming"}
                            onClick={() => setFilter("upcoming")}
                        >
                            Upcoming
                        </FilterButton>
                        <FilterButton
                            active={filter === "past"}
                            onClick={() => setFilter("past")}
                        >
                            Past
                        </FilterButton>
                    </div>

                    {/* LIST */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl max-h-[500px] overflow-y-auto divide-y divide-gray-800">
                        {filteredAppointments.length === 0 && (
                            <p className="p-6 text-sm text-gray-400">
                                No appointments found
                            </p>
                        )}

                        {filteredAppointments.map((record) => (
                            <AppointmentRow
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

/* ================== COMPONENTS ================== */

const AppointmentRow = ({ record }) => {
    const date = record.visitDate || record.createdDate;

    const time = date
        ? new Date(date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "Not Scheduled";

    const isTherapy = record.needTherapy === true;
    const title = isTherapy ? "Therapy Session" : "Doctor Consultation";

    const mode = "video"; // future backend

    return (
        <div className="flex items-center justify-between p-4 hover:bg-gray-800/60 transition">
            <div>
                <p className="font-medium">{title}</p>

                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {time}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 bg-gray-800 rounded-full flex items-center gap-1">
                    {mode === "video" ? (
                        <>
                            <Video className="w-3 h-3" /> Video
                        </>
                    ) : (
                        <>
                            <MapPin className="w-3 h-3" /> In-person
                        </>
                    )}
                </span>

                <Link
                    to={`/patient/medical-records/${record.medicalRecordId}`}
                    className="text-xs px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded-md"
                >
                    View
                </Link>
            </div>
        </div>
    );
};

const FilterButton = ({ active, children, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-xl text-sm border transition ${
            active
                ? "bg-cyan-600 border-cyan-500 text-white"
                : "bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800"
        }`}
    >
        {children}
    </button>
);
