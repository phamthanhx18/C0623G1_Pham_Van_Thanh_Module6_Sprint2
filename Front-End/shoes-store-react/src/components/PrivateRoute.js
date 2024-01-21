import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuthentication } from "../services/AuthService";
import Loading from "./Loading/Loading";

const PrivateRoute = ({ Component, allowedRoles }) => {
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

    const isAuthorized = () => {
        if (allowedRoles === 'ALL') {
            return true;
        } else if (Array.isArray(allowedRoles)) {
            return userRoles.some(role => allowedRoles.includes(role));
        } else {
            return userRoles.includes(allowedRoles);
        }
    }

    if (auth === undefined) {
        return <Loading />;
    }

    if (auth && isAuthorized()) {
        return <Component />;
    }

    return <Navigate to={auth ? "/unauthorized" : "/login"} />;
}

export default PrivateRoute;
