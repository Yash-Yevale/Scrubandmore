import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // ✅ HARD GUARD
  if (!product || !product._id) return null;

  const goToProduct = () => {
    if (!product._id) return;
    navigate(`/product/${product._id}`);
  };

  /* ---------- PRICE LOGIC ---------- */
  const prices = Array.isArray(product.sizes)
    ? product.sizes.map((s) => Number(s.price))
    : [];

  const minPrice = prices.length ? Math.min(...prices) : null;

  /* ---------- RATING LOGIC ---------- */
  const reviews = Array.isArray(product.reviews) ? product.reviews : [];
  const totalRatings = reviews.length;

  const avgRating =
    totalRatings > 0
      ? reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
        totalRatings
      : null;

  const roundedRating = avgRating ? Math.round(avgRating) : 0;

  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      bg="white"
      cursor="pointer"
      position="relative"
      transition="all 0.25s ease"
      _hover={{
        transform: "translateY(-6px)",
        boxShadow: "xl",
      }}
      onClick={goToProduct}
    >
      {/* SOLD OUT BADGE */}
      {product.soldOut && (
        <Badge
          position="absolute"
          top="10px"
          left="10px"
          colorScheme="red"
          zIndex="1"
          px={2}
          py={1}
          borderRadius="md"
        >
          SOLD OUT
        </Badge>
      )}

      {/* IMAGE */}
      <Image
        src={product.image || "/placeholder.png"}
        alt={product.name}
        h="240px"
        w="100%"
        objectFit="cover"
        loading="lazy"
        opacity={product.soldOut ? 0.6 : 1}
      />

      {/* CONTENT */}
      <VStack align="start" p={4} spacing={3}>
        {/* TITLE */}
        <Text fontWeight="600" fontSize="md" noOfLines={2}>
          {product.name}
        </Text>

        {/* RATING */}
        {avgRating !== null && (
          <HStack spacing={1}>
            <Text color="orange.400" fontWeight="bold">
              {"★".repeat(roundedRating)}
              {"☆".repeat(5 - roundedRating)}
            </Text>
            <Text fontSize="sm" color="gray.500">
              ({avgRating.toFixed(1)})
            </Text>
          </HStack>
        )}

        {/* PRICE */}
        {minPrice !== null && (
          <Text fontWeight="bold" color="green.700">
            ₹{minPrice}
          </Text>
        )}

        {/* CTA */}
        <Button
          size="sm"
          colorScheme="green"
          w="100%"
          borderRadius="full"
          isDisabled={product.soldOut}
          onClick={(e) => {
            e.stopPropagation();
            goToProduct();
          }}
        >
          {product.soldOut ? "Out of Stock" : "View Product"}
        </Button>
      </VStack>
    </Box>
  );
};
