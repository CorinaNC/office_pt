import { Heading, Box, Card, CardBody, CardHeader } from "@chakra-ui/react";
import React from "react";

interface PopupProps {
  data: string;
  title: string;
}

const Popup = (props: PopupProps) => {
  const { data, title } = props;
  return (
    <Box maxW="100vw" display="flex" flexDir="column-reverse">
      <Card maxW="sm" margin="1rem" alignSelf="flex-end">
        <CardHeader fontWeight="bold">{title}</CardHeader>
        <CardBody>{data}</CardBody>
      </Card>
    </Box>
  );
};

export default Popup;
