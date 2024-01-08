import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import axios from "axios";
import * as Yup from "yup";
import Layout from "../../Layout";

function DashboardColorAdd() {
    const initValues = {
        colorName: ""
    }
    const colorSchema = Yup.object().shape({
        colorName: Yup.string()
            .required('Tên màu sắc là bắt buộc')
            .min(2, 'Tên màu sắc quá ngắn')
            .max(50, 'Tên màu sắc quá dài')
    });

    const handleSubmitFormAdd = async (values) => {
        try {
            await axios.post("http://localhost:8080/api/color/add", values, {withCredentials: true})
            toast.success("Thêm mới thành công")
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Layout>
            <div className="container-fluid p-5">
                <h4>Thêm mới màu sắc</h4>
                <p className="sub-title">
                    Trang thêm mới màu sắc sản phẩm vào hệ thống
                </p>
                <hr width={'100%'}/>
                <Formik initialValues={initValues} onSubmit={(values) => handleSubmitFormAdd(values)}
                        validationSchema={colorSchema}>
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="colorName" className="form-label">Tên màu sắc</label>
                            <Field name="colorName" type="text" id="name" className="form-control"
                                   aria-describedby="colorName"/>
                            <ErrorMessage component="div" name="colorName" id="colorName"
                                          className="form-text text-danger"/>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" type="submit">Thêm màu sắc</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </Layout>
    );
}

export default DashboardColorAdd;