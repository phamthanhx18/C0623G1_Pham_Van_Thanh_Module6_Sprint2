import React, {useState} from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SidebarFilter from "./SidebarFilter";
import axios from "axios";
import ShowProductRow from "../../components/Product/ShowProductRow";
import {Link} from "react-router-dom";

function Product() {
    const [products, setProducts] = useState([]);
    const handleFilterChange = async (newFilters) => {
        let res = await axios.post("http://localhost:8080/api/product/filter",newFilters);
        setProducts(res.data);
    };
    const formatCurrency = (money) => {
        return money.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    }
    return (
        <>
            <Header/>
            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-3">
                        <SidebarFilter onFilterChange={handleFilterChange} />
                    </div>
                    <div className="col-lg-9">
                        {products.length === 0 ? "Không có sản phẩm nào !" : (
                            <div className="row">
                                {products.map(item => (
                                    <div key={item.id} className="col-lg-4 mb-3">
                                        <div className="card product-item">
                                            <Link to={`/product/${item.id}`}>
                                                <img src={item.productAvatar} className="card-img-top" alt="..."/>
                                                <div className="card-body">
                                                    <p className="category">{item.category.name}</p>
                                                    <h4>{item.productName}</h4>
                                                    <p className="description" dangerouslySetInnerHTML={{__html: item.shortDescription}}/>
                                                    <div className="image-preview-small">
                                                        {item.productVariants.map(element => (
                                                            <img key={element.id} src={element.avatar} width={"100%"}
                                                                 alt={item.productName + " " + element.color.colorName}/>
                                                        ))}
                                                    </div>
                                                    <hr/>
                                                    <div className="price-product d-flex justify-content-between">
                                                        <p className="price">{formatCurrency(item.price)}</p>
                                                        <p className="price-sale">{formatCurrency(item.priceSale)}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Product;