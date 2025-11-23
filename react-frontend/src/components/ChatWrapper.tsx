import React from "react";
import { Link, Box, IconButton } from "@chakra-ui/react";
import { ChatIcon } from "./CustomIcons";
import { Outlet } from "react-router-dom";
const ChatWrapper = () => {
  return (
    <Box>
      <Outlet />

      <IconButton
        colorScheme="black"
        aria-label="Chat"
        icon={<ChatIcon />}
        size="xl"
        isRound
        position="fixed"
        bottom="2rem"
        right="2rem"
      />
    </Box>
  );
};

export default ChatWrapper;
