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
    Loader2,
    Activity,
    AlertCircle,
    Clock,
    UserX,
    FileText,
    TestTube,
    Heart,
    AlertTriangle,
    Archive,
    PauseCircle,
    ExternalLink,
    TrendingUp,
    Trash2,
    X,
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

// Status configuration with colors, icons, and descriptions
const STATUS_CONFIG = {
    CREATED: {
        label: "Created",
        color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        icon: FileText,
        description: "Record created, awaiting evaluation",
    },
    UNDER_EVALUATION: {
        label: "Under Evaluation",
        color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
        icon: Stethoscope,
        description: "Currently being evaluated by doctor",
    },
    DIAGNOSED: {
        label: "Diagnosed",
        color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        icon: CheckCircle2,
        description: "Diagnosis has been finalized",
    },
    IN_TREATMENT: {
        label: "In Treatment",
        color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
        icon: Activity,
        description: "Active treatment in progress",
    },
    HAVING_TREATMENT: {
        label: "Having Treatment",
        color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
        icon: Activity,
        description: "Treatment sessions ongoing",
    },
    THERAPY_RECOMMENDED: {
        label: "Therapy Recommended",
        color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
        icon: Brain,
        description: "Therapy advised but not started",
    },
    THERAPY_IN_PROGRESS: {
        label: "Therapy In Progress",
        color: "bg-violet-500/20 text-violet-300 border-violet-500/30",
        icon: Brain,
        description: "Therapy sessions are active",
    },
    TESTS_ORDERED: {
        label: "Tests Ordered",
        color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
        icon: TestTube,
        description: "Diagnostic tests have been prescribed",
    },
    AWAITING_RESULTS: {
        label: "Awaiting Results",
        color: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        icon: Clock,
        description: "Waiting for test results",
    },
    FOLLOW_UP_REQUIRED: {
        label: "Follow-up Required",
        color: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        icon: Calendar,
        description: "Follow-up consultation needed",
    },
    RECOVERING: {
        label: "Recovering",
        color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        icon: TrendingUp,
        description: "In recovery/observation stage",
    },
    COMPLETED: {
        label: "Completed",
        color: "bg-green-500/20 text-green-300 border-green-500/30",
        icon: CheckCircle2,
        description: "Case successfully completed",
    },
    ON_HOLD: {
        label: "On Hold",
        color: "bg-gray-500/20 text-gray-300 border-gray-500/30",
        icon: PauseCircle,
        description: "Treatment temporarily paused",
    },
    REFERRED: {
        label: "Referred",
        color: "bg-sky-500/20 text-sky-300 border-sky-500/30",
        icon: ExternalLink,
        description: "Referred to another specialist",
    },
    ESCALATED: {
        label: "Escalated",
        color: "bg-rose-500/20 text-rose-300 border-rose-500/30",
        icon: AlertTriangle,
        description: "Case escalated for senior review",
    },
    CRITICAL: {
        label: "Critical",
        color: "bg-red-500/20 text-red-300 border-red-500/30",
        icon: AlertCircle,
        description: "Critical condition - immediate attention",
    },
    CANCELLED: {
        label: "Cancelled",
        color: "bg-slate-500/20 text-slate-300 border-slate-500/30",
        icon: XCircle,
        description: "Treatment cancelled",
    },
    ABANDONED: {
        label: "Abandoned",
        color: "bg-zinc-500/20 text-zinc-300 border-zinc-500/30",
        icon: UserX,
        description: "Patient discontinued treatment",
    },
    ARCHIVED: {
        label: "Archived",
        color: "bg-stone-500/20 text-stone-300 border-stone-500/30",
        icon: Archive,
        description: "Record archived",
    },
};

// Status Badge Component
const StatusBadge = ({ status, showDescription = false, size = "default" }) => {
    const config = STATUS_CONFIG[status] || {
        label: status || "Unknown",
        color: "bg-gray-500/20 text-gray-300 border-gray-500/30",
        icon: AlertCircle,
        description: "Status unknown",
    };

    const Icon = config.icon;

    const sizeClasses = {
        small: "px-2 py-0.5 text-xs",
        default: "px-3 py-1.5 text-sm",
        large: "px-4 py-2 text-base",
    };

    return (
        <div className="flex flex-col gap-1">
            <span
                className={`inline-flex items-center gap-2 rounded-full font-medium border ${config.color} ${sizeClasses[size]}`}
            >
                <Icon className={size === "small" ? "w-3 h-3" : "w-4 h-4"} />
                {config.label}
            </span>
            {showDescription && (
                <p className="text-xs text-gray-400 ml-1">
                    {config.description}
                </p>
            )}
        </div>
    );
};

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
    const [loadingTherapists, setLoadingTherapists] = useState(false);
    const [loadingSlots, setLoadingSlots] = useState(false);

    useEffect(() => {
        if (!shouldSelectTherapist) return;

        const fetchTherapists = async () => {
            try {
                setLoadingTherapists(true);
                const res = await api.get(`${gateway}/api/therapists`, {
                    headers: { Authorization: `Bearer ${auth.token}` },
                });
                setTherapists(res.data);
                console.log("Therapists fetched : ", res.data);
            } catch (error) {
                console.error("Failed to fetch therapists", error);
            } finally {
                setLoadingTherapists(false);
            }
        };

        fetchTherapists();
    }, [shouldSelectTherapist, gateway, auth.token]);

    const filteredTherapists = therapists?.filter((t) =>
        `${t.therapistName} ${t.expertise ?? ""}`
            .toLowerCase()
            .includes(search.toLowerCase()),
    );

    const canBookSession =
        record?.needTherapy &&
        record?.therapistPlans &&
        record?.sessionMedicalRecordStatus === "THERAPY_IN_PROGRESS";

    const [availableSlots, setAvailableSlots] = useState([]);
    const [slotsByDate, setSlotsByDate] = useState({});

    const [selectedDate, setSelectedDate] = useState(null);
    const [booking, setBooking] = useState(false);
    const [bookedSessions, setBookedSessions] = useState([]);

    // 1. Fetch Booked Sessions
    const fetchMySessions = async (planId) => {
        try {
            const res = await api.get(
                `${gateway}/api/therapists/therapy-sessions/plan/${planId}`,
                {
                    headers: { Authorization: `Bearer ${auth.token}` },
                },
            );
            setBookedSessions(res.data);
            console.log("My Booked Sessions from DB:", res.data);
        } catch (e) {
            console.error("Error fetching sessions", e);
        }
    };

    const fetchSlots = async () => {
        if (!record?.therapistPlans?.therapistId) return;
        try {
            setLoadingSlots(true);
            const from = new Date().toISOString().split("T")[0];
            const to = new Date(new Date().setDate(new Date().getDate() + 30))
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

            console.log("slots : : ", res.data);
            const availableOnly = res.data.filter(
                (slot) => slot.status?.trim().toUpperCase() === "AVAILABLE",
            );

            const grouped = availableOnly.reduce((acc, slot) => {
                if (!acc[slot.slotDate]) acc[slot.slotDate] = [];
                acc[slot.slotDate].push(slot);
                return acc;
            }, {});

            console.log("Filted avaliable grouped : ", grouped);
            setSlotsByDate(grouped);
            const dates = Object.keys(grouped);
            if (dates.length > 0 && !selectedDate) {
                setSelectedDate(dates[0]);
            }
        } catch (e) {
            console.error("Failed to load slots", e);
        } finally {
            setLoadingSlots(false);
        }
    };

    const handleCancelSession = (sessionId) => {
        // Sonner Toast with custom action buttons
        toast("Cancel Appointment?", {
            description: "This slot will be released for other patients.",
            action: {
                label: "Yes, Cancel",
                onClick: async () => {
                    try {
                        await api.delete(
                            `${gateway}/api/therapists/therapy-sessions/${sessionId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${auth.token}`,
                                },
                            },
                        );
                        toast.success("Session cancelled successfully");

                        // UI refresh
                        await fetchSlots();
                        await fetchMySessions(
                            record.therapistPlans.therapyPlanId,
                        );
                    } catch (e) {
                        toast.error("Failed to cancel session");
                    }
                },
            },
            cancel: {
                label: "No, Keep it",
                onClick: () => console.log("Cancelled logic stopped"),
            },
        });
    };

    const fetchRecord = async () => {
        try {
            const res = await api.get(`/api/patients/medical-records/${id}`, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            setRecord(res.data);

            if (res.data.therapistPlans?.therapyPlanId) {
                fetchMySessions(res.data.therapistPlans.therapyPlanId);
            }
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

    const bookSlot = async (slotId, therapyPlanId) => {
        try {
            setBooking(true);
            console.log("booking with medical record id : ", id);
            await api.post(
                `${gateway}/api/therapists/therapy-sessions/book`,
                null,
                {
                    params: { slotId, therapyPlanId, medicalRecordId: id },
                    headers: { Authorization: `Bearer ${auth.token}` },
                },
            );
            toast.success("Session booked successfully");
            // Refresh everything
            await fetchSlots();
            await fetchMySessions(therapyPlanId);
        } catch (e) {
            toast.error("Slot already booked");
        } finally {
            setBooking(false);
        }
    };

    useEffect(() => {
        fetchRecord();
    }, [id, auth.token]);

    useEffect(() => {
        if (record?.therapistPlans?.therapistId && canBookSession) {
            fetchSlots();
        }
    }, [record?.therapistPlans?.therapistId, canBookSession]);

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

                    {/* Title with Status */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

                        {/* Status Badge in Header */}
                        <StatusBadge
                            status={record.sessionMedicalRecordStatus}
                            size="large"
                            showDescription
                        />
                    </div>

                    {/* Medical Record Status Card */}
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Activity className="w-6 h-6 text-cyan-400" />
                                <div>
                                    <CardTitle className="text-white">
                                        Record Status
                                    </CardTitle>
                                    <CardDescription>
                                        Current status of your medical record
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-4 bg-gray-950/50 border border-gray-700 rounded-lg">
                                    <p className="text-xs text-gray-400 uppercase mb-2">
                                        Current Status
                                    </p>
                                    <StatusBadge
                                        status={
                                            record.sessionMedicalRecordStatus
                                        }
                                        showDescription
                                    />
                                </div>

                                <div className="p-4 bg-gray-950/50 border border-gray-700 rounded-lg">
                                    <p className="text-xs text-gray-400 uppercase mb-2">
                                        Follow-up Required
                                    </p>
                                    <div className="flex items-center gap-2">
                                        {record.followUpRequired ? (
                                            <>
                                                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                                                <span className="text-amber-300 font-medium">
                                                    Yes - Schedule follow-up
                                                </span>
                                            </>
                                        ) : record.followUpRequired ===
                                          false ? (
                                            <>
                                                <XCircle className="w-5 h-5 text-gray-500" />
                                                <span className="text-gray-400">
                                                    No follow-up needed
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <Clock className="w-5 h-5 text-gray-500" />
                                                <span className="text-gray-400">
                                                    Not determined yet
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

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

                    {/* SELECT THERAPIST - WITH LOADING */}
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
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg disabled:opacity-60 flex items-center gap-2"
                                        >
                                            {saving && (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            )}
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
                                    disabled={loadingTherapists}
                                />
                            </CardHeader>

                            <CardContent className="space-y-3">
                                {loadingTherapists ? (
                                    <div className="flex flex-col items-center justify-center py-8 gap-3">
                                        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                                        <p className="text-gray-400">
                                            Loading therapists...
                                        </p>
                                    </div>
                                ) : filteredTherapists.length === 0 ? (
                                    <div className="text-center py-8 text-gray-400">
                                        No therapists found
                                    </div>
                                ) : (
                                    filteredTherapists.map((t) => (
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
                                    ))
                                )}
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

                    {/* --- NEW: SCHEDULED SESSIONS --- */}
                    {bookedSessions.length > 0 && (
                        <Card className="bg-gray-900 border-gray-800 shadow-lg shadow-emerald-500/10">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                                        <Clock className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <CardTitle className="text-white">
                                        Scheduled Sessions
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    Your upcoming therapy appointments
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-3">
                                {bookedSessions.map((session) => (
                                    <div
                                        key={session.sessionId}
                                        className="flex items-center justify-between p-4 bg-gray-950 border border-emerald-500/20 rounded-xl"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex flex-col">
                                                <span className="text-emerald-400 font-bold text-lg">
                                                    {new Date(
                                                        session.sessionDate,
                                                    ).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        },
                                                    )}
                                                </span>
                                                <span className="text-gray-400 text-sm">
                                                    {session.startTime} -{" "}
                                                    {session.endTime}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Badge className="bg-emerald-600/10 text-emerald-500 border-emerald-500/20 px-3">
                                                Confirmed
                                            </Badge>
                                            <button
                                                onClick={() =>
                                                    handleCancelSession(
                                                        session.sessionId,
                                                    )
                                                }
                                                className="group p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all border border-transparent hover:border-red-400/20"
                                                title="Cancel Appointment"
                                            >
                                                <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {/* --- BOOKING SECTION (Modified) --- */}
                    {canBookSession && (
                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
                                        <Calendar className="h-6 w-6 text-purple-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <CardTitle className="text-lg font-semibold text-white">
                                            Book New Session
                                        </CardTitle>
                                        <span className="text-xs font-medium text-purple-400 uppercase">
                                            Available Slots
                                        </span>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                {loadingSlots ? (
                                    <div className="flex justify-center py-12">
                                        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                                    </div>
                                ) : Object.keys(slotsByDate).length === 0 ? (
                                    <div className="text-center py-8 text-gray-500 bg-gray-950/50 rounded-xl border border-dashed border-gray-800">
                                        No more available slots for this
                                        therapist currently.
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex flex-wrap gap-3 mb-6">
                                            {Object.keys(slotsByDate).map(
                                                (dateStr) => {
                                                    const [year, month, day] =
                                                        dateStr
                                                            .split("-")
                                                            .map(Number);
                                                    const dateObj = new Date(
                                                        year,
                                                        month - 1,
                                                        day,
                                                    );
                                                    return (
                                                        <button
                                                            key={dateStr}
                                                            onClick={() =>
                                                                setSelectedDate(
                                                                    dateStr,
                                                                )
                                                            }
                                                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                                                                selectedDate ===
                                                                dateStr
                                                                    ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/20"
                                                                    : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                                                            }`}
                                                        >
                                                            {dateObj.toLocaleDateString(
                                                                "en-IN",
                                                                {
                                                                    day: "numeric",
                                                                    month: "short",
                                                                },
                                                            )}
                                                        </button>
                                                    );
                                                },
                                            )}
                                        </div>

                                        {selectedDate && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {slotsByDate[selectedDate]?.map(
                                                    (slot) => (
                                                        <div
                                                            key={slot.slotId}
                                                            className="flex items-center justify-between p-4 bg-gray-950 border border-gray-800 rounded-xl hover:border-purple-500/30 transition-colors"
                                                        >
                                                            <span className="text-white font-medium">
                                                                {slot.startTime.substring(
                                                                    0,
                                                                    5,
                                                                )}{" "}
                                                                –{" "}
                                                                {slot.endTime.substring(
                                                                    0,
                                                                    5,
                                                                )}
                                                            </span>
                                                            <button
                                                                disabled={
                                                                    booking
                                                                }
                                                                onClick={() =>
                                                                    bookSlot(
                                                                        slot.slotId,
                                                                        record
                                                                            .therapistPlans
                                                                            .therapyPlanId,
                                                                    )
                                                                }
                                                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg text-sm disabled:opacity-50"
                                                            >
                                                                {booking
                                                                    ? "..."
                                                                    : "Book"}
                                                            </button>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                    </>
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
