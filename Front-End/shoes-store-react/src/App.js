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
import DashboardCustomer from "./pages/dashboard/customer/DashboardCustomer";
import DashboardUser from "./pages/dashboard/user/DashboardUser";
import Cart from "./pages/product/Cart";
import Checkout from "./pages/product/Checkout";
import DashboardOrder from "./pages/dashboard/order/DashboardOrder";
import DashboardProductDetail from "./pages/dashboard/Product/DashboardProductDetail";
import DashboardSize from "./pages/dashboard/Product/DashboardSize";
import DashboardColor from "./pages/dashboard/Product/Color/DashboardColor";
import DashboardCategory from "./pages/dashboard/Product/Category/DashboardCategory";
import DashboardCategoryAdd from "./pages/dashboard/Product/Category/DashboardCategoryAdd";
import DashboardCategoryEdit from "./pages/dashboard/Product/Category/DashboardCategoryEdit";
import DashboardColorAdd from "./pages/dashboard/Product/Color/DashboardColorAdd";
import DashboardColorEdit from "./pages/dashboard/Product/Color/DashboardColorEdit";
import DashboardVariantAdd from "./pages/dashboard/Product/DashboardVariantAdd";
import Error403 from "./pages/Error403";
import Profile from "./pages/profile/Profile";
import SignUpPage from "./pages/SignUpPage";
import HistoryOrder from "./pages/profile/HistoryOrder";
import HistoryOrderDetail from "./pages/profile/HistoryOrderDetail";
import DashboardOrderDetail from "./pages/dashboard/order/DashboardOrderDetail";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}></Route>
                    <Route path="/login" element={<LoginPage/>}></Route>
                    <Route path="/sign-up" element={<SignUpPage/>}></Route>
                    <Route path="/product" element={<Product/>}></Route>
                    <Route path="/cart" element={<Cart/>}></Route>
                    <Route path="/checkout" element={<Checkout/>}></Route>
                    <Route path="/dashboard" element={<PrivateRoute Component={Dashboard} allowedRoles='ROLE_MANAGER' />} />
                    <Route path="/profile" element={<PrivateRoute Component={Profile} allowedRoles='ALL' />} />
                    <Route path="/history/order" element={<PrivateRoute Component={HistoryOrder} allowedRoles='ALL' />} />
                    <Route path="/history/order/:id" element={<PrivateRoute Component={HistoryOrderDetail} allowedRoles='ALL' />} />
                    <Route path="/dashboard/products" element={<PrivateRoute Component={DashboardProduct} allowedRoles='ROLE_MANAGER'/>} />
                    <Route path="/dashboard/sizes" element={<PrivateRoute Component={DashboardSize} allowedRoles='ROLE_MANAGER'/>} />
                    <Route path="/dashboard/colors" element={<PrivateRoute Component={DashboardColor} allowedRoles='ROLE_MANAGER'/>} />
                    <Route path="/dashboard/colors/add" element={<PrivateRoute Component={DashboardColorAdd} allowedRoles='ROLE_MANAGER'/>} />
                    <Route path="/dashboard/colors/:id" element={<PrivateRoute Component={DashboardColorEdit} allowedRoles='ROLE_MANAGER'/>} />
                    <Route path="/dashboard/categories" element={<PrivateRoute Component={DashboardCategory} allowedRoles='ROLE_MANAGER'/>} />
                    <Route path="/dashboard/categories/add" element={<PrivateRoute Component={DashboardCategoryAdd} allowedRoles='ROLE_MANAGER'/>} />
                    <Route path="/dashboard/categories/:categoryId" element={<PrivateRoute Component={DashboardCategoryEdit} allowedRoles='ROLE_MANAGER'/>} />
                    <Route path="/dashboard/products/add" element={<PrivateRoute Component={DashboardProductAdd} allowedRoles='ROLE_MANAGER'/>} />
                    <Route path="/dashboard/products/:id" element={<PrivateRoute Component={DashboardProductDetail} allowedRoles='ROLE_MANAGER'/>} />
                    <Route path="/dashboard/products/:id/add" element={<PrivateRoute Component={DashboardVariantAdd} allowedRoles='ROLE_MANAGER'/>} />
                    <Route path="/dashboard/customer" element={<PrivateRoute Component={DashboardCustomer} allowedRoles='ROLE_MANAGER'/>} />
                    <Route path="/dashboard/orders" element={<PrivateRoute Component={DashboardOrder} allowedRoles='ROLE_MANAGER'/>} />
                    <Route path="/dashboard/orders/:id" element={<PrivateRoute Component={DashboardOrderDetail} allowedRoles='ROLE_MANAGER'/>} />
                    <Route path="/dashboard/user" element={<PrivateRoute Component={DashboardUser} allowedRoles='ROLE_MANAGER'/>} />
                    <Route path="/product/:id" element={<ProductDetail/>}></Route>
                    <Route path="/unauthorized" element={<Error403/>}></Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </Provider>
    );
}

export default App;
