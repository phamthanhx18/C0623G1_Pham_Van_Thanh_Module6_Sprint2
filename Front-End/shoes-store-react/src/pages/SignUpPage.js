import React, { useEffect, useState } from 'react';
import { checkAuthentication } from "../services/AuthService";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import SignUpForm from "../components/SignUpForm"; // Giả sử bạn có một component SignUpForm

function SignUpPage() {
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
        if (userRoles.includes('ROLE_ADMIN')) {
            return <Navigate to="/dashboard" />;
        } else {
            return <Navigate to="/profile" />;
        }
    };

    if (auth === undefined) {
        return <Loading />;
    }

    return auth ? navigateBasedOnRole() : <SignUpForm />; // Hiển thị SignUpForm khi chưa đăng nhập
}

export default SignUpPage;
