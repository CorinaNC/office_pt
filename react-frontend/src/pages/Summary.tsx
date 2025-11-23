import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Text,
  Badge,
  Progress,
  VStack,
  HStack,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: false,
});

const Summary = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/surveys");
        setData(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="200px"
      >
        <VStack spacing={4}>
          <Spinner size="xl" color="teal.500" />
          <Text>Loading survey data...</Text>
        </VStack>
      </Box>
    );
  }
  if (!data || data.length === 0) {
    return (
      <Alert
        status="info"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        minH="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          No Survey Data
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          No survey responses found. Submit a survey first.
        </AlertDescription>
      </Alert>
    );
  }

  const surveys = Array.isArray(data) ? data : [data];

  return (
    <Box p={6}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {surveys.map((survey, index) => (
          <Card
            key={index}
            variant="outline"
            boxShadow="md"
            _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
            transition="all 0.2s"
          >
            <CardHeader bg="teal.50" borderBottom="1px" borderColor="teal.100">
              <HStack justify="space-between" align="center">
                <Heading size="md">Survey #{index + 1}</Heading>
                <Badge
                  colorScheme={survey.experiencePain ? "red" : "green"}
                  fontSize="sm"
                  px={2}
                  py={1}
                  borderRadius="full"
                >
                  {survey.experiencePain ? "Pain Reported" : "No Pain"}
                </Badge>
              </HStack>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing={4}>
                <Box>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    Pain Experience
                  </Text>
                  <Text fontWeight="medium">
                    {survey.experiencePain ? "Yes" : "No"}
                  </Text>
                </Box>
                {survey.experiencePain && (
                  <>
                    <Box>
                      <Text fontSize="sm" color="gray.600" mb={1}>
                        Location
                      </Text>
                      <Badge colorScheme="blue" variant="subtle" fontSize="sm">
                        {survey.painLocation || "Not specified"}
                      </Badge>
                    </Box>

                    {/* Pain Intensity */}
                    <Box>
                      <Text fontSize="sm" color="gray.600" mb={2}>
                        Intensity: {survey.painIntensity}/10
                      </Text>
                      <Progress
                        value={survey.painIntensity * 10}
                        colorScheme={
                          survey.painIntensity <= 3
                            ? "green"
                            : survey.painIntensity <= 6
                            ? "yellow"
                            : "red"
                        }
                        size="sm"
                        borderRadius="full"
                      />
                    </Box>

                    {/* Pain Type */}
                    <Box>
                      <Text fontSize="sm" color="gray.600" mb={1}>
                        Type
                      </Text>
                      <Badge
                        colorScheme="purple"
                        variant="subtle"
                        fontSize="sm"
                      >
                        {survey.painType || "Not specified"}
                      </Badge>
                    </Box>
                  </>
                )}
              </Stack>
            </CardBody>
            <CardFooter
              bg="gray.50"
              borderTop="1px"
              mb="1rem"
              borderColor="gray.100"
            >
              <Text fontSize="sm" color="gray.600">
                Submitted response
              </Text>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>

      {/* Overall Statistics Card */}
      {surveys.length > 1 && (
        <Card
          mt={8}
          variant="filled"
          alignContent="center"
          display="flex"
          bg="blue.50"
        >
          <CardHeader>
            <Heading size="md">Overall Statistics</Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              <Stat>
                <StatLabel>Total Responses</StatLabel>
                <StatNumber>{surveys.length}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Pain Reports</StatLabel>
                <StatNumber>
                  {surveys.filter((s) => s.experiencePain).length}
                </StatNumber>
                <StatHelpText>
                  {(
                    (surveys.filter((s) => s.experiencePain).length /
                      surveys.length) *
                    100
                  ).toFixed(1)}
                  %
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Most Common Location</StatLabel>
                <StatNumber fontSize="md">
                  {(() => {
                    const locations = surveys
                      .map((s) => s.painLocation)
                      .filter(Boolean);
                    if (locations.length === 0) return "N/A";
                    const mode = locations.reduce((acc, loc) => {
                      acc[loc] = (acc[loc] || 0) + 1;
                      return acc;
                    }, {});
                    return Object.keys(mode).reduce((a, b) =>
                      mode[a] > mode[b] ? a : b
                    );
                  })()}
                </StatNumber>
              </Stat>
            </SimpleGrid>
          </CardBody>
        </Card>
      )}
    </Box>
  );
};

export default Summary;
