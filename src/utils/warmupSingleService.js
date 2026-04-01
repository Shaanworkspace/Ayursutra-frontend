/* eslint-disable no-unused-vars */
import axios from "axios";
import { setServiceStatus } from "@/Store/Slices/serviceStatusSlice";
import { toast } from "sonner";

export async function warmupSingleService({
    service,
    url,
    dispatch,
    getState,
    maxWaitMs = 180000,
}) {
    const currentStatus = getState().serviceStatus[service];

    if (currentStatus === "up" || currentStatus === "waking") {
        return;
    }

    dispatch(setServiceStatus({ service, status: "waking" }));

    const startTime = Date.now();

    while (Date.now() - startTime < maxWaitMs) {
        try {
            await axios.get(url, {
                timeout: 120000, // allow Spring Boot startup
            });

            dispatch(setServiceStatus({ service, status: "up" }));
            toast.success(`${service.toUpperCase()} Micro-service UP`);
            return;
        } catch {
            await new Promise((r) => setTimeout(r, 180000));
        }
    }

    dispatch(setServiceStatus({ service, status: "down" }));
    console.log("Please restart");
}
