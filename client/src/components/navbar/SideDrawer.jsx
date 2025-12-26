import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { BiMenu } from "react-icons/bi";
import { DrawerCategory } from "./CategoryAndIcon";

export const SideDrawer = ({ handlePath }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Icon
        w={"28px"}
        h={"28px"}
        mr={"10px"}
        cursor="pointer"
        onClick={onOpen}
        as={BiMenu}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          {/* ✅ GUEST HEADER */}
          <DrawerHeader>Welcome</DrawerHeader>
          <Divider />

          <DrawerBody>
            <VStack gap={"30px"} mt={"40px"} onClick={onClose}>
              <DrawerCategory
                handlePath={handlePath}
                name={"/"}
                text={"Home"}
                link={"/"}
              />

              <DrawerCategory
                name="about"
                text="About"
                link="/about"
              />

              <DrawerCategory
                handlePath={handlePath}
                name={"allProducts"}
                text={"All Products"}
                link={"/allProducts"}
              />

              

              <DrawerCategory
                name="cart"
                text="Cart"
                link="/cart"
              />

              <DrawerCategory
                name="checkout"
                text="Checkout"
                link="/checkout"
              />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
