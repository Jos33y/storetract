import React  from "react";
import StoreTractLogo from "../../assets/images/logo-svg.svg";
import {Link} from "react-router-dom";
import "./componetStyles.css"
import {Button} from "react-bootstrap";

const Sidebar = ({pageName, storeData}) => {
    // const [isActive, setActive ] = useState(false)
    const handleMinimize = () => {
        if (window.innerWidth < 768) {
            document.body.classList.remove('aside-mini');
            document.body.classList.remove('offcanvas-active');
            document.querySelector('.screen-overlay').classList.remove('show')
            document.querySelector('.navbar-aside').classList.remove('show')
            // console.log(" less than 768");
        }
        else {
            document.body.classList.toggle('aside-mini');
            // console.log("greater than 768")
        }
    }


    return(
        <>
            <aside className="navbar-aside" id="offcanvas_aside">
                {/*aside top section*/}
                <div className="aside-top">
                    <Link to="/dashboard/home" className="brand-wrap">
                        <img src={StoreTractLogo} alt="dashboard logo" className="logo" />
                    </Link>
                    <div>
                        <Button onClick={handleMinimize} type="button" className="btn btn-md btn-primary btn-aside-minimize"> <i className="fas fa-bars"></i></Button>
                    </div>
                </div>

                {/*nav section start*/}
                <nav>
                    <ul className="menu-aside">
                        {/*menu one*/}
                        <li className={`menu-item ${pageName === 'home' ? 'active' : ''}`} onClick={handleMinimize}>
                            <Link to="/dashboard/home"  className="menu-link">
                                <i className="fas fa-home"></i>
                            <span className="text">Dashboard</span>
                            </Link>
                        </li>

                        {/*menu categories*/}
                        <li className={`menu-item ${pageName === 'categories' ? 'active' : ''}`} onClick={handleMinimize}>
                            <Link to="/dashboard/categories" className="menu-link">
                                <i className="fas fa-layer-group"></i>
                                <span className="text">Categories</span>
                            </Link>
                        </li>


                        {/*menu add products*/}
                        <li className={`menu-item ${pageName === 'add-product' ? 'active' : ''}`} onClick={handleMinimize}>
                            <Link to="/dashboard/add-product" className="menu-link">
                                <i className="fas fa-plus-square"></i>
                                <span className="text">Add Product</span>
                            </Link>
                        </li>

                        {/*menu products*/}
                        <li className={`menu-item ${pageName === 'products' ? 'active' : ''}`} onClick={handleMinimize}>
                            <Link to="/dashboard/products" className="menu-link">
                                <i className="fas fa-shopping-bag"></i>
                            <span className="text">Products</span>
                            </Link>
                        </li>

                        {/*menu orders*/}
                        <li className={`menu-item ${pageName === 'orders' ? 'active' : ''}`} onClick={handleMinimize}>
                            <Link to="/dashboard/orders" className="menu-link">
                                <i className="fas fa-shopping-cart"></i>
                                <span className="text">Orders</span>
                            </Link>
                        </li>

                        {/*menu customers*/}
                        <li className={`menu-item ${pageName === 'customers' ? 'active' : ''}`} onClick={handleMinimize}>
                            <Link to="/dashboard/customers" className="menu-link">
                                <i className="fas fa-users"></i>
                                <span className="text">Customers</span>
                            </Link>
                        </li>


                        {/*menu transactions*/}
                        <li className={`menu-item ${pageName === 'transactions' ? 'active' : ''}`} onClick={handleMinimize}>
                            <Link to="/dashboard/transactions" className="menu-link">
                                <i className="fas fa-money-bill-alt"></i>
                                <span className="text">Transactions</span>
                            </Link>
                        </li>

                        {/*menu wallet*/}
                        <li className={`menu-item ${pageName === 'wallet' ? 'active' : ''}`} onClick={handleMinimize}>
                            <Link to="/dashboard/wallet" className="menu-link">
                                <i className="fas fa-wallet"></i>
                                <span className="text">Wallet</span>
                            </Link>
                        </li>

                        {/*menu credit*/}
                        <li className={`menu-item ${pageName === 'subscriptions' ? 'active' : ''}`} onClick={handleMinimize}>
                            <Link to="/dashboard/subscriptions" className="menu-link">
                                <i className="fas fa-credit-card"></i>
                                <span className="text">Subscriptions</span>
                            </Link>
                        </li>

                        {/*menu loan*/}
                        <li className={`menu-item ${pageName === 'storetract-credit' ? 'active' : ''}`} onClick={handleMinimize}>
                            <Link to="/dashboard/storetract-credit" className="menu-link">
                                <i className="fas fa-coins"></i>
                                <span className="text">Storetract Credit</span>
                            </Link>
                        </li>

                        {/*menu settings*/}
                        <hr/>
                        <li className={`menu-item ${pageName === 'settings' ? 'active' : ''}`} onClick={handleMinimize}>
                            <Link to="/dashboard/settings/profile" className="menu-link">
                                <i className="fas fa-cog"></i>
                                <span className="text">Settings</span>
                            </Link>
                        </li>
                        {/*view shop*/}
                        <li className="menu-item">
                            <a target="_blank"
                               rel="noopener noreferrer"

                               href={storeData.domainName ? (`https://${storeData.domainName}`) : (`/${storeData.storeUrl}`)}
                               className="menu-link">
                                <i className="fas fa-store"></i>
                                <span className="text">View Store</span>
                            </a>
                        </li>

                        {/*view connect*/}
                        <li className={`menu-item ${pageName === 'help-desk' ? 'active' : ''}`} onClick={handleMinimize}>
                            <Link to="/dashboard/help-desk" className="menu-link">
                                <i className="fas fa-headset"></i>
                                <span className="text">Help Desk</span>
                            </Link>
                        </li>
                    </ul>
                    <br/>
                    <br/>
                </nav>
            </aside>
       </>
    )

}
export default Sidebar
