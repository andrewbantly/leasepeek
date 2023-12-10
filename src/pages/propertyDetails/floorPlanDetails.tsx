import { Box, Input, Text, Select, Table, Thead, Tbody, Tr, Th, Td, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useColorModeValue, Button, Flex } from '@chakra-ui/react';
import { PropertyResponseObject, FloorPlanDetails } from "../../interfaces/propertyProfile/propertyProfileProps";
import { useState, FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface FloorPlanDetailsProps {
    propertyDataObject: PropertyResponseObject;
}

interface FloorPlanState extends FloorPlanDetails {
    planCode: string;
}

export function FloorPlanDetailsComponent({ propertyDataObject }: FloorPlanDetailsProps) {
    const [floorPlans, setFloorPlans] = useState<FloorPlanState[]>([]);
    const [floorPlansState, setFloorPlansState] = useState<FloorPlanState[]>([]);
    const { objectId } = useParams();

    useEffect(() => {
        const initialFloorPlans = Object.entries(propertyDataObject.floorplans).map(([planCode, planDetails]) => ({
            planCode,
            ...planDetails
        }));
        setFloorPlans(initialFloorPlans);
        setFloorPlansState(initialFloorPlans);
    }, [propertyDataObject.floorplans]);

    const handleInputChange = (index: number, field: string, value: string) => {
        const updatedFloorPlans = [...floorPlans];
        updatedFloorPlans[index] = { ...updatedFloorPlans[index], [field]: value };
        setFloorPlans(updatedFloorPlans);
    };

    const [changesMade, setChangesMade] = useState(false);

    useEffect(() => {
        const isChanged = () => {
            return JSON.stringify(floorPlans) !== JSON.stringify(floorPlansState);
        };
        setChangesMade(isChanged());
    }, [floorPlans, floorPlansState])


    // form data payload that is sent to server when user saves changes
    const formData = {
        'form': 'floorPlanDetails',
        objectId,
        floorPlans
    }

    // PUT request to server when user submits data changes
    const handleSubmitInformation = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('jwt');
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/data/update`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            setFloorPlansState(floorPlans);
        } catch (error) {
            console.log(error)
        }
    }

    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const floorPlanForm = floorPlans.map((plan, index) => (
        <Tr key={plan.planCode}>
            <Td px={2}>{plan.planCode}</Td>
            <Td px={2}>{plan.unitCount}</Td>
            <Td px={2}>{plan.avgSqft}</Td>
            <Td px={2}>{formatCurrency(plan.avgMarket)}</Td>
            <Td px={2}>
                <Select variant='filled' value={plan.planType} onChange={(e) => handleInputChange(index, 'planType', e.target.value)}>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="retail">Retail</option>
                    <option value="other">Other</option>
                </Select>
            </Td>
            <Td px={2}>
                <Input variant='filled' borderWidth={'1px'} value={plan.planName} onChange={(e) => handleInputChange(index, 'planName', e.target.value)}></Input>
            </Td>
            <Td px={2} maxWidth='75px'>
                <NumberInput min={0} value={plan.beds} onChange={(value) => handleInputChange(index, 'beds', value)}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Td>
            <Td px={2} maxWidth='75px'>
                <NumberInput min={0} value={plan.baths} onChange={(value) => handleInputChange(index, 'baths', value)}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Td>
        </Tr>
    ));

    const floorPlanTableBgColor = useColorModeValue("white", "gray.700");
    const buttonBgColor = useColorModeValue("gray.300", "gray.900");

    const dontSubmitButton = (<Button isDisabled bg={buttonBgColor}>Save Changes</Button>);
    const submitButton = (<Button type={'submit'} bg={buttonBgColor}>Save Changes</Button>);
    const submit = changesMade ? submitButton : dontSubmitButton;

    return (
        <Box p={6} borderRadius="lg" borderWidth="1px" boxShadow="xl" bg={floorPlanTableBgColor} display="flex" flexDirection="column" mb={4}>
            <form onSubmit={handleSubmitInformation}>
                <Flex justifyContent="space-between" alignItems="center">
                    <Text fontSize='xl' fontWeight='bold' mb={2}>Floor Plan Details</Text>
                    {submit}
                </Flex>
                <Text fontSize='sm' >Please enter details for all floor plans which have been automatically pulled from the rent roll.</Text>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th px={2}>Floor Plan Code</Th>
                            <Th px={2}>Units</Th>
                            <Th px={2}>SqFt</Th>
                            <Th px={2}>Avg Market</Th>
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
            </form>
        </Box>
    )
}