import { Button, Box, Link } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

const GlobalWrapper = () => {
  return (
    <Box margin="5rem" position="sticky">
      <Outlet />
      <Link href="/home">
        <Button colorScheme="black">Back</Button>
      </Link>
    </Box>
  );
};

export default GlobalWrapper;
