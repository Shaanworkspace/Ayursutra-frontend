/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "@/pages/Home/components/navbar";
import Footer from "@/pages/Home/components/Footer";
import { XCircle, MailWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export default function RejectedPage() {
    const location = useLocation();
    const reason =
        location.state?.reason ||
        "Your request did not meet our verification requirements.";

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:to-gray-900 px-6">
                <div className="max-w-xl text-center bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-2xl border border-gray-100 dark:border-gray-700">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                        <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Registration Rejected
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        Unfortunately, your registration could not be approved
                        at this time.
                    </p>

                    <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl px-4 py-3 mb-6 text-sm">
                        <strong>Reason:</strong> {reason}
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
                        <MailWarning className="w-4 h-4" />
                        <span>You may contact support for clarification</span>
                    </div>

                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link to="/contact">
                            <Button variant="outline">Contact Support</Button>
                        </Link>
                        <Link to="/">
                            <Button className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
