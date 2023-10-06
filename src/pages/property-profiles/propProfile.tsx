import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import {
    Box,
    Flex,
    VStack,
    Text,
    Badge,
    Icon,
    Button,
    useColorModeValue
} from '@chakra-ui/react';
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

    useEffect(() => {
        console.log("### Property Data")
        console.log(propertyDataObject)
    }, [propertyDataObject])

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
        >
            <Flex direction="column">
                <Flex alignItems="center">
                    <Icon as={FaBuilding} boxSize={8} color={textColor} />
                    <Text fontWeight="bold" fontSize="xl" color={textColor} ml={4}>
                        {propertyDataObject ? propertyDataObject.location : "Loading..."}
                    </Text>
                </Flex>

                <Text fontSize="lg" color={textColor}>
                    Total units: {totalUnits}
                </Text>

                <Badge borderRadius="full" width={"fit-content"} px="2" colorScheme="teal">
                    Data as of: {propertyDataObject.asOf}
                </Badge>

                <Text fontSize="xs" color={textColor}>
                    Uploaded: {formatDate(propertyDataObject.date)} PST
                </Text>

                <PropertyAlerts propertyData={propertyDataObject.data}/>
                <Box>
                    <PropertyVacancy propertyData={propertyDataObject.data}/>
                    <PropertyFloorPlanMrkAvg propertyData={propertyDataObject.data}/>
                    <PropertyFloorPlan propertyData={propertyDataObject.data}/>
                </Box>

                {/* Buttons or Actions related to the Property */}
                <Flex mt={4} justifyContent="space-between">
                    <Button size="sm" variant="outline" colorScheme="teal">
                        Edit
                    </Button>
                    <Button size="sm" variant="outline" colorScheme="red">
                        Remove
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};