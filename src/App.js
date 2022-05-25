import React, {useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./Home";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import ForgotPassword from "./Authentication/ForgotPassword";
import OnBoarding from "./Authentication/onBoarding";
import ErrorPage from "./components/ErrorPage";
// import AdminDashboard from "./Dashboard/others";
import SellersDashboard from "./Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import InsertCategory from "./Dashboard/Category/insertCategory";
import ViewCategories from "./Dashboard/Category/viewCategories";
import ViewProducts from "./Dashboard/Product/viewProducts";
import AdminProfile from "./Dashboard/others/profile";
import ActivateShop from "./Dashboard/others/activateShop";
import InsertProduct from "./Dashboard/Product/insertProduct";
import Shop from "./Shop/pages";

const App = () => {
    const [home, setHome] = useState(false);
    const [subdomain, setSubdomain] = useState(null)

    const fetchUrl = async () => {

        try {
            const host = window.location.host;

            const arr = host
                .split(".")
                .slice(0, host.includes("storetract") ? -1 : -2);
            if(arr.length >= 2) {setSubdomain(arr[0]) }
            else {setHome(true)};
            console.log(arr.length)

        } catch (error) {
            console.log({error})
        }
        console.log(subdomain);

    }


    useEffect(() => {

        fetchUrl().then()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subdomain])



    return (
                    <>
                        <Router>
                            <Routes>
                                {home ?
                                    (<>
                                    <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/forgot-password" element={<ForgotPassword />} />
                                <Route path="/404" element={<ErrorPage />} />
                                <Route path="/dashboard/:dashUrl" element={<PrivateRoute/>}>
                                    <Route path="/dashboard/:dashUrl" element={<SellersDashboard />} />
                                </Route>

                                <Route path="/dashboard/edit-product/:productId" element={<PrivateRoute/>}>
                                    <Route path="/dashboard/edit-product/:productId" element={<SellersDashboard />} />
                                </Route>

                                <Route path="/dashboard/orders/:orderId" element={<PrivateRoute/>}>
                                    <Route path="/dashboard/orders/:orderId" element={<SellersDashboard />} />
                                </Route>

                                <Route path="/dashboard/categories/:categoryUrl" element={<PrivateRoute/>}>
                                    <Route path="/dashboard/categories/:categoryUrl" element={<SellersDashboard />} />
                                </Route>

                                <Route path="/dashboard/customers/:customerId" element={<PrivateRoute/>}>
                                    <Route path="/dashboard/customers/:customerId" element={<SellersDashboard />} />
                                </Route>

                                <Route path="/onboarding/:onBoardingUrl" element={<PrivateRoute/>}>
                                    <Route path="/onboarding/:onBoardingUrl" element={<OnBoarding />} />
                                </Route>

                                <Route path="/admin-profile" element={<PrivateRoute/>}>
                                    <Route path="/admin-profile" element={<AdminProfile />} />
                                </Route>
                                <Route path="/insert-category" element={<PrivateRoute/>}>
                                    <Route path="/insert-category" element={<InsertCategory />} />
                                </Route>
                                <Route path="/view-categories" element={<PrivateRoute/>}>
                                    <Route path="/view-categories" element={<ViewCategories />} />
                                </Route>
                                <Route path="/insert-product" element={<PrivateRoute/>}>
                                    <Route path="/insert-product" element={<InsertProduct />} />
                                </Route>
                                <Route path="/view-products" element={<PrivateRoute/>}>
                                    <Route path="/view-products" element={<ViewProducts />} />
                                </Route>
                                <Route path="/activate-shop" element={<PrivateRoute/>}>
                                    <Route path="/activate-shop" element={<ActivateShop />} />
                                </Route>
                                    </>) : (

                                        <>
                                            <Route path="/" element={<Shop storeUrl={`${subdomain}`} />}/>
                                            <Route path="/:indexUrl" element={<Shop storeUrl={`${subdomain}`} />}/>
                                            <Route path="/:indexUrl/:categoryUrl" element={<Shop storeUrl={`${subdomain}`}/>}/>
                                            <Route path="/products/:categoryUrl/:productUrl" element={<Shop storeUrl={`${subdomain}`} />}/>
                                            <Route path="/checkout/:checkoutUrl" element={<Shop storeUrl={`${subdomain}`} />}/>
                                        </>
                                )}

                            </Routes>
                        </Router>
                        <ToastContainer />
                </>
    );
}

export default App;
