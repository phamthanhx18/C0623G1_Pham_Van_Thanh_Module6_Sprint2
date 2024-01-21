import React from 'react';
import {Link} from "react-router-dom";

function ShowProductRow({products}) {
    const formatCurrency = (money) => {
        if (typeof(money) == "number") {
            return money.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
            });
        } else {
            return 0;
        }
    }
    return (
        <>
            <section id="flash-sale">
                <div className="container">
                    <div className="row">
                        <div className="head d-flex justify-content-between">
                            <div className="title">
                                <h3>Flash Sale</h3>
                                <p>Sản phẩm đang giảm giá từ Duvis</p>
                            </div>
                            <div className="sort d-flex align-items-center">
                                <span>Sắp xếp theo: </span>
                                <div>
                                    <select className="form-select" aria-label="Default select example">
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        {products.map(item => (
                            <div key={item.id} className="col-lg-3 mb-3">
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
                </div>
            </section>
        </>
    );
}

export default ShowProductRow;