import React, {useEffect, useState} from 'react';
import Layout from "../Layout";
import {Link} from "react-router-dom";
import axios from "axios";

function DashboardUser() {
    const [accounts, setAccounts] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const getCustomers = async () => {
        let res = await axios.get(`http://localhost:8080/api/user?size=${size}&page=${page}`,{ withCredentials: true });
        setAccounts(res.data.content);
        console.log(res.data.content)
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
                    Trang quản lý tài khoản trong hệ thống
                </p>
                <hr width={'100%'}/>
                <p><Link className="btn btn-primary" to={"/dashboard/products/add"}><i
                    className="fa-solid fa-file-circle-plus"></i> Thêm khách hàng mới</Link></p>
                <table className="table">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên tài khoản</th>
                        <th>Email tài khoản</th>
                        <th>Quyền truy cập</th>
                        <th>Hành Động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {accounts.map((account, index) => (
                        <tr key={account.id}>
                            <td>{index + 1 + (size * page) }</td>
                            <td>{account.username}</td>
                            <td>{account.email}</td>
                            <td>{account.roles.map(item => item.name === 'ROLE_MANAGER' ? 'Quản trị viên' : 'Khách hàng')}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEdit(account)}>Sửa</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(account.id)}>Xóa</button>
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

export default DashboardUser;