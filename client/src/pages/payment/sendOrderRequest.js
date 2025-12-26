import axios from "axios";
import { clearCart } from "../../redux/features/cart/actions";
import { setToast } from "../../utils/extraFunctions";

export const sendOrderRequest = async (
  shippingDetails,
  orderId,
  response,
  orderSummary,
  cartProducts,
  token,
  toast,
  dispatch,
  navigate
) => {
  const payload = {
    orderSummary,
    cartProducts,
    shippingDetails,
    paymentDetails: {
      orderId,
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
    },
  };

  try {
    await axios.post("/api/order", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setToast(toast, "Order placed successfully", "success");

    // ✅ CLEAR CART PROPERLY
    dispatch(clearCart());

    navigate("/");
  } catch (err) {
    console.error(err);
    setToast(toast, "Order failed. Please try again.", "error");
  }
};
