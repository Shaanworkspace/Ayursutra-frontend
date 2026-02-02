/* eslint-disable no-unused-vars */
import store from "@/Store";
import { warmupSingleService } from "./warmupSingleService";

let warmupStarted = false;

export function warmupAllServices() {
    if (warmupStarted) return;
    warmupStarted = true;

    console.log("[WARMUP] Starting safe service warmup…");

    const services = [
        {
            service: "gateway",
            url: "https://ayursutra-gateway.onrender.com/actuator/health",
        },

        // Phase 2: Wake services directly (NO gateway)
        {
            service: "user",
            url: "https://user-service-2tqh.onrender.com/api/user/health",
        },
        {
            service: "patient",
            url: "https://ayursutra-patient-service.onrender.com/api/patients/health",
        },
        {
            service: "doctor",
            url: "https://ayursutra-doctor-service.onrender.com/api/doctors/health",
        },
        {
            service: "therapist",
            url: "https://therapist-service.onrender.com/api/therapists/health",
        },
    ];

    services.forEach(({ service, url }) => {
        warmupSingleService({
            service,
            url,
            dispatch: store.dispatch,
            getState: store.getState,
            maxWaitMs: 190000,
        });
    });
}
