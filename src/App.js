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
import Login from "./Components/Login";
import AdminPage from "./Components/Admin/AdminPage";
import CategoryProducts from "./Components/CategoryProducts";
import Products from "./Components/products";
import Category from "./Components/category";
import Brand from "./Components/brand";
import Servises from "./Components/servises";
import ProtectedRoute from "./Components/ProtectedRoute";

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
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin-page"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
