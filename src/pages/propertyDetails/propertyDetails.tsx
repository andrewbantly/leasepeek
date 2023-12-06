import { useEffect, useState, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";
import { Box, Heading, Flex, Icon, Stack, Input, Text, FormControl, FormLabel, RadioGroup, HStack, Radio, FormErrorMessage, Select, InputLeftElement, InputGroup, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useColorModeValue } from '@chakra-ui/react';
import { BasicInfo } from './basicInfo';

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

export function PropertyDetails() {
    const { objectId } = useParams();
    const navigate = useNavigate();
    const [propertyDataObject, setPropertyDataObject] = useState<PropertyResponseObject>(defaultPropertyData)

    const bgColor = useColorModeValue("gray.300", "gray.900");
    const floorPlanTableBgColor = useColorModeValue("white", "gray.700");

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

    const floorPlanArray: string[] = [];

    propertyDataObject.data.forEach(unit => {
        if (!floorPlanArray.includes(unit.floorplan)) {
            floorPlanArray.push(unit.floorplan)
        }
    })

    const floorPlanForm = Object.entries(propertyDataObject.floorplans).map(([planCode, planDetails]) => {
        return (
            <Tr key={planCode}>
                <Td px={2}>{planCode}</Td>
                <Td px={2}>{planDetails.unitCount}</Td>
                <Td px={2}>{planDetails.avgSqft}</Td>
                <Td px={2}>{planDetails.avgMarket}</Td>
                <Td px={2}>
                    <Select variant='filled' defaultValue='Residential'>
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Retail</option>
                        <option>Other</option>
                    </Select>
                </Td>
                <Td px={2}>
                    <Input variant='filled' placeholder={planCode} borderWidth={'1px'}></Input>
                </Td>
                <Td px={2} maxWidth='75px'><NumberInput>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput></Td>
                <Td px={2} maxWidth='75px'><NumberInput>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput></Td>
            </Tr>
        )
    });


    const [unitCountError, setUnitCountError] = useState(false)
    const handleInputChange = (value: string) => {
        setUnitCountError(value === 'incorrect');
    };

    return (
            <Box p={6} borderRadius="lg" borderWidth="1px" boxShadow="xl" bg={bgColor} display="flex" flexDirection="column" margin={2}>
                <BasicInfo propertyDataObject={propertyDataObject} />

                <Box p={6} borderRadius="lg" borderWidth="1px" boxShadow="xl" bg={floorPlanTableBgColor} display="flex" flexDirection="column">
                    <Text fontSize='xl' fontWeight='bold' mb={2}>Floor Plan Details</Text>
                    <Text fontSize='sm' mb={4}>Please enter details for all floor plans which have been automatically pulled from the rent roll.</Text>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th px={2}>Floor Plan Code</Th>
                                <Th px={2}>Units</Th>
                                <Th px={2}>SqFt</Th>
                                <Th px={2}>Market</Th>
                                <Th px={2}>Unit Type</Th>
                                <Th px={2}>Floor Plan Name</Th>
                                <Th px={2} maxWidth='50px'>Beds</Th>
                                <Th px={2} maxWidth='50px'>Baths</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {floorPlanForm}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
    )
}