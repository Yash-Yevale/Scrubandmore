import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Heading,
  HStack,
  VStack,
  SimpleGrid,
  Button,
  Tag,
  Text,
  Select,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { ProductCard } from "../../components/products/ProductCard";
import { motion } from "framer-motion";

const MotionVStack = motion(VStack);

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "scrubs", label: "Scrubs" },
];

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/api/products`);

      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    return list;
  }, [products, category, sortBy]);

  if (loading) {
    return (
      <Box py={20} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box px={{ base: 4, md: 12 }} py={8}>
      <HStack justify="space-between" mb={6}>
        <VStack align="start">
          <Heading>Products</Heading>
          <Text color="gray.600">Natural & organic skincare</Text>
        </VStack>

        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} w="180px">
          <option value="relevance">Sort: Relevance</option>
        </Select>
      </HStack>

      <HStack spacing={3} mb={6}>
        {CATEGORIES.map((c) => (
          <Button
            key={c.id}
            size="sm"
            variant={category === c.id ? "solid" : "outline"}
            onClick={() => setCategory(c.id)}
          >
            {c.label}
          </Button>
        ))}
      </HStack>

      <MotionVStack>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </SimpleGrid>

        {filtered.length === 0 && (
          <Box textAlign="center" py={10} color="gray.500">
            No products found.
          </Box>
        )}
      </MotionVStack>
    </Box>
  );
};
