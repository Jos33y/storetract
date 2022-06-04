import React, {useEffect, useRef, useState} from "react";
import "./css/dashStyles.css";
import "./css/bootstrap.css";
import "./css/responsive.css";
import {useNavigate, useParams} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ErrorPage from "./pages/ErrorPage";
import AddProductPage from "./pages/products/AddProductPage";
import TransactionPage from "./pages/transactions/transactionPage";
import CustomersPage from "./pages/customers/customersPage";
import CustomerDetails from "./pages/customers/customerDetails";
import OrderListPage from "./pages/orders/orderListPage";
import OrderDetailsPage from "./pages/orders/orderDetailsPage";
import ProductListPage from "./pages/products/productListPage";
import CategoriesPage from "./pages/category/categoriesPage";
import WalletPage from "./pages/wallet/walletPage";
import StoretractCreditPage from "./pages/storetract/storetractCreditPage";
import SubscriptionPage from "./pages/subscription/subscriptionPage";
import HelpDeskPage from "./pages/helpdesk/helpDeskPage";
import SettingsPage from "./pages/settings/settingsPage";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import {getAuth} from "firebase/auth";
import Spinner from "../components/Spinner";
import EditProductPage from "./pages/products/editProduct";
import AccountSettings from "./pages/settings/accountSettings";
import StoreSettings from "./pages/settings/storeSettings";


const SellersDashboard = () => {

    const auth = getAuth()
    const isMounted = useRef()
    const params = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [profileData, setProfileData] = useState(null)
    const [storeData, setStoreData] = useState(null)
    // console.log(params.dashUrl)


    // get user function
    const getUser = async () =>{
        setLoading(true)
        const profileRef = doc(db, 'users', auth.currentUser.uid)
        const profileSnap =  await getDoc(profileRef)

        if(profileSnap.exists()){
            //  console.log(profileSnap.data())
                setProfileData(profileSnap.data())
            await  getStoreDetails(profileSnap.data().storeUrl)
        }
        else {
            navigate("/login")
        }

        setLoading(false)
    }

   const getStoreDetails = async (storeUrl) => {
        const storeDetailsRef = doc(db, 'shops', storeUrl)
       const storeDetailsSnap = await getDoc(storeDetailsRef)

       if(storeDetailsSnap.exists()){
           // console.log(storeDetailsSnap.data())
           setStoreData(storeDetailsSnap.data())
       }
    }


    const pages = () => {

        if (params.dashUrl === "home"){
            return <DashboardPage userId={auth.currentUser.uid} fullName={profileData.name} storeData={storeData}/>
        }
        else if (params.dashUrl === "categories") {
            return <CategoriesPage userId={auth.currentUser.uid} storeUrl={storeData.storeUrl} />
        }
        else if (params.categoryUrl) {
            return <CategoriesPage userId={auth.currentUser.uid} storeUrl={storeData.storeUrl} />
        }
        else if (params.dashUrl === "add-product") {
            return <AddProductPage userId={auth.currentUser.uid} storeUrl={storeData.storeUrl} />
        }

        else if (params.dashUrl === "transactions") {
                return <TransactionPage userId={auth.currentUser.uid} storeUrl={storeData.storeUrl} />
        }
        else if (params.dashUrl === "customers") {

            return <CustomersPage userId={auth.currentUser.uid} storeUrl={storeData.storeUrl} />
        }
       else if(params.customerId){
            return <CustomerDetails userId={auth.currentUser.uid}/>
        }
        else if (params.dashUrl === "orders") {
            return <OrderListPage userId={auth.currentUser.uid} storeUrl={storeData.storeUrl}/>
        }
       else if (params.orderId) {
            return <OrderDetailsPage userId={auth.currentUser.uid} storeUrl={storeData.storeUrl}/>
        }
        else if (params.dashUrl === "products") {
            return <ProductListPage userId={auth.currentUser.uid} storeUrl={storeData.storeUrl} />
        }
        else if (params.productId) {
            return <EditProductPage userId={auth.currentUser.uid} storeUrl={storeData.storeUrl}/>
        }
        else if (params.dashUrl === "wallet") {
            return <WalletPage userId={auth.currentUser.uid}/>
        }
        else if (params.dashUrl === "subscriptions") {
            return <SubscriptionPage userId={auth.currentUser.uid}/>
        }
        else if (params.dashUrl === "storetract-credit") {
            return <StoretractCreditPage />
        }
        else if (params.settingsUrl === "profile") {
            return <SettingsPage storeUrl={storeData.storeUrl} userId={auth.currentUser.uid} />
        }
        else if (params.settingsUrl === "store") {
            return <StoreSettings userId={auth.currentUser.uid}  storeUrl={storeData.storeUrl} />
        }
        else if (params.settingsUrl === "account") {
            return <AccountSettings storeUrl={storeData.storeUrl} />
        }
        else if (params.dashUrl === "help-desk") {
            return <HelpDeskPage />
        }
        else{
            return <ErrorPage />
        }
    }

    useEffect(() => {
        if(isMounted) {
            getUser().then()
        }
        return () => {
            isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, auth.currentUser.uid])


    return (
        <>
            {loading ?
                (<Spinner />) : (
                    <>
                        <div className="screen-overlay"></div>
                        <Sidebar pageName={params.dashUrl} storeData={storeData} />
                        <main className="main-wrap">
                            <TopNavbar storeLogoUrl={profileData.storeLogo} />
                            {pages()}
                        </main>
                    </>
                ) }
        </>
    )
}
export default SellersDashboard
