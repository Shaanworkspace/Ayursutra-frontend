import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Toaster position="top-center" richColors closeButton expand />
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={{
                onLoad: "login-required",
                checkLoginIframe: false,
            }}
        >
            <App />
        </ReactKeycloakProvider>
    </StrictMode>
);
