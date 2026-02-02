/* eslint-disable no-unused-vars */
import store from "@/Store";
import { warmupSingleService } from "./warmupSingleService";

let warmupStarted = false;

export function warmupAllServices() {
    if (warmupStarted) return;
    warmupStarted = true;

    console.log("[WARMUP] Starting safe service warmup…");

    const services = [
        // Phase 1: Wake gateway first (single, light call)
        {
            service: "gateway",
            url: `${import.meta.env.VITE_GATEWAY_BASE_URL}/actuator/health`,
        },

        // Phase 2: Wake services directly (bypass gateway)
        {
            service: "user",
            url: `${import.meta.env.VITE_USER_SERVICE_URL}/api/user/health`,
        },
        {
            service: "patient",
            url: `${import.meta.env.VITE_PATIENT_SERVICE_URL}/api/patients/health`,
        },
        {
            service: "doctor",
            url: `${import.meta.env.VITE_DOCTOR_SERVICE_URL}/api/doctors/health`,
        },
        {
            service: "therapist",
            url: `${import.meta.env.VITE_THERAPIST_SERVICE_URL}/api/therapists/health`,
        },
    ];

    services.forEach(({ service, url }) => {
        warmupSingleService({
            service,
            url,
            dispatch: store.dispatch,
            getState: store.getState,
            maxWaitMs: 190000, // ~3 minutes
        });
    });
}
