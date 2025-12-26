import { Box, Heading, Divider } from "@chakra-ui/react";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";

export default function AdminDashboard() {
  // 🔒 Basic safety: allow admin only on localhost
  if (window.location.hostname !== "localhost") {
    return (
      <Box p="40px" textAlign="center">
        <Heading size="md">Not Authorized</Heading>
      </Box>
    );
  }

  return (
    <Box maxW="1200px" mx="auto" p={6}>
      <Heading mb={4}>Admin Dashboard</Heading>

      <Divider my={6} />

      {/* ADD / EDIT PRODUCT */}
      <AddProduct />

      <Divider my={10} />

      {/* PRODUCT LIST */}
      <ProductList />
    </Box>
  );
}
