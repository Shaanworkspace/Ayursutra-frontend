/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    ArrowLeft,
    Calendar,
    User,
    Stethoscope,
    Pill,
    Brain,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import api from "@/lib/axios";

import LoadingScreen from "@/components/common/LoadingScreen";
import { useSelector } from "react-redux";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PatientLayout } from "../components/PatientLayout";
import { toast } from "sonner";
import { Clock, UserX } from "lucide-react";

export default function PatientMedicalRecordDetail() {
    const { id } = useParams();
    const auth = useSelector((state) => state.auth);
    const [record, setRecord] = useState(null);
    const gateway = import.meta.env.VITE_API_GATEWAY_BASE_URL;
    const hasTherapiesAssigned =
        Array.isArray(record?.therapies) && record.therapies.length > 0;
    const shouldSelectTherapist =
        record?.needTherapy && !record?.therapistPlans?.therapistName;
    const [therapists, setTherapists] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedTherapist, setSelectedTherapist] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!shouldSelectTherapist) return;

        const fetchTherapists = async () => {
            const res = await api.get(`${gateway}/api/therapists`, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            setTherapists(res.data);
            console.log("Therapists fetched : ", res.data);
        };

        fetchTherapists();
    }, [shouldSelectTherapist]);

    const filteredTherapists = therapists?.filter((t) =>
        `${t.therapistName} ${t.expertise ?? ""}`
            .toLowerCase()
            .includes(search.toLowerCase()),
    );

    const canBookSession =
        record?.needTherapy &&
        record?.therapistPlans &&
        record?.therapistPlans?.therapistDecisionStatus === "APPROVED";
    const [availableSlots, setAvailableSlots] = useState([]);
    const [slotsByDate, setSlotsByDate] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [booking, setBooking] = useState(false);

    useEffect(() => {
        if (!canBookSession) return;

        const fetchSlots = async () => {
            try {
                const from = new Date().toISOString().split("T")[0];
                const to = new Date(
                    new Date().setDate(new Date().getDate() + 30),
                )
                    .toISOString()
                    .split("T")[0];

                const res = await api.get(
                    `${gateway}/api/therapists/slots/available-slots`,
                    {
                        params: {
                            therapistId: record.therapistPlans.therapistId,
                            from,
                            to,
                        },
                        headers: { Authorization: `Bearer ${auth.token}` },
                    },
                );

                setAvailableSlots(res.data);

                const grouped = res.data.reduce((acc, slot) => {
                    if (!acc[slot.slotDate]) acc[slot.slotDate] = [];
                    acc[slot.slotDate].push(slot);
                    return acc;
                }, {});

                setSlotsByDate(grouped);
            } catch (e) {
                console.error("Failed to load slots", e);
            }
        };

        fetchSlots();
    }, [canBookSession]);

    const bookSlot = async (slotId, therapyPlanId) => {
        try {
            setBooking(true);

            console.log(
                "Slot id : ",
                slotId,
                ", Therapist plan id: ",
                therapyPlanId,
            );
            await api.post(
                `${gateway}/api/therapists/therapy-sessions/book`,
                null,
                {
                    params: { slotId, therapyPlanId },
                    headers: { Authorization: `Bearer ${auth.token}` },
                },
            );

            toast.success("Session booked successfully");

            setSelectedDate(null);
            fetchRecord(); // refresh record
        } catch (e) {
            toast.error("Slot already booked");
        } finally {
            setBooking(false);
        }
    };

    const fetchRecord = async () => {
        try {
            const res = await api.get(`/api/patients/medical-records/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            setRecord(res.data);
            console.log("medical record : ", res.data);
        } catch (err) {
            console.error("Failed to fetch record", err);
        }
    };
    const saveTherapist = async () => {
        if (!selectedTherapist) return;
        try {
            setSaving(true);
            const therapistId = selectedTherapist?.userId;
            console.log(
                "Sent update therapist request with medical record : ",
                id,
                " and therapist id is : ",
                therapistId,
            );
            await api.post(
                `${gateway}/api/therapists/therapy-plans/post`,
                {
                    medicalRecordId: id,
                    therapistId: therapistId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                },
            );

            await fetchRecord();

            toast.success("Therapist assigned successfully");

            setSelectedTherapist(null);
            setSearch("");
        } catch (err) {
            toast.error("Failed to assign therapist");
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        fetchRecord();
    }, [id, auth.token]);

    const formatDate = (date) =>
        date
            ? new Date(date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
              })
            : "Not Scheduled";

    if (!record) {
        return (
            <PatientLayout>
                <LoadingScreen text="Loading medical record..." />
            </PatientLayout>
        );
    }

    return (
        <PatientLayout>
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6 pt-28">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Back Button */}
                    <Link
                        to="/patient/dashboard"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-cyan-400 hover:bg-gray-800 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                    {/* Title */}
                    <div>
                        <h1 className="text-4xl font-bold text-white">
                            Medical Record Details
                        </h1>
                        <p className="text-gray-400">
                            Record #
                            <span className="text-cyan-400 font-semibold ml-1">
                                {record.medicalRecordId}
                            </span>
                        </p>
                    </div>

                    {/* Patient Info */}
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <User className="w-6 h-6 text-cyan-400" />
                                <div>
                                    <CardTitle className="text-white">
                                        Patient Information
                                    </CardTitle>
                                    <CardDescription>
                                        Appointment basics
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-3 gap-6">
                            <Info
                                label="Patient Name"
                                value={record.patientName}
                            />
                            <Info
                                label="Doctor Name"
                                value={record.doctorName}
                            />
                            <Info
                                label="Visit Date"
                                value={formatDate(
                                    record.visitDate || record.createdDate,
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Symptoms & Medications */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        <DataCard
                            icon={Stethoscope}
                            title="Symptoms"
                            value={record.symptoms || "No symptoms provided"}
                        />
                        <DataCard
                            icon={Pill}
                            title="Medications"
                            value={
                                record.medications ||
                                "No medications prescribed"
                            }
                        />
                    </div>

                    {/* Treatment */}
                    <DataCard
                        icon={Stethoscope}
                        title="Prescribed Treatment"
                        value={
                            record.prescribedTreatment || "Not prescribed yet"
                        }
                    />

                    {/* Therapy Info */}
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Brain className="w-6 h-6 text-purple-400" />
                                <div>
                                    <CardTitle className="text-white">
                                        Therapy Information
                                    </CardTitle>
                                    <CardDescription>
                                        Mental health support
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-400">
                                    Need Therapy
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    {record.needTherapy ? (
                                        <>
                                            <CheckCircle2 className="text-emerald-400" />
                                            <Badge className="bg-emerald-600">
                                                Yes
                                            </Badge>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="text-gray-500" />
                                            <Badge className="bg-gray-700">
                                                No
                                            </Badge>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                                    Therapist
                                </p>

                                {record.therapistPlans?.therapistName ? (
                                    <div className="space-y-2">
                                        <p className="text-lg font-semibold text-white">
                                            {
                                                record.therapistPlans
                                                    .therapistName
                                            }
                                        </p>

                                        {record.therapistPlans
                                            .therapistDecisionStatus ===
                                            "APPROVED" && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                Approved
                                            </span>
                                        )}

                                        {record.therapistPlans
                                            .therapistDecisionStatus ===
                                            "PENDING" && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                                                <Clock className="w-3.5 h-3.5 animate-pulse" />
                                                Awaiting Approval
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <UserX className="w-5 h-5" />
                                        <span className="text-sm font-medium">
                                            No therapist assigned
                                        </span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    {shouldSelectTherapist && (
                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-white">
                                        Select Therapist
                                    </CardTitle>

                                    {selectedTherapist && (
                                        <button
                                            onClick={saveTherapist}
                                            disabled={saving}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg disabled:opacity-60"
                                        >
                                            {saving
                                                ? "Saving..."
                                                : "Save Therapist"}
                                        </button>
                                    )}
                                </div>

                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by name or expertise"
                                    className="px-3 py-2 bg-gray-800 text-white rounded w-full"
                                />
                            </CardHeader>

                            <CardContent className="space-y-3">
                                {filteredTherapists.map((t) => (
                                    <div
                                        key={t.userId}
                                        className={`grid grid-cols-4 gap-3 p-3 border rounded-lg transition
                                        ${
                                            selectedTherapist?.userId ===
                                            t.userId
                                                ? "border-emerald-500 bg-emerald-500/10"
                                                : "border-gray-700"
                                        }
                                    `}
                                    >
                                        <p className="text-white font-semibold">
                                            {t.therapistName}
                                        </p>
                                        <p className="text-gray-400">
                                            {t.expertise || "General"}
                                        </p>
                                        <p className="text-gray-400">
                                            {t.yearsOfExperience
                                                ? `${t.yearsOfExperience} yrs`
                                                : "N/A"}
                                        </p>

                                        <button
                                            disabled={!!selectedTherapist}
                                            onClick={() =>
                                                setSelectedTherapist(t)
                                            }
                                            className={`rounded px-3 py-1 text-white text-sm
        ${
            selectedTherapist?.userId === t.userId
                ? "bg-emerald-600 cursor-default"
                : selectedTherapist
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
        }
    `}
                                        >
                                            {selectedTherapist?.userId ===
                                            t.userId
                                                ? "Selected"
                                                : "Select"}
                                        </button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {hasTherapiesAssigned && (
                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <Brain className="w-6 h-6 text-purple-400" />
                                    <div>
                                        <CardTitle className="text-white">
                                            Assigned Therapies
                                        </CardTitle>
                                        <CardDescription>
                                            Therapies recommended by your
                                            therapist
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="flex flex-wrap gap-3">
                                {record.therapies.map((therapy) => (
                                    <Badge
                                        key={therapy}
                                        className="bg-purple-600 text-white px-4 py-1"
                                    >
                                        {therapy.replaceAll("_", " ")}
                                    </Badge>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {canBookSession && (
                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-6 h-6 text-green-400" />
                                    <CardTitle className="text-white">
                                        Book Therapy Session
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    Select a date to view available slots
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                {/* DATE SELECTOR */}
                                <div className="flex flex-wrap gap-3 mb-6">
                                    {Object.keys(slotsByDate).map((date) => (
                                        <button
                                            key={date}
                                            onClick={() =>
                                                setSelectedDate(date)
                                            }
                                            className={`px-4 py-2 rounded-lg border text-sm font-medium
                        ${
                            selectedDate === date
                                ? "bg-green-600 border-green-600 text-white"
                                : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                        }`}
                                        >
                                            {new Date(date).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                },
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* SLOT LIST */}
                                {selectedDate && (
                                    <div className="space-y-3">
                                        <h4 className="text-white font-semibold">
                                            Available Slots on{" "}
                                            {new Date(
                                                selectedDate,
                                            ).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </h4>

                                        {slotsByDate[selectedDate].map(
                                            (slot) => (
                                                <div
                                                    key={slot.slotId}
                                                    className="flex items-center justify-between p-4 bg-gray-950/60 border border-gray-700 rounded-lg"
                                                >
                                                    <span className="text-white font-medium">
                                                        {slot.startTime} –{" "}
                                                        {slot.endTime}
                                                    </span>

                                                    <button
                                                        disabled={booking}
                                                        onClick={() =>
                                                            bookSlot(
                                                                slot.slotId,
                                                                record
                                                                    .therapistPlans
                                                                    .therapyPlanId,
                                                            )
                                                        }
                                                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg text-sm disabled:opacity-60"
                                                    >
                                                        Book
                                                    </button>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </PatientLayout>
    );
}

/* -------- Small Reusable Components -------- */

const Info = ({ label, value }) => (
    <div className="p-4 bg-gray-950/50 border border-gray-700 rounded-lg">
        <p className="text-xs text-gray-400 uppercase">{label}</p>
        <p className="text-lg font-bold text-white">{value}</p>
    </div>
);

const DataCard = ({ icon: Icon, title, value }) => (
    <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
            <div className="flex items-center gap-3">
                <Icon className="w-6 h-6 text-cyan-400" />
                <CardTitle className="text-white">{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <div className="p-4 bg-gray-950/50 border border-gray-700 rounded-lg">
                <p className="text-gray-200">{value}</p>
            </div>
        </CardContent>
    </Card>
);
