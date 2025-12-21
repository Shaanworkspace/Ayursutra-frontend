import axios from "@/lib/axios";

export function warmupSilent({ url, timeout = 120000, interval = 5000 }) {
    let stopped = false;
    const startTime = Date.now();

    console.log(`[WARMUP] Started warmup for → ${url}`);
    console.log(`[WARMUP] Timeout: ${timeout}ms | Interval: ${interval}ms`);

    return new Promise((resolve) => {
        const poll = async () => {
            console.log(`[WARMUP] Checking service → ${url}`);

            try {
                const res = await axios.get(url, { timeout: 4000 });

                console.log(
                    `[WARMUP] Yup !! Service UP → ${url}`,
                    "| Status:",
                    res.status,
                    "| Response:",
                    res.data
                );

                stop();
                resolve(true);
            } catch (err) {
                console.log(
                    `[WARMUP]  Service not ready yet → ${url}`,
                    "| Reason:",
                    err?.code || err?.message
                );
            }
        };

        const stop = () => {
            if (stopped) return;
            stopped = true;

            const totalTime = Date.now() - startTime;

            clearInterval(intervalId);
            clearTimeout(timeoutId);

            console.log(
                `[WARMUP]   XX Stopped warmup for → ${url}`,
                `| Total time: ${totalTime}ms`
            );
        };

        const intervalId = setInterval(poll, interval);

        const timeoutId = setTimeout(() => {
            if (!stopped) {
                const totalTime = Date.now() - startTime;

                console.warn(
                    `[WARMUP] !!!! Timeout reached for → ${url}`,
                    `| Total time: ${totalTime}ms`
                );

                stop();
                resolve(false);
            }
        }, timeout);

        // first immediate check
        poll();
    });
}
