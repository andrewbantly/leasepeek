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
    useColorModeValue,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from '@chakra-ui/react';
import { FaBuilding, FaRegChartBar, FaDatabase } from "react-icons/fa";
import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";
import { BuildingSummaryComponent } from './buildingSummary';
import { FloorPlanAnalysisComponent } from './floorPlanAnalysis';
import { RawBuildingDataComponent } from './rawDataChart';

const defaultPropertyData: PropertyResponseObject = {
    user_id: 0,
    location: "",
    asOf: "",
    date: "",
    vacancy: {},
    floorplans: {},
    totalUnits: 0,
    totalBalance: 0,
    lossToLease: {
        marketSum: 0,
        rentIncome: 0,
    },
    recentLeases: {},
    expiringLeases: {},
    leaseTrends: {},
    data: [
        {
            balance: 0,
            charges: [
                {
                    code: '',
                    value: 0,
                }
            ],
            floorplan: '',
            leaseExpire: '',
            leaseStart: '',
            market: 0,
            moveIn: '',
            moveOut: '',
            otherDeposit: 0,
            rent: 0,
            residentDeposit: 0,
            sqft: 0,
            status: '',
            total: 0,
            unit: '',
        }]
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
    return (
        <Tabs>
            <TabList borderBottomColor="gray.200" borderBottomWidth="2px">
                <Tab _hover={{ bg: "gray.100", color: 'gray.900' }} _selected={{ color: "white", bg: "blue.700", borderBottomColor: "blue.700" }}><Icon as={FaBuilding} mr={2}/>Building Summary</Tab>
                <Tab _hover={{ bg: "gray.100", color: 'gray.900' }} _selected={{ color: "white", bg: "green.800", borderBottomColor: "green.800" }}><Icon as={FaRegChartBar} mr={2}/>Floor Plan Analysis</Tab>
                <Tab _hover={{ bg: "gray.100", color: 'gray.900' }} _selected={{ color: "white", bg: "gray.500", borderBottomColor: "gray.500" }}><Icon as={FaDatabase} mr={2}/>Raw Building Data</Tab>
            </TabList>


            <TabPanels>
                <TabPanel p={4}>
                    <BuildingSummaryComponent {...propertyDataObject} />
                </TabPanel>
                <TabPanel p={4}>
                    <FloorPlanAnalysisComponent />
                </TabPanel>
                <TabPanel p={4}>
                    <RawBuildingDataComponent />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};