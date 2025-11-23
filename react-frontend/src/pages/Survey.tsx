import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  VStack,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  FormHelperText,
  Button,
  Box,
} from "@chakra-ui/react";
import React from "react";

const labelStyles = {
  mt: "2",
  ml: "-2.5",
  fontSize: "sm",
};

const Survey = () => {
  return (
    <Box padding={"2rem"}>
      <FormControl>
        <FormLabel>
          How was your session? Did you experience any pain?
        </FormLabel>
        <RadioGroup>
          <VStack align="start">
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </VStack>
        </RadioGroup>

        <FormLabel mt={4}>Where was the pain?</FormLabel>
        <Select
          placeholder="Select area"
          w={{ base: "100%", md: "500px" }}
          maxW="100%"
        >
          <option>Arms</option>
          <option>Hands</option>
          <option>Wrists</option>
          <option>Fingers</option>
          <option>Shoulders</option>
          <option>Neck</option>
          <option>Back</option>
          <option>Legs</option>
        </Select>

        <FormLabel mt={4}>How intense was the pain?</FormLabel>
        <Slider
          defaultValue={1}
          min={1}
          max={10}
          w={{ base: "100%", md: "500px" }}
          aria-label="pain-intensity"
          colorScheme="blackAlpha"
        >
          {Array.from({ length: 10 }, (_, i) => (
            <SliderMark key={i + 1} value={i + 1} {...labelStyles}>
              {i + 1}
            </SliderMark>
          ))}
          <SliderTrack bg="gray.200" h="6px">
            <SliderFilledTrack bg="teal" />
          </SliderTrack>
          <SliderThumb
            boxSize={4}
            bg="white"
            border="2px solid"
            borderColor="teal"
          />
        </Slider>
        <FormHelperText mt={4}>Pick on the scale from 1 to 10.</FormHelperText>

        <FormLabel mt={4}>What kind of pain is it?</FormLabel>
        <Select
          placeholder="Select pain type"
          w={{ base: "100%", md: "500px" }}
          maxW="100%"
        >
          <option>Burning</option>
          <option>Stinging</option>
          <option>Pins and needles</option>
          <option>Aching</option>
          <option>Sharp</option>
          <option>Cramping</option>
          <option>Other</option>
        </Select>

        <Button type="submit" mt={4}>
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};

export default Survey;
