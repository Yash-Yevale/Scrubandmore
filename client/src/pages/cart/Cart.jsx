import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { BagItems } from "../../components/cart/BagItems";
import { OrderSummary } from "../../components/cart/OrderSummary";

export const Cart = () => {
  const { cartProducts } = useSelector(
    (state) => state.cartReducer
  );

  const isCartEmpty =
    !Array.isArray(cartProducts) || cartProducts.length === 0;

  return (
    <Box
      display="grid"
      gap={["40px", "40px", "40px", "5%"]}
      my="30px"
      maxW="1200px"
      mx="auto"
      p="20px"
      gridTemplateColumns={[
        "100%",
        "100%",
        "100%",
        "65% 30%",
      ]}
    >
      {/* ================= LEFT SIDE – CART ITEMS ================= */}
      {isCartEmpty ? (
        <Box
          p="40px"
          textAlign="center"
          bg="gray.50"
          borderRadius="md"
        >
          <Text fontSize="lg" fontWeight="600">
            Your cart is empty
          </Text>
          <Text color="gray.500">
            Add products to continue shopping
          </Text>
        </Box>
      ) : (
        <BagItems cartProducts={cartProducts} />
      )}

      {/* ================= RIGHT SIDE – ORDER SUMMARY ================= */}
      {!isCartEmpty && <OrderSummary />}
    </Box>
  );
};
