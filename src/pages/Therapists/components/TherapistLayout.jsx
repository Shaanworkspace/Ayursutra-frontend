import Footer from "@/pages/Home/components/Footer";
import TherapistNavbar from "./TherapistNavbar";

export const TherapistLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-50/60 to-teal-100/50 dark:from-gray-900 dark:to-gray-800">
            <TherapistNavbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};
