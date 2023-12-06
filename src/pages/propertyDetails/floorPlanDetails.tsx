import { Box, Heading, Flex, Icon, Stack, Input, Text, FormControl, FormLabel, RadioGroup, HStack, Radio, FormErrorMessage, Select, InputLeftElement, InputGroup, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useColorModeValue } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';
import { useEffect, useState, ChangeEvent } from 'react';
import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";

interface FloorPlanDetailsProps {
    propertyDataObject: PropertyResponseObject;
}

export function FloorPlanDetails({ propertyDataObject}:FloorPlanDetailsProps) {
    const floorPlanTableBgColor = useColorModeValue("white", "gray.700");

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

    return(
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
    )
}