import React from "react";
import "./dashStyles.css";
import "./bootstrap.css";
import "./responsive.css";
import {useParams} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import DashboardPage from "./pages/DashboardPage";
import ErrorPage from "./pages/ErrorPage";
import AddProductPage from "./pages/AddProductPage";
import TransactionPage from "./pages/transactionPage";
import CustomersPage from "./pages/customersPage";
import CustomerDetails from "./pages/customers/customerDetails";
import OrderListPage from "./pages/orderListPage";
import OrderDetailsPage from "./pages/orders/orderDetailsPage";
import ProductListPage from "./pages/products/productListPage";
import ProductDetailsPage from "./pages/products/productDetailsPage";
import CategoriesPage from "./pages/category/categoriesPage";
import WalletPage from "./pages/walletPage";
import StoretractCreditPage from "./pages/storetractCreditPage";
import SubscriptionPage from "./pages/subscriptionPage";
import HelpDeskPage from "./pages/helpDeskPage";
import SettingsPage from "./pages/settingsPage";


const SellersDashboard = () => {

    const params = useParams()
    // console.log(params.dashUrl)
    console.log(params.orderId)

    const pages = () => {

        if (params.dashUrl === "home"){
            return <DashboardPage />
        }
        else if (params.dashUrl === "categories") {
            return <CategoriesPage />
        }
        else if (params.dashUrl === "add-product") {
            return <AddProductPage/>
        }

        else if (params.dashUrl === "transactions") {
                return <TransactionPage />
        }
        else if (params.dashUrl === "customers") {

            return <CustomersPage />
        }
       else if(params.customerId){
            return <CustomerDetails />
        }
        else if (params.dashUrl === "orders") {
            return <OrderListPage />
        }
       else if (params.orderId) {
            return <OrderDetailsPage />
        }
        else if (params.dashUrl === "products") {
            return <ProductListPage />
        }
        else if (params.productId) {
            return <ProductDetailsPage />
        }
        else if (params.dashUrl === "wallet") {
            return <WalletPage />
        }
        else if (params.dashUrl === "subscriptions") {
            return <SubscriptionPage />
        }
        else if (params.dashUrl === "storetract-credit") {
            return <StoretractCreditPage />
        }
        else if (params.dashUrl === "settings") {
            return <SettingsPage />
        }
        else if (params.dashUrl === "help-desk") {
            return <HelpDeskPage />
        }
        else{
            return <ErrorPage />
        }
    }

    return (
        <>
            <b className="screen-overlay"></b>
            <Sidebar pageName={params.dashUrl} />
            <main className="main-wrap">
                <TopNavbar />
                {pages()}
            </main>
        </>
    )

}
export default SellersDashboard
