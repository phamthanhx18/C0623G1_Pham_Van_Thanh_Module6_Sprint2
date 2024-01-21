import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import LayoutProfile from "./LayoutProfile";
import axios from "axios";
import {useSelector} from "react-redux";

function HistoryOrderDetail() {
    const {id} = useParams();
    const [order, setOrder] = useState({});
    const [orderItem, setOrderItem] = useState([]);
    const getOrderById = async () => {
        let res = await axios.get(`http://localhost:8080/api/order/get-order/${id}`,{ withCredentials: true });
        setOrder(res.data);
        setOrderItem(res.data.orderDetails)
        console.log(res.data.orderDetails)
    }
    useEffect(() => {
        getOrderById()
    }, []);
    const formatCurrency = (money) => {
        if (typeof(money) == "number") {
            return money.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
            });
        } else {
            return 0;
        }
    }
    return (
        <LayoutProfile>
            <div className="container-fluid p-5">
                <h4>Chi tiết đơn đặt hàng {id}</h4>
                <p className="sub-title">
                    Xem chi tiết đơn đặt hàng
                </p>
                <hr width={'100%'}/>
                <div className="mb-3 row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Tên người mua</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="name" value={order.customer?.name}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Ngày mua hàng</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="name" value={order.orderDate}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Tổng tiền thanh toán</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="name" value={formatCurrency(order.totalOrder)}/>
                    </div>
                </div>
                <h4 className="my-3">Các sản phẩm đã mua</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Màu sắc</th>
                        <th>Size</th>
                        <th>Giá gốc</th>
                        <th>Giá khuyến mãi</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderItem.map((item, index) => (
                        <tr key={index} className="cart-item">
                            <td>
                                <img src={item.variant?.avatar} alt={item.variant?.productName}
                                     width={50}/> {item.variant?.productName}
                            </td>
                            <td>{item.variant?.color.colorName}</td>
                            <td>{item.sizeVariant?.size?.sizeName}</td>
                            <td>{formatCurrency(item.variant?.price)}</td>
                            <td>{formatCurrency(item.variant?.priceSale)}</td>
                            <td>{item.quantity}</td>
                            <td>{formatCurrency(item.quantity * item.variant?.priceSale)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </LayoutProfile>
    );
}

export default HistoryOrderDetail;