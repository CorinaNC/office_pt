import React from "react";
import { Button, Link, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
const BackButtonWrapper = () => {
  return (
    <Box>
      <Outlet />
      <Button
        colorScheme="black"
        aria-label="Chat"
        position="fixed"
        bottom="2rem"
        left="2rem"
      >
        <Link href="/">Back</Link>
      </Button>
    </Box>
  );
};

export default BackButtonWrapper;
