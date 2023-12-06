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

export function RenovationsForm({propertyDataObject}: RenovationsFormProps) {
    const [showForm, setShowForm] = useState(true);

    const handleInputChange = (value: string) => {
        setShowForm(value === 'unitNumber')
    }

    const renovatedDisplayType = showForm ? <RenovationsByUnitNumber propertyDataObject={propertyDataObject}/> : <RenovationsByFloorPlan propertyDataObject={propertyDataObject}/>;

    return (
        <Box>
            <HStack>
                <Box>
                <Text>How would you like to mark renovated units?</Text>
                <RadioGroup onChange={handleInputChange} defaultValue={'unitNumber'}>
                    <Stack direction='column'>
                        <Radio value={'unitNumber'}>By Unit Number</Radio>
                        <Radio value={'floorPlan'}>By Floor Plan</Radio>
                    </Stack>
                </RadioGroup>
                </Box>
                <Box>
                    {renovatedDisplayType}
                </Box>
            </HStack>
        </Box>
    )
}