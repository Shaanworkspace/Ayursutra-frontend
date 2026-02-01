/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import {
    ArrowLeft,
    Calendar,
    User,
    Brain,
    FileText,
    MessageSquare,
    CheckCircle2,
    XCircle,
    Stethoscope,
    Pill,
    Edit3,
    Save,
    X,
    Clock,
    Sparkles,
} from "lucide-react";
import api from "@/lib/axios";
import LoadingScreen from "@/components/common/LoadingScreen";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import TherapistNavbar from "../components/TherapistNavbar";
import PatientFooter from "@/pages/Home/components/Footer";

const THERAPY_TYPES = [
    "CBT",
    "MINDFULNESS",
    "YOGA_THERAPY",
    "BREATHING_THERAPY",
    "ART_THERAPY",
    "MUSIC_THERAPY",
    "FAMILY_THERAPY",
    "TRAUMA_THERAPY",
    "STRESS_MANAGEMENT",
];

export default function TherapistSessionDetail() {
    const { id } = useParams();
    const location = useLocation();
    const auth = useSelector((state) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const reduxProfile = useSelector((state) => state.profile.data);
    const storedProfile = localStorage.getItem("profile");
    const [record, setRecord] = useState(location.state?.record || null);

    const profile = storedProfile
        ? JSON.parse(storedProfile).data
        : reduxProfile;
    const gateway = import.meta.env.VITE_API_GATEWAY_BASE_URL;
    const [editedData, setEditedData] = useState({
        needTherapy: record?.needTherapy || false,
        therapies: record?.therapies || [],
        therapistNotes: record?.therapistNotes || "",
    });
    const fetchRecord = async () => {
        try {
            const res = await api.get(
                `${gateway}/api/patients/medical-records/${id}`,
                {
                    headers: { Authorization: `Bearer ${auth.token}` },
                },
            );

            console.log("Fetched record from server:", res.data);

            setRecord(res.data);
            setEditedData({
                needTherapy: res.data.needTherapy || false,
                therapies: res.data.therapies || [],
                therapistNotes: res.data.therapistNotes || "",
            });
        } catch (err) {
            console.error("Failed to fetch record", err);
        }
    };

    useEffect(() => {
        if (record) return;
        fetchRecord();
    }, [id, record, auth.token]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            console.log("sending a update to medical record as :", editedData);
            const response = await api.put(
                `${gateway}/api/patients/medical-records/${id}/therapist-update`,
                editedData,
                { headers: { Authorization: `Bearer ${auth.token}` } },
            );
            console.log("Response from server:", response);
            console.log("Data returned by server:", response.data);

            await fetchRecord();
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save:", error);
            if (error.response) {
                console.error("Server error data:", error.response.data);
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setEditedData({
            needTherapy: record.needTherapy || false,
            therapies: record.therapies || [],
            therapistNotes: record.therapistNotes || "",
        });
        setIsEditing(false);
    };

    if (!record) {
        return (
            <>
                <TherapistNavbar />
                <LoadingScreen text="Loading session details..." />
            </>
        );
    }

    const formatDate = (date) =>
        date
            ? new Date(date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
              })
            : "Not Scheduled";

    return (
        <>
            <TherapistNavbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 p-6 pt-28 pb-16">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <Button
                            variant="outline"
                            asChild
                            className="group border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 
                                     text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 
                                     hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5
                                     transition-all duration-300 backdrop-blur-sm"
                        >
                            <Link to="/therapist/dashboard">
                                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                                Back to Dashboard
                            </Link>
                        </Button>

                        <div className="flex gap-3">
                            {isEditing ? (
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={handleCancel}
                                        disabled={isSaving}
                                        className="group border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 
                                                 text-gray-300 hover:text-red-400 hover:border-red-500/50 
                                                 hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-0.5
                                                 transition-all duration-300 backdrop-blur-sm"
                                    >
                                        <X className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="group bg-gradient-to-r from-emerald-600 to-emerald-700 
                                                 hover:from-emerald-500 hover:to-emerald-600 
                                                 text-white shadow-lg shadow-emerald-500/25 
                                                 hover:shadow-xl hover:shadow-emerald-500/40 
                                                 hover:-translate-y-0.5 transition-all duration-300
                                                 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSaving ? (
                                            <>
                                                <Clock className="w-4 h-4 mr-2 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    className="group bg-gradient-to-r from-cyan-600 to-blue-600 
                                             hover:from-cyan-500 hover:to-blue-500 
                                             text-white shadow-lg shadow-cyan-500/25 
                                             hover:shadow-xl hover:shadow-cyan-500/40 
                                             hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <Edit3 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                    Edit Session
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Title & Info Banner */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div
                                className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl 
                                          border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                            >
                                <Sparkles className="w-8 h-8 text-cyan-400" />
                            </div>
                            <div>
                                <h1
                                    className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 
                                             bg-clip-text text-transparent"
                                >
                                    Therapy Session Details
                                </h1>
                                <p className="text-gray-400 mt-2 flex items-center gap-2">
                                    <span className="text-gray-500">
                                        Medical Record
                                    </span>
                                    <span
                                        className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 
                                                   rounded-full text-cyan-400 font-mono text-sm"
                                    >
                                        #{record.medicalRecordId}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Info Cards Row */}
                        <div className="grid grid-cols-3 gap-4">
                            <InfoBox
                                icon={User}
                                label="Patient Name"
                                value={record.patientName}
                                gradient="from-violet-500/20 to-purple-500/20"
                                iconColor="text-violet-400"
                                borderColor="border-violet-500/30"
                            />
                            <InfoBox
                                icon={Stethoscope}
                                label="Therapist Name"
                                value={profile.therapistName || "Not Assigned"}
                                gradient="from-blue-500/20 to-cyan-500/20"
                                iconColor="text-blue-400"
                                borderColor="border-blue-500/30"
                            />
                            <InfoBox
                                icon={Calendar}
                                label="Session Date"
                                value={formatDate(
                                    record.visitDate || record.createdDate,
                                )}
                                gradient="from-emerald-500/20 to-green-500/20"
                                iconColor="text-emerald-400"
                                borderColor="border-emerald-500/30"
                            />
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Symptoms */}
                        <ContentCard
                            icon={MessageSquare}
                            title="Patient Symptoms"
                            content={record.symptoms || "No symptoms provided"}
                            iconColor="text-blue-400"
                            gradient="from-blue-500/10 to-cyan-500/10"
                            borderColor="border-blue-500/20"
                        />

                        {/* Therapist Notes */}
                        <Card
                            className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                                       border border-gray-700/50 shadow-xl hover:shadow-2xl 
                                       hover:shadow-cyan-500/10 hover:border-cyan-500/30 
                                       transition-all duration-500 backdrop-blur-sm"
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 
                                                  rounded-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10
                                                  group-hover:scale-110 transition-transform duration-300"
                                    >
                                        <FileText className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <CardTitle className="text-white text-lg font-semibold">
                                        Therapist Notes
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {isEditing ? (
                                    <Textarea
                                        value={editedData.therapistNotes}
                                        onChange={(e) =>
                                            setEditedData((prev) => ({
                                                ...prev,
                                                therapistNotes: e.target.value,
                                            }))
                                        }
                                        placeholder="Add your session notes, observations, and recommendations..."
                                        className="min-h-[140px] bg-gray-950/50 border-gray-700 
                                                 text-gray-200 placeholder:text-gray-500 
                                                 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20
                                                 transition-all duration-300 resize-none"
                                    />
                                ) : (
                                    <div
                                        className="min-h-[140px] p-4 bg-gradient-to-br from-gray-950/70 to-gray-900/70 
                                                  rounded-lg border border-gray-700/50 
                                                  hover:border-gray-600 transition-colors duration-300"
                                    >
                                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                                            {record.therapistNotes || (
                                                <span className="text-gray-500 italic flex items-center gap-2">
                                                    <FileText className="w-4 h-4" />
                                                    No notes added yet
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Treatment */}
                        <ContentCard
                            icon={Stethoscope}
                            title="Prescribed Treatment"
                            content={
                                record.prescribedTreatment ||
                                "No treatment prescribed"
                            }
                            iconColor="text-emerald-400"
                            gradient="from-emerald-500/10 to-green-500/10"
                            borderColor="border-emerald-500/20"
                        />

                        {/* Medications */}
                        <ContentCard
                            icon={Pill}
                            title="Medications"
                            content={
                                record.medications ||
                                "No medications prescribed"
                            }
                            iconColor="text-pink-400"
                            gradient="from-pink-500/10 to-rose-500/10"
                            borderColor="border-pink-500/20"
                        />
                    </div>

                    {/* Therapy Configuration */}
                    <Card
                        className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                                   border border-gray-700/50 shadow-xl hover:shadow-2xl 
                                   hover:shadow-cyan-500/10 hover:border-cyan-500/30 
                                   transition-all duration-500 backdrop-blur-sm"
                    >
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 
                                                  rounded-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10
                                                  group-hover:scale-110 transition-transform duration-300"
                                    >
                                        <Brain className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <CardTitle className="text-white text-xl font-semibold">
                                        Therapy Plan
                                    </CardTitle>
                                </div>
                                {isEditing ? (
                                    <div
                                        className="flex items-center gap-3 px-4 py-2 
                                                  bg-gradient-to-r from-gray-800/80 to-gray-900/80 
                                                  rounded-xl border border-gray-700/50"
                                    >
                                        <Label className="text-gray-300 font-medium cursor-pointer">
                                            Therapy Required
                                        </Label>
                                        <Checkbox
                                            checked={editedData.needTherapy}
                                            onCheckedChange={(checked) =>
                                                setEditedData((prev) => ({
                                                    ...prev,
                                                    needTherapy: checked,
                                                    therapies: checked
                                                        ? prev.therapies
                                                        : [],
                                                }))
                                            }
                                            className="h-5 w-5 border-cyan-500 data-[state=checked]:bg-gradient-to-br 
                                                     data-[state=checked]:from-cyan-600 data-[state=checked]:to-blue-600
                                                     data-[state=checked]:border-cyan-500"
                                        />
                                    </div>
                                ) : (
                                    <Badge
                                        className={`px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-300 ${
                                            record.needTherapy
                                                ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-emerald-500/30"
                                                : "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 shadow-gray-900/30"
                                        }`}
                                    >
                                        {record.needTherapy ? (
                                            <>
                                                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                                                Required
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="w-4 h-4 mr-1.5" />
                                                Not Required
                                            </>
                                        )}
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>

                        {(isEditing
                            ? editedData.needTherapy
                            : record.needTherapy) && (
                            <CardContent className="pt-0">
                                <div
                                    className="p-4 bg-gradient-to-br from-gray-950/70 to-gray-900/70 
                                              rounded-xl border border-gray-700/50"
                                >
                                    {isEditing ? (
                                        <div className="grid grid-cols-2 gap-3">
                                            {THERAPY_TYPES.map((therapy) => (
                                                <Label
                                                    key={therapy}
                                                    className="group/item flex items-center gap-3 p-4 
                                                             bg-gradient-to-br from-gray-900/50 to-gray-950/50 
                                                             border border-gray-700/50 rounded-xl cursor-pointer 
                                                             hover:border-cyan-500/50 hover:shadow-lg 
                                                             hover:shadow-cyan-500/10 hover:-translate-y-0.5
                                                             transition-all duration-300"
                                                >
                                                    <Checkbox
                                                        checked={editedData.therapies.includes(
                                                            therapy,
                                                        )}
                                                        onCheckedChange={(
                                                            checked,
                                                        ) => {
                                                            setEditedData(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    therapies:
                                                                        checked
                                                                            ? [
                                                                                  ...prev.therapies,
                                                                                  therapy,
                                                                              ]
                                                                            : prev.therapies.filter(
                                                                                  (
                                                                                      t,
                                                                                  ) =>
                                                                                      t !==
                                                                                      therapy,
                                                                              ),
                                                                }),
                                                            );
                                                        }}
                                                        className="h-5 w-5 border-cyan-500 
                                                                 data-[state=checked]:bg-gradient-to-br 
                                                                 data-[state=checked]:from-cyan-600 
                                                                 data-[state=checked]:to-blue-600
                                                                 data-[state=checked]:border-cyan-500
                                                                 transition-all duration-300"
                                                    />
                                                    <span
                                                        className="text-sm text-gray-300 font-medium 
                                                                   group-hover/item:text-cyan-400 
                                                                   transition-colors duration-300"
                                                    >
                                                        {therapy.replace(
                                                            /_/g,
                                                            " ",
                                                        )}
                                                    </span>
                                                </Label>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {record.therapies?.length > 0 ? (
                                                record.therapies.map(
                                                    (therapy) => (
                                                        <Badge
                                                            key={therapy}
                                                            className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                                                                 text-cyan-300 border border-cyan-500/30 
                                                                 shadow-lg shadow-cyan-500/10 font-medium
                                                                 hover:shadow-cyan-500/20 hover:-translate-y-0.5
                                                                 transition-all duration-300"
                                                        >
                                                            {therapy.replace(
                                                                /_/g,
                                                                " ",
                                                            )}
                                                        </Badge>
                                                    ),
                                                )
                                            ) : (
                                                <span className="text-gray-500 italic text-sm flex items-center gap-2">
                                                    <XCircle className="w-4 h-4" />
                                                    No therapy types selected
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        )}
                    </Card>
                </div>
            </div>
            <PatientFooter />
        </>
    );
}

/* Helper Components */
const InfoBox = ({
    icon: Icon,
    label,
    value,
    gradient,
    iconColor,
    borderColor,
}) => (
    <div
        className={`group p-4 bg-gradient-to-br ${gradient} border ${borderColor} 
                   rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 
                   transition-all duration-300 backdrop-blur-sm`}
    >
        <div className="flex items-center gap-3">
            <div
                className={`p-2 bg-gray-900/50 rounded-lg border ${borderColor}
                          group-hover:scale-110 transition-transform duration-300`}
            >
                <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                    {label}
                </p>
                <p
                    className="text-sm font-bold text-gray-200 truncate mt-0.5"
                    title={value}
                >
                    {value}
                </p>
            </div>
        </div>
    </div>
);

const ContentCard = ({
    icon: Icon,
    title,
    content,
    iconColor,
    gradient,
    borderColor,
}) => (
    <Card
        className={`group bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                    border ${borderColor} shadow-xl hover:shadow-2xl 
                    hover:shadow-${iconColor.split("-")[1]}-500/10 
                    hover:border-${iconColor.split("-")[1]}-500/30 
                    transition-all duration-500 backdrop-blur-sm`}
    >
        <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
                <div
                    className={`p-2.5 bg-gradient-to-br ${gradient} rounded-xl border ${borderColor}
                              shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <CardTitle className="text-white text-lg font-semibold">
                    {title}
                </CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <div
                className="min-h-[100px] p-4 bg-gradient-to-br from-gray-950/70 to-gray-900/70 
                          rounded-lg border border-gray-700/50 
                          hover:border-gray-600 transition-colors duration-300"
            >
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {content || (
                        <span className="text-gray-500 italic flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            Not provided
                        </span>
                    )}
                </p>
            </div>
        </CardContent>
    </Card>
);
