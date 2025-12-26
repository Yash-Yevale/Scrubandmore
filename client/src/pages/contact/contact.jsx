import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

/* ⭐ Static customer reviews */
const REVIEWS = [
  { name: "Ananya", rating: 5, text: "Amazing quality! My skin feels fresh and natural." },
  { name: "Rohit", rating: 4, text: "Loved the herbal scrub. Gentle and effective." },
  { name: "Priya", rating: 5, text: "Finally an organic brand I can trust." },
  { name: "Neha", rating: 4, text: "Great fragrance and smooth texture." },
  { name: "Aman", rating: 5, text: "Best skincare products I’ve used so far." },
  { name: "Kavita", rating: 4, text: "Very soothing on sensitive skin." },
  { name: "Sneha", rating: 5, text: "Packaging and results both are premium." },
  { name: "Vikas", rating: 4, text: "Worth the price. Will reorder soon." },
];

const Star = ({ filled, onClick }) => (
  <Text fontSize="22px" cursor="pointer" onClick={onClick}>
    {filled ? "⭐" : "☆"}
  </Text>
);

export const Contact = () => {
  const toast = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  /* ✅ SUBMIT FEEDBACK */
  const submitFeedback = async () => {
    if (!name || !email || !message) {
      toast({
        title: "All fields are required",
        status: "warning",
        position: "top",
      });
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/contact", {
        name,
        email,
        message,
        rating,
      });

      toast({
        title: "Feedback sent successfully",
        description: "Thank you for reaching out to us.",
        status: "success",
        position: "top",
      });

      // reset form
      setName("");
      setEmail("");
      setMessage("");
      setRating(5);
    } catch (err) {
      toast({
        title: "Failed to send feedback",
        status: "error",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box px={{ base: 4, md: 12 }} py={10}>
      {/* HEADER */}
      <VStack spacing={2} mb={10}>
        <Heading color="brand.700">Contact Us</Heading>
        <Text color="gray.600" textAlign="center">
          We’d love to hear from you. Share your feedback or reach out anytime.
        </Text>
      </VStack>

      {/* FORM + EMAIL */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={16}>
        {/* FEEDBACK FORM */}
        <Box p={6} bg="white" boxShadow="lg" borderRadius="xl">
          <Heading size="md" mb={4} color="brand.700">
            Customer Feedback
          </Heading>

          <VStack spacing={4}>
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Textarea
              placeholder="Your Message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* STAR RATING */}
            <HStack>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  filled={star <= rating}
                  onClick={() => setRating(star)}
                />
              ))}
            </HStack>

            <Button
              bg="brand.500"
              color="white"
              w="full"
              isLoading={loading}
              _hover={{ bg: "brand.600" }}
              onClick={submitFeedback}
            >
              Submit Feedback
            </Button>
          </VStack>
        </Box>

        {/* CONTACT INFO */}
        <Box p={6} bg="brand.50" borderRadius="xl">
          <Heading size="md" mb={4} color="brand.700">
            Reach Us
          </Heading>

          <Text mb={2} color="gray.700">
            📧 Email
          </Text>
          <Text fontWeight="600" color="brand.600">
            scrubandmoreskincare@gmail.com
          </Text>

          <Text mt={6} color="gray.600">
            We usually respond within 24 hours.
          </Text>
        </Box>
      </SimpleGrid>

      {/* REVIEWS */}
      <Box>
        <Heading size="lg" mb={6} color="brand.700">
          What Our Customers Say
        </Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
          {REVIEWS.map((review, index) => (
            <Box
              key={index}
              p={4}
              bg="white"
              boxShadow="md"
              borderRadius="lg"
            >
              <Text fontWeight="600">{review.name}</Text>

              <HStack spacing={1} my={2}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Text key={i} fontSize="16px">
                    {i <= review.rating ? "⭐" : "☆"}
                  </Text>
                ))}
              </HStack>

              <Text fontSize="sm" color="gray.600">
                {review.text}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
