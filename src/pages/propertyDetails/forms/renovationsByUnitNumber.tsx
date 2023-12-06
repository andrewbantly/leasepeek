import { Box, Input, Text, Select, Table, TableCaption, TableContainer, Badge, Tooltip, Thead, Tbody, Tr, Th, Td, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useColorModeValue } from '@chakra-ui/react';
import { PropertyResponseObject } from "../../../interfaces/propertyProfile/propertyProfileProps";
import { useState, useEffect } from "react";

interface RenovationsByUnitNumberProps {
    propertyDataObject: PropertyResponseObject;
}
export function RenovationsByUnitNumber({ propertyDataObject }: RenovationsByUnitNumberProps) {

    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    const buildingData = propertyDataObject.data.map(unit => {

        return (
            <Tr key={`${unit.unit}-${unit.status}`}>
                <Td px={2}>{unit.unit}</Td>
                <Td px={2}>{unit.floorplan}</Td>
                <Td px={2}>{unit.sqft ? unit.sqft : ''}</Td>
                <Td px={2}>{unit.status ? `${unit.status.charAt(0).toUpperCase()}${unit.status.substr(1).toLowerCase()}` : ''}</Td>
                <Td px={2}>{unit.market ? formatCurrency(unit.market) : ''}</Td>
                <Td px={2}>
                    <Select variant='filled' defaultValue='Unrenovated'>
                        <option>Unrenovated</option>
                        <option>Renovated</option>
                    </Select>
                </Td>
            </Tr>
        )
    })

    return (
        <>
            <Text fontSize='sm' >Please indicate renovated units.</Text>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th px={2}>Unit</Th>
                            <Th px={2}>Floor plan</Th>
                            <Th px={2}>SqFt</Th>
                            <Th px={2}>Status</Th>
                            <Th px={2}>Market</Th>
                            <Th px={2}>Renovation Description</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {buildingData}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}