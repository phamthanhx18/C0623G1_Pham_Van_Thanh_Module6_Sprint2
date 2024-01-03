import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";

export default function Page() {
    const initValues = {
        username: '',
        password: ''
    }
    function handleLogin(values) {
        console.log(values)
    }

    return (
        <>
            <Formik
                initialValues={initValues}
                onSubmit={(values) => handleLogin(values)}
            >
                <Form>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <Field type="text" name="username"/>
                        <ErrorMessage name="username" component="div"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <Field type="password" name="password"/>
                        <ErrorMessage name="password" component="div"/>
                    </div>
                    <button type="submit">
                        Login
                    </button>
                </Form>
            </Formik>
        </>
    );
}

