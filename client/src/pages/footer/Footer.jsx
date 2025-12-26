import {
  Box,
  HStack,
  VStack,
  Text,
  Link,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { FaInstagram, FaHeart } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

export const Footer = () => {
  return (
    <Box bg="black" color="gray.300" mt={20}>
      {/* TOP DIVIDER */}
      <Divider borderColor="gray.700" />

      {/* MAIN FOOTER */}
      <Box maxW="1200px" mx="auto" px={6} py={12}>
        <HStack
          align="flex-start"
          justify="space-between"
          flexWrap="wrap"
          spacing={10}
        >
          {/* LEFT */}
          <VStack align="flex-start" spacing={3}>
            <Text fontWeight="bold" color="white">
              SEND US FEEDBACK
            </Text>

            <Link
              as={RouterLink}
              to="/contact"
              color="gray.400"
              _hover={{ color: "white" }}
            >
              Contact Us
            </Link>
          </VStack>

          {/* CENTER */}
          <VStack align="flex-start" spacing={3}>
            <Text fontWeight="bold" color="white">
              GET HELP
            </Text>

            <Link
              as={RouterLink}
              to="/refund-policy"
              color="gray.400"
              _hover={{ color: "white" }}
            >
              Refund Policy
            </Link>
          </VStack>

          {/* RIGHT */}
          <VStack align="flex-start" spacing={3}>
            <Text fontWeight="bold" color="white">
              FOLLOW US
            </Text>

            <HStack spacing={3}>
              <Link
                href="https://www.instagram.com/scrubandmore__skincare?igsh=MWZ1aHF6N2ZxZ2M3Mw=="
                isExternal
                display="flex"
                alignItems="center"
                gap={2}
                color="gray.400"
                _hover={{ color: "white" }}
              >
                <Icon as={FaInstagram} boxSize={5} />
                <Text>@scrubandmore_skincare</Text>
              </Link>
            </HStack>
          </VStack>
        </HStack>
      </Box>

      {/* BOTTOM BAR */}
      <Box
        borderTop="1px solid"
        borderColor="gray.800"
        py={4}
        textAlign="center"
      >
        <HStack justify="center" spacing={2}>
          <Text fontSize="sm">Made with</Text>
          <Icon as={FaHeart} color="red.500" />
          <Text fontSize="sm">by Scrub and More</Text>
        </HStack>
      </Box>
    </Box>
  );
};
