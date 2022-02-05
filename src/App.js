
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

              </Routes>
          </Router>
          <ToastContainer />

      </>

  );
}

export default App;
