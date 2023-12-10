import { useColorModeValue, Text, Select, Table, TableContainer, Thead, Tbody, Tr, Th, Td, } from '@chakra-ui/react';
import { PropertyDataItem } from "../../../interfaces/propertyProfile/propertyProfileProps";

interface RenovationsByUnitNumberProps {
    propertyUnitData: PropertyDataItem[];
    handleUnitRenovationChange: (status: string, value: string) => void;
}
export function RenovationsByUnitNumber({ propertyUnitData, handleUnitRenovationChange }: RenovationsByUnitNumberProps) {

    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    const buttonBgColor = useColorModeValue("gray.300", "gray.900");

    const buildingData = propertyUnitData.map(unit => {

        return (
            <Tr key={`${unit.unit}-${unit.status}`}>
                <Td px={2}>{unit.unit}</Td>
                <Td px={2}>{unit.floorplan}</Td>
                <Td px={2}>{unit.sqft ? unit.sqft : ''}</Td>
                <Td px={2}>{unit.status ? `${unit.status.charAt(0).toUpperCase()}${unit.status.substr(1).toLowerCase()}` : ''}</Td>
                <Td px={2}>{unit.market ? formatCurrency(unit.market) : ''}</Td>
                <Td px={2} >
                    {unit.renovated ? (
                        <Select bg={buttonBgColor} variant='filled' value={String(unit.renovated)} onChange={(e) => handleUnitRenovationChange(unit.unit, e.target.value)}>
                            <option value={"false"}>Unrenovated</option>
                            <option value={"true"}>Renovated</option>
                        </Select>
                    ) : (
                        <Select variant='filled' value={String(unit.renovated)} onChange={(e) => handleUnitRenovationChange(unit.unit, e.target.value)}>
                            <option value={"false"}>Unrenovated</option>
                            <option value={"true"}>Renovated</option>
                        </Select>
                    )}
                </Td>
            </Tr>
        )
    })

    return (
        <>
            <Text fontSize='sm' ml={2}>Please indicate renovated units.</Text>
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