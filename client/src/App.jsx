import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import Account from "./pages/Account";
import OrderScreen from "./pages/OrderScreen";
import MyOrders from "./pages/Orders";
import Location from "./pages/Location";
import AdminProducts from "./pages/AdminProducts";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* OFFSET FOR FIXED NAVBAR */}
      <div className="pt-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
           <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
<Route path="/account" element={<Account/>} />
<Route path="/order/:id" element={<OrderScreen />} />
<Route path="/orders" element={<MyOrders />} />
<Route path="/location" element={<Location />} />
<Route path="/admin/products" element={<AdminProducts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
