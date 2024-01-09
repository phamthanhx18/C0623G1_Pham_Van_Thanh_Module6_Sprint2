import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import {useParams} from "react-router-dom";
import ProductImageGallery from "./ProductImageGallery";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/middlewares/CartMiddleware";
import {toast} from "react-toastify";
function ProductDetail() {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [selectedVariantImages, setSelectedVariantImages] = useState([]);
    const [quantity, setQuantity] = useState(1); // Giả sử mặc định là 1
    const dispatch = useDispatch();
    useEffect(() => {
        if (product.productVariants && product.productVariants.length > 0) {
            handleVariantSelect(product.productVariants[0].id); // Chọn biến thể đầu tiên mặc định
        }
    }, [product.productVariants]);

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
    const calculateDiscountPercentage = (originalPrice, salePrice) => {
        if (originalPrice <= 0) return 0; // Tránh chia cho 0
        return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
    }
    const handleVariantSelect = async (variantId) => {
        setSelectedVariant(variantId);
        const selectedVariant = product.productVariants.find(v => v.id === variantId);
        if (selectedVariant) {
            setSelectedVariantImages(selectedVariant.albumsVariants.map(av => av.image));
        }
        let res = await axios.get(`http://localhost:8080/api/product/get-size/${variantId}`)
        setSizes(res.data);
    };
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };


    function handleAddToCart() {
        const item = {
            nameProduct: product.productName,
            variant: product.productVariants.find(v => v.id === selectedVariant),
            size_variant: selectedSize,
            quantity: quantity
        };
        dispatch(addToCart(item));
        toast.success("Thêm vào giỏ hàng thành công !")
    }

    const handleQuantityChange = (event) => {
        setQuantity(Math.max(1, parseInt(event.target.value))); // Đảm bảo số lượng luôn >= 1
    };

    return (
        <>
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <ProductImageGallery images={selectedVariantImages} />
                    </div>
                    <div className="col-lg-6">
                        <h2>{product.productName}</h2>
                        <p dangerouslySetInnerHTML={{__html: product.shortDescription}}/>
                        <div className="price-product">
                            <span className="percent">{calculateDiscountPercentage(product.price,product.priceSale)} <i
                                className="fa-solid fa-percent"></i></span>
                            <span className="price-sale">{formatCurrency(product.priceSale)}</span>
                        </div>
                        <div className="price-detail mb-3">
                            <span className="price">Giá gốc: {formatCurrency(product.price)}</span>
                        </div>
                        <div className="color-product mb-3">
                            <div className="label mb-2">Màu sắc</div>
                            <div className="image-preview-small">
                                {product.productVariants && Array.isArray(product.productVariants) && product.productVariants.map((element) => (
                                    <img
                                        key={element.id}
                                        src={element.avatar}
                                        width={"100%"}
                                        alt={product.productName + " " + element.color.colorName}
                                        onClick={() => handleVariantSelect(element.id)}
                                        style={{
                                            borderRadius: selectedVariant === element.id ? '7px' : 'none',
                                            border: selectedVariant === element.id ? '1px solid #A82216' : 'none',
                                            cursor: 'pointer'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        {sizes.length === 0 ? '' : (
                            <div className="size-selection mb-3">
                                <div className="label mb-2">Kích cỡ</div>
                                <div className="size-options">
                                    {sizes.map(size => (
                                        <button
                                            key={size.id}
                                            onClick={() => handleSizeSelect(size)}
                                            style={{
                                                border: selectedSize === size ? '1px solid #A82216' : '1px solid #E6E8EC',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {size.sizeName}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="quantity mb-3">
                            <div className="label mb-2">Số lượng</div>
                            <div className="quantity-options">
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    min="1"
                                    max="10"
                                    className="quantity-input"
                                />
                            </div>
                        </div>
                        <button disabled={selectedVariant === null || selectedSize === null} className="btn btn-primary" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
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