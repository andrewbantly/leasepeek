import { Flex, Button, Box, Text, Badge, useColorModeValue, VStack, Icon } from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa";
import { Vacancy } from "../building-summary-components/vacancy";
import { FloorPlanCount } from "../building-summary-components/floorPlanCount";
import { FloorPlanAvgLease } from "../building-summary-components/floorPlanAvgLease";
import { useNavigate } from "react-router-dom";
import { Property } from '../../interfaces/propertyCards/property'

interface PropertyCardsProps {
    property: Property;
    deleteProperty: (objectId: string) => Promise<void>;
}

export function PropertyCards({ property, deleteProperty }: PropertyCardsProps) {
    const { location, asOf, objectId, totalUnits, vacancy, floorplans, date } = property;
    const bgColor = useColorModeValue("gray.200", "gray.700");
    const textColor = useColorModeValue("gray.800", "gray.200");
    const hoverColor = useColorModeValue("gray.300", "gray.900");
    const navigate = useNavigate()

    console.log(floorplans)

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
            h="400px"
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
            onClick={() => navigate(`/${objectId}`)}
        >
            <Flex>
                <VStack spacing={4} alignItems="start">
                    <Icon as={FaBuilding} boxSize={6} color={textColor} />
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
                    <Button
                        mt={3}
                        width="30%"
                        size="sm"
                        fontSize="sm"
                        variant="outline"
                        colorScheme="red"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteProperty(objectId);
                        }}
                    >
                        Remove
                    </Button>

                </VStack>

                <Box>
                    <Vacancy vacants={vacancy} />
                </Box>
                <Box h="100%" ml={2}>
                    <FloorPlanAvgLease floorplans={floorplans}/>
                </Box>
                <Box h="100%" ml={2}>
                    <FloorPlanCount floorplans={floorplans} />
                </Box>
            </Flex>
        </Box>
    );
}
