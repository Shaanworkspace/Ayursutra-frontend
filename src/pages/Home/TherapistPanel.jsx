/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-irregular-whitespace */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import TherapistCard from "./components/TherapistCard";
import Navbar from "./components/navbar";
import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";

export default function TherapistPanel() {
    const [therapists, setTherapists] = useState([]);
    const [loading, setLoading] = useState(true);
    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
        console.log(
            "Initialized:",
            initialized,
            " Authenticated:",
            keycloak.authenticated
        );
        if (initialized && !keycloak.authenticated) {
            console.log("➡️ Redirecting to Keycloak login");
            keycloak.login();
        }
    }, [initialized, keycloak]);

    // Step 2: Fetch data once authenticated
    useEffect(() => {
        if (initialized && keycloak.authenticated && keycloak.token) {
            console.log("✅ Authenticated, fetching therapists");
            const baseUrl = import.meta.env.VITE_API_GATEWAY_BASE_URL;
            setLoading(true);

            axios
                .get(`${baseUrl}/api/therapists`, {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`,
                    },
                })
                .then((res) => {
                    console.log("✅ Fetched data:", res.data);
                    setTherapists(res.data);
                })
                .catch((err) => {
                    console.error("❌ Error fetching therapists:", err);
                })
                .finally(() => setLoading(false));
        }
    }, [initialized, keycloak.authenticated, keycloak.token]);

    // 💡 Step 3: Loading Spinner
    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50/60 to-teal-100/50">
                <div className="text-cyan-700 font-semibold animate-pulse">
                    Fetching therapists…
                </div>
            </div>
        );
    }

    // 💡 Step 4: If data is empty
    if (therapists.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <Navbar />
                <h2 className="text-2xl mb-2">No Therapists Found</h2>
                <Button onClick={() => window.location.reload()}>
                    Refresh
                </Button>
            </div>
        );
    }

    // 💡 Step 5: Display the therapist list
    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50/80 to-teal-100/60 pt-28 pb-20">
            <Navbar />
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold text-center mb-10">
                    Meet Our{" "}
                    <span className="text-cyan-600">Therapy Experts</span>
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {therapists.map((t) => (
                        <TherapistCard key={t.id} therapist={t} />
                    ))}
                </div>
            </div>
        </div>
    );
}
