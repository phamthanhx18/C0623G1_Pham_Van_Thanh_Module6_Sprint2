import React, {useEffect, useState} from 'react';
import Layout from "../Layout";
import {Link} from "react-router-dom";
import axios from "axios";

function DashboardCustomer() {
    const [customers, setCustomers] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const getCustomers = async () => {
        let res = await axios.get(`http://localhost:8080/api/customer?size=${size}&page=${page}`,{ withCredentials: true });
        setCustomers(res.data.content);
        setTotalPages(res.data.totalPages);
    }
    useEffect(() => {
        getCustomers();
    }, [page,size]);

    function handleEdit(customer) {
        
    }

    function handleDelete(id) {
        
    }
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <Layout>
            <div className="container-fluid p-5">
                <h4>Quản lý khách hàng</h4>
                <p className="sub-title">
                    Trang quản lý các khách hàng tại cửa hàng
                </p>
                <hr width={'100%'}/>
                <p><Link className="btn btn-primary" to={"/dashboard/products/add"}><i
                    className="fa-solid fa-file-circle-plus"></i> Thêm khách hàng mới</Link></p>
                <table className="table">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên khách hàng</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Hành Động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map((customer, index) => (
                        <tr key={customer.id}>
                            <td>{index + 1 + (size * page) }</td>
                            <td>{customer.name}</td>
                            <td>{customer.gender ? 'Nam' : 'Nữ'}</td>
                            <td>{customer.birthday}</td>
                            <td>{customer.address}</td>
                            <td>{customer.phone}</td>
                            <td>{customer?.account?.email ?? 'Không có email'}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEdit(customer)}>Sửa</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(customer.id)}>Xóa</button>
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

export default DashboardCustomer;