import { Box, Input, Text, Select, Table, Thead, Tbody, Tr, Th, Td, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useColorModeValue } from '@chakra-ui/react';
import { PropertyResponseObject } from "../../../interfaces/propertyProfile/propertyProfileProps";

interface RenovationsByFloorPlanProps {
    propertyDataObject: PropertyResponseObject;
}

export function RenovationsByFloorPlan({ propertyDataObject }: RenovationsByFloorPlanProps) {
    const floorPlanTableBgColor = useColorModeValue("white", "gray.700");

    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const floorPlanForm = Object.entries(propertyDataObject.floorplans).map(([planCode, planDetails]) => {
        return (
            <Tr key={planCode}>
                <Td px={2}>{planCode}</Td>
                <Td px={2}>{planDetails.unitCount}</Td>
                <Td px={2}>{formatCurrency(planDetails.avgMarket)}</Td>
                <Td px={2}>
                    <Input variant='filled' placeholder={planCode} borderWidth={'1px'}></Input>
                </Td>
                <Td px={2}>
                    <Select variant='filled' defaultValue='Unrenovated'>
                        <option>Unrenovated</option>
                        <option>Renovated</option>
                    </Select>
                </Td>
            </Tr>
        )
    });

    return (
        <Box p={6} borderRadius="lg" borderWidth="1px" boxShadow="xl" bg={floorPlanTableBgColor} display="flex" flexDirection="column" mb={4}>
            <Text fontSize='sm' >Choose floor plans that indicate a renovated unit.</Text>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th px={2}>Floor Plan Code</Th>
                        <Th px={2}>Units</Th>
                        <Th px={2}>Avg Market</Th>
                        <Th px={2}>Floor Plan Name</Th>
                        <Th px={2}>Renovation Description</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {floorPlanForm}
                </Tbody>
            </Table>
        </Box>
    )
}