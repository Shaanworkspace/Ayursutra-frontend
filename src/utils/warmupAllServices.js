/* eslint-disable no-unused-vars */
import store from "@/Store";
import { warmupSingleService } from "./warmupSingleService";

let warmupStarted = false;

export function warmupAllServices() {
    if (warmupStarted) return;
    warmupStarted = true;

    console.log("[WARMUP] Starting controlled service warmup…");

    const baseApi = import.meta.env.VITE_API_GATEWAY_BASE_URL;

    const services = [
        { service: "user", url: `${baseApi}/api/user/health` },
        { service: "patient", url: `${baseApi}/api/patients/health` },
        { service: "doctor", url: `${baseApi}/api/doctors/health` },
        { service: "therapist", url: `${baseApi}/api/therapists/health` },
    ];

    services.forEach(({ service, url }) => {
        warmupSingleService({
            service,
            url,
            dispatch: store.dispatch,
            getState: store.getState,
            maxWaitMs: 180000, // 3 minutes HARD LIMIT
        });
    });
}
