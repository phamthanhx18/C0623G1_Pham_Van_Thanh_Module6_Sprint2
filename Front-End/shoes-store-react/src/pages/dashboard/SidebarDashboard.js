import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarDashboard = () => {

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{
            width: '280px',
            height: '100vh',
            position: 'sticky',
            top: 0}}>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link" aria-current="page" >
                        <img src="/images/logo.png" alt="" width={'100%'}/>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink end to="/dashboard" className="nav-link" aria-current="page">
                        Tổng quan
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/products" className="nav-link">
                        Quản lý sản phẩm
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/categories" className="nav-link">
                        Quản lý danh mục
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/colors" className="nav-link">
                        Quản lý màu sắc
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/sizes" className="nav-link">
                        Quản lý kích cỡ
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/orders" className="nav-link">
                        Quản lý đơn hàng
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/customer" className="nav-link">
                        Quản lý khách hàng
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/user" className="nav-link">
                        Quản lý tài khoản
                    </NavLink>
                </li>
            </ul>
            <div className="account">
                <div className="avatar">
                    <img src="https://api-private.atlassian.com/users/af915bfca4071328237c0343505289b0/avatar" alt="" width={'100%'}/>
                </div>
                <div className="full-name">
                    <span>
                        Tài khoản: <b>Phạm Văn Thành</b>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SidebarDashboard;
