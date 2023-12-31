"use client"
import Banner from "@/app/components/Banner/Banner";
import CategoryList from "@/app/components/Category/CategoryList";
import ShowProductRow from "@/app/components/Product/ShowProductRow";
import NewsHome from "@/app/components/News/NewsHome";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Home() {
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
            <Banner/>
            <CategoryList categories={categories}/>
            <ShowProductRow products={products}/>
            <NewsHome/>
        </>
    )
}
