/* eslint-disable no-unused-vars */
import React, { use, useEffect, useMemo, useState } from "react";
import { PatientLayout } from "../components/PatientLayout";
import {
    User,
    Phone,
    Mail,
    Calendar,
    Stethoscope,
    ClipboardList,
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

const AppointmentDoctor = () => {
    const gateway = import.meta.env.VITE_API_GATEWAY_BASE_URL;
    const reduxUser = useSelector((state) => state.auth.userResponse);
    const reduxProfile = useSelector((state) => state.profile.data);
    const auth = useSelector((state) => state.auth);

    const profile =
        JSON.parse(localStorage.getItem("profile")).data || reduxProfile;
    const user = JSON.parse(localStorage.getItem("userResponse")) || reduxUser;

    const [description, setDescription] = useState("");
    const [appointmentType, setAppoitmentType] = useState("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("");

    //doctors
    const [doctors, setDoctors] = useState([]);
    const [specialist, setSpecialist] = useState("");
    const [location, setLocation] = useState("");
    const [selectDoctor, setSelectDoctor] = useState("");
    const [selectedDoctorId, setSelectedDoctorId] = useState("");

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
        axios.get(`${gateway}/api/doctors`).then((res) => {
            console.log("Doc : ", res.data);
            setDoctors(res.data);
        });
    }, []);

    const filteredDoctors = useMemo(() => {
        let result = doctors;
        if (specialist) {
            result = result.filter((doc) => doc.speciality === specialist);
        }
        if (location) {
            result = result.filter((doc) => doc.location === location);
        }
        return result;
    }, [doctors, specialist, location]);

    // Booking appointment
    const handleBookAppointment = async () => {
        if (!selectDoctor) {
            toast.error("Please select a doctor");
            return;
        }
        if (!description) {
            toast.error("Please enter description");
            return;
        }
        if (!date) {
            toast.error("Please select a date");
            return;
        }

        const selectedDoctor = doctors?.find(
            (doc) => doc.userId == selectDoctor,
        );

        const dataForAppointment = {
            patientId: patient?.patientId,
            doctorId: selectDoctor,
            doctorName: selectedDoctor.name,
            visitDate: format(date, "yyyy-MM-dd"),
            symptoms: description,
        };

        console.log("Data for Appointment : ", dataForAppointment);

        const res = axios.post(
            `${gateway}/api/patients/medical-records/book`,
            dataForAppointment,
            {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            },
        );

        toast.success("Booked Appointment !!! ");
    };

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
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-slate-300">
                                        Select Availability
                                    </label>
                                    <Select onValueChange={setAppoitmentType}>
                                        <SelectTrigger className="w-full bg-slate-900/50 border-slate-600 text-white">
                                            <SelectValue placeholder="Select Availability" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700">
                                            <SelectItem
                                                value="In-Person"
                                                className="text-white hover:bg-slate-700"
                                            >
                                                In-Person
                                            </SelectItem>
                                            <SelectItem
                                                value="Online"
                                                className="text-white hover:bg-slate-700"
                                            >
                                                Online
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-slate-300">
                                        Select Specialist
                                    </label>
                                    <Select onValueChange={setSpecialist}>
                                        <SelectTrigger className="w-full bg-slate-900/50 border-slate-600 text-white">
                                            <SelectValue placeholder="Select Specialist" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700">
                                            <SelectItem
                                                value="General Physician"
                                                className="text-white hover:bg-slate-700"
                                            >
                                                General Physician
                                            </SelectItem>
                                            <SelectItem
                                                value="Cardiologist"
                                                className="text-white hover:bg-slate-700"
                                            >
                                                Cardiologist
                                            </SelectItem>
                                            <SelectItem
                                                value="Dermatologist"
                                                className="text-white hover:bg-slate-700"
                                            >
                                                Dermatologist
                                            </SelectItem>
                                            <SelectItem
                                                value="Orthopedic"
                                                className="text-white hover:bg-slate-700"
                                            >
                                                Orthopedic
                                            </SelectItem>
                                            <SelectItem
                                                value="Neurologist"
                                                className="text-white hover:bg-slate-700"
                                            >
                                                Neurologist
                                            </SelectItem>
                                            <SelectItem
                                                value="Pediatrician"
                                                className="text-white hover:bg-slate-700"
                                            >
                                                Pediatrician
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Doctor Selection */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-slate-300">
                                    Select Doctor
                                </label>
                                <Select onValueChange={setSelectDoctor}>
                                    <SelectTrigger className="w-full bg-slate-900/50 border-slate-600 text-white">
                                        <SelectValue placeholder="Select Doctor" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700">
                                        {filteredDoctors.map((doc) => (
                                            <SelectItem
                                                key={doc.userId}
                                                value={doc.userId}
                                                className="text-white hover:bg-slate-700"
                                            >
                                                {doc.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

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
                                                onSelect={setDate}
                                                disabled={(day) =>
                                                    day < new Date()
                                                }
                                                initialFocus
                                                className="text-white"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-slate-300">
                                        Time Slot
                                    </label>
                                    <Select onValueChange={setTime}>
                                        <SelectTrigger className="w-full bg-slate-900/50 border-slate-600 text-white">
                                            <SelectValue placeholder="Select time slot" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700">
                                            <SelectItem
                                                value="09:00"
                                                className="text-white hover:bg-slate-700"
                                            >
                                                09:00 AM - 09:30 AM
                                            </SelectItem>
                                            <SelectItem
                                                value="10:00"
                                                className="text-white hover:bg-slate-700"
                                            >
                                                10:00 AM - 10:30 AM
                                            </SelectItem>
                                            <SelectItem
                                                value="11:00"
                                                className="text-white hover:bg-slate-700"
                                            >
                                                11:00 AM - 11:30 AM
                                            </SelectItem>
                                            <SelectItem
                                                value="14:00"
                                                className="text-white hover:bg-slate-700"
                                            >
                                                02:00 PM - 02:30 PM
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= ACTION ================= */}
                    <div className="flex justify-end">
                        <Button
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                            onClick={handleBookAppointment}
                        >
                            Book Appointment
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

const SelectField = ({ label, options }) => (
    <div>
        <label className="block text-sm font-medium mb-2 text-slate-300">
            {label}
        </label>
        <select className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-900/50 text-white focus:ring-2 focus:ring-cyan-500 outline-none">
            <option>Select {label}</option>
            {options.map((opt, idx) => (
                <option key={idx}>{opt}</option>
            ))}
        </select>
    </div>
);

export default AppointmentDoctor;
