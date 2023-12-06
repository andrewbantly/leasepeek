import { Box, Text, useColorModeValue, FormLabel, RadioGroup, Radio, Stack, } from '@chakra-ui/react';
import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";
import { RenovationsForm } from './forms/renovations';
import { useState } from 'react';

interface UnitRenovationsProps {
    propertyDataObject: PropertyResponseObject;
}

export function UnitRenovations({ propertyDataObject }: UnitRenovationsProps) {
    const floorPlanTableBgColor = useColorModeValue("white", "gray.700");
    const [showForm, setShowForm] = useState(false);

    const renovationsForm = showForm ? <RenovationsForm propertyDataObject={propertyDataObject} /> : '';

    const handleInputChange = (value: string) => {
        setShowForm(value === 'true')
    }

    return (
        <Box p={6} borderRadius="lg" borderWidth="1px" boxShadow="xl" bg={floorPlanTableBgColor} display="flex" flexDirection="column" mb={4}>
            <Text fontSize='xl' fontWeight='bold' mb={2}>Renovations
            </Text>
            <FormLabel>Does this property have renovated units?</FormLabel>
            <RadioGroup onChange={handleInputChange}>
                <Stack direction='row'>
                    <Radio value={'true'}>Yes</Radio>
                    <Radio value={'false'}>No</Radio>
                </Stack>
            </RadioGroup>
            {renovationsForm}
        </Box>
        )
}