import { Box, Text, VStack } from "@chakra-ui/react";
import { ItemBox } from "./ItemBox";

export const BagItems = ({ cartProducts = [] }) => {
  if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="gray.500">Your cart is empty</Text>
      </Box>
    );
  }

  return (
    <VStack align="stretch" spacing={6}>
      {cartProducts.map((item, index) => (
        <ItemBox
          key={`${item.id}-${item.size}-${item.color}-${item.fragrance}`}
          data={item}
          index={index}
        />
      ))}
    </VStack>
  );
};
