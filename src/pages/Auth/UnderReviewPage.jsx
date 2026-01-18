/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "@/pages/Home/components/navbar";
import Footer from "@/pages/Home/components/Footer";
import { Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function UnderReviewPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="pb-10 pt-30 flex-1 flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-teal-50 dark:from-gray-900 dark:to-gray-900 px-6">
                <div className="max-w-xl text-center bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-2xl border border-gray-100 dark:border-gray-700">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center">
                        <Clock className="w-10 h-10 text-cyan-600 dark:text-cyan-400" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Account Under Review
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        Thank you for registering as a practitioner. Our team is
                        currently reviewing your credentials. This usually takes
                        a short time.
                    </p>

                    <div className="flex items-center justify-center gap-2 text-sm text-cyan-600 dark:text-cyan-400 mb-8">
                        <ShieldCheck className="w-4 h-4" />
                        <span>
                            Your profile will be activated once approved
                        </span>
                    </div>

                    <Link to="/">
                        <Button className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:from-cyan-700 hover:to-teal-700">
                            Go to Home
                        </Button>
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
