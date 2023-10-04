import { Flex, Box, Text, Badge, useColorModeValue, VStack, Icon } from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa";
import { Vacancy } from "./vacancy";

interface Property {
    location: string;
    date: string;
    objectId: string;
    totalUnits: number;
    vacants: number;
    floorplans: Floorplans
}

interface Floorplans {
    avg: number;
    count: number;
}

interface PropertyCardsProps {
    property: Property;
}


export function PropertyCards({ property }: PropertyCardsProps) {
    const { location, date, objectId, totalUnits, vacants, floorplans } = property;
    console.log(location, date, objectId, totalUnits, vacants, floorplans)

    const bgColor = useColorModeValue("gray.200", "gray.700");
    const textColor = useColorModeValue("gray.800", "gray.200");
    const hoverColor = useColorModeValue("gray.300", "gray.600");

    return (
        <Box
          h="350px"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          bg={bgColor}
          boxShadow="xl"
          p={6}
          m={4}
          _hover={{ bg: hoverColor }}
          transition="background-color 0.3s ease"
          cursor="pointer"
        >
          <Flex>
            <VStack spacing={4} alignItems="start">
              <Icon as={FaBuilding} boxSize={8} color={textColor} />
              <Text fontWeight="bold" fontSize="xl" color={textColor} maxW="260px">
                {location}
              </Text>
              <Text fontSize="xl" color={textColor} maxW="260px">
                Total units: {totalUnits}
              </Text>
              <Badge borderRadius="full" px="2" colorScheme="teal">
                {date}
              </Badge>
            </VStack>
            
            <Box ml={2}>
              <Vacancy vacants={vacants} totalUnits={totalUnits} />
            </Box>
            <Box>

            </Box>
          </Flex>
        </Box>
      );
}
