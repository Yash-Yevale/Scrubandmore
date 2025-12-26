import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <Box
      w="100%"
      h={{ base: "260px", md: "420px", lg: "500px" }}
      bgImage="url('/hero-banner.png')"   // ✅ your new SCRUBSANDMORE image
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      position="relative"
      display="flex"
      alignItems="flex-end"
    >
      {/* ✅ SHOP NOW BUTTON */}
     <Flex
        position="absolute"
        bottom={{ base: "20px", md: "50px" }}
        left="50%"
        transform="translateX(-50%)"
        justify="center"
      >
        <Button
          bg="#d1a84fff"
          color="black"
          w="180px"
          h="48px"
          fontWeight="600"
          borderRadius="full"
          _hover={{
            bg: "#d4a849ff",
            transform: "translateY(-2px)",
          }}
          transition="all 0.3s ease"
          onClick={() => navigate("/allProducts")}
        >
          Shop Now
        </Button>
      </Flex>
    
    </Box>
  );
};
