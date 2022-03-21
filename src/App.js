
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./Home";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import ForgotPassword from "./Authentication/ForgotPassword";
import AdminDashboard from "./Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import InsertCategory from "./Dashboard/Category/insertCategory";
import ViewCategories from "./Dashboard/Category/viewCategories";
import ViewProducts from "./Dashboard/Products/viewProducts";
import AdminProfile from "./Dashboard/profile";
import ActivateShop from "./Dashboard/activateShop";
import InsertProduct from "./Dashboard/Products/insertProduct";
import Shop from "./Shop";

const App = () => {
  return (
      <>
          <Router>
              <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/admin-dash" element={<PrivateRoute/>}>
                      <Route path="/admin-dash" element={<AdminDashboard />} />
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
                  <Route path="/:shopName" element={<Shop />} />


              </Routes>
          </Router>
          <ToastContainer />

      </>

  );
}

export default App;
