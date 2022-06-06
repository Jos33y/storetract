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
import SellersDashboard from "./Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import Shop from "./Shop/pages";

const App = () => {
    const [home, setHome] = useState(false);
    const [subdomain, setSubdomain] = useState(null)

    const fetchUrl = async () => {

        try {
            const host = window.location.host;

            const arr = host
                .split(".")
                .slice(0);
            if(arr.length >= 4) {setSubdomain(arr[0]) }
            else {setHome(true)};
            console.log(arr.length)
            console.log(arr);

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
                                        <Route path="/dashboard/settings/:settingsUrl" element={<PrivateRoute/>}>
                                            <Route path="/dashboard/settings/:settingsUrl" element={<SellersDashboard />} />
                                        </Route>
                                        <Route path="/onboarding/:onBoardingUrl" element={<PrivateRoute/>}>
                                            <Route path="/onboarding/:onBoardingUrl" element={<OnBoarding />} />
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
