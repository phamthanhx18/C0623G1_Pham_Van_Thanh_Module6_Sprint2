import React, {useEffect, useState} from 'react';
import Layout from "../Layout";
import axios from "axios";
import {Link} from "react-router-dom";

function DashboardSize() {
    const [sizes, setSizes] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const getAllSizes = async () => {
        let res = await axios.get(`http://localhost:8080/api/size/all?size=${size}&page=${page}`,{ withCredentials: true });
        setSizes(res.data.content);
        setTotalPages(res.data.totalPages);
    }
    useEffect(() => {
        getAllSizes();
    }, []);
    const handleEdit = (item) => {

    };
    const handleDelete = (id) => {

    };
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    return (
        <Layout>
            <div className="container-fluid p-5">
                <h4>Danh sách size</h4>
                <p className="sub-title">
                    Xem và quản lý size
                </p>
                <hr width={'100%'}/>
                <Link className="btn btn-primary mb-2" to={"/dashboard/sizes/add"}><i
                    className="fa-solid fa-shirt"></i> Thêm mới Size</Link>
                <table className="table">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Màu sắc</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sizes.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1 + (size * page)}</td>
                            <td>{item.sizeName}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEdit(item)}>Sửa
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Xóa
                                </button>
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

export default DashboardSize;