import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { ClothSection } from "../../components/home/ClothSection";
import { ShoeSection } from "../../components/home/ShoeSection";
import { Error } from "../../components/loading/Error";
import { Loading } from "../../components/loading/Loading";
import { getClothData, getShoeData } from "../../redux/features/home/actions";
import { setNavbarPath } from "../../redux/features/path/actions";
import { setItemSession } from "../../utils/sessionStorage";
import { Hero } from "../../components/home/Hero";

const MotionBox = motion(Box);

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    loading,
    error,
    clothData = [],
    shoeData = [],
  } = useSelector((state) => state.homeReducer || {});

  const handleSection = (gender) => {
    dispatch(setNavbarPath(gender));
    setItemSession("path", gender);
    navigate(`/${gender}`);
  };

  useEffect(() => {
    dispatch(getClothData());
    dispatch(getShoeData());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      {/* ================= HERO ================= */}
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

      {/* ================= ALIGNED + ANIMATED POSTERS ================= */}
      <Box bg="#fffaf5" py={20} px={[4, 6, 12]}>
        <SimpleGrid
          columns={[1, 1, 3]}
          spacing={12}
          alignItems="center"   // ✅ KEY FIX
        >
          {[
            "/posters/poster1.png",
            "/posters/poster2.png",
            "/posters/poster3.png",
          ].map((poster, index) => (
            <MotionBox
              key={index}
              h="460px"                       // ✅ SAME HEIGHT
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
                objectFit="cover"        // ✅ PREVENTS MISALIGN
                cursor="pointer"
              />
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>

      {/* ================= SHOES ================= */}
      {Array.isArray(shoeData) &&
        shoeData.map((data, index) => (
          <ShoeSection
            handleSection={handleSection}
            key={index}
            {...data}
          />
        ))}

      {/* ================= CLOTH ================= */}
      {Array.isArray(clothData) &&
        clothData.map((data, index) => (
          <ClothSection
            handleSection={handleSection}
            key={index}
            {...data}
          />
        ))}
    </>
  );
};
