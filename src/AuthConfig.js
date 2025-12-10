export const authConfig = {
    clientId: "ayursutra-client",
    authorizationEndpoint:
        "http://localhost:8180/realms/ayursutra-realm/protocol/openid-connect/auth",
    tokenEndpoint:
        "http://localhost:8180/realms/ayursutra-realm/protocol/openid-connect/token",
    redirectUri: "http://localhost:5173",
    scope: "openid profile email offline_access",
    onRefreshTokenExpire: (event) =>event.logIn(),
};
