import axios from "@/lib/axios";
import { toast } from "sonner";

export function warmupService({
    url,
    label,
    timeout = 120000, // max wait: 2 minutes
    interval = 5000, // poll every 5 seconds
}) {
    const toastId = toast.info(`Starting ${label} service...`);

    let stopped = false;
    let intervalId;
    let timeoutId;

    const stop = () => {
        if (stopped) return;
        stopped = true;
        clearInterval(intervalId);
        clearTimeout(timeoutId);
    };

    const poll = async () => {
        try {
            // ANY 200 response = service is UP
            await axios.get(url, { timeout: 4000 });

            stop();
            toast.success(`${label} service is ready`, { id: toastId });
        } catch {
            // service still waking up → keep polling silently
        }
    };

    // start polling
    intervalId = setInterval(poll, interval);

    // hard stop after timeout
    timeoutId = setTimeout(() => {
        stop();
        toast.error(`${label} service is taking too long`, {
            id: toastId,
        });
    }, timeout);

    // fire immediately (important)
    poll();
}
