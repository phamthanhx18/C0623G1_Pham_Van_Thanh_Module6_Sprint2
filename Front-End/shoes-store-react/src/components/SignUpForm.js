import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import axios from "axios";

// import { registerUser } from "../../redux/middlewares/AuthMiddleware"; // Giả sử bạn có hàm này

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        address: '',
        phone: '',
        birthday: '',
        gender: false
    }
    const signUpSchema = Yup.object().shape({
        username: Yup.string().required('Trường tên đăng nhập là bắt buộc.'),
        email: Yup.string().email('Email không hợp lệ.').required('Trường email là bắt buộc.'),
        password: Yup.string().required('Trường mật khẩu là bắt buộc.'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp.').required('Trường xác nhận mật khẩu là bắt buộc.'),
        name: Yup.string().required('Trường tên là bắt buộc.'),
        address: Yup.string().required('Trường địa chỉ là bắt buộc.'),
        phone: Yup.string().required('Trường số điện thoại là bắt buộc.'),
        birthday: Yup.date().required('Trường ngày sinh là bắt buộc.'),
        gender: Yup.boolean().required('Trường giới tính là bắt buộc.'),
    });

    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            await axios.post("http://localhost:8080/api/sign-up", values);
            toast.success("Đăng kí thành công");
            navigate("/login")
        } catch (error) {
            console.log(error);
            setSubmitting(false);
        }
    };

    return (
        <>
            <Header/>
            <div className="container my-5" style={{minHeight: '80vh'}}>
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <h4>Chào mừng đến với dịch vụ của chúng tôi,</h4>
                        <p>Vui lòng đăng ký để sử dụng các dịch vụ của chúng tôi</p>
                        <Formik
                            initialValues={initValues}
                            validationSchema={signUpSchema}
                            onSubmit={handleSubmit}
                        >
                            {({isSubmitting}) => (
                                <Form>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="username">Tên đăng nhập</label>
                                        <Field type="text" name="username" className="form-control"/>
                                        <ErrorMessage name="username" className="text-danger" component="div"/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <Field type="email" name="email" className="form-control"/>
                                        <ErrorMessage name="email" className="text-danger" component="div"/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="password">Mật khẩu</label>
                                        <Field type="password" name="password" className="form-control"/>
                                        <ErrorMessage name="password" className="text-danger" component="div"/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="confirmPassword">Xác nhận mật
                                            khẩu</label>
                                        <Field type="password" name="confirmPassword" className="form-control"/>
                                        <ErrorMessage name="confirmPassword" className="text-danger" component="div"/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="name">Họ và tên</label>
                                        <Field type="text" name="name" className="form-control" />
                                        <ErrorMessage name="name" className="text-danger" component="div" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="address">Địa chỉ</label>
                                        <Field type="text" name="address" className="form-control" />
                                        <ErrorMessage name="address" className="text-danger" component="div" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="phone">Số điện thoại</label>
                                        <Field type="text" name="phone" className="form-control" />
                                        <ErrorMessage name="phone" className="text-danger" component="div" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="birthday">Ngày sinh</label>
                                        <Field type="date" name="birthday" className="form-control" />
                                        <ErrorMessage name="birthday" className="text-danger" component="div" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="gender">Giới tính</label>
                                        <Field as="select" name="gender" className="form-control">
                                            <option value="true">Nam</option>
                                            <option value="false">Nữ</option>
                                        </Field>
                                        <ErrorMessage name="gender" className="text-danger" component="div" />
                                    </div>

                                    <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                        Đăng ký
                                    </button>
                                </Form>
                            )}
                        </Formik>
                        <p className="mt-2">Bạn đã có tài khoản? Đăng nhập <Link to="/login">tại đây</Link></p>
                    </div>
                    <div className="col-lg-6">
                        <img src="/images/signup.jpg" alt="" width={'100%'}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default SignUp;
