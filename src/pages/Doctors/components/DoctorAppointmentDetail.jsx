/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import {
    ArrowLeft,
    Edit2,
    Save,
    X,
    Calendar,
    User,
    Stethoscope,
    Pill,
    Brain,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import api from "@/lib/axios";
import { DoctorLayout } from "./DoctorLayout";
import LoadingScreen from "@/components/common/LoadingScreen";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

export default function DoctorAppointmentDetail() {
    const { id } = useParams();
    const location = useLocation();
    const auth = useSelector((state) => state.auth);

    const passedRecord = location.state?.record || null;

    const reduxUser = useSelector((state) => state.auth.userResponse);
    const reduxProfile = useSelector((state) => state.profile.data);
    const reduxRole = useSelector((state) => state.auth.role);
    const reduxProfileRole = useSelector((state) => state.profile.role);
    const storedProfile = localStorage.getItem("profile");
    const storedUser = localStorage.getItem("userResponse");
    const [record, setRecord] = useState(passedRecord);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editedData, setEditedData] = useState({});
    const gateway = import.meta.env.VITE_API_GATEWAY_BASE_URL;
    const [therapist, setTherapist] = useState([]);
    const profile = storedProfile
        ? JSON.parse(storedProfile).data
        : reduxProfile;
    const user = storedUser ? JSON.parse(storedUser) : reduxUser;
    const roleU = localStorage.getItem("role") || reduxRole;
    console.log("token :", auth.token);
    console.log(reduxProfileRole, " : ", profile);
    console.log(roleU, " :  ", user);
    useEffect(() => {
        axios
            .get(`${gateway}/api/therapists`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            })
            .then((res) => {
                console.log("Therapists : ", res.data);
                setTherapist(res.data);
            });
    }, []);
    useEffect(() => {
        if (record) return;
        const fetchRecord = async () => {
            try {
                const res = await api.get(
                    `/api/patients/medical-records/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                    },
                );
                setRecord(res.data);
            } catch (err) {
                console.error("Failed to fetch record", err);
            }
        };
        fetchRecord();
    }, [id, record, auth.token]);

    const handleEdit = () => {
        setEditedData({
            symptoms: record.symptoms || "",
            prescribedTreatment: record.prescribedTreatment || "",
            medications: record.medications || "",
            needTherapy: record.needTherapy || false,
            therapistId: record.therapistId || "",
            followUpRequired: "",
        });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData({});
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            console.log("Going to edit medical record: ", editedData);
            const res = await api.put(
                `/api/patients/medical-records/edit/${id}`,
                editedData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                },
            );

            setRecord({ ...record, ...editedData });
            setIsEditing(false);
            setEditedData({});
        } catch (err) {
            console.error("Failed to update record", err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (field, value) => {
        setEditedData((prev) => ({ ...prev, [field]: value }));
    };

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
            <DoctorLayout>
                <LoadingScreen text="Loading appointment details..." />
            </DoctorLayout>
        );
    }

    return (
        <DoctorLayout>
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6 pt-28">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Header with Back Button and Edit */}
                    <div className="flex items-center justify-between">
                        <Link
                            to="/doctor/dashboard"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-emerald-400 hover:bg-gray-800 hover:border-emerald-500 transition-all duration-200"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="font-medium">
                                Back to Dashboard
                            </span>
                        </Link>

                        {!isEditing ? (
                            <Button
                                onClick={handleEdit}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20"
                            >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit Record
                            </Button>
                        ) : (
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleCancel}
                                    variant="outline"
                                    className="border-gray-700 bg-gray-800/50 hover:bg-gray-700 text-gray-200"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-white">
                            Appointment Details
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Medical Record{" "}
                            <span className="text-emerald-400 font-semibold">
                                #{record.medicalRecordId}
                            </span>
                        </p>
                    </div>

                    {/* Patient Information Card */}
                    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                    <User className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl text-white">
                                        Patient Information
                                    </CardTitle>
                                    <CardDescription className="text-gray-400 text-base">
                                        Basic patient details
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="space-y-2 p-4 rounded-lg bg-gray-950/50 border border-gray-700">
                                    <p className="text-sm text-gray-400 uppercase tracking-wide">
                                        Patient ID
                                    </p>
                                    <p className="text-lg font-bold text-white">
                                        {record.patientId}
                                    </p>
                                </div>
                                <div className="space-y-2 p-4 rounded-lg bg-gray-950/50 border border-gray-700">
                                    <p className="text-sm text-gray-400 uppercase tracking-wide">
                                        Doctor ID
                                    </p>
                                    <p className="text-lg font-bold text-white">
                                        {record.doctorId}
                                    </p>
                                </div>
                                <div className="space-y-2 p-4 rounded-lg bg-gray-950/50 border border-gray-700">
                                    <p className="text-sm text-gray-400 uppercase tracking-wide flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        Visit Date
                                    </p>
                                    <p className="text-lg font-bold text-white">
                                        {formatDate(
                                            record.visitDate ||
                                                record.createdDate,
                                        )}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Main Grid - Medical Details */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Symptoms */}
                        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                        <Stethoscope className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl text-white">
                                            Symptoms
                                        </CardTitle>
                                        <CardDescription className="text-gray-400">
                                            Reported symptoms
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {isEditing ? (
                                    <Textarea
                                        value={editedData.symptoms}
                                        onChange={(e) =>
                                            handleChange(
                                                "symptoms",
                                                e.target.value,
                                            )
                                        }
                                        className="min-h-[140px] bg-gray-950 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
                                        placeholder="Enter symptoms..."
                                    />
                                ) : (
                                    <div className="min-h-[140px] p-4 rounded-lg bg-gray-950/50 border border-gray-700">
                                        <p className="text-gray-200 leading-relaxed text-base">
                                            {record.symptoms ||
                                                "No symptoms provided"}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Medications */}
                        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-pink-500/10 rounded-xl border border-pink-500/20">
                                        <Pill className="w-6 h-6 text-pink-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl text-white">
                                            Medications
                                        </CardTitle>
                                        <CardDescription className="text-gray-400">
                                            Prescribed medicines
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {isEditing ? (
                                    <Textarea
                                        value={editedData.medications}
                                        onChange={(e) =>
                                            handleChange(
                                                "medications",
                                                e.target.value,
                                            )
                                        }
                                        className="min-h-[140px] bg-gray-950 border-gray-600 text-white placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500/20"
                                        placeholder="Enter medications..."
                                    />
                                ) : (
                                    <div className="min-h-[140px] p-4 rounded-lg bg-gray-950/50 border border-gray-700">
                                        <p className="text-gray-200 leading-relaxed text-base">
                                            {record.medications ||
                                                "No medications prescribed"}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Prescribed Treatment - Full Width */}
                    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                                    <Stethoscope className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl text-white">
                                        Prescribed Treatment
                                    </CardTitle>
                                    <CardDescription className="text-gray-400 text-base">
                                        Treatment plan and recommendations
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {isEditing ? (
                                <Textarea
                                    value={editedData.prescribedTreatment}
                                    onChange={(e) =>
                                        handleChange(
                                            "prescribedTreatment",
                                            e.target.value,
                                        )
                                    }
                                    className="min-h-[160px] bg-gray-950 border-gray-600 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500/20"
                                    placeholder="Enter prescribed treatment..."
                                />
                            ) : (
                                <div className="min-h-[160px] p-4 rounded-lg bg-gray-950/50 border border-gray-700">
                                    <p className="text-gray-200 leading-relaxed text-base">
                                        {record.prescribedTreatment ||
                                            "Not prescribed yet"}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Therapy Section */}
                    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                    <Brain className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl text-white">
                                        Therapy Information
                                    </CardTitle>
                                    <CardDescription className="text-gray-400 text-base">
                                        Mental health support details
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {isEditing ? (
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-3 p-4 rounded-lg bg-gray-950/50 border border-gray-700">
                                        <Checkbox
                                            id="needTherapy"
                                            checked={editedData.needTherapy}
                                            onCheckedChange={(checked) =>
                                                handleChange(
                                                    "needTherapy",
                                                    checked,
                                                )
                                            }
                                            className="border-gray-600"
                                        />
                                        <Label
                                            htmlFor="needTherapy"
                                            className="text-base font-medium text-white cursor-pointer"
                                        >
                                            Patient needs therapy
                                        </Label>
                                    </div>

                                    {editedData.needTherapy && (
                                        <div className="space-y-3">
                                            <Label className="text-base text-white">
                                                Assign Therapist
                                            </Label>

                                            <Select
                                                value={
                                                    editedData.therapistId || ""
                                                }
                                                onValueChange={(value) =>
                                                    handleChange(
                                                        "therapistId",
                                                        value,
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="bg-gray-950 border-gray-600 text-white h-12 focus:border-purple-500 focus:ring-purple-500/20">
                                                    <SelectValue placeholder="Select therapist..." />
                                                </SelectTrigger>

                                                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                                                    {therapist.length === 0 && (
                                                        <div className="px-3 py-2 text-sm text-gray-400">
                                                            No therapists
                                                            available
                                                        </div>
                                                    )}

                                                    {therapist.map((t) => (
                                                        <SelectItem
                                                            key={t.userId}
                                                            value={t.userId}
                                                            className="focus:bg-purple-600 focus:text-white"
                                                        >
                                                            {t.therapistName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3 p-4 rounded-lg bg-gray-950/50 border border-gray-700">
                                        <p className="text-sm text-gray-400 uppercase tracking-wide">
                                            Need Therapy
                                        </p>
                                        <div className="flex items-center gap-2">
                                            {record.needTherapy ? (
                                                <>
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                                    <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white text-base px-4 py-1">
                                                        Yes
                                                    </Badge>
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="w-5 h-5 text-gray-500" />
                                                    <Badge className="bg-gray-700 hover:bg-gray-600 text-white text-base px-4 py-1">
                                                        No
                                                    </Badge>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-3 p-4 rounded-lg bg-gray-950/50 border border-gray-700">
                                        <p className="text-sm text-gray-400 uppercase tracking-wide">
                                            Therapist Assigned
                                        </p>
                                        <p className="text-lg font-bold text-white">
                                            {record.therapistId ||
                                                "Not Assigned"}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DoctorLayout>
    );
}
