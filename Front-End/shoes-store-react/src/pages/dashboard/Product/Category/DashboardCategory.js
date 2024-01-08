import React, {useEffect, useState} from 'react';
import Layout from "../../Layout";
import {Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

function DashboardCategory() {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [categoriesDelete, setCategoriesDelete] = useState({});
    const [showModal, setShowModal] = useState(false);
    const getAllCategories = async () => {
        let res = await axios.get(`http://localhost:8080/api/category/all?size=${size}&page=${page}`, {withCredentials: true});
        setCategories(res.data.content);
        setTotalPages(res.data.totalPages);
    }
    useEffect(() => {
        getAllCategories();
    }, []);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    const openModal = (category) => {
        setCategoriesDelete(category);
        setShowModal(true);
    };

    const closeModal = () => {
        setCategoriesDelete({});
        setShowModal(false);
    };
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/category/${categoriesDelete.id}`, {withCredentials: true});
            toast.success("Xóa danh mục thành công");
            closeModal();
            getAllCategories();
        } catch (error) {
            console.error("Lỗi khi xóa danh mục:", error);
            toast.error("Xóa danh mục thất bại");
        }
    };

    return (
        <Layout>
            <div className="container-fluid p-5">
                <h4>Danh sách danh mục sản phẩm</h4>
                <p className="sub-title">
                    Xem và quản lý danh mục
                </p>
                <hr width={'100%'}/>
                <Link className="btn btn-primary mb-2" to={"/dashboard/categories/add"}><i
                    className="fa-solid fa-list"></i> Thêm mới danh mục</Link>
                <table className="table">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Danh mục</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1 + (size * page)}</td>
                            <td><img src={item.avatar} alt={item.name} width={50}/> {item.name}</td>
                            <td>
                                <Link to={`/dashboard/categories/${item.id}`}
                                      className="btn btn-warning me-2 text-white">Sửa
                                </Link>
                                <button className="btn btn-danger" onClick={() => openModal(item)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <nav className="d-flex justify-content-center">
                    <ul className="pagination">
                        {Array.from({length: totalPages}, (_, index) => (
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
                                    <p>Bạn có chắc chắn muốn xóa danh mục {categoriesDelete.name} không?</p>
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

export default DashboardCategory;