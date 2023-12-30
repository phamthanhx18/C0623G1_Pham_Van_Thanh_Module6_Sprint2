import Banner from "@/app/components/Banner/Banner";
import CategoryList from "@/app/components/Category/CategoryList";
import ListProductSaleHome from "@/app/components/Product/ListProductSaleHome";
import NewsHome from "@/app/components/News/NewsHome";

export default function Home() {
    return (
        <>
            <Banner/>
            <CategoryList/>
            <ListProductSaleHome/>
            <NewsHome/>
        </>
    )
}
