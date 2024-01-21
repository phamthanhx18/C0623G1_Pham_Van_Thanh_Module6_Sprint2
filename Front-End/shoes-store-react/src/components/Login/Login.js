import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
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
            .required('Trường tên đăng nhập là bắt buộc.'),
        password: Yup.string()
            .required('Trường mật khẩu là bắt buộc.')
    });
    const handleSubmit = async (values, { setSubmitting,setFieldError }) => {
        try {
            await dispatch(loginUser(values));
            toast.success("Đăng nhập thành công !")
            const preLoginPath = sessionStorage.getItem('preLoginPath') || '/';
            navigate(preLoginPath);
        } catch (error) {
            setSubmitting(false);
            setFieldError("password",'Tên đăng nhập hoặc mật khẩu không chính xác')
        }
    };

    return (
        <>
            <Header/>
            <div className="container my-5" style={{minHeight: '80vh'}}>
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <h4>Xin chào,</h4>
                        <p>Vui lòng đăng nhập để sử dụng các dịch vụ của chúng tôi</p>
                        <Formik
                            initialValues={{ username: '', password: '' }}
                            validationSchema={loginSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting  }) => (
                                <Form>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="username">Tên đăng nhập</label>
                                        <Field type="text" name="username" className="form-control"/>
                                        <ErrorMessage name="username" className="text-danger" component="div" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="password">Mật khẩu</label>
                                        <Field type="text" name="password" className="form-control"/>
                                        <ErrorMessage name="password" className="text-danger" component="div" />
                                    </div>

                                    <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                        Đăng nhập
                                    </button>
                                </Form>
                            )}
                        </Formik>
                        <p className="mt-2">Bạn chưa có tài khoản ? Đăng kí <Link to="/sign-up">tại đây</Link></p>
                    </div>
                    <div className="col-lg-6">
                        <img src="/images/login.jpg" alt="" width={'100%'}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Login;