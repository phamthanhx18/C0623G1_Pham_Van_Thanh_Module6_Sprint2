import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import Login from "../components/Login/Login";
import {checkAuthentication} from "../services/AuthService";
import Loading from "../components/Loading/Loading";

function LoginPage() {
    const [auth, setAuth] = useState(undefined);
    const [userRoles, setUserRoles] = useState([]);
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const userData = await checkAuthentication();
            setAuth(true);
            setUserRoles(userData.map(item => item.name));
        } catch (e) {
            setAuth(false);
        }
    };

    const navigateBasedOnRole = () => {
        if (userRoles.includes('ROLE_MANAGER')) {
            return <Navigate to="/dashboard"/>;
        } else {
            return <Navigate to="/profile"/>;
        }
    };

    if (auth === undefined) {
        return <Loading/>;
    }
    return auth === false ? <Login/> : navigateBasedOnRole();
}

export default LoginPage;
