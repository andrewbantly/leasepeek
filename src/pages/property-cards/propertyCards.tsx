import { Flex, Box, Text, Badge, useColorModeValue, VStack, Icon } from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa";
import { Vacancy } from "./vacancy";
import { FloorPlanAvg } from "./floorPlanAVG";
import { FloorPlanCount } from "./floorPlanCount";

interface PropertyCardsProps {
    property: Property;
}

type ISODateString = string;

interface Property {
    location: string;
    date: ISODateString;
    asOf: string;
    objectId: string;
    totalUnits: number;
    vacants: number;
    floorplans: FloorPlans
}
type FloorPlans = Record<FloorPlanName, FloorPlanDetails>;

type FloorPlanName = string;

interface FloorPlanDetails {
    avg: number;
    count: number;
}

export function PropertyCards({ property }: PropertyCardsProps) {
    const { location, asOf, objectId, totalUnits, vacants, floorplans, date } = property;
    const bgColor = useColorModeValue("gray.200", "gray.700");
    const textColor = useColorModeValue("gray.800", "gray.200");
    const hoverColor = useColorModeValue("gray.300", "gray.600");


    const formatDate = (isoString: string) => {
        const dateObj = new Date(isoString);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return dateObj.toLocaleString("en-US", { ...options, timeZone: "America/Los_Angeles" });
    }


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
                    <Text fontSize="lg" color={textColor} maxW="260px">
                        Total units: {totalUnits}
                    </Text>
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                        data As of: {asOf}
                    </Badge>
                    <Text fontSize="xs" color={textColor} maxW="260px">
                        Uploaded: {formatDate(date)} PST 
                    </Text>
                </VStack>

                <Box>
                    <Vacancy vacants={vacants} totalUnits={totalUnits} />
                </Box>
                <Box h="100%" ml={2}>
                    <FloorPlanAvg floorplans={floorplans} />
                </Box>
                <Box h="100%" ml={2}>
                    <FloorPlanCount floorplans={floorplans} />
                </Box>
            </Flex>
        </Box>
    );
}
