import {
  Box,
  Divider,
  Flex,
  Image,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  addToCartRequest,
  removeFromCartRequest,
} from "../../redux/features/cart/actions";
import { numberWithCommas } from "../../utils/extraFunctions";
import { BagItemBtn, QuantityBtn } from "./BagItemBtn";

export const ItemBox = ({ data }) => {
  const dispatch = useDispatch();

  if (!data) return null;

  /* -------- REMOVE ITEM -------- */
  const handleRemove = () => {
    dispatch(
      removeFromCartRequest({
        id: data.id,
        size: data.size,
        color: data.color,
        fragrance: data.fragrance,
      })
    );
  };

  /* -------- INCREASE -------- */
  const handleIncrease = () => {
    dispatch(addToCartRequest(data, null, "add"));
  };

  /* -------- DECREASE -------- */
  const handleDecrease = () => {
    if (data.qty <= 1) {
      handleRemove();
      return;
    }

    dispatch(
      addToCartRequest(
        { ...data, qty: data.qty - 1 },
        null,
        "update"
      )
    );
  };

  /* -------- NOTE -------- */
  const handleNoteChange = (e) => {
    dispatch(
      addToCartRequest(
        { ...data, note: e.target.value },
        null,
        "update"
      )
    );
  };

  return (
    <>
      <Box p="12px" border="1px solid" borderColor="gray.200" borderRadius="lg">
        <Flex gap="15px">
          {/* IMAGE */}
          <Box w="120px" h="120px">
            <Image
              src={data.image}
              alt={data.name}
              w="100%"
              h="100%"
              objectFit="cover"
              borderRadius="md"
            />
          </Box>

          {/* DETAILS */}
          <Box flex="1">
            <Text fontWeight="600">{data.name}</Text>
            <Text fontSize="sm" color="gray.500">
              Size: {data.size}
            </Text>

            {data.color && (
              <Text fontSize="sm" color="gray.500">
                Color: {data.color}
              </Text>
            )}

            {data.fragrance && (
              <Text fontSize="sm" color="gray.500">
                Fragrance: {data.fragrance}
              </Text>
            )}

            {/* QUANTITY */}
            <Flex align="center" gap="10px" my="8px">
              <QuantityBtn text="-" onClick={handleDecrease} />
              <Text>{data.qty}</Text>
              <QuantityBtn text="+" onClick={handleIncrease} />
            </Flex>

            {/* NOTE */}
            <Textarea
              value={data.note || ""}
              onChange={handleNoteChange}
              placeholder="Any instructions?"
              size="sm"
              resize="none"
            />

            <Box mt={3}>
              <BagItemBtn title="Remove" onClick={handleRemove} />
            </Box>
          </Box>

          {/* PRICE */}
          <Box minW="90px" textAlign="right">
            <Text fontWeight="600">
              ₹{numberWithCommas(data.price * data.qty)}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Divider />
    </>
  );
};
