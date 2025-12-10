import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "@/pages/Auth/LoginPage";
import SignupPage from "@/pages/Auth/SignupPage";
import ProtectedRoute from "./ProtectedRoute"; 
import SelectRole from "@/pages/Auth/SelectRole";
import { PatientProfile } from "@/pages/Patients/PatientProfile";
import { PatientDashboard } from "@/pages/Patients/PatientDashboard";
import { DoctorProfile } from "@/pages/Doctors/DoctorProfile";
import { DoctorDashboard } from "@/pages/Doctors/DoctorDashboard";
import { TherapistDashboard } from "@/pages/Therapists/TherapistDashboard";
import { TherapistProfile } from "@/pages/Therapists/TherapistProfile";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/select-role" element={<SelectRole />} />


                {/* Doctor Protected Routes */}
                <Route
                    path="/doctor/dashboard"
                    element={
                        <ProtectedRoute>
                            <DoctorDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/doctor/profile"
                    element={
                        <ProtectedRoute>
                            <DoctorProfile />
                        </ProtectedRoute>
                    }
                />

                {/* Patient Protected Routes */}
                <Route
                    path="/patient/dashboard"
                    element={
                        <ProtectedRoute>
                            <PatientDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/patient/profile"
                    element={
                        <ProtectedRoute>
                            <PatientProfile />
                        </ProtectedRoute>
                    }
                />

                {/* Therapist Protected Routes */}
                <Route
                    path="/therapist/dashboard"
                    element={
                        <ProtectedRoute>
                            <TherapistDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/therapist/profile"
                    element={
                        <ProtectedRoute>
                            <TherapistProfile />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
