import "./App.css";
// import Category from "./Components/category";
import Data from "./Components/data";
import Home from "./Components/home";
import Navbar from "./Components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Product from "./Components/product";
import Cta from "./Components/cta";
// import Products from "./Components/products";
import Shopingcart from "./Components/shopingcart";
import Footer from "./Components/footer";
import Search from "./Components/search";
import Login from "./Components/Auth/Login";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ResetPassword from "./Components/Auth/ResetPassword";
import VerifyOTP from "./Components/Auth/VerifyOTP";
import AdminPage from "./Components/Admin/AdminPage";
import CategoryProducts from "./Components/CategoryProducts";
import Products from "./Components/products";
import Category from "./Components/category";
import Brand from "./Components/brand";
import Servises from "./Components/servises";
import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Auth/Register";
import Loginadmin from "./Components/Login";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home /> <Category /> <Products /> <Servises /> <Data /> <Cta />{" "}
                <Brand /> <Footer />
              </>
            }
          />
          <Route path="/products" element={<Data />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cta" element={<Cta />} />
          <Route path="/shoping-cart" element={<Shopingcart />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/category-products/:nameCategory"
            element={<CategoryProducts />}
          />
          {/* Admin Page */}
          <Route path="/login-admin" element={<Loginadmin />} />
          <Route
            path="/admin-page"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login-user" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="verify-otp/:email" element={<VerifyOTP />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
