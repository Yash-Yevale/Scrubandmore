import { Box } from "@chakra-ui/react";
import { OrderSummaryDataSection } from "../cart/OrderSummaryDataSection";
import { PlaceOrderBtn } from "./PlaceOrderBtn";

export const CheckoutOrderSummary = ({
  onClick,
  orderSummary = {
    subTotal: 0,
    quantity: 0,
    shipping: 0,
    discount: 0,
    total: 0,
  },
}) => {
  return (
    <Box>
      {/* SUMMARY DETAILS */}
      <OrderSummaryDataSection {...orderSummary} />

      {/* PLACE ORDER BUTTON */}
      <PlaceOrderBtn onClick={onClick} />
    </Box>
  );
};
