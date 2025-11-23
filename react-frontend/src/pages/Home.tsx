import {
  Box,
  VStack,
  Heading,
  Image,
  IconButton,
} from "@chakra-ui/react";
import Hands from "../assets/main/hands.svg";
import { HomeIcon, CameraIcon, DiagramIcon } from "../components/CustomIcons";
import { ChatIcon } from "@chakra-ui/icons";

const Home = () => {
  return (
    <Box
      display="flex"
      minH="100vh"
      minW="100vw"
      position="relative"
      overflow="hidden"
    >
      <Image
        src={Hands}
        position="absolute"
        z-index={0}
        w="100%"
        h="100%"
        objectFit="contain"
      />
      <VStack align="flex-end" padding=" 10rem" alignSelf={"center"}>
        <Heading size="4xl">Office PT</Heading>
        <Heading size="md" color="white">
          Live preventative care for office workers.
        </Heading>
      </VStack>
      <IconButton
        colorScheme="black"
        aria-label="Home"
        icon={<HomeIcon />}
        size="xl"
        isRound
        position="absolute"
        top="70%"
        left="34%"
      />
      <IconButton
        colorScheme="black"
        aria-label="Camera"
        icon={<CameraIcon />}
        size="xl"
        isRound
        position="absolute"
        top="20%"
        left="43%"
      />
      <IconButton
        colorScheme="black"
        aria-label="Diagram"
        icon={<DiagramIcon />}
        size="xl"
        isRound
        position="absolute"
        top="40%"
        left="60%"
      />
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

export default Home;
