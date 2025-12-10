/* eslint-disable no-unused-vars */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "./Store/index"; // notice: auto‑resolves index.jsx

import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import { AuthProvider } from "react-oauth2-code-pkce";
import { authConfig } from "./AuthConfig";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* <AuthProvider
            authConfig={authConfig}
            loadingComponent={<div>Loading...</div>}
        > */}
            <Provider store={store}>
                <Toaster position="top-center" richColors closeButton expand />
                {/* <ReactKeycloakProvider
                    authClient={keycloak}
                    initOptions={{
                        onLoad: "check-sso",
                        silentCheckSsoRedirectUri:
                            window.location.origin + "/silent-check-sso.html",
                        checkLoginIframe: false,
                    }}
                > 
                <ReactKeycloakProvider
                    authClient={keycloak}
                    initOptions={{
                        onLoad: "login-required",
                        checkLoginIframe: false, 
                    }}
                >*/}
                    <App />
                {/* </ReactKeycloakProvider> */}
            </Provider>
        {/* </AuthProvider> */}
    </StrictMode>
);
