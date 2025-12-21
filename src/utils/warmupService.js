import axios from "@/lib/axios";
import { toast } from "sonner";

export async function warmupService({
    url,
    label,
    timeout = 120000,
    interval = 6000,
}) {
    const toastId = toast.loading(`Starting ${label} service…`);

    let isUp = false;

    return new Promise((resolve, reject) => {
        const poll = async () => {
            try {
                await axios.get(url, { timeout: 5000 });
                if (!isUp) {
                    isUp = true;
                    toast.success(`${label} service is ready`, { id: toastId });
                    clearInterval(intervalId);
                    clearTimeout(timeoutId);
                    resolve(true);
                }
            } catch {
                // silently wait
            }
        };

        const intervalId = setInterval(poll, interval);

        const timeoutId = setTimeout(() => {
            if (!isUp) {
                toast.error(`${label} service is taking too long`, {
                    id: toastId,
                });
                clearInterval(intervalId);
                reject(false);
            }
        }, timeout);

        poll();
    });
}
