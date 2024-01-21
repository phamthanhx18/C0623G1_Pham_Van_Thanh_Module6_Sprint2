import React, {useEffect, useState} from 'react';
import Layout from "../Layout";
import {Link} from "react-router-dom";
import axios from "axios";

function DashboardOrder() {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const getOrders = async () => {
        let res = await axios.get(`http://localhost:8080/api/order/all?size=${size}&page=${page}`,{ withCredentials: true });
        setOrders(res.data.content);
        setTotalPages(res.data.totalPages);
    }
    useEffect(() => {
        getOrders();
    }, [page,size]);

    function handleEdit(customer) {
        
    }
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
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
        <Layout>
            <div className="container-fluid p-5">
                <h4>Quản lý đơn hàng</h4>
                <p className="sub-title">
                    Trang quản lý các đơn hàng
                </p>
                <hr width={'100%'}/>
                <table className="table">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên khách hàng</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Ngày mua</th>
                        <th>Tổng tiền thanh toán</th>
                        <th>Hành Động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1 + (size * page) }</td>
                            <td>{item.customer.name}</td>
                            <td>{item.customer.address}</td>
                            <td>{item.customer.phone}</td>
                            <td>{item.orderDate}</td>
                            <td>{formatCurrency(item.totalOrder)}</td>
                            <td>
                                <Link to={`/dashboard/orders/${item.id}`} className="btn btn-warning me-2">Xem chi tiết</Link>
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
        </Layout>
    );
}

export default DashboardOrder;