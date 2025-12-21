import Footer from "@/pages/Home/components/Footer";
import DoctorNavbar from "./DoctorNavbar";

export const DoctorLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-50/60 to-teal-100/50 dark:from-gray-900 dark:to-gray-800">
            <DoctorNavbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};
