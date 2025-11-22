import { HStack, Link } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

const Header = () => {
  return (
    <HStack>
      <Link href="/home">Home</Link>
      <Link href="/video">Video</Link>
      <Outlet />
    </HStack>
  );
};

export default Header;
