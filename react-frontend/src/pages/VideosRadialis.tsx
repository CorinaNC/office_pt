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

const VideosRadialis = () => {
  return (
    <Flex justifyContent={"center"} gap={"0.5rem"} m={"2rem"} flexWrap={"wrap"}>
      <Card width="560px">
        <CardHeader>
          <Heading size="md">Forearm PROM Advanced Flexor Stretch</Heading>
        </CardHeader>
        <CardBody>
          <AspectRatio maxW="560px">
            <iframe
              title="flexor-radialis-1"
              src="https://www.youtube.com/embed/d7t7N0agsTc"
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
            Flexor carpi radialis rehab and wrist flexibility
          </Heading>
        </CardHeader>
        <CardBody>
          <AspectRatio maxW="560px">
            <iframe
              title="flexor-radialis-2"
              src="https://www.youtube.com/embed/2WV7C6ckmiU"
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
            How to Release the Flexor Carpi Ulnaris Muscle
          </Heading>
        </CardHeader>
        <CardBody>
          <AspectRatio maxW="560px">
            <iframe
              title="flexor-radialis-3"
              src="https://www.youtube.com/embed/XDwpuAo8J0E"
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

export default VideosRadialis;
