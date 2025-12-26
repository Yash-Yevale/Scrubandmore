import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#f4f8f5",        // soft organic background
        color: "#0f3d2e",     // dark green text
      },
    },
  },

  colors: {
    brand: {
      50: "#e6f2ed",
      100: "#cce5db",
      200: "#99ccb8",
      300: "#66b295",
      400: "#339972",
      500: "#0f3d2e",   // ✅ PRIMARY DARK GREEN
      600: "#0c3327",
      700: "#0a2920",
      800: "#071f18",
      900: "#041510",
    },
  },

  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },

  components: {
    Button: {
      baseStyle: {
        borderRadius: "full",
        fontWeight: "600",
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
          },
        },
      },
    },
  },
});
