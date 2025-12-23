/* eslint-disable no-unused-vars */
import axios from "axios";
import { setServiceStatus } from "@/Store/Slices/serviceStatusSlice";
import { toast } from "sonner";

export async function warmupSingleService({
    service,
    url,
    dispatch,
    getState,
    timeout = 130000,
}) {
    const currentStatus = getState().serviceStatus[service];

    if (currentStatus === "up" || currentStatus === "waking") {
        console.log(`[WARMUP] ${service} already ${currentStatus}, skipping`);
        toast.info(`[WARMUP] ${service} already ${currentStatus}, skipping`);
        return true;
    }

    console.log(`[WARMUP] Checking ${service} service...`);
    toast.info(`[WARMUP] Checking ${service} service...`);
    dispatch(setServiceStatus({ service, status: "waking" }));

    const start = Date.now();

    while (Date.now() - start < timeout) {
        try {
            await axios.get(url, { timeout: 120000 });

            console.log(`[WARMUP] ${service} service is UP`);
            toast.info(`[WARMUP] ${service} service is UP`);
            dispatch(setServiceStatus({ service, status: "up" }));
            return true;
        } catch (err) {
            console.log(`[WARMUP] ${service} not ready, retrying...`);
            toast.info(`[WARMUP] ${service} not ready, retrying...`);
            await new Promise((r) => setTimeout(r, 8000));
        }
    }

    console.log(
        `[WARMUP] ${service} FAILED to start within ${timeout / 1000}s`
    );
    toast.info(`[WARMUP] ${service} FAILED to start within ${timeout / 1000}s`);
    dispatch(setServiceStatus({ service, status: "down" }));
    return false;
}
