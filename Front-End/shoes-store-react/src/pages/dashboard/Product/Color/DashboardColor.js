import React, {useEffect, useState} from 'react';
import Layout from "../../Layout";
import axios from "axios";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

function DashboardColor() {
    const [colors, setColors] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [colorDelete, setColorDelete] = useState({});
    const [showModal, setShowModal] = useState(false);
    const getAllColors = async () => {
        let res = await axios.get(`http://localhost:8080/api/color/all?size=${size}&page=${page}`,{ withCredentials: true });
        setColors(res.data.content);
        setTotalPages(res.data.totalPages);
    }
    useEffect(() => {
        getAllColors();
    }, []);
    const handleEdit = (item) => {

    };
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    const openModal = (color) => {
        setColorDelete(color);
        setShowModal(true);
    };

    const closeModal = () => {
        setColorDelete({});
        setShowModal(false);
    };
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/category/${colorDelete.id}`, {withCredentials: true});
            toast.success("Xóa màu sắc thành công");
            closeModal();
            getAllColors();
        } catch (error) {
            console.error("Lỗi khi xóa danh mục:", error);
            toast.error("Xóa danh mục thất bại");
        }
    };
    return (
        <Layout>
            <div className="container-fluid p-5">
                <h4>Danh sách màu sắc sản phẩm</h4>
                <p className="sub-title">
                    Xem và quản lý màu sắc
                </p>

                <hr width={'100%'}/>
                <Link className="btn btn-primary mb-2" to={"/dashboard/colors/add"}><i
                    className="fa-solid fa-droplet"></i> Thêm mới màu sắc</Link>
                <table className="table">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Màu sắc</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {colors.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1 + (size * page)}</td>
                            <td>{item.colorName}</td>
                            <td>
                                <Link  to={`/dashboard/colors/${item.id}`} className="btn btn-warning me-2 text-dark">Sửa</Link>
                                <button className="btn btn-danger" onClick={() => openModal(item)}>Xóa</button>
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
                {showModal && (
                    <div className="modal" tabIndex="-1" style={{display: 'block'}}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5>Xác nhận xóa</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <p>Bạn có chắc chắn muốn xóa màu {colorDelete.colorName} không?</p>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={handleDelete} className="btn btn-danger">Xác nhận</button>
                                    <button onClick={closeModal} className="btn btn-secondary">Hủy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default DashboardColor;