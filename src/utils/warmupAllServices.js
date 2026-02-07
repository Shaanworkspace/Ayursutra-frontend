/* eslint-disable no-unused-vars */
import store from "@/Store";
import { warmupSingleService } from "./warmupSingleService";

let warmupStarted = false;

export function warmupAllServices() {
    if (warmupStarted) return;
    warmupStarted = true;

    console.log("[WARMUP] AWS Lambda Services");

    const services = [
        {
            service: "patient",
            url: `https://6nwyuohdlj56joe7woofinwrha0kcfkn.lambda-url.ap-south-1.on.aws/api/patients/health`,
        },
        {
            service: "doctor",
            url: `https://drpmkp5mkknuow5k3dvniexpwu0xnhyq.lambda-url.ap-south-1.on.aws/api/doctors/health`,
        },
        {
            service: "therapist",
            url: `https://orxo3htpod3s7itaugd7pzpv3y0hnwrj.lambda-url.ap-south-1.on.aws/api/therapists/health`,
        },
    ];

    services.forEach(({ service, url }) => {
        warmupSingleService({
            service,
            url,
            dispatch: store.dispatch,
            getState: store.getState,
            maxWaitMs: 210000,
        });
    });
}
