import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Heading, HStack, VStack, SimpleGrid,
  Button, Tag, Text, Select, Spinner
} from "@chakra-ui/react";

import api from "../../utils/axios";
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
  const [onlyBest, setOnlyBest] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get("/api/products");

        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load products", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (onlyBest) {
      list = list.filter((p) => p.bestSeller === true);
    }

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
  }, [products, category, onlyBest, sortBy]);

  if (loading) {
    return (
      <Box py={20} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box px={{ base: 4, md: 12 }} py={8}>
      {/* UI remains unchanged */}
      {/* ... */}
    </Box>
  );
};
