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

// ✅ CORRECT ADMIN IMPORT
import AdminDashboard from "../admin/AdminDashboard";

export const AppRoutes = () => {
  return (
    <>
      <Navbar />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* PRODUCTS */}
        <Route path="/allProducts" element={<Products />} />
        <Route path="/men" element={<Products />} />
        <Route path="/women" element={<Products />} />
        <Route path="/kids" element={<Products />} />
        <Route path="/product/:id" element={<SingleProduct />} />

        {/* INFO */}
        <Route path="/description" element={<Description />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* CART & CHECKOUT */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* OPTIONAL */}
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/orders" element={<Order />} />

        {/* ADMIN (local only for now) */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* REFUND */}
        <Route path="/refund-policy" element={<RefundPolicy />} />

        {/* FALLBACK */}
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
};
