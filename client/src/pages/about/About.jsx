import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Stack,
  SimpleGrid,
  Divider,
  HStack,
  VStack,
} from "@chakra-ui/react";

export const About = () => {
  return (
    <Box w="100%">
      {/* HERO SECTION */}
      <Box
        h={{ base: "160px", md: "180px" }}
        position="relative"
        
        bgSize="cover"
        bgPos="center"
      >
        <Box position="absolute" inset={0} bg="brand.700" opacity={0.9} />

        <Flex
          position="relative"
          zIndex={1}
          h="100%"
          align="center"
          justify="center"
          direction="column"
          color="white"
          textAlign="center"
          px={6}
        >
          <Heading size="2xl" letterSpacing="1px">
            OUR STORY
          </Heading>
          <Text mt={3} maxW="700px" opacity="1">
            “A premium organic skincare experience crafted with pure ingredients
            for naturally radiant skin.”
          </Text>
        </Flex>
      </Box>

      {/* MAIN CONTENT */}
      <Box px={{ base: 6, md: 20 }} py={20}>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={14}
          align="center"
        >
          {/* IMAGE */}
          <Box flex="1">
            <Image
              src="/about.jpg"
              alt="Scrubs & More Founders"
              borderRadius="2xl"
              boxShadow="2xl"
              objectFit="cover"
              w="100%"
              h={{ base: "460px", md: "580px" }}
            />
          </Box>

          {/* TEXT */}
          <Box flex="1">
            <Stack spacing={6}>
              {/* FOUNDERS */}
              <HStack
                spacing={{ base: 8, md: 16 }}
                flexWrap="wrap"
                align="flex-start"
              >
                <VStack align="flex-start" spacing={1}>
                  <Heading size="lg" color="green.900">
                    MADHUSMITA ROUT
                  </Heading>
                  <Text color="green.700" fontWeight="500">
                    Founder • Cosmetologist • Herbalist
                  </Text>
                </VStack>

                <VStack align="flex-start" spacing={1}>
                  <Heading size="lg" color="green.900">
                    NAYAMI ROUT
                  </Heading>
                  <Text color="green.700" fontWeight="500">
                    Co-Founder • Brand Curator
                  </Text>
                </VStack>
              </HStack>

              <Divider borderColor="blackAlpha.400" />

              {/* STORY */}
              <Text fontSize="lg" lineHeight="1.9" textAlign="justify">
                Scrubandmore is a mother-daughter–led brand built on the belief
                that effective skincare does not need to be expensive or
                chemical-laden. Our vision is to make skincare affordable,
                hygienic, sustainable, and rooted in nature.
              </Text>

              <Text fontSize="lg" lineHeight="1.9" textAlign="justify">
                We strongly believe that skincare can be crafted at home using
                the right balance of natural ingredients and modern formulation
                techniques. Many of our products have been personally used by us
                for years, ensuring they are gentle, skin-friendly, and truly
                effective.
              </Text>

              <Text fontSize="lg" lineHeight="1.9" textAlign="justify">
                Our journey began generations ago. Madhusmita’s grandmother
                formulated Ayurvedic lotions, soaps, and shampoos using natural
                ingredients in the 1980s. This knowledge was passed on to her
                mother and then refined further with modern skincare science,
                correct pH balance, and ingredient research — resulting in the
                products we proudly create today.
              </Text>
            </Stack>
          </Box>
        </Flex>
      </Box>

      {/* MISSION & VISION */}
      <Box bg="gray.50" px={{ base: 6, md: 20 }} py={20}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box
            p={10}
            bg="white"
            borderRadius="2xl"
            boxShadow="xl"
            transition="0.3s"
            _hover={{ transform: "translateY(-6px)", boxShadow: "2xl" }}
          >
            <Heading size="lg" mb={4}>
              Our Mission
            </Heading>
            <Text lineHeight="1.8" textAlign="justify">
              Our mission is to create safe, effective, and affordable skincare using thoughtfully selected natural ingredients and time-tested formulations. We are committed to maintaining high standards of hygiene, transparency, and sustainability while crafting products that are gentle on the skin and suitable for everyday use. Through honest practices and mindful formulation, we aim to make quality skincare accessible without unnecessary chemicals or excessive costs.
            </Text>
          </Box>

          <Box
            p={10}
            bg="white"
            borderRadius="2xl"
            boxShadow="xl"
            transition="0.3s"
            _hover={{ transform: "translateY(-6px)", boxShadow: "2xl" }}
          >
            <Heading size="lg" mb={4}>
              Our Vision
            </Heading>
            <Text lineHeight="1.8" textAlign="justify">
              Our vision is to build a trusted, homegrown skincare brand that blends traditional wisdom with modern cosmetic science. We aspire to inspire people to embrace natural skincare by offering products that are simple, effective, and rooted in care. As we grow, we envision Scrubs & More as a symbol of conscious beauty—where purity, performance, and sustainability come together to support healthy skin and confident living.
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};
