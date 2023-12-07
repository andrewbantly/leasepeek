import { Flex, Button, Box, Text, useColorModeValue, VStack, Icon } from "@chakra-ui/react";
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
    const { location, asOf, objectId, totalUnits, vacancy, floorplans, date, totalBalance, lossToLease } = property;
    const bgColor = useColorModeValue("gray.200", "gray.700");
    const textColor = useColorModeValue("gray.800", "gray.200");
    const labelColor = useColorModeValue("#1A202C", "#A0AEC0");
    const hoverColor = useColorModeValue("gray.300", "gray.900");
    const navigate = useNavigate()

    const totalRent = formatCurrency(lossToLease.rentIncome);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    return (
        <Box
            h="400px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg={bgColor}
            boxShadow="xl"
            p={6}
            m={3}
            _hover={{ bg: hoverColor }}
            transition="background-color 0.3s ease"
            cursor="pointer"
            onClick={() => navigate(`/${objectId}`)}
        >
            <Flex>
                <VStack alignItems="start">
                    <Icon as={FaBuilding} boxSize={6} color={textColor} />
                    <Text fontWeight="bold" fontSize="xl" color={textColor} maxW="260px">
                        {location.building}
                    </Text>
                    <Text fontSize="xs" color={labelColor} maxW="260px">
                        Uploaded: {formatDate(date)}
                    </Text>
                    <Text fontSize="md" color={textColor}>
                        Data As Of:
                        <Text display='inline' ml={1} fontSize="md" color="teal.500" fontWeight='bold'>
                            {asOf}
                        </Text>
                    </Text>
                    <Text fontSize="md" color={textColor} maxW="260px">
                        Units:                                 <Text display='inline' ml={1} fontSize="md" color="teal.500" fontWeight='bold'>
                            {totalUnits}
                        </Text>
                    </Text>
                    <Text fontSize="md" color={textColor}>
                        Lease Charges:
                        <Text display='inline' ml={1} fontSize="md" color="teal.500" fontWeight='bold'>
                            {totalRent}
                        </Text>
                    </Text>
                    <Text fontSize="md" color={textColor} maxW="260px" mb={2}>
                        Balance:                                <Text display='inline' ml={1} fontSize="md" color="red.500" fontWeight='bold'>
                            {formatCurrency(totalBalance)}
                        </Text>
                    </Text>
                    <Button
                        _hover={{ bg: "red.400", color: 'gray.900' }}
                        mt={3}
                        size="sm"
                        fontSize="sm"
                        variant="outline"
                        colorScheme="red"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteProperty(objectId);
                        }}
                    >
                        Delete Rent Roll
                    </Button>

                </VStack>

                <Box>
                    {/* <Vacancy vacants={vacancy} /> */}
                </Box>
                <Box h="100%" ml={2}>
                    <FloorPlanAvgLease floorplans={floorplans} />
                </Box>
                <Box h="100%" ml={2}>
                    <FloorPlanCount floorplans={floorplans} />
                </Box>
            </Flex>
        </Box>
    );
}
