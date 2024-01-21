import React, {useEffect, useState} from 'react';
import LayoutProfile from "./LayoutProfile";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {toast} from "react-toastify";

function Profile() {
    const [customer, setCustomer] = useState({});
    const validationSchema = Yup.object({
        address: Yup.string()
            .required('Vui lòng nhập địa chỉ.')
            .max(100, 'Địa chỉ không được quá 100 ký tự'),
        birthday: Yup.date()
            .required('Vui lòng nhập ngày sinh.')
            .max(new Date(), 'Không được lớn hơn ngày hiện tại'),
        email: Yup.string()
            .email('Email không hợp lệ.')
            .required('Vui lòng nhập email.'),
        name: Yup.string()
            .required('Vui lòng nhập tên.')
            .min(2, 'Tên phải có ít nhất 2 ký tự.')
            .max(50, 'Tên không được quá 50 ký tự.'),
        phone: Yup.string()
            .required('Vui lòng nhập số điện thoại.')
            .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ.'),
    });
    const getCustomerInfo = async () => {
        let res = await axios.get("http://localhost:8080/api/customer/info", { withCredentials: true });
        let data = res.data;
        data.email = res.data.account.email;
        setCustomer(res.data);
    }

    useEffect(() => {
        getCustomerInfo()
    }, []);

    const handleSubmitForm = async (values) => {
        values.account.email = values.email;
        console.log(values);
        try {
            await axios.post("http://localhost:8080/api/customer/save",values, { withCredentials: true });
            toast.success("Cập nhật thành công !")
        } catch (e) {
            console.log(e)
        }
    };
    return (
        <LayoutProfile>
            <div className="container-fluid p-5">
                <h4>Thông tin cá nhân</h4>
                <p className="sub-title">
                    Quản lý thông tin cá nhân của bạn
                </p>
                <hr width={'100%'}/>
                <div className="row my-2">
                    <div className="col-lg-12">
                        <div className="content">
                            <Formik
                                initialValues={customer}
                                enableReinitialize
                                onSubmit={(values) => handleSubmitForm(values)}
                                validationSchema={validationSchema}
                            >
                                {({dirty }) => (
                                    <Form>
                                        <div className="row">
                                            <div className="col-lg-12 col-sm-12">
                                                <div className="content-information">
                                                    <div>
                                                        <div className="mb-3">
                                                            <label htmlFor="name" className="form-label">Họ và tên</label>
                                                            <Field name="name" type="text" className="form-control"
                                                                   id="name"/>
                                                            <ErrorMessage name="name" className="text-danger" component="p"/>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="birthday" className="form-label">Ngày
                                                                sinh</label>
                                                            <Field type="date" className="form-control"
                                                                   name="birthday"/>
                                                            <ErrorMessage name="birthday" className="text-danger" component="p"/>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="address" className="form-label">Địa chỉ</label>
                                                            <Field type="text" className="form-control" id="address"
                                                                   name="address"/>
                                                            <ErrorMessage name="address" className="text-danger" component="p"/>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="phone" className="form-label">Số điện
                                                                thoại</label>
                                                            <Field type="text" className="form-control"
                                                                   name="phone"/>
                                                            <ErrorMessage name="phone" className="text-danger" component="p"/>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="phone" className="form-label">Địa chỉ email</label>
                                                            <Field type="email" className="form-control" name="email"/>
                                                            <ErrorMessage name="email" className="text-danger" component="p"/>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="gender" className="form-label">Giới tính</label>
                                                            <Field as="select" name="gender" class="form-select">
                                                                <option value="true">Nam</option>
                                                                <option value="false">Nữ</option>
                                                                <option value="null">Khác</option>
                                                            </Field>
                                                        </div>
                                                        <div className="text-center">
                                                            <button type="submit" className="btn btn-primary" disabled={!dirty}>Cập nhật</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutProfile>
    );
}

export default Profile;