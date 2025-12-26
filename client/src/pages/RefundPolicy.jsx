import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  Link,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaEnvelope, FaShieldAlt } from "react-icons/fa";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

export const RefundPolicy = () => {
  return (
    <Box bg="gray.50" minH="100vh" py={{ base: 10, md: 16 }}>
      <MotionBox
        maxW="900px"
        mx="auto"
        px={{ base: 5, md: 10 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* HEADER */}
        <MotionVStack
          align="flex-start"
          spacing={4}
          mb={10}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Heading size="xl">Refund & Return Policy</Heading>
          <Text color="gray.600" fontSize="lg">
            Transparency and hygiene are our top priorities at Scrubandmore.
          </Text>
        </MotionVStack>

        {/* CONTENT CARD */}
        <MotionBox
          bg="white"
          borderRadius="2xl"
          p={{ base: 6, md: 10 }}
          boxShadow="lg"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <MotionVStack align="flex-start" spacing={6}>
            <HStack spacing={3}>
              <Icon as={FaShieldAlt} color="green.500" boxSize={6} />
              <Heading size="md">No Return & No Refund Policy</Heading>
            </HStack>

            <Text color="gray.700" lineHeight="1.8">
              At <b>Scrubandmore</b>, we deal with skincare and personal care
              products that are sensitive in nature. Due to strict hygiene and
              safety reasons, we do <b>not offer returns or refunds</b> once the
              product has been delivered.
            </Text>

            <Text color="gray.700" lineHeight="1.8">
              Once the product lid or seal is opened, it cannot be taken back or
              reused. This policy helps us ensure the highest hygiene standards
              for all our customers.
            </Text>

            <Divider />

            <Heading size="md">Wrong or Damaged Product</Heading>

            <Text color="gray.700" lineHeight="1.8">
              In the rare event that you receive a <b>wrong item</b> or a
              <b> damaged product</b>, please reach out to us immediately after
              receiving your order.
            </Text>

            <Text color="gray.700">
              To process such requests, the following are <b>mandatory</b>:
            </Text>

            <VStack align="flex-start" pl={4} spacing={2} color="gray.700">
              <Text>• Clear unboxing video (from opening the package)</Text>
              <Text>• Clear photos of the product received</Text>
              <Text>• Photos of the outer packaging</Text>
            </VStack>

            <Text color="gray.700" fontSize="sm">
              Requests without proper video and image proof will not be eligible
              for verification.
            </Text>

            <Divider />

            <Heading size="md">Need Help?</Heading>

            <Text color="gray.700">
              For any questions, concerns, or support, feel free to contact us
              at:
            </Text>

            <HStack spacing={3}>
              <Icon as={FaEnvelope} color="green.600" />
              <Link
                href="mailto:scrubandmoreskincare@gmail.com"
                fontWeight="bold"
                color="green.600"
                _hover={{ textDecoration: "underline" }}
              >
                scrubandmoreskincare@gmail.com
              </Link>
            </HStack>

            <Text fontSize="sm" color="gray.500">
              Our team will get back to you as soon as possible.
            </Text>
          </MotionVStack>
        </MotionBox>
      </MotionBox>
    </Box>
  );
};
