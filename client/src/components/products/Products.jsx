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
  { id: "creams", label: "Creams" },
  { id: "oils", label: "Oils" },
  { id: "combos", label: "Combos" },
];

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("all");
  const [onlyBest, setOnlyBest] = useState(false);
  const [onlyComingSoon, setOnlyComingSoon] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/products`);

      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Failed to fetch products", err);
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

    if (onlyBest) list = list.filter((p) => p.bestSeller === true);

    if (onlyComingSoon) list = list.filter((p) => p.comingSoon === true);

    if (sortBy === "price-asc") {
      list.sort((a, b) => {
        const aPrice = Math.min(...(a.sizes || []).map((s) => s.price));
        const bPrice = Math.min(...(b.sizes || []).map((s) => s.price));
        return aPrice - bPrice;
      });
    }

    if (sortBy === "price-desc") {
      list.sort((a, b) => {
        const aPrice = Math.min(...(a.sizes || []).map((s) => s.price));
        const bPrice = Math.min(...(b.sizes || []).map((s) => s.price));
        return bPrice - aPrice;
      });
    }

    return list;
  }, [products, category, onlyBest, onlyComingSoon, sortBy]);

  if (loading) {
    return (
      <Box py={20} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box px={{ base: 4, md: 12 }} py={8}>
      <HStack justify="space-between" align="center" mb={6}>
        <VStack align="start" spacing={1}>
          <Heading size="lg">Products</Heading>
          <Text color="gray.600">
            Explore our natural, organic skincare products
          </Text>
        </VStack>

        <HStack spacing={3}>
          <Tag
            size="lg"
            variant={onlyBest ? "solid" : "subtle"}
            colorScheme="orange"
            cursor="pointer"
            onClick={() => {
              setOnlyBest((s) => !s);
              setOnlyComingSoon(false);
            }}
          >
            Best Seller
          </Tag>

          <Tag
            size="lg"
            variant={onlyComingSoon ? "solid" : "subtle"}
            colorScheme="green"
            cursor="pointer"
            onClick={() => {
              setOnlyComingSoon((s) => !s);
              setOnlyBest(false);
            }}
          >
            Coming Soon
          </Tag>

          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            size="sm"
            w="160px"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </Select>
        </HStack>
      </HStack>

      <HStack spacing={3} mb={6} wrap="wrap">
        {CATEGORIES.map((c) => (
          <Button
            key={c.id}
            size="sm"
            variant={category === c.id ? "solid" : "ghost"}
            colorScheme={category === c.id ? "green" : "gray"}
            onClick={() => setCategory(c.id)}
          >
            {c.label}
          </Button>
        ))}
      </HStack>

      <MotionVStack align="stretch">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {filtered.map((p) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </SimpleGrid>

        {filtered.length === 0 && (
          <Box textAlign="center" py={12} color="gray.500">
            No products found for selected filters.
          </Box>
        )}
      </MotionVStack>
    </Box>
  );
};
