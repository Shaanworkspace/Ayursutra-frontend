import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import LoginPage from "@/pages/Auth/LoginPage";
import SignupPage from "@/pages/Auth/SignupPage";
import SelectRole from "@/pages/Auth/SelectRole";
import ProtectedRoute from "./ProtectedRoute";

import PatientProfile from "@/pages/Patients/Pages/PatientProfile";
import PatientDashboard from "@/pages/Patients/PatientDashboard";
import DoctorProfile from "@/pages/Doctors/DoctorProfile";
import DoctorDashboard from "@/pages/Doctors/DoctorDashboard";
import TherapistDashboard from "@/pages/Therapists/TherapistDashboard";
import TherapistProfile from "@/pages/Therapists/TherapistProfile";
import OAuthCallback from "@/pages/Auth/OAuthCallback";
import UnderReviewPage from "@/pages/Auth/UnderReviewPage";
import RejectedPage from "@/pages/Auth/RejectedPage";
import TherapistSessionDetail from "@/pages/Therapists/Page/TherapistSessionDetail";
import TherapistSchedule from "@/pages/Therapists/SlotsComponents/TherapistSchedule";
import PatientMedicalRecordDetail from "@/pages/Patients/Pages/PatientMedicalRecordDetail";
import PatientAppointments from "@/pages/Patients/Pages/PatientAppointments";
import PatientHealthRecords from "@/pages/Patients/Pages/PatientHealthRecords";
import NotFound from "@/components/common/NotFound";
import DoctorAppointments from "@/pages/Doctors/Pages/DoctorAppointments";
import DoctorPatients from "@/pages/Doctors/Pages/DoctorPatients";
import DoctorPatientDetail from "@/pages/Doctors/Pages/DoctorPatientDetail";
import TherapistSessions from "@/pages/Therapists/Page/TherapistSessions";
import TherapistSessionNotes from "@/pages/Therapists/Page/TherapistSessionNotes";
import TherapistClientProfile from "@/pages/Therapists/Page/TherapistClientProfile";
import DoctorAppointmentDetail from "@/pages/Doctors/components/DoctorAppointmentDetail";
import BookAppointment from "@/pages/Patients/Pages/BookAppointment";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/oauth/callback" element={<OAuthCallback />} />
                {/* Public */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* User should go here first to choose role */}
                <Route path="/select-role" element={<SelectRole />} />
                {/* Signup always expects ?role=... */}
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/under-review" element={<UnderReviewPage />} />
                <Route path="/rejected" element={<RejectedPage />} />
                {/* fallback – ALWAYS LAST */}
                <Route path="*" element={<NotFound />} />

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
                <Route
                    path="/doctor/appointments"
                    element={
                        <ProtectedRoute role="DOCTOR">
                            <DoctorAppointments />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/doctor/patients/:patientId"
                    element={
                        <ProtectedRoute role="DOCTOR">
                            <DoctorPatientDetail />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/doctor/patients"
                    element={
                        <ProtectedRoute role="DOCTOR">
                            <DoctorPatients />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/doctor/appointments/:id"
                    element={
                        <ProtectedRoute role="DOCTOR">
                            <DoctorAppointmentDetail />
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
                <Route
                    path="/patient/appointment-doc"
                    element={
                        <ProtectedRoute role="PATIENT">
                            <BookAppointment />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/patient/medical-records/:id"
                    element={
                        <ProtectedRoute role="PATIENT">
                            <PatientMedicalRecordDetail />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/patient/appointments"
                    element={
                        <ProtectedRoute role="PATIENT">
                            <PatientAppointments />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/patient/health-records"
                    element={
                        <ProtectedRoute role="PATIENT">
                            <PatientHealthRecords />
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
                <Route
                    path="/therapist/sessions"
                    element={
                        <ProtectedRoute role="THERAPIST">
                            <TherapistSessions />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/therapist/sessions/:id/notes"
                    element={
                        <ProtectedRoute role="THERAPIST">
                            <TherapistSessionNotes />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/therapist/sessions/:id"
                    element={
                        <ProtectedRoute role="THERAPIST">
                            <TherapistSessionDetail />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/therapist/clients/:patientId"
                    element={
                        <ProtectedRoute role="THERAPIST">
                            <TherapistClientProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/therapist/schedule"
                    element={
                        <ProtectedRoute role="THERAPIST">
                            <TherapistSchedule />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
