import {
  Box,
  Center,
  Flex,
  Image,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { RiHeartLine, RiShoppingBagLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setNavbarPath } from "../../redux/features/path/actions";
import { setItemSession } from "../../utils/sessionStorage";
import { DarkModeBtn } from "../../components/darkmode/DarkModeBtn";
import { Category, NavIcon } from "../../components/navbar/CategoryAndIcon";
import { SideDrawer } from "../../components/navbar/SideDrawer";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const handlePath = ({ target: { name } }) => {
    dispatch(setNavbarPath(name));
    setItemSession("path", name);
  };

  return (
    <>
      {/* 🔹 TOP STRIP (ONLY DARK MODE) */}
      
        <Center
          h="36px"
          justifyContent="flex-end"
          mr="40px"
          fontSize="16px"
        >
          
        </Center>
    

      {/* 🔹 MAIN NAVBAR */}
      <Flex
        bg="brand.500"
        color="white"
        px={8}
        py={4}
        align="center"
        position="sticky"
        top="0"
        zIndex="1000"
      >
        {/* LOGO */}
        <Box w="120px">
          <Image
            src="/logo.png"
            alt="ScrubsandMore Logo"
            h="75px"
            objectFit="contain"
            cursor="pointer"
            onClick={() => navigate("/")}
          />
        </Box>

        <Spacer />

        {/* DESKTOP MENU */}
        <Box display={["none", "none", "flex"]}>
          <Category name="/" text="HOME" link="/" handlePath={handlePath} />
          <Category
            name="about"
            text="ABOUT"
            link="/about"
            handlePath={handlePath}
          />
          <Category
            name="allProducts"
            text="PRODUCTS"
            link="/allProducts"
            handlePath={handlePath}
          />
          <Category
            name="contact"
            text="CONTACT"
            link="/contact"
            handlePath={handlePath}
          />
        </Box>

        <Spacer />

        {/* RIGHT ICONS */}
        

        <Center mr="10px">
          <Link to="/cart">
            <NavIcon iconName={RiShoppingBagLine} />
          </Link>
        </Center>

        {/* MOBILE SIDEBAR */}
        <Box display={["flex", "flex", "none"]}>
          <Center mr="10px">
            <SideDrawer handlePath={handlePath} />
          </Center>
        </Box>
      </Flex>

      <Box h={["10px", "20px", "30px", "40px"]} />
    </>
  );
};
