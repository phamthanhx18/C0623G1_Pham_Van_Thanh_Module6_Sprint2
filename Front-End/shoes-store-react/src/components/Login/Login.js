import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import Header from "../Header/Header";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Footer from "../Footer/Footer";
import {loginUser} from "../../redux/middlewares/AuthMiddleware";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginSchema = Yup.object().shape({
        username: Yup.string()
            .required('Required'),
        password: Yup.string()
            .required('Required')
    });
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await dispatch(loginUser(values));
            toast.success("Đăng nhập thành công !")
            navigate("/dashboard");
        } catch (error) {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Header/>
            <div className="container my-5">
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="username">Tên đăng nhập</label>
                                <Field type="text" name="username" className="form-control"/>
                                <ErrorMessage name="username" component="div" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="password">Mật khẩu</label>
                                <Field type="text" name="password" className="form-control"/>
                                <ErrorMessage name="password" component="div" />
                            </div>

                            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            <Footer/>
        </>
    );
}

export default Login;