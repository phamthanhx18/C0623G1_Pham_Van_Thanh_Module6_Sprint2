import React from 'react';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function Error403() {
    return (
        <>
            <Header/>
                <div className="container text-center" style={{minHeight: '80vh'}}>
                    <img width="50%" src="/images/403.jpg" alt=""/>
                    <h3>Bạn không có quyền truy cập trang này !</h3>
                </div>
            <Footer/>
        </>
    );
}

export default Error403;