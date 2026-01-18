import { useEffect } from "react";

export default function OAuthCallback() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const dataParam = params.get("data");

        if (dataParam && window.opener) {
            const data = JSON.parse(decodeURIComponent(dataParam));

            window.opener.postMessage(data, "http://localhost:5173");
            window.close();
        }
    }, []);

    return <p>Signing you in…</p>;
}
