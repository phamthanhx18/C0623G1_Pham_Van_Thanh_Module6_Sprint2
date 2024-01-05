import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage";
import Product from "./pages/product/Product";
import ProductDetail from "./pages/product/ProductDetail";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/Store";
import DashboardProduct from "./pages/dashboard/Product/DashboardProduct";
import DashboardProductAdd from "./pages/dashboard/Product/DashboardProductAdd";
import './firebaseConfig';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}></Route>
                    <Route path="/login" element={<LoginPage/>}></Route>
                    <Route path="/product" element={<Product/>}></Route>
                    <Route path="/dashboard" element={<PrivateRoute Component={Dashboard} />} />
                    <Route path="/dashboard/products" element={<PrivateRoute Component={DashboardProduct} />} />
                    <Route path="/dashboard/products/add" element={<PrivateRoute Component={DashboardProductAdd} />} />
                    <Route path="/product/:id" element={<ProductDetail/>}></Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </Provider>
    );
}

export default App;
