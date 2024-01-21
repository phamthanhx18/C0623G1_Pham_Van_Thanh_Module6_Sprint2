import React, {useEffect, useState} from 'react';
import LayoutProfile from "./LayoutProfile";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {Link} from "react-router-dom";

function HistoryOrder() {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const getOrders = async () => {
        let res = await axios.get(`http://localhost:8080/api/order/get-order?size=${size}&page=${page}`,{ withCredentials: true });
        setOrders(res.data.content);
        setTotalPages(res.data.totalPages);
    }
    useEffect(() => {
        getOrders();
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
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    return (
        <LayoutProfile>
            <div className="container-fluid p-5">
                <h4>Lịch sử mua hàng của bạn</h4>
                <p className="sub-title">
                    Xem lịch sử mua hàng của bạn
                </p>
                <hr width={'100%'}/>
                <div className="row my-2">
                    <div className="col-lg-12">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Ngày mua</th>
                                <th>Tổng tiền thanh toán</th>
                                <th>Hành Động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1 + (size * page) }</td>
                                    <td>{item.orderDate}</td>
                                    <td>{formatCurrency(item.totalOrder)}</td>
                                    <td>
                                        <Link to={`/history/order/${item.id}`} className="btn btn-warning me-2">Xem chi tiết</Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <nav className="d-flex justify-content-center">
                            <ul className="pagination">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li key={index} className={`page-item ${index === page ? 'active' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(index)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </LayoutProfile>
    );
}

export default HistoryOrder;