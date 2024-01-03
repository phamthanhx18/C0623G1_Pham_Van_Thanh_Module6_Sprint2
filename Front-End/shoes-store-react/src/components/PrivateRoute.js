import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {checkAuthentication} from "../services/AuthService";
import Loading from "./Loading/Loading";
const PrivateRoute = ({ Component }) => {
    const [auth, setAuth] = useState(undefined);
    useEffect(() => {
        checkAuth();
    },[]);

    const checkAuth = async () => {
        try {
            await checkAuthentication();
            setAuth(true); // Xác thực thành công
        } catch (e) {
            setAuth(false)
        }
    };

    if (auth === undefined) {
        return <Loading/>;
    }

    return auth ? <Component /> : <Navigate to="/login" />;
}

export default PrivateRoute;
