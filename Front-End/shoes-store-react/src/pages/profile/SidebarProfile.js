import React, {useState} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {logOut} from "../../redux/middlewares/AuthMiddleware";
import {toast} from "react-toastify";

const SidebarDashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleLogOut = async () => {
        await dispatch(logOut());
        setShowModal(false);
        toast.success("Đăng xuất thành công !")
        navigate("/login")
    }

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
                    <NavLink end to="/profile" className="nav-link" aria-current="page">
                        Thông tin
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/history/order" className="nav-link" aria-current="page">
                        Lịch sử mua hàng
                    </NavLink>
                </li>
                <li>
                    <Link role={"button"} onClick={openModal} className="nav-link">
                        Đăng xuất
                    </Link>
                </li>
            </ul>
            <div className="account">
                <div className="avatar">
                    <img src="https://api-private.atlassian.com/users/af915bfca4071328237c0343505289b0/avatar" alt="" width={'100%'}/>
                </div>
                <div className="full-name">
                </div>
            </div>
            {showModal && (
                <div className="modal" tabIndex="1000" style={{display: 'block'}}>
                    <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                            <div className="modal-header">
                                <h5>Xác nhận đăng xuất</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn đăng xuất không?</p>
                            </div>
                            <div className="modal-footer">
                                <button onClick={handleLogOut} className="btn btn-danger">Xác nhận</button>
                                <button onClick={closeModal} className="btn btn-secondary">Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SidebarDashboard;
