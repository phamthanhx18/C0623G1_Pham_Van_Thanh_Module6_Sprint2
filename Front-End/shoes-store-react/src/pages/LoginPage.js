import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import Login from "../components/Login/Login";
import {checkAuthentication} from "../services/AuthService";
import Loading from "../components/Loading/Loading";

function LoginPage() {
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
    return auth === false ? <Login/> : <Navigate to="/dashboard"/>;
}

export default LoginPage;
