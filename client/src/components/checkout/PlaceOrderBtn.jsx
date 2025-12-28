import { Button } from "@chakra-ui/react";

export const PlaceOrderBtn = ({ onClick, disabled = false }) => {
  return (
    <Button
      onClick={onClick}
      h="60px"
      w="100%"
      mt="20px"
      borderRadius="50px"
      fontSize="17px"
      color="black"
      bg="#edf2f7"
      border="1px solid #cecdce"
      _hover={{ borderColor: "black" }}
      isDisabled={disabled}
    >
      Place Order
    </Button>
  );
};
