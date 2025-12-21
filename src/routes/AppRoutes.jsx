// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "@/pages/Auth/LoginPage";
import SignupPage from "@/pages/Auth/SignupPage";
import SelectRole from "@/pages/Auth/SelectRole";
import ProtectedRoute from "./ProtectedRoute";

import PatientProfile from "@/pages/Patients/PatientProfile";
import PatientDashboard from "@/pages/Patients/PatientDashboard";
import DoctorProfile from "@/pages/Doctors/DoctorProfile";
import DoctorDashboard from "@/pages/Doctors/DoctorDashboard";
import TherapistDashboard from "@/pages/Therapists/TherapistDashboard";
import TherapistProfile from "@/pages/Therapists/TherapistProfile";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* User should go here first to choose role */}
                <Route path="/select-role" element={<SelectRole />} />
                {/* Signup always expects ?role=... */}
                <Route path="/signup" element={<SignupPage />} />

                {/* Doctor */}
                <Route
                    path="/doctor/dashboard"
                    element={
                        <ProtectedRoute role="DOCTOR">
                            <DoctorDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/doctor/profile"
                    element={
                        <ProtectedRoute role="DOCTOR">
                            <DoctorProfile />
                        </ProtectedRoute>
                    }
                />

                {/* Patient */}
                <Route
                    path="/patient/dashboard"
                    element={
                        <ProtectedRoute role="PATIENT">
                            <PatientDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/patient/profile"
                    element={
                        <ProtectedRoute role="PATIENT">
                            <PatientProfile />
                        </ProtectedRoute>
                    }
                />

                {/* Therapist */}
                <Route
                    path="/therapist/dashboard"
                    element={
                        <ProtectedRoute role="THERAPIST">
                            <TherapistDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/therapist/profile"
                    element={
                        <ProtectedRoute role="THERAPIST">
                            <TherapistProfile />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
