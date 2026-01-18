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

const AppointmentDoctor = () => {
    const gateway = import.meta.env.VITE_API_GATEWAY_BASE_URL;
    const profile = useSelector((state) => state.profile.data);
    const [description, setDescription] = useState("");
    const [appointmentType, setAppoitmentType] = useState("");

    // new Date()-> 2026-01-18T10:45:30.456Z
    // const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [date, setDate] = useState(new Date());

    const [time, setTime] = useState("");

    //doctors
    const [doctors, setDoctors] = useState([]);
    const [specialist, setSpecialist] = useState("");
    const [location, setLocation] = useState("");
    const [selectDoctor, setSelectDoctor] = useState("");
    const [selectedDoctorId, setSelectedDoctorId] = useState("");

    const patient = {
        name: profile?.firstName + " " + profile?.lastName,
        email: profile?.email,
        phone: profile?.phoneNumber || "Update Phone . . .",
        patientId: profile?.userId,
        appointmentDate: format(date, "yyyy-MM-dd"),
        appointmentTime: time,
    };

    useEffect(() => {
        axios
            .get(`${gateway}/api/doctors`)
            .then((res) => res.json())
            .then((data) => {
                setDoctors(data);
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

    return (
        <PatientLayout>
            <div className="p-6 lg:p-8 mt-20">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* ================= HEADER ================= */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            Book Appointment
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Fill appointment details and select doctor
                        </p>
                    </div>

                    {/* ================= PATIENT DETAILS ================= */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border p-6 space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <User className="w-5 h-5 text-cyan-600" />
                            Patient Details
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <ReadOnlyField
                                label="Patient Name"
                                value={patient.name}
                            />
                            <ReadOnlyField
                                label="Email"
                                value={patient.email}
                            />
                            <ReadOnlyField
                                label="Phone"
                                value={patient.phone}
                            />
                            <ReadOnlyField
                                label="Patient ID"
                                value={patient.patientId}
                            />
                        </div>
                    </div>

                    {/* ================= APPOINTMENT DETAILS ================= */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border p-6 space-y-6">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <ClipboardList className="w-5 h-5 text-cyan-600" />
                            Appointment Details
                        </h2>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Problem Description
                            </label>
                            <textarea
                                rows={4}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your symptoms or reason for visit"
                                className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 outline-none"
                            />
                        </div>

                        {/* Appointment Type */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Select Specialist
                                </label>
                                <Select onValueChange={setSpecialist}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Specialist" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="In-Person">
                                            In-Person
                                        </SelectItem>
                                        <SelectItem value="Online">
                                            Online
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Select Specialist
                                </label>
                                <Select onValueChange={setSpecialist}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Specialist" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="General Physician">
                                            General Physician
                                        </SelectItem>
                                        <SelectItem value="Cardiologist">
                                            Cardiologist
                                        </SelectItem>
                                        <SelectItem value="Dermatologist">
                                            Dermatologist
                                        </SelectItem>
                                        <SelectItem value="Orthopedic">
                                            Orthopedic
                                        </SelectItem>
                                        <SelectItem value="Neurologist">
                                            Neurologist
                                        </SelectItem>
                                        <SelectItem value="Pediatrician">
                                            Pediatrician
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Doctor Selection */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Select Doctor
                            </label>
                            <Select onValueChange={setSelectDoctor}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Doctor" />
                                </SelectTrigger>

                                <SelectContent>
                                    {filteredDoctors.map((doc) => (
                                        <SelectItem key={doc.id} value={doc.id}>
                                            {doc.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Date & Time */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Appointment Date
                                </label>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date
                                                ? format(date, "yyyy-MM-dd")
                                                : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-auto p-0">
                                        <ShadcnCalendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            disabled={(day) => day < new Date()}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Time Slot
                                </label>

                                <Select onValueChange={setTime}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select time slot" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="09:00">
                                            09:00 AM - 09:30 AM
                                        </SelectItem>
                                        <SelectItem value="10:00">
                                            10:00 AM - 10:30 AM
                                        </SelectItem>
                                        <SelectItem value="11:00">
                                            11:00 AM - 11:30 AM
                                        </SelectItem>
                                        <SelectItem value="14:00">
                                            02:00 PM - 02:30 PM
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* ================= ACTION ================= */}
                    <div className="flex justify-end">
                        <Button className="bg-cyan-600 hover:bg-cyan-700 px-8">
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
        <label className="block text-sm font-medium mb-1">{label}</label>
        <div className="px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
            {value}
        </div>
    </div>
);

const SelectField = ({ label, options }) => (
    <div>
        <label className="block text-sm font-medium mb-2">{label}</label>
        <select className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 outline-none">
            <option>Select {label}</option>
            {options.map((opt, idx) => (
                <option key={idx}>{opt}</option>
            ))}
        </select>
    </div>
);

export default AppointmentDoctor;
