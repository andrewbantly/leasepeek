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
import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";
import { Vacancy } from '../building-summary-components/vacancy';
import { ExpiringLeaseAnalysis } from '../building-summary-components/expiringLeases';
import { FaBuilding, FaRegMoneyBillAlt } from "react-icons/fa";
import { BiBuilding } from 'react-icons/bi';
import { MdPieChart } from 'react-icons/md';
import { FaSearchDollar, FaDollarSign, FaMoneyBill, FaMoneyBillWave, FaMoneyBillAlt, FaMoneyCheck, FaMoneyCheckAlt, FaCoins, FaChartLine, FaChartBar, FaChartPie, FaChartArea, FaBalanceScale, FaExchangeAlt } from 'react-icons/fa';
import { FloorPlanCount } from '../building-summary-components/floorPlanCount';
import { RecentOccupancyChart } from '../building-summary-components/recentOccupancy';
import { FloorPlanAvgLease } from '../building-summary-components/floorPlanAvgLease';
import { LossToLease } from '../building-summary-components/lossToLease';
import { RecentSignedLeases } from '../building-summary-components/recentSignedLeases';
import { LeaseTrendsChart } from '../building-summary-components/leaseTrends';


export function BuildingSummaryComponent(propertyDataObject: PropertyResponseObject) {
    const { objectId } = useParams();
    const navigate = useNavigate();

    const bgColor = useColorModeValue("gray.300", "gray.900");
    const textColor = useColorModeValue("gray.800", "gray.200");
    const labelColor = useColorModeValue("#1A202C", "#A0AEC0");


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const totalUnits = propertyDataObject.totalUnits
    const totalRent = formatCurrency(propertyDataObject.lossToLease.rentIncome);
    const totalBalance = formatCurrency(propertyDataObject.totalBalance);

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
                    <Box mb={10}>
                        <Flex alignItems="center" mb={3}>
                            <Icon as={FaBuilding} boxSize={8} color={textColor} />
                            <Text fontWeight="bold" fontSize="xl" color={textColor} ml={4}>
                                {propertyDataObject ? propertyDataObject.location : "Loading..."}
                            </Text>
                        </Flex>
                        <Text fontSize="xs" color={labelColor}>
                            Rent Roll Uploaded: {formatDate(propertyDataObject.date)}
                        </Text>

                        <Box mt={5}>
                            <Text fontSize="lg" color={textColor}>
                                Data As Of:
                                <Text display='inline' ml={1} fontSize="lg" color="teal.500" fontWeight='bold'>
                                    {propertyDataObject.asOf}
                                </Text>
                            </Text>

                            <Text fontSize="lg" color={textColor}>
                                Units:
                                <Text display='inline' ml={1} fontSize="lg" color="teal.500" fontWeight='bold'>
                                    {totalUnits}
                                </Text>
                            </Text>

                            <Text fontSize="lg" color={textColor}>
                                Lease Charges:
                                <Text display='inline' ml={1} fontSize="lg" color="teal.500" fontWeight='bold'>
                                    {totalRent}
                                </Text>
                            </Text>
                            <Text fontSize="lg" color={textColor} mb={2}>
                                Outstanding Balance:
                                <Text display='inline' ml={1} fontSize="lg" color="red.500" fontWeight='bold'>
                                    {totalBalance}
                                </Text>
                            </Text>
                        </Box>
                    </Box>

                    <Flex>
                        <Button _hover={{ bg: "red.400", color: 'gray.900' }} size="sm" variant="outline" colorScheme="red" onClick={(e) => {
                            e.stopPropagation();
                            deleteProperty()
                        }}>
                            Delete Rent Roll
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
                        <Text fontWeight="bold" fontSize="xl" color={textColor}>Loss To Lease</Text>
                    </Flex>
                    <LossToLease lossToLease={propertyDataObject.lossToLease} />
                </Box>
                <Box p={6} width={"33%"}>
                    <Flex alignItems="center" mb={4}>
                        <Icon as={FaMoneyCheckAlt} boxSize={8} mr={2} />
                        <Text fontWeight="bold" fontSize='xl' color={textColor}>Recent Leases per SqFt</Text>
                    </Flex>
                    <RecentSignedLeases recentLeases={propertyDataObject.recentLeases} floorplans={propertyDataObject.floorplans} />
                </Box>
                <Box p={6} width={"33%"}>
                    <Flex alignItems="center" mb={4}>
                        <Icon as={FaChartArea} boxSize={8} mr={2} />
                        <Text fontWeight="bold" fontSize='xl' color={textColor}>Recent Occupancy Changes</Text>
                    </Flex>
                    <RecentOccupancyChart />
                </Box>
                <Box p={6} width={"33%"}>
                    <Flex alignItems='center' mb={4}>
                        <Icon as={FaMoneyBillWave} boxSize={8} mr={2} />
                        <Text fontWeight="bold" fontSize="xl" color={textColor}>Expiring Leases</Text>
                    </Flex>
                    <ExpiringLeaseAnalysis expiringLeases={propertyDataObject.expiringLeases} lossToLease={propertyDataObject.lossToLease} />
                </Box>
                <Box p={6} width={"100%"}>
                    <Flex alignItems="center" mb={4}>
                        <Icon as={MdPieChart} boxSize={8} mr={2} />
                        <Text fontWeight="bold" fontSize="xl" color={textColor}>Floor Plan Survey</Text>
                    </Flex>
                    <FloorPlanCount floorplans={propertyDataObject.floorplans} />
                </Box>
                <Box p={6} width={"100%"}>
                    <Flex alignItems="center" mb={4}>
                        <Icon as={FaCoins} boxSize={8} mr={2} />
                        <Text fontWeight="bold" fontSize="xl" color={textColor}>Floor Plan Average Lease</Text>
                    </Flex>
                    <FloorPlanAvgLease floorplans={propertyDataObject.floorplans} />
                </Box>
                <Box p={6} width={"100%"}>
                    <Flex alignItems="center" mb={4}>
                        <Icon as={FaChartLine} boxSize={8} mr={2} />
                        <Text fontWeight="bold" fontSize='xl' color={textColor}>Lease Trends</Text>
                    </Flex>
                    <LeaseTrendsChart leaseTrendsData={propertyDataObject.leaseTrends}/>
                </Box>
            </Flex>
        </Box>
    );
};