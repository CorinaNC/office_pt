import { extendTheme } from "@chakra-ui/react";

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
  },
  styles: {
    global: {
      body: {
        bg: "#00CCBE",
        color: "white",
      },
    },
  },
});

export default theme;
