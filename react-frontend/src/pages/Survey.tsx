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
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

const labelStyles = {
  mt: "2",
  ml: "-2.5",
  fontSize: "sm",
};

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: false,
});

const Survey = () => {
  const [experiencePain, setExperiencePain] = useState("");
  const [painLocation, setPainLocation] = useState("");
  const [painIntensity, setPainIntensity] = useState(1);
  const [painType, setPainType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!experiencePain) {
      toast({
        title: "Please indicate if you experienced pain",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (experiencePain === "yes" && (!painLocation || !painType)) {
      toast({
        title: "Please fill in all pain details",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const surveyData = {
      experiencePain: experiencePain === "yes",
      painLocation: painLocation,
      painIntensity: painIntensity,
      painType: painType,
    };

    console.log("Survey Data:", surveyData);
    setIsLoading(true);

    try {
      const response = await api.post("/surveys", surveyData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Success:", response.data);

      toast({
        title: "Survey submitted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setExperiencePain("");
      setPainLocation("");
      setPainIntensity(1);
      setPainType("");
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  };

  return (
    <Box padding={"2rem"}>
      <FormControl>
        <FormLabel>
          How was your session? Did you experience any pain?
        </FormLabel>
        <RadioGroup value={experiencePain} onChange={setExperiencePain}>
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
          value={painLocation}
          onChange={(e) => setPainLocation(e.target.value)}
          isDisabled={experiencePain === "no"}
        >
          <option value="Arms">Arms</option>
          <option value="Hands">Hands</option>
          <option value="Wrists">Wrists</option>
          <option value="Fingers">Fingers</option>
          <option value="Shoulders">Shoulders</option>
          <option value="Neck">Neck</option>
          <option value="Back">Back</option>
          <option value="Legs">Legs</option>
        </Select>

        <FormLabel mt={4}>How intense was the pain?</FormLabel>
        <Slider
          value={painIntensity}
          onChange={setPainIntensity}
          min={1}
          max={10}
          w={{ base: "100%", md: "500px" }}
          aria-label="pain-intensity"
          colorScheme="blackAlpha"
          isDisabled={experiencePain === "no"}
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
          value={painType}
          onChange={(e) => setPainType(e.target.value)}
          isDisabled={experiencePain === "no"}
        >
          <option value="Burning">Burning</option>
          <option value="Stinging">Stinging</option>
          <option value="Pins and needles">Pins and needles</option>
          <option value="Aching">Aching</option>
          <option value="Sharp">Sharp</option>
          <option value="Cramping">Cramping</option>
          <option value="Other">Other</option>
        </Select>

        <Button type="submit" onClick={handleSubmit} mt={4} colorScheme="teal">
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};

export default Survey;
