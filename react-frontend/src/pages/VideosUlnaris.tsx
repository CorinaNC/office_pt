import {
  AspectRatio,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React from "react";

const VideosUlnaris = () => {
  return (
    <Flex justifyContent={"center"} gap={"0.5rem"} m={"2rem"} flexWrap={"wrap"}>
      <Card width="560px">
        <CardHeader>
          <Heading size="md">
            Flexor carpi ulnaris massage
          </Heading>
        </CardHeader>
        <CardBody>
          <AspectRatio maxW="560px">
            <iframe
              title="flexor-ulnaris-1"
              src="https://www.youtube.com/embed/y7Z6Kk1HMNk"
              allowFullScreen
            />
          </AspectRatio>
        </CardBody>
        <CardFooter>
          <Button>View on YouTube</Button>
        </CardFooter>
      </Card>
      <Card width="560px">
        <CardHeader>
          <Heading size="md">
            How To Stretch The FCU Muscle
          </Heading>
        </CardHeader>
        <CardBody>
          <AspectRatio maxW="560px">
            <iframe
              title="flexor-ulnaris-2"
              src="https://www.youtube.com/embed/EK4MIUyMjPE"
              allowFullScreen
            />
          </AspectRatio>
        </CardBody>
        <CardFooter>
          <Button>View on YouTube</Button>
        </CardFooter>
      </Card>
      <Card width="560px">
        <CardHeader>
          <Heading size="md">
            Wrist Rotation
          </Heading>
        </CardHeader>
        <CardBody>
          <AspectRatio maxW="560px">
            <iframe
              title="flexor-ulnaris-3"
              src="https://www.youtube.com/embed/_zw0rFs970M"
              allowFullScreen
            />
          </AspectRatio>
        </CardBody>
        <CardFooter>
          <Button>View on YouTube</Button>
        </CardFooter>
      </Card>
      <Card width="560px">
        <CardHeader>
          <Heading size="md">
            Flexor Carpi Ulnaris Self Massage
          </Heading>
        </CardHeader>
        <CardBody>
          <AspectRatio maxW="560px">
            <iframe
              title="flexor-ulnaris-4"
              src="https://www.youtube.com/embed/mrFJ2wkr8Cc"
              allowFullScreen
            />
          </AspectRatio>
        </CardBody>
        <CardFooter>
          <Button>View on YouTube</Button>
        </CardFooter>
      </Card>
      <Card width="560px">
        <CardHeader>
          <Heading size="md">
            Soft Tissue Massage
          </Heading>
        </CardHeader>
        <CardBody>
          <AspectRatio maxW="560px">
            <iframe
              title="flexor-ulnaris-5"
              src="https://www.youtube.com/embed/0LztpNPzKyk"
              allowFullScreen
            />
          </AspectRatio>
        </CardBody>
        <CardFooter>
          <Button>View on YouTube</Button>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default VideosUlnaris;
