import React, {useState} from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SidebarFilter from "./SidebarFilter";

function Product() {
    const [filters, setFilters] = useState({});
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };
    return (
        <>
            <Header/>
            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-3">
                        <SidebarFilter onFilterChange={handleFilterChange} />
                    </div>
                    <div className="col-lg-9">
                        {JSON.stringify(filters)}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Product;