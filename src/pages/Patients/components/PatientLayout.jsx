import Footer from "@/pages/Home/components/Footer";
import { PatientNavbar } from "./PatientNavbar";

export const PatientLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-50/60 to-teal-100/50 dark:from-gray-900 dark:to-gray-800">
            <PatientNavbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};
