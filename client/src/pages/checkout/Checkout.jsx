import { useState } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  Stack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  isCheckoutFormEmpty,
  validateEmail,
  validateMobile,
  validatePinCode,
} from "../../utils/formValidator";
import { setToast } from "../../utils/extraFunctions";
import { clearCart } from "../../redux/features/cart/actions";
import { CheckoutOrderSummary } from "../../components/checkout/CheckoutOrderSummary";
import { CheckoutForm } from "../../components/checkout/CheckoutForm";
import { initPayment } from "../payment/razorpay";

export const Checkout = () => {
  const { cartProducts, summary: orderSummary } = useSelector(
    (state) => state.cartReducer,
    shallowEqual
  );

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    locality: "",
    pinCode: "",
    state: "",
    country: "",
    email: "",
    mobile: "",
  });

  /* ---------- INPUT ---------- */
  const handleInputChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------- VALIDATION ---------- */
  const handleFormValidation = () => {
    const emptyCheck = isCheckoutFormEmpty(form);
    if (!emptyCheck.status) {
      setToast(toast, emptyCheck.message, "error");
      return false;
    }

    const emailCheck = validateEmail(form.email);
    if (!emailCheck.status) {
      setToast(toast, emailCheck.message, "error");
      return false;
    }

    const pinCheck = validatePinCode(form.pinCode);
    if (!pinCheck.status) {
      setToast(toast, pinCheck.message, "error");
      return false;
    }

    const mobileCheck = validateMobile(form.mobile);
    if (!mobileCheck.status) {
      setToast(toast, mobileCheck.message, "error");
      return false;
    }

    return true;
  };

  /* ---------- ORDER PAYLOAD ---------- */
  const buildOrderData = () => ({
    customer: {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      mobile: form.mobile,
      address: `${form.addressLine1} ${form.addressLine2}`,
      city: form.locality,
      state: form.state,
      pincode: form.pinCode,
      country: form.country,
    },
    products: cartProducts,
    orderSummary,
  });

  /* ---------- SUBMIT ---------- */
  const handleFormSubmit = async (e) => {
    console.log("⚡ CLICK TRIGGERED");

    if (e?.preventDefault) {
      try {
        e.preventDefault();
      } catch {}
    }

    if (!cartProducts || cartProducts.length === 0) {
      console.log("❌ Cart empty");
      setToast(toast, "Your cart is empty", "error");
      return;
    }

    if (!handleFormValidation()) {
      console.log("❌ Validation failed");
      return;
    }

    console.log("✅ Validation passed");

    const orderData = buildOrderData();

    /* ---------- COD ---------- */
    if (paymentMethod === "cod") {
      console.log("🚚 COD route firing...");

      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/order/cod`,
          orderData
        );

        console.log("✅ COD success");
        setToast(toast, "Order placed successfully", "success");
        dispatch(clearCart());
        navigate("/success");
      } catch (err) {
        console.error("❌ COD request failed:", err);
        setToast(toast, "Order failed. Try again.", "error");
      }

      return;
    }

    /* ---------- RAZORPAY ---------- */
    try {
      console.log("💳 Razorpay order creating...");
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/order`,
        { amount: orderSummary.total }
      );

      await initPayment(
        form,
        data,
        orderSummary,
        cartProducts,
        toast,
        dispatch,
        navigate
      );
    } catch (err) {
      console.error("❌ Razorpay error:", err);
      setToast(toast, "Payment failed. Try again.", "error");
    }
  };

  return (
    <Box
      p="20px"
      my="30px"
      mx="auto"
      maxW="1200px"
      display="grid"
      gap={["40px", "40px", "40px", "10%"]}
      gridTemplateColumns={["100%", "100%", "100%", "55% 35%"]}
    >
      <CheckoutForm onChange={handleInputChange} />

      <Box>
        <CheckoutOrderSummary
          orderSummary={orderSummary}
          onClick={handleFormSubmit}
        />

        <Box mt={6}>
          <Heading size="sm" mb={3}>
            Payment Method
          </Heading>

          <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
            <Stack spacing={2}>
              <Radio value="cod">Cash on Delivery</Radio>
              <Radio value="razorpay">Online Payment (Razorpay)</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Box>
    </Box>
  );
};
