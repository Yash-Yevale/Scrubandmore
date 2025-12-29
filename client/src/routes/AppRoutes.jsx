import { Routes, Route } from "react-router-dom";

import { Cart } from "../pages/cart/Cart";
import { Checkout } from "../pages/checkout/Checkout";
import { Description } from "../pages/description/Description";
import { Favourite } from "../pages/favourite/Favourite";
import { Footer } from "../pages/footer/Footer";
import { Home } from "../pages/home/Home";
import { Navbar } from "../pages/navbar/Navbar";
import { Order } from "../pages/orders/Order";
import { Products } from "../pages/products/Products";
import { About } from "../pages/about/About";
import { Contact } from "../pages/contact/contact";
import { SingleProduct } from "../pages/product/SingleProduct";
import { RefundPolicy } from "../pages/RefundPolicy";

// 🚩 ADMIN
import AdminDashboard from "../pages/admin/AdminDashboard";

export const AppRoutes = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/allProducts" element={<Products />} />
        <Route path="/men" element={<Products />} />
        <Route path="/women" element={<Products />} />
        <Route path="/kids" element={<Products />} />

        <Route path="/product/:id" element={<SingleProduct />} />

        <Route path="/description" element={<Description />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/favourite" element={<Favourite />} />
        <Route path="/orders" element={<Order />} />

        {/* ADMIN PANEL */}
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/refund-policy" element={<RefundPolicy />} />

        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
};
