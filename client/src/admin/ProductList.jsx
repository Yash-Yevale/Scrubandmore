import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Button,
  HStack,
  VStack,
  Badge,
} from "@chakra-ui/react";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  /* ---------- FETCH PRODUCTS ---------- */
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products`);

      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ---------- DELETE ---------- */
  const deleteProduct = async (id) => {
  if (!window.confirm("Delete this product?")) return;

  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/products/${id}`
    );

    alert("Product deleted");
    fetchProducts();
  } catch (err) {
    console.error("Delete failed", err);
    alert("Failed to delete");
  }
};


  /* ---------- HIDE / UNHIDE ---------- */
  const toggleActive = async (p) => {
    await axios.put(`/api/admin/products/${p._id}`, {
      isActive: !p.isActive,
    });
    fetchProducts();
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Product List
      </Text>

      <VStack spacing={4} align="stretch">
        {products.map((p) => (
          <Box
            key={p._id}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
            p={4}
          >
            <Text fontWeight="bold">{p.name}</Text>
            <Text fontSize="sm" color="gray.600">
              {p.description}
            </Text>

            <HStack mt={3}>
              

              

              <Button
                size="sm"
                colorScheme="red"
                onClick={() => deleteProduct(p._id)}
              >
                Delete
              </Button>
            </HStack>
          </Box>
        ))}

        {products.length === 0 && (
          <Text>No products found</Text>
        )}
      </VStack>
    </Box>
  );
}
