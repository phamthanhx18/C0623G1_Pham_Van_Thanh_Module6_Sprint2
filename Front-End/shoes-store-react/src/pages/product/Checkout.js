import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {checkOutAll} from "../../redux/middlewares/CartMiddleware";
import {toast} from "react-toastify";

const CheckoutForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store.cart.items);
    const checkoutSchema = Yup.object().shape({
        name: Yup.string().required('Vui lòng nhập họ tên'),
        address: Yup.string().required('Vui lòng nhập địa chỉ'),
        phone: Yup.string().required('Vui lòng nhập số điện thoại'),
        email: Yup.string().required('Vui lòng nhập email')
    });
    const checkout = {
        name: "",
        address: "",
        phone: "",
        email: "",
        paymentMethod: ""
    };
    const formatCurrency = (money) => {
        return money.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    }
    const handleSubmitForm = async (values) => {
        const data = {
            ...values,
            orderDetailDTO: cartItems,
            totalOrder: cartItems.reduce((total, item) => {
                return total + item.quantity * item.variant.priceSale;
            }, 0),
            orderDate: new Date().toISOString().split('T')[0]
        }
        try {
            await axios.post("http://localhost:8080/api/order",data);
            dispatch(checkOutAll());
            toast.success("Đặt hàng thành công !");
            navigate("/");
        } catch (e) {
            toast.error("Đặt hàng thất bại !");
        }
    };
    return (
        <>
            <Header/>
            <div className="container mb-5">
                <h4>Thanh toán</h4>
                <p className="sub-title">
                    Bắt đầu thanh toán
                </p>
                <hr width={'100%'}/>
                <Formik
                    initialValues={checkout}
                    validationSchema={checkoutSchema}
                    onSubmit={handleSubmitForm}
                >
                    <Form>
                        <div className="row g-5">
                            <div className="col-md-5 col-lg-4 order-md-last">
                                {cartItems.length === 0 ? (
                                    <p>Giỏ hàng trống</p>
                                ) : (
                                    <div>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th>Sản phẩm</th>
                                                <th>Số lượng</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {cartItems.map((item, index) => (
                                                <tr key={index} className="cart-item">
                                                    <td>
                                                        <img src={item.variant.avatar} alt={item.productName}
                                                             width={20}/> {item.nameProduct} - {item.variant.color.colorName} - {item.size_variant.sizeName}
                                                    </td>
                                                    <td>{item.quantity}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colSpan={1}>Thành tiền</td>
                                                <td className="total-money">
                                                    {formatCurrency(cartItems.reduce((total, item) => {
                                                        return total + item.quantity * item.variant.priceSale;
                                                    }, 0))}
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                )}
                                <div className="my-3">
                                    <h5>Phương thức thanh toán</h5>
                                    <div className="form-check">
                                        <Field
                                            type="radio"
                                            id="credit"
                                            name="paymentMethod"
                                            value="cod"
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label" htmlFor="cod">Trả tiền mặt khi nhận
                                            hàng</label>
                                    </div>
                                    <div className="form-check">
                                        <Field
                                            type="radio"
                                            id="debit"
                                            name="paymentMethod"
                                            value="vnpay"
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label" htmlFor="debit">VNPay</label>
                                    </div>
                                </div>
                                <button className="btn btn-primary" type="submit">
                                    Tiếp tục
                                </button>
                            </div>
                            <div className="col-md-7 col-lg-8">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Họ và tên</label>
                                    <Field name="name" type="text" className="form-control" id="name"/>
                                    <ErrorMessage name="name" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Số điện thoại</label>
                                    <Field name="phone" type="text" className="form-control" id="phone"/>
                                    <ErrorMessage name="phone" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <Field name="email" type="email" className="form-control" id="email"/>
                                    <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Địa chỉ nhận hàng</label>
                                    <Field name="address" type="text" className="form-control" id="address"/>
                                    <ErrorMessage name="address" component="div" className="invalid-feedback"/>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
            <Footer/>
        </>
    );
};

export default CheckoutForm;
