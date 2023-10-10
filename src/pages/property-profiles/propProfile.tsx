import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import {
    Box,
    Flex,
    Text,
    Badge,
    Icon,
    Button,
    useColorModeValue } from '@chakra-ui/react';
import { FaBuilding } from "react-icons/fa";
import { PropertyVacancy } from './propertyVacancy';
import { PropertyFloorPlanMrkAvg } from './propertyFloorPlanMrkAvg';
import { PropertyFloorPlan } from './propertyFloorPlan';
import { PropertyAlerts } from './propertyAlerts';
import { PropertyResponseObject } from "../../interfaces/propertyProfileProps";

const defaultPropertyData: PropertyResponseObject = {
    asOf: "",
    data: [],
    date: "",
    location: "",
    user_id: 0
};

export function PropertyProfile() {
    const { objectId } = useParams();
    const navigate = useNavigate();
    const [propertyDataObject, setPropertyDataObject] = useState<PropertyResponseObject>(defaultPropertyData)

    useEffect(() => {
        propertyDataRequest()
    }, [])

    const propertyDataRequest = async () => {
        console.log(`fetching data for property: ${objectId}`)
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/data/read`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    objectId: objectId
                }
            });
            setPropertyDataObject(response.data[0]);
        } catch (error) {
            console.error("Error loading data", error);
            navigate('/')
        }
    }
    const bgColor = useColorModeValue("gray.300", "gray.900");
    const textColor = useColorModeValue("gray.800", "gray.200");

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    const totalUnits = propertyDataObject.data.length

    return (
        <Box
            p={6}
            borderRadius="lg"
            borderWidth="1px"
            boxShadow="xl"
            bg={bgColor}
            display="flex"
            flexDirection="column"
            margin={2}
        >
            <Flex direction="row" alignItems="stretch" wrap='wrap'>
                <Box p={6} width={"33%"} flex="1" display="flex" flexDirection="column">
                    <Box flex="1">
                        <Flex alignItems="center" mb={3}>
                            <Icon as={FaBuilding} boxSize={8} color={textColor} />
                            <Text fontWeight="bold" fontSize="xl" color={textColor} ml={4}>
                                {propertyDataObject ? propertyDataObject.location : "Loading..."}
                            </Text>
                        </Flex>

                        <Text fontSize="lg" color={textColor} mb={2}>
                            Total units: {totalUnits}
                        </Text>

                        <Badge borderRadius="full" width={"fit-content"} px="2" colorScheme="teal" mb={2}>
                            Data as of: {propertyDataObject.asOf}
                        </Badge>

                        <Text fontSize="xs" color={textColor} mb={3}>
                            Uploaded: {formatDate(propertyDataObject.date)} PST
                        </Text>

                        <PropertyAlerts propertyData={propertyDataObject.data} />
                    </Box>

                    <Flex>
                        <Button size="sm" variant="outline" colorScheme="red">
                            Remove
                        </Button>
                    </Flex>
                </Box>

                <PropertyVacancy propertyData={propertyDataObject.data} />
                <PropertyFloorPlanMrkAvg propertyData={propertyDataObject.data} />
                <PropertyFloorPlan propertyData={propertyDataObject.data} />
            </Flex>
        </Box>
    );
};