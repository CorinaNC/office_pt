import { extendTheme } from "@chakra-ui/react";
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const xl = defineStyle({
  h: "28",        // overall button height
  w: "28",        // overall button width
  fontSize: "6xl",
  px: 0,
  borderRadius: "full"
});

const Button = defineStyleConfig({
  sizes: {
    xl,
  },
});

const theme = extendTheme({
  fonts: {
    heading: "'Spartan', sans-serif",
    body: "'Spartan', sans-serif",
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "'Spartan', sans-serif",
        fontWeight: 700,
      },
    },
    Button,
  },
  styles: {
    global: {
      body: {
        bg: "#00CCBE",
        color: "white",
      },
      html: {
        height: "100vh",
        weight: "100vw",
      },
      button: {
        color: "white",
        bg: "black",

      }
    },
  },
});

export default theme;
