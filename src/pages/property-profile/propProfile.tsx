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
    useColorModeValue
} from '@chakra-ui/react';
import { FaBuilding } from "react-icons/fa";
import { PropertyAlerts } from '../property-data-components/propertyAlerts';
import { PropertyResponseObject } from "../../interfaces/propertyProfileProps";
import { Vacancy } from '../property-data-components/vacancy';
import { BiBuilding } from 'react-icons/bi';
import { MdPieChart } from 'react-icons/md';
import { FaSearchDollar, FaDollarSign, FaMoneyBill, FaMoneyBillWave, FaMoneyBillAlt, FaMoneyCheck, FaMoneyCheckAlt, FaCoins, FaChartLine, FaChartBar, FaChartPie, FaChartArea, FaBalanceScale, FaExchangeAlt } from 'react-icons/fa';
import { FloorPlanCount } from '../property-data-components/floorPlanCount';
import { FloorPlanAvg } from '../property-data-components/floorPlanMrkAvg';
import { FloorPlanAvgRent } from '../property-data-components/floorPlanRentAvg';
import { IncomePotential } from '../property-data-components/incomePotential';

const defaultPropertyData: PropertyResponseObject = {
    asOf: "",
    date: "",
    location: "",
    user_id: 0,
    floorplans: {},
    vacancy: {},
    totalUnits: 0,
    data: [],
};

export function PropertyProfile() {
    const { objectId } = useParams();
    const navigate = useNavigate();
    const [propertyDataObject, setPropertyDataObject] = useState<PropertyResponseObject>(defaultPropertyData)

    useEffect(() => {
        propertyDataRequest()
    }, [])

    const propertyDataRequest = async () => {
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

    const totalUnits = propertyDataObject.totalUnits

    const deleteProperty = async () => {
        try {
                const token = localStorage.getItem('jwt');
                await axios.delete(`${process.env.REACT_APP_SERVER_URL}/data/delete`, {
                        headers: {
                                'Authorization': `Bearer ${token}`
                },
                params: {
                        objectId: objectId
                    }
                });
                navigate('/')
            } catch (error) {
                    console.error("Error delete property data", error)
                }            
    }
    
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

                        <PropertyAlerts propertyData={propertyDataObject.data} asOf={propertyDataObject.asOf}/>
                    </Box>

                    <Flex>
                        <Button size="sm" variant="outline" colorScheme="red" onClick={(e) => {
                            e.stopPropagation();
                            deleteProperty()
                        }}>
                            Delete Rent Roll Upload
                        </Button>
                    </Flex>
                </Box>
                <Box p={6} width={"33%"}>
                    <Flex alignItems="center" mb={4}>
                        <Icon as={BiBuilding} boxSize={8} mr={2} />
                        <Text fontWeight="bold" fontSize="xl" color={textColor}>Vacancy</Text>
                    </Flex>
                    <Vacancy vacants={propertyDataObject.vacancy} />
                </Box>
                <Box p={6} width={"33%"}>
                    <Flex alignItems="center" mb={4}>
                        <Icon as={FaSearchDollar} boxSize={8} mr={2} />
                        <Text fontWeight="bold" fontSize="xl" color={textColor}>Income Potential</Text>
                    </Flex>
                    <IncomePotential propertyData={propertyDataObject.data}/>
                </Box>
                <Box p={6} width={"33%"}>
                    <Flex alignItems="center" mb={4}>
                        <Icon as={MdPieChart} boxSize={8} mr={2} />
                        <Text fontWeight="bold" fontSize="xl" color={textColor}>Floor Plan Survey</Text>
                    </Flex>
                    <FloorPlanCount floorplans={propertyDataObject.floorplans} />
                </Box>
                <Box p={6} width={"33%"}>
                    <Flex alignItems="center" mb={4}>
                        <Icon as={FaChartBar} boxSize={8} mr={2} />
                        <Text fontWeight="bold" fontSize="xl" color={textColor}>Floor Plan Average Value</Text>
                    </Flex>
                    <FloorPlanAvg floorplans={propertyDataObject.floorplans} />
                </Box>
                <Box p={6} width={"33%"}>
                    <Flex alignItems="center" mb={4}>
                        <Icon as={FaCoins} boxSize={8} mr={2} />
                        <Text fontWeight="bold" fontSize="xl" color={textColor}>Floor Plan Average Rent</Text>
                    </Flex>
                    <FloorPlanAvgRent floorplans={propertyDataObject.floorplans}/>
                </Box>
            </Flex>
        </Box>
    );
};