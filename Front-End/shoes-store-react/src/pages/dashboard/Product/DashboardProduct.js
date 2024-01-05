import React, {useEffect, useState} from 'react';
import Layout from "../Layout";
import axios from "axios";
import {Link} from "react-router-dom";
function DashboardProduct() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const getProducts = async () => {
        let res = await axios.get("http://localhost:8080/api/product/all");
        console.log(res.data.content);
        setProducts(res.data.content);
    }
    useEffect(() => {
        getProducts();
    }, []);
    const formatCurrency = (money) => {
        return money.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    }
    const handleEdit = (product) => {
        
    };
    const handleDelete = (id) => {
        
    };
    return (
        <>
            <Layout>
                <div className="container-fluid p-5">
                    <h4>Quản lý sản phẩm</h4>
                    <p className="sub-title">
                        Trang quản lý các sản phẩm tại cửa hàng
                    </p>
                    <hr width={'100%'}/>
                    <p><Link className="btn btn-primary" to={"/dashboard/products/add"}><i
                        className="fa-solid fa-file-circle-plus"></i> Thêm sản phẩm mới</Link></p>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Ảnh đại diện</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Giá</th>
                            <th>Giá Khuyến Mãi</th>
                            <th>Danh mục</th>
                            <th>Hành Động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1 + (size * page) }</td>
                                <td><img src={product.productAvatar} alt={product.productName} width={50}/></td>
                                <td>{product.productName}</td>
                                <td>{formatCurrency(product.price)}</td>
                                <td>{formatCurrency(product.priceSale)}</td>
                                <td>{product.category.name}</td>
                                <td>
                                    <button className="btn btn-success me-2" onClick={() => handleEdit(product)}>Chi tiết</button>
                                    <button className="btn btn-warning me-2" onClick={() => handleEdit(product)}>Sửa</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </Layout>
        </>
    );
}

export default DashboardProduct;