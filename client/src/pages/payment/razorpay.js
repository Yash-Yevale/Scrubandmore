import axios from "axios";
import { nikeLogoPayment } from "../../constants/images";
import { setToast } from "../../utils/extraFunctions";
import { sendOrderRequest } from "./sendOrderRequest";

export const initPayment = async (
  form,
  data,            // <-- backend response (contains { order, key })
  orderSummary,
  cartProducts,
  toast,
  dispatch,
  navigate
) => {
  const { firstName, lastName, mobile, email } = form;

  if (!window.Razorpay) {
    setToast(toast, "Razorpay SDK not loaded", "error");
    return;
  }

  // backend sends:
  // data = { success, order, key }
  const order = data.order;
  const key = data.key;

  if (!order || !key) {
    setToast(toast, "Invalid Razorpay order details", "error");
    return;
  }

  const options = {
    key,                        // <-- ALWAYS use backend key
    order_id: order.id,
    amount: order.amount,
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
        const verifyPayload = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        // VERIFY ON BACKEND (NOT ON VERCEL)
        const { data: verify } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/payment/verify`,
          verifyPayload
        );

        setToast(toast, verify.message || "Payment successful", "success");

        // Save order AFTER verification
        await sendOrderRequest(
          form,
          order.id,
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

  rzp.on("payment.failed", (response) => {
    console.error("Payment failed:", response.error);
    setToast(toast, response.error.description || "Payment failed", "error");
  });

  rzp.open();
};
