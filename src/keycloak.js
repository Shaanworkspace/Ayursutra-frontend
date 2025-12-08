import Keycloak from "keycloak-js";

// Direct hard‑coded Keycloak configuration
const keycloak = new Keycloak({
  url: "http://localhost:8180/",            // Keycloak base URL
  realm: "ayursutra-realm",                // your realm name
  clientId: "ayursutra-client",          // your client ID
});

export default keycloak;