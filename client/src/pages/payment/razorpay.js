import axios from "axios";
import { nikeLogoPayment } from "../../constants/images";
import { setToast } from "../../utils/extraFunctions";
import { sendOrderRequest } from "./sendOrderRequest";

export const initPayment = (
  form,
  orderDetails,
  orderSummary,
  cartProducts,
  toast,
  dispatch,
  navigate
) => {
  const { firstName, lastName, mobile, email } = form;

  // ✅ Ensure Razorpay SDK loaded
  if (!window.Razorpay) {
    setToast(toast, "Razorpay SDK not loaded", "error");
    return;
  }

  // ✅ IMPORTANT: amount must already be in paise from backend
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY, // ONLY KEY_ID (NO SECRET)
    order_id: orderDetails.id,
    amount: orderDetails.amount,
    currency: "INR",

    name: "Scrubandmore",
    description: "Order Payment",
    image: nikeLogoPayment,

    prefill: {
      name: `${firstName} ${lastName}`,
      email,
      contact: mobile,
    },

    notes: {
      email,
      mobile,
    },

    handler: async function (response) {
      try {
        // ✅ Send EXACT fields Razorpay expects
        const verifyPayload = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        const { data } = await axios.post(
          "/api/payment/verify",
          verifyPayload
        );

        setToast(toast, data.message || "Payment successful", "success");

        // ✅ Save order AFTER payment verification
        await sendOrderRequest(
          form,
          orderDetails.id,
          verifyPayload,
          orderSummary,
          cartProducts,
          toast,
          dispatch,
          navigate
        );
      } catch (error) {
        console.error("Verification error:", error);
        setToast(toast, "Payment verification failed", "error");
      }
    },

    modal: {
      ondismiss: function () {
        setToast(toast, "Payment cancelled", "warning");
      },
    },

    theme: {
      color: "#0E5E6F",
    },
  };

  const rzp = new window.Razorpay(options);

  // ❌ Failure callback
  rzp.on("payment.failed", (response) => {
    console.error("Payment failed:", response.error);
    setToast(toast, response.error.description || "Payment failed", "error");
  });

  // ✅ Open Razorpay
  rzp.open();
};
