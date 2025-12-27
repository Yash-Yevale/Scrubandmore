import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { Hero } from "../../components/home/Hero";
import { setNavbarPath } from "../../redux/features/path/actions";
import { setItemSession } from "../../utils/sessionStorage";

const MotionBox = motion(Box);

export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNavbarPath(""));
    setItemSession("path", "");
  }, [dispatch]);

  return (
    <>
      {/* ================= HERO / BANNER ================= */}
      <Hero />

      {/* ================= VIDEO ================= */}
      <Box
        w="100%"
        py={["20px", "30px", "50px"]}
        bg="#f8efe9"
        display="flex"
        justifyContent="center"
      >
        <Box
          w={["100%", "100%", "65%"]}
          borderRadius="18px"
          overflow="hidden"
          boxShadow="xl"
        >
          <video
            src="/videos/scrubsandmore-intro.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>

      {/* ================= POSTERS ================= */}
      <Box bg="#fffaf5" py={20} px={[4, 6, 12]}>
        <SimpleGrid columns={[1, 1, 3]} spacing={12} alignItems="center">
          {[
            "/posters/poster1.png",
            "/posters/poster2.png",
            "/posters/poster3.png",
          ].map((poster, index) => (
            <MotionBox
              key={index}
              h="460px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="26px"
              overflow="hidden"
              boxShadow={
                index === 1
                  ? "0 30px 70px rgba(0,0,0,0.35)"
                  : "0 20px 50px rgba(0,0,0,0.25)"
              }
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: index === 1 ? 1.05 : 1 }}
              transition={{
                duration: 0.8,
                delay: index * 0.25,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{ scale: index === 1 ? 1.08 : 1.05 }}
            >
              <Image
                src={poster}
                w="100%"
                h="100%"
                objectFit="cover"
                cursor="pointer"
              />
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};
