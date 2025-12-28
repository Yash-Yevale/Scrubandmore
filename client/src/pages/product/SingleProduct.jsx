import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  Divider,
  Spinner,
  Input,
  Textarea,
  useToast,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { addToCartRequest } from "../../redux/features/cart/actions";

const MotionBox = motion(Box);

export const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedFragrance, setSelectedFragrance] = useState("");

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);


        setProduct(data);

        if (data?.sizes?.length) {
          setSelectedSize(data.sizes[0].label);
        }

        setSelectedColor("");
        setSelectedFragrance("");
      } catch (err) {
        console.error("Product load failed:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <Box py={20} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box py={20} textAlign="center">
        <Heading size="md">Product not found</Heading>
      </Box>
    );
  }

  const selectedVariant =
    product.sizes?.find((s) => s.label === selectedSize) ||
    product.sizes?.[0];

  /* ================= ADD TO CART ================= */
  const handleAddToCart = () => {
    if (!selectedVariant?.price) {
      toast({ title: "Please select a size", status: "warning" });
      return;
    }

    if (product.colors?.enabled && !selectedColor) {
      toast({ title: "Please select a colour", status: "warning" });
      return;
    }

    if (product.fragrances?.enabled && !selectedFragrance) {
      toast({ title: "Please select a fragrance", status: "warning" });
      return;
    }

    dispatch(
      addToCartRequest(
        {
          id: product._id,
          name: product.name,
          image: product.image,
          size: selectedVariant.label,
          price: Number(selectedVariant.price),
          color: product.colors?.enabled ? selectedColor : null,
          fragrance: product.fragrances?.enabled ? selectedFragrance : null,
          qty: 1,
        },
        toast,
        "add"
      )
    );

    navigate("/cart");
  };

  /* ================= SUBMIT REVIEW ================= */
  const submitRating = async () => {
    if (!name || rating === 0) {
      toast({ title: "Name & rating required", status: "warning" });
      return;
    }

    try {
      const res = await axios.post(`/api/reviews/${product._id}`, {
        name,
        rating,
        comment,
      });

      setProduct((prev) => ({
        ...prev,
        reviews: res.data.reviews,
      }));

      setName("");
      setRating(0);
      setComment("");

      toast({ title: "Review submitted", status: "success" });
    } catch (err) {
      toast({ title: "Failed to submit review", status: "error" });
    }
  };

  return (
    <Box px={{ base: 4, md: 14 }} py={10}>
      <HStack align="start" spacing={14} flexWrap="wrap">
        {/* IMAGE */}
        <Box position="relative">
          <Image
            src={product.image}
            alt={product.name}
            w={{ base: "100%", md: "450px" }}
            borderRadius="xl"
            boxShadow="lg"
          />

          {product.soldOut && (
            <Badge position="absolute" top="12px" left="12px" colorScheme="red">
              SOLD OUT
            </Badge>
          )}
        </Box>

        {/* DETAILS */}
        <VStack align="start" spacing={6} flex="1">
          <Heading>{product.name}</Heading>

          {/* SIZE */}
          <Box w="100%">
            <Text fontWeight="bold" mb={2}>
              Select Size
            </Text>

            <VStack spacing={3} align="stretch">
              {product.sizes?.map((v) => (
                <HStack
                  key={v.label}
                  justify="space-between"
                  px={4}
                  py={3}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={
                    selectedSize === v.label ? "green.400" : "gray.200"
                  }
                  bg={selectedSize === v.label ? "green.50" : "white"}
                  cursor="pointer"
                  onClick={() => setSelectedSize(v.label)}
                >
                  <Text fontWeight="600">{v.label}</Text>
                  <Text fontWeight="bold" color="green.700">
                    ₹{Number(v.price).toFixed(2)}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Box>

          {/* COLOR */}
          {product.colors?.enabled && product.colors.options?.length > 0 && (
            <Box w="100%">
              <Text fontWeight="bold" mb={2}>
                Select Colour
              </Text>

              <HStack wrap="wrap">
                {product.colors.options.map((c) => (
                  <Button
                    key={c}
                    size="sm"
                    variant={selectedColor === c ? "solid" : "outline"}
                    colorScheme="pink"
                    onClick={() => setSelectedColor(c)}
                  >
                    {c}
                  </Button>
                ))}
              </HStack>
            </Box>
          )}

          {/* FRAGRANCE */}
          {product.fragrances?.enabled &&
            product.fragrances.options?.length > 0 && (
              <Box w="100%">
                <Text fontWeight="bold" mb={2}>
                  Select Fragrance
                </Text>

                <HStack wrap="wrap">
                  {product.fragrances.options.map((f) => (
                    <Button
                      key={f}
                      size="sm"
                      variant={selectedFragrance === f ? "solid" : "outline"}
                      colorScheme="purple"
                      onClick={() => setSelectedFragrance(f)}
                    >
                      {f}
                    </Button>
                  ))}
                </HStack>
              </Box>
            )}

          <Divider />

          <Box>
            <Text fontWeight="bold">INGREDIENTS</Text>
            <Text>{product.ingredients}</Text>
          </Box>

          <Box>
            <Text fontWeight="bold">DESCRIPTION</Text>
            <Text textAlign="justify">{product.description}</Text>
          </Box>

          <Button
            w="100%"
            colorScheme="green"
            borderRadius="full"
            isDisabled={product.soldOut}
            onClick={handleAddToCart}
          >
            {product.soldOut ? "OUT OF STOCK" : "ADD TO CART"}
          </Button>
        </VStack>
      </HStack>

      {/* REVIEWS */}
      <Box mt={12}>
        <Heading size="md" mb={6}>
          CUSTOMER REVIEWS
        </Heading>

        <VStack spacing={4} mb={8} align="flex-start" maxW="600px">
          {product.reviews?.map((r, i) => (
            <MotionBox
              key={i}
              p={4}
              bg="white"
              borderRadius="lg"
              boxShadow="sm"
              w="100%"
            >
              <Text fontWeight="bold">{r.name}</Text>
              <Text color="orange.400">
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </Text>
              {r.comment && (
                <Text fontSize="sm" color="gray.600" mt={1}>
                  “{r.comment}”
                </Text>
              )}
            </MotionBox>
          ))}
        </VStack>

        {/* ADD REVIEW */}
        <Box maxW="400px">
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            mb={3}
          />

          <HStack mb={3}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Text
                key={n}
                fontSize="2xl"
                cursor="pointer"
                color={n <= rating ? "orange.400" : "gray.300"}
                onClick={() => setRating(n)}
              >
                ★
              </Text>
            ))}
          </HStack>

          <Textarea
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            mb={4}
            resize="none"
            maxLength={300}
          />

          <Button colorScheme="green" onClick={submitRating}>
            SUBMIT FEEDBACK
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
