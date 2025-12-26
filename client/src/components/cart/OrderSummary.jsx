import { Box, Button, Divider, Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const OrderSummary = () => {
  const navigate = useNavigate();

  const { summary, cartProducts } = useSelector((state) => ({
    summary: state.cartReducer.summary,
    cartProducts: state.cartReducer.cartProducts,
  }));

  const {
    subTotal,
    shipping,
    discount,
    total,
  } = summary;

  const formatPrice = (value) => `₹${value.toFixed(2)}`;

  const isCartEmpty = cartProducts.length === 0;

  return (
    <Box
      p="24px"
      bg="white"
      borderRadius="md"
      boxShadow="md"
      h="fit-content"
    >
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Order Summary
      </Text>

      <VStack spacing={3} align="stretch">
        <Box display="flex" justifyContent="space-between">
          <Text>Subtotal</Text>
          <Text>{formatPrice(subTotal)}</Text>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Text>Shipping</Text>
          <Text>{formatPrice(shipping)}</Text>
        </Box>

        {discount > 0 && (
          <Box display="flex" justifyContent="space-between">
            <Text>Discount</Text>
            <Text color="green.600">
              -{formatPrice(discount)}
            </Text>
          </Box>
        )}

        <Divider />

        <Box display="flex" justifyContent="space-between">
          <Text fontWeight="bold">Total</Text>
          <Text fontWeight="bold">
            {formatPrice(total)}
          </Text>
        </Box>

        <Button
          mt={4}
          colorScheme="green"
          isDisabled={isCartEmpty}
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </Button>

        {isCartEmpty && (
          <Text fontSize="sm" color="red.500" textAlign="center">
            Your cart is empty
          </Text>
        )}
      </VStack>
    </Box>
  );
};
