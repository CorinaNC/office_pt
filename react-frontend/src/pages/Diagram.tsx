import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackArms from "../assets/diagram/armBack.svg";
import MusclesArms from "../assets/diagram/armMuscles.svg";
import FlexorCarpiRadial from "../assets/diagram/FlexorCarpiRadialis.svg";
import FlexorCarpiUlnar from "../assets/diagram/FlexorCarpiUlnaris.svg";
import { Box, Image, Grid, GridItem } from "@chakra-ui/react";
import Popup from "../components/Popup";

const Diagram = () => {
  const navigate = useNavigate();
  const [visibleMuscles, setVisibleMuscles] = useState<boolean>(false);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const handleMouseEnter = (area: string) => {
    setHoveredArea(area);
    setVisibleMuscles(true);
  };

  const handleMouseLeave = () => {
    setHoveredArea(null);
    setVisibleMuscles(false);
  };

  return (
    <Box
      position="relative"
      maxH="90vh"
      maxW="100vw"
      height="90vh"
      width="100vw"
    >
      <Image
        src={BackArms}
        backgroundSize="cover"
        height="100%"
        width="100%"
        position="absolute"
        top="0"
        left="0"
      />

      {hoveredArea === "radial" && (
        <Box>
          <Popup
            title="Flexor Carpal Radialis"
            data="    Repeated use of a standard mouse without ergonomic adjustments
    Poor posture and incorrect wrist positioning
    Lack of regular breaks during long periods of work
    Performing repetitive tasks in a static or strained position
    Muscle fatigue and lack of wrist support"
          />
          <Image
            src={FlexorCarpiRadial}
            backgroundSize="cover"
            height="100%"
            width="100%"
            position="absolute"
            top="0"
            left="0"
          />
        </Box>
      )}
      {hoveredArea === "ulnar" && (
        <Box>
          <Popup
            title="Flexor Carpal Ulnaris"
            data="Symptoms of ulnar wrist pain may include:

    Pain that worsens when gripping something or twisting the wrist.
    Loss of strength when trying to grip firmly.
    Trouble moving the wrist or rotating the forearm.
"
          />
          <Image
            src={FlexorCarpiUlnar}
            backgroundSize="cover"
            height="100%"
            width="100%"
            position="absolute"
            top="0"
            left="0"
          />
        </Box>
      )}

      <Image
        src={MusclesArms}
        backgroundSize="cover"
        height="100%"
        width="100%"
        position="absolute"
        top="0"
        left="0"
        opacity={0.8}
      />
      <Grid position="absolute" top="0" left="0" height="100%" width="100%">
        <GridItem
          onMouseEnter={() => handleMouseEnter("radial")}
          onMouseLeave={handleMouseLeave}
          onClick={() => navigate("/videos/radialis")}
          height="100%"
          width="100%"
          cursor="pointer"
        />
        <GridItem
          onMouseEnter={() => handleMouseEnter("ulnar")}
          onMouseLeave={handleMouseLeave}
          onClick={() => navigate("/videos/ulnaris")}
          height="100%"
          width="100%"
          cursor="pointer"
        />
      </Grid>
    </Box>
  );
};

export default Diagram;
