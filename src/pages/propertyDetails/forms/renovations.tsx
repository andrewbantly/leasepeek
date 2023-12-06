import {
    Box,
    Text,
    Select,
    Input,
    useColorModeValue,
    FormLabel,
    InputGroup,
    Grid,
    Button,
    Flex,
    HStack,
    RadioGroup,
    Radio,
    Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RenovationsByFloorPlan } from './renovationsByFloorPlan';
import { RenovationsByUnitNumber } from './renovationsByUnitNumber';
import { PropertyResponseObject } from "../../../interfaces/propertyProfile/propertyProfileProps";

interface RenovationsFormProps {
    propertyDataObject: PropertyResponseObject;
}

export function RenovationsForm({ propertyDataObject }: RenovationsFormProps) {
    const floorPlanTableBgColor = useColorModeValue("white", "gray.700");
    
    const [showForm, setShowForm] = useState(false);

    const handleInputChange = (value: string) => {
        setShowForm(value === 'unitNumber')
    }

    const renovatedDisplayType = showForm ? <RenovationsByUnitNumber propertyDataObject={propertyDataObject} /> :
        <RenovationsByFloorPlan propertyDataObject={propertyDataObject} />;

    return (
        <Box mt={3}>
            <Flex alignItems="start" gap={4}>
                <Box flexShrink={0}>
                    <Text>How would you like to mark renovated units?</Text>
                    <RadioGroup onChange={handleInputChange} defaultValue={'floorPlan'}>
                        <Stack direction='column'>
                            <Radio value={'floorPlan'}>By Floor Plan</Radio>
                            <Radio value={'unitNumber'}>By Unit Number</Radio>
                        </Stack>
                    </RadioGroup>
                </Box>
                <Box p={6} borderRadius="lg" borderWidth="1px" boxShadow="xl" bg={floorPlanTableBgColor} display="flex" flexDirection="column" mb={4} flexGrow={1}>
                {renovatedDisplayType}
                </Box>
            </Flex>
        </Box>
    )
}