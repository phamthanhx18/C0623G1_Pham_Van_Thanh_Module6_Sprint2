import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {updateCartItemQuantity} from "../../redux/middlewares/CartMiddleware";
import {Link} from "react-router-dom";

function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store.cart.items);
    const formatCurrency = (money) => {
        return money.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    }
    const handleQuantityChange = (item, newQuantity) => {
        dispatch(updateCartItemQuantity(item, newQuantity));
    };
    return (
        <>
            <Header/>
            <div className="cart container mb-5">
                <h2>Trang giỏ hàng</h2>
                {cartItems.length === 0 ? (
                    <p>Giỏ hàng trống</p>
                ) : (
                    <div>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th>Màu sắc</th>
                                <th>Size</th>
                                <th>Giá gốc</th>
                                <th>Giá khuyến mãi</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index} className="cart-item">
                                    <td>
                                        <img src={item.variant.avatar} alt={item.productName}
                                             width={50}/> {item.nameProduct}
                                    </td>
                                    <td>{item.variant.color.colorName}</td>
                                    <td>{item.size_variant.sizeName}</td>
                                    <td>{formatCurrency(item.variant.price)}</td>
                                    <td>{formatCurrency(item.variant.priceSale)}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                                            min="1"
                                        />
                                    </td>
                                    <td>{formatCurrency(item.quantity * item.variant.priceSale)}</td>
                                </tr>
                            ))}
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan={6}>Thành tiền</td>
                                <td className="total-money">
                                    {formatCurrency(cartItems.reduce((total, item) => {
                                        return total + item.quantity * item.variant.priceSale;
                                    }, 0))}
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                        <div className="text-end">
                            <Link to="/checkout" className="btn btn-primary">
                                Bắt đầu thanh toán
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <Footer/>
        </>
    );
}

export default Cart;
