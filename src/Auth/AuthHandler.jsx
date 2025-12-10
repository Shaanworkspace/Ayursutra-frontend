/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import { logout, setCredentials } from "@/Store/Slices/authSlice";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";

const AuthHandler = () => {
    const { token, tokenData, logIn, logOut, isAuthenticated } = useAuthContext();
    const dispatch = useDispatch();
    const [authReady, setAuthReady] = useState(false);
    useEffect(() => {
        // When there’s an access token, store it
        if (token && isAuthenticated) {
            dispatch(setCredentials({ token, user: tokenData }));
            // setAuthReady(true); -> Problem/ Rule: we can't make this directly here as The body of an effect shouldn’t cause another immediate re-render unless it’s responding to an external event.

            // Solution : defer state change — runs after this render commit
            setTimeout(() => setAuthReady(true), 0);
        }
        else {
            dispatch(logout());
            setTimeout(() => setAuthReady(true), 0);
        }
    }, [token, tokenData, isAuthenticated, dispatch]);
    return <div>AuthHandler</div>;
};

export default AuthHandler;
