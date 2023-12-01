import { useEffect, useState, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";
import { Box, Heading, Flex, Icon, VStack, Input, Text, FormControl, FormLabel, RadioGroup, HStack, Radio, FormErrorMessage, IconButton, InputLeftElement, InputGroup, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';

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

export function UploadForm() {
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
                <Td>{/* Dropdown for Unit Type */}</Td>
                <Td>{planDetails.unitCount}</Td>
                <Td>{planDetails.avgSqft}</Td>
                <Td>{planDetails.avgMarket}</Td>
                <Td>{/* Input for Floor Plan Name */}</Td>
                <Td>{/* Input for # Beds */}</Td>
                <Td>{/* Input for # Baths */}</Td>
            </Tr>
        )
    });
    

    const [unitCountError, setInput] = useState('correct')
    const handleInputChange = (value: string) => {
        setInput(value);
    };
    const hasUnitCountError = unitCountError !== 'correct'
    return (
        <Box>
            <FormControl isInvalid={hasUnitCountError}>
                <FormLabel>Market</FormLabel>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={FaMapMarkerAlt} color="gray.300" />}
                    />
                    <Input placeholder="Add API to search location" />
                </InputGroup>
                <FormLabel>Building</FormLabel>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={FaBuilding} color="gray.300" />}
                    />
                    <Input value={propertyDataObject.location}></Input>
                </InputGroup>
                <FormLabel>Unit Count: {propertyDataObject.totalUnits}</FormLabel>
                <RadioGroup onChange={handleInputChange}>
                    <HStack spacing='12px'>
                        <Radio value='correct'>Correct</Radio>
                        <Radio value='incorrect'>Incorrect</Radio>
                    </HStack>
                    <FormErrorMessage>Please contact customercare@leasepeek.com.</FormErrorMessage>
                </RadioGroup>
            </FormControl>
            <Text>Floor Plan Details</Text>
            <Table variant='simple'>
                <TableCaption>Please enter details for all floor plans which have been automatically pulled from the rent roll.</TableCaption>
                <Thead>
                    <Tr>
                        <Th px={2}>Floor Plan Code</Th>
                        <Th px={2}>Unit Type</Th>
                        <Th px={2}># Units</Th>
                        <Th px={2}>SqFt</Th>
                        <Th px={2}>Market Rent</Th>
                        <Th px={2}>Floor Plan Name</Th>
                        <Th px={2}># Beds</Th>
                        <Th px={2}># Baths</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {floorPlanForm}
                </Tbody>
            </Table>
        </Box>
    )
}