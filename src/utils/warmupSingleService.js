/* eslint-disable no-unused-vars */
import axios from "axios";
import { setServiceStatus } from "@/Store/Slices/serviceStatusSlice";
import { toast } from "sonner";

export async function warmupSingleService({
    service,
    url,
    dispatch,
    getState,
    maxWaitMs = 180000, // 3 minutes
}) {
    const currentStatus = getState().serviceStatus[service];

    if (currentStatus === "up" || currentStatus === "waking") {
        return;
    }

    dispatch(setServiceStatus({ service, status: "waking" }));

    toast.info(`${service.toUpperCase()} service is starting`, {
        duration: 6000,
    });

    const startTime = Date.now();

    while (Date.now() - startTime < maxWaitMs) {
        try {
            await axios.get(url, {
                timeout: 120000, // allow Spring Boot startup
            });

            dispatch(setServiceStatus({ service, status: "up" }));
            toast.success(`${service.toUpperCase()} Service UP`);
            return;
        } catch {
            // ⏳ Wait FULL 3 minutes before retry (no spamming)
            await new Promise((r) => setTimeout(r, 180000));
        }
    }

    dispatch(setServiceStatus({ service, status: "down" }));

    toast.error(
        `${service.toUpperCase()} service is still starting. Please refresh in a moment.`,
        { duration: 8000 },
    );
}
