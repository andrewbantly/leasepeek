import { Input, Text, Select, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue} from '@chakra-ui/react';
import { FloorPlans } from "../../../interfaces/propertyProfile/propertyProfileProps";

interface RenovationsByFloorPlanProps {
    propertyFloorplanData: FloorPlans;
    handleFloorplanRenovationChange: (status: string, value: string) => void;
}

export function RenovationsByFloorPlan({ propertyFloorplanData, handleFloorplanRenovationChange }: RenovationsByFloorPlanProps) {

    console.log(propertyFloorplanData)

    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const buttonBgColor = useColorModeValue("gray.300", "gray.900");

    const floorPlanForm = Object.entries(propertyFloorplanData).map(([planCode, planDetails]) => {
        return (
            <Tr key={planCode}>
                <Td px={2}>{planCode}</Td>
                <Td px={2}>{planDetails.unitCount}</Td>
                <Td px={2}>{formatCurrency(planDetails.avgMarket)}</Td>
                <Td px={2}>
                    <Input variant='filled' placeholder={planCode} borderWidth={'1px'}></Input>
                </Td>
                <Td px={2}>
                    <Select bg={buttonBgColor} variant='filled' value={String(planDetails.renovated)} onChange={(e) => handleFloorplanRenovationChange(planCode, e.target.value)}>
                        <option value="false">Unrenovated</option>
                        <option value="true">Renovated</option>
                    </Select>
                </Td>
            </Tr>
        )
    });

    return (
        <>
            <Text fontSize='sm' ml={2} >Please choose floor plans that indicate a renovated unit.</Text>
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
        </>
    )
}