import Banner from "../components/Banner/Banner";
import Header from "../components/Header/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import NewsHome from "../components/News/NewsHome";
import CategoryList from "../components/Category/CategoryList";
import ShowProductRow from "../components/Product/ShowProductRow";
import Footer from "../components/Footer/Footer";


function HomePage() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const getAllCategories = async () => {
        let res = await axios.get("http://localhost:8080/api/category");
        setCategories(res.data);
    }

    const getAllProducts = async () => {
        let res = await axios.get("http://localhost:8080/api/product");
        setProducts(res.data);
    }
    useEffect(() => {
        getAllCategories();
        getAllProducts();
    }, []);
    return (
        <>
            <Header/>
            <Banner/>
            <CategoryList categories={categories}/>
            <ShowProductRow products={products}/>
            {/*<NewsHome/>*/}
            <Footer/>
        </>
    );
}

export default HomePage;