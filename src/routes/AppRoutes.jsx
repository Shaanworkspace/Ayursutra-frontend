import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "../pages/Home/HomePage";
import TherapistPanel from "@/pages/Home/TherapistPanel";
import LoginPage from "@/pages/Home/components/LoginPage";
import SignupPage from "@/pages/Home/components/SignupPage";


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/therapists" element={<TherapistList />} /> */}
                <Route path="/home/therapists" element={<TherapistPanel/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/signup" element={<SignupPage/>} />
            </Routes>
        </BrowserRouter>
    );
}