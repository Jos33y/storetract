import React from "react";
import "./dashStyles.css"
import "./bootstrap.css"
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import DashboardPage from "./pages/DashboardPage";

const SellersDashboard = () => {

    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <TopNavbar />
                <DashboardPage />
            </main>
        </>
    )

}
export default SellersDashboard
