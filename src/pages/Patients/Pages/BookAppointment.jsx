/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { PatientLayout } from "../components/PatientLayout";
import { Loader2 } from "lucide-react";
import {
    User,
    Phone,
    Mail,
    Calendar,
    Stethoscope,
    ClipboardList,
    CheckCircle2,
} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import axios from "@/lib/axios";
import { toast } from "sonner";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BookAppointment = () => {
    const [specializations, setSpecializations] = useState([]);
    const [availabilities, setAvailabilities] = useState([]);

    const gateway = import.meta.env.VITE_API_GATEWAY_BASE_URL;
    const reduxUser = useSelector((state) => state.auth.userResponse);
    const reduxProfile = useSelector((state) => state.profile.data);
    const auth = useSelector((state) => state.auth);

    const storedProfile = localStorage.getItem("profile");

    const profile = storedProfile
        ? JSON.parse(storedProfile).data
        : reduxProfile;

    const storedUser = localStorage.getItem("userResponse");

    const user = storedUser ? JSON.parse(storedUser) : reduxUser;

    const [description, setDescription] = useState("");
    const [appointmentType, setAppoitmentType] = useState("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("");

    //doctors
    const [doctors, setDoctors] = useState([]);
    const [specialist, setSpecialist] = useState("");
    const [loadingDoctors, setLoadingDoctors] = useState(true);
    const [booking, setBooking] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [search, setSearch] = useState("");

    // Set dark mode by default
    useEffect(() => {
        document.documentElement.classList.add("dark");
    }, []);

    const patient = useMemo(() => {
        if (!user || !profile) return null;

        return {
            name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "",
            email: user.email ?? "",
            phone: profile.phoneNumber || "Update Phone . . .",
            patientId: profile.userId,
            appointmentDate: format(date, "yyyy-MM-dd"),
            appointmentTime: time,
        };
    }, [user, profile, date, time]);

    useEffect(() => {
        setSelectedDoctor(null);
        setTime("");
    }, [specialist, appointmentType]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoadingDoctors(true);
                const res = await api.get(`${gateway}/api/doctors`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });

                setDoctors(res.data);
            } finally {
                setLoadingDoctors(false);
            }
        };

        fetchDoctors();
    }, []);

    useEffect(() => {
        const loadEnums = async () => {
            try {
                const [sp, av] = await Promise.all([
                    axios.get(`${gateway}/api/doctors/enums/specializations`, {
                        headers: { Authorization: `Bearer ${auth.token}` },
                    }),
                    axios.get(`${gateway}/api/doctors/enums/availability`, {
                        headers: { Authorization: `Bearer ${auth.token}` },
                    }),
                ]);

                setSpecializations(sp.data);
                setAvailabilities(av.data);
            } catch (e) {
                console.error("Failed to load enums", e);
            }
        };

        loadEnums();
    }, [gateway, auth.token]);

    const filteredDoctors = useMemo(() => {
        if (!doctors || doctors.length === 0) return [];

        return doctors.filter((doc) => {
            const matchSpecialist = specialist
                ? doc.specialization === specialist
                : true;

            const matchAvailability = appointmentType
                ? doc.availability === appointmentType
                : true;

            const matchSearch = search
                ? `${doc.name} ${doc.specialization ?? ""}`
                      .toLowerCase()
                      .includes(search.toLowerCase())
                : true;

            return matchSpecialist && matchAvailability && matchSearch;
        });
    }, [doctors, specialist, appointmentType, search]);

    // Booking appointment
    const handleBookAppointment = async () => {
        if (!selectedDoctor) {
            toast.error("Please select a doctor");
            return;
        }
        if (!description) {
            toast.error("Please enter Problem Description");
            return;
        }
        if (!date) {
            toast.error("Please select a date");
            return;
        }
        if (!time) {
            toast.error("Please select a time slot");
            return;
        }

        const dataForAppointment = {
            patientId: patient?.patientId,
            doctorId: selectedDoctor.userId,
            doctorName: selectedDoctor.name,
            visitDate: format(date, "yyyy-MM-dd"),
            appointmentTime: time,
            symptoms: description,
        };

        console.log("Data for Appointment : ", dataForAppointment);

        try {
            setBooking(true);
            await axios.post(
                `${gateway}/api/patients/medical-records/book`,
                dataForAppointment,
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                },
            );
            toast.success("Booked Appointment !!!");
        } catch (error) {
            toast.error("Failed to book appointment");
            console.error(error);
        } finally {
            setBooking(false);
        }
    };
    useEffect(() => {
        setTime("");
    }, [date, selectedDoctor]);

    const timeSlots = useMemo(() => {
        if (!date) return [];

        const slots = [];
        const interval = 30; // minutes
        const startHour = 9;
        const endHour = 17;

        const selectedDate = new Date(date);
        selectedDate.setSeconds(0, 0);

        const today = new Date();

        let startTime = new Date(selectedDate);
        startTime.setHours(startHour, 0, 0, 0);

        const isToday = selectedDate.toDateString() === today.toDateString();

        // 👉 agar aaj ka din hai to next available slot se start karo
        if (isToday) {
            const now = new Date();

            let minutes = now.getMinutes();
            let roundedMinutes = Math.ceil(minutes / interval) * interval;

            startTime = new Date(selectedDate);
            startTime.setHours(now.getHours(), roundedMinutes, 0, 0);

            // agar abhi ka time 9 baje se pehle hai
            const minStart = new Date(selectedDate);
            minStart.setHours(startHour, 0, 0, 0);

            if (startTime < minStart) {
                startTime = minStart;
            }
        }

        let cursor = new Date(startTime);

        while (slots.length < 10) {
            const hour = cursor.getHours();

            // working hours ke bahar mat jao
            if (hour >= endHour) break;

            slots.push(format(cursor, "HH:mm"));

            cursor = new Date(cursor.getTime() + interval * 60 * 1000);
        }

        return slots;
    }, [date]);

    return (
        <PatientLayout>
            <div className="pt-30 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* ================= HEADER ================= */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <h1 className="text-3xl font-bold text-white">
                                Book Appointment
                            </h1>
                        </div>
                        <p className="text-slate-400">
                            Fill appointment details and select doctor
                        </p>
                    </div>

                    {/* ================= PATIENT DETAILS ================= */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-slate-700/50 shadow-xl">
                        <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                            <User className="w-5 h-5 text-cyan-400" />
                            Patient Details
                        </h2>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <ReadOnlyField
                                label="Full Name"
                                value={patient?.name}
                            />
                            <ReadOnlyField
                                label="Email Address"
                                value={patient?.email}
                            />
                            <ReadOnlyField
                                label="Phone Number"
                                value={patient?.phone}
                            />
                        </div>
                    </div>

                    {/* ================= APPOINTMENT DETAILS ================= */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-slate-700/50 shadow-xl">
                        <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                            <ClipboardList className="w-5 h-5 text-cyan-400" />
                            Appointment Details
                        </h2>

                        <div className="space-y-6">
                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-slate-300">
                                    Problem Description
                                </label>
                                <textarea
                                    rows="4"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Describe your symptoms or reason for visit"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-900/50 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Appointment Type & Specialist */}
                            <div>
                                <label className="block text-sm font-medium mb-3 text-slate-300">
                                    Select Availability
                                </label>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {availabilities.map((av) => {
                                        const isSelected =
                                            appointmentType === av;

                                        return (
                                            <div
                                                key={av}
                                                onClick={() =>
                                                    setAppoitmentType(av)
                                                }
                                                className={`cursor-pointer rounded-xl border p-4 transition-all
                        ${
                            isSelected
                                ? "border-cyan-500 bg-cyan-500/10 shadow-lg"
                                : "border-slate-700 bg-slate-900/50 hover:border-slate-500"
                        }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <p className="text-white font-medium">
                                                        {av.replaceAll(
                                                            "_",
                                                            " ",
                                                        )}
                                                    </p>

                                                    {isSelected ? (
                                                        <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                                                    ) : (
                                                        <div className="w-5 h-5 rounded-full border border-slate-600" />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-3 text-slate-300">
                                    Select Specialist
                                </label>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {specializations.map((sp) => {
                                        const isSelected = specialist === sp;

                                        return (
                                            <div
                                                key={sp}
                                                onClick={() =>
                                                    setSpecialist(sp)
                                                }
                                                className={`cursor-pointer rounded-xl border p-4 transition-all
                        ${
                            isSelected
                                ? "border-cyan-500 bg-cyan-500/10 shadow-lg"
                                : "border-slate-700 bg-slate-900/50 hover:border-slate-500"
                        }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <p className="text-white font-medium">
                                                        {sp.replaceAll(
                                                            "_",
                                                            " ",
                                                        )}
                                                    </p>

                                                    {isSelected ? (
                                                        <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                                                    ) : (
                                                        <div className="w-5 h-5 rounded-full border border-slate-600" />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Doctor Selection - WITH LOADING */}
                            {/* SELECT DOCTOR */}
                            <Card className="bg-gray-900 border-gray-800">
                                <CardHeader className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-white">
                                            Select Doctor
                                        </CardTitle>
                                    </div>

                                    <input
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search by doctor name or specialization"
                                        className="px-3 py-2 bg-gray-800 text-white rounded w-full"
                                    />
                                </CardHeader>

                                <CardContent className="space-y-3">
                                    {loadingDoctors ? (
                                        <div className="flex flex-col items-center justify-center py-8 gap-3">
                                            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                                            <p className="text-gray-400">
                                                Loading doctors...
                                            </p>
                                        </div>
                                    ) : filteredDoctors.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-10 text-center">
                                            <Stethoscope className="w-10 h-10 text-cyan-400 mb-3 opacity-90" />

                                            <p className="text-lg font-semibold text-gray-200">
                                                No doctors available
                                            </p>

                                            <p className="text-sm mt-2 text-gray-400 max-w-md">
                                                We couldn’t find any doctors
                                                matching your selected
                                                availability and specialization.
                                            </p>

                                            <p className="text-sm mt-1 text-gray-500">
                                                Try adjusting your filters to
                                                see more doctors.
                                            </p>
                                        </div>
                                    ) : (
                                        filteredDoctors.map((d) => (
                                            <div
                                                key={d.userId}
                                                className={`grid grid-cols-4 gap-3 p-3 border rounded-lg transition
                        ${
                            selectedDoctor?.userId === d.userId
                                ? "border-emerald-500 bg-emerald-500/10"
                                : "border-gray-700"
                        }
                    `}
                                            >
                                                {/* Name */}
                                                <p className="text-white font-semibold">
                                                    {d.name}
                                                </p>

                                                {/* Specialization */}
                                                <p className="text-gray-400">
                                                    {d.specialization?.replaceAll(
                                                        "_",
                                                        " ",
                                                    ) || "N/A"}
                                                </p>

                                                {/* Availability */}
                                                <p className="text-gray-400">
                                                    {d.availability?.replaceAll(
                                                        "_",
                                                        " ",
                                                    )}
                                                </p>

                                                {/* Select button */}
                                                <button
                                                    disabled={
                                                        booking ||
                                                        loadingDoctors
                                                    }
                                                    onClick={() =>
                                                        setSelectedDoctor(d)
                                                    }
                                                    className={`rounded px-3 py-1 text-white text-sm
                            ${
                                selectedDoctor?.userId === d.userId
                                    ? "bg-emerald-600 cursor-default"
                                    : selectedDoctor
                                      ? "bg-gray-600 cursor-not-allowed"
                                      : "bg-purple-600 hover:bg-purple-700"
                            }
                        `}
                                                >
                                                    {selectedDoctor?.userId ===
                                                    d.userId
                                                        ? "Selected"
                                                        : "Select"}
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </CardContent>
                            </Card>

                            {/* Date & Time */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-slate-300">
                                        Appointment Date
                                    </label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal bg-slate-900/50 border-slate-600 text-white hover:bg-slate-800 hover:text-white"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4 text-cyan-400" />
                                                {date
                                                    ? format(date, "yyyy-MM-dd")
                                                    : "Pick a date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                                            <ShadcnCalendar
                                                mode="single"
                                                selected={date}
                                                onSelect={(d) =>
                                                    d && setDate(d)
                                                }
                                                disabled={(day) =>
                                                    day < new Date()
                                                }
                                                initialFocus
                                                className="text-white"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-3 text-slate-300">
                                    Select Time Slot
                                </label>

                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {timeSlots.map((t) => {
                                        const isSelected = time === t;

                                        return (
                                            <div
                                                key={t}
                                                onClick={() => setTime(t)}
                                                className={`cursor-pointer rounded-xl border p-4 transition-all
                        ${
                            isSelected
                                ? "border-cyan-500 bg-cyan-500/10 shadow-lg"
                                : "border-slate-700 bg-slate-900/50 hover:border-slate-500"
                        }
                    `}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <p className="text-white font-medium">
                                                        {t}
                                                    </p>

                                                    {isSelected ? (
                                                        <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                                                    ) : (
                                                        <div className="w-5 h-5 rounded-full border border-slate-600" />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {timeSlots.length === 0 && (
                                        <p className="text-sm text-slate-400 col-span-full">
                                            No slots available for selected date
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= ACTION - WITH LOADING ================= */}
                    <div className="flex justify-end">
                        <Button
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleBookAppointment}
                            disabled={booking || loadingDoctors}
                        >
                            {booking ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Booking...
                                </>
                            ) : (
                                "Book Appointment"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </PatientLayout>
    );
};

/* ================= REUSABLE UI COMPONENTS ================= */
const ReadOnlyField = ({ label, value }) => (
    <div>
        <label className="block text-sm font-medium mb-1 text-slate-400">
            {label}
        </label>
        <div className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white">
            {value}
        </div>
    </div>
);

export default BookAppointment;
