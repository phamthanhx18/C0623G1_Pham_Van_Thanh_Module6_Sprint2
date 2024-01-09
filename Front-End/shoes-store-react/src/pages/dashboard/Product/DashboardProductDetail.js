import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Layout from "../Layout";
import axios from "axios";

function DashboardProductDetail() {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [variants, setVariants] = useState([]);
    const getProductById = async () => {
        let res = await axios.get(`http://localhost:8080/api/product/${id}`)
        setProduct(res.data);
        setVariants(res.data.productVariants || []);
    }

    useEffect(() => {
        getProductById();
    }, []);
    const handleEdit = (item) => {
        
    };
    const handleDelete = (id) => {
        
    };
    const formatCurrency = (money) => {
        return money.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    }
    return (
        <Layout>
            <div className="container-fluid p-5">
                <h4>Chi tiết sản phẩm {product.productName}</h4>
                <p className="sub-title">
                    Xem và quản lý biến thể
                </p>
                
                <hr width={'100%'}/>

                <p><Link className="btn btn-primary" to={`/dashboard/products/${id}/add`}><i
                    className="fa-solid fa-file-circle-plus"></i> Thêm biến thể sản phẩm mới
                </Link>
                </p>
                <table className="table">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Biến thể</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Giá Khuyến Mãi</th>
                        <th>Size</th>
                        <th>Hành Động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {variants.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td><img src={item.avatar} width={50}/> {product.productName} - {item.color.colorName}</td>
                            <td>{item.stock}</td>
                            <td>{formatCurrency(item.price)}</td>
                            <td>{formatCurrency(item.priceSale)}</td>
                            <td>
                                {item.sizeVariants
                                    .sort((a, b) => a.size.sizeName.localeCompare(b.size.sizeName))
                                    .map(variant => variant.size.sizeName)
                                    .join(", ")
                                }
                            </td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEdit(item)}>Sửa</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default DashboardProductDetail;