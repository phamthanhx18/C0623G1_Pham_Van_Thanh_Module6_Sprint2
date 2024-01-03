import React from 'react';
import {Link, NavLink} from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="container">
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <div className="col-md-auto mb-2 mb-md-0">
                        <NavLink to="/"
                           className="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                            <img src="/images/images2491017_1.jpg" alt="Logo website" width="200px"/>
                        </NavLink>
                    </div>

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><NavLink to="/" className="nav-link px-2">Trang chủ</NavLink></li>
                        <li><NavLink to="/product" className="nav-link px-2">Sản phẩm</NavLink></li>
                        <li><a href="#" className="nav-link px-2">Về chúng tôi</a></li>
                        <li><a href="#" className="nav-link px-2">Thương hiệu</a></li>
                        <li><a href="#" className="nav-link px-2">Tuyển dụng</a></li>
                        <li><a href="#" className="nav-link px-2">Bài viết</a></li>
                        <li><a href="#" className="nav-link px-2">Liên hệ</a></li>
                    </ul>

                    <div className="col-md-3 text-end icon text-decoration-none">
                        <a href="#">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </a>
                        <a href="#">
                            <i className="fa-solid fa-heart"></i>
                        </a>
                        <a href="#">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </a>
                        <Link to="/login">
                            <i className="fa-solid fa-circle-user"></i>
                        </Link>
                    </div>
                </header>
            </div>
        </header>
    );
}

export default Header;