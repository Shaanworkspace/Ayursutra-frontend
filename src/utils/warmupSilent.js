import axios from "@/lib/axios";

export async function warmupSilent({ url, timeout = 120000 }) {
    const start = Date.now();

    while (Date.now() - start < timeout) {
        try {
            await axios.get(url, { timeout: 5000 });
            return true;
        } catch {
            await new Promise((r) => setTimeout(r, 5000));
        }
    }

    return false;
}
