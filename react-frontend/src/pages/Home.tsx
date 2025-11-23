import {
  Box,
  VStack,
  Heading,
  Link,
  Image,
  HStack,
  Grid,
  Button,
  GridItem,
} from "@chakra-ui/react";
import React from "react";
import Hands from "../assets/main/hands.svg";
import Chat from "../assets/icons/Chat.svg";
import Diagram from "../assets/icons/Diagram.svg";
import Camera from "../assets/icons/Camera.svg";
import HomeIcon from "../assets/icons/Home.svg";

const Home = () => {
  return (
    <Box display="flex" minH="100vh" position="relative">
      <Box
        position="absolute"
        display="flex"
        justifyContent="center"
        alignItems="flex-end"
        bottom="0"
        zIndex="0"
      >
        <Image src={Hands} w="100%" h="auto" objectFit="contain" maxH="100vh" />
      </Box>
      <Box
        position="absolute"
        zIndex="1"
        display="flex"
        justifyContent="center"
      >
        <Button
          colorScheme="black"
          borderRadius="full"
          w="7rem"
          h="7rem"
        bottom="0"
        >
          <Link href="/camera">
            <Image src={Camera} height="inherit" width="inherit" />
          </Link>
        </Button>
        <Button colorScheme="black" borderRadius="full" w="7rem" h="7rem">
          <Link href="/diagram">
            <Image src={Diagram} height="inherit" width="inherit" />
          </Link>
        </Button>
        <Button colorScheme="black" borderRadius="full" w="7rem" h="7rem">
          <Link href="/chat">
            <Image src={Chat} height="inherit" width="inherit" />
          </Link>
        </Button>
        <Button colorScheme="black" borderRadius="full" w="7rem" h="7rem">
          <Link href="/home">
            <Image src={HomeIcon} height="inherit" width="inherit" />
          </Link>
        </Button>
        <VStack align="flex-start">
          <Heading size="2xl">Office PT</Heading>
          <Heading size="md" color="white">
            Live preventative care for office workers.
          </Heading>
        </VStack>
      </Box>
    </Box>
  );
};

export default Home;
