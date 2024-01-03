import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import {useParams} from "react-router-dom";
function ProductDetail() {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const getProductById = async () => {
        let res = await axios.get(`http://localhost:8080/api/product/${id}`)
        setProduct(res.data);
    }
    useEffect(() => {
        getProductById();
    }, []);
    const formatCurrency = (money) => {
        if (money === undefined) {
            return 0;
        }
        return money.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    }
    return (
        <>
            <Header/>
            <div className="container">
                <div className="col-lg-6">

                </div>
                <div className="col-lg-6">
                    <h2>{product.productName}</h2>
                    <p>{product.shortDescription}</p>
                    <div className="price-product">
                        <span className="price">{formatCurrency(product.price)}</span>
                        <span className="price-sale">{formatCurrency(product.priceSale)}</span>
                    </div>
                    <div className="color-product">
                        <div className="image-preview-small">
                            {product.productVariants && Array.isArray(product.productVariants) && product.productVariants.map((element, index) => (
                                <img key={element.id} src={element.avatar} width={"100%"}
                                     alt={product.productName + " " + element.color.colorName}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <h3>Mô tả sản phẩm</h3>
                    <div dangerouslySetInnerHTML={{__html: product.description}}/>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default ProductDetail;