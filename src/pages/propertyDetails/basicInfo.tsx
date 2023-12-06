import { Box, Icon, Stack, Input, FormControl, FormLabel, RadioGroup, Radio, FormErrorMessage, InputLeftElement, InputGroup, useColorModeValue } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaBuilding, FaCalendar } from 'react-icons/fa';
import { useState } from 'react';
import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";

interface BasicInfoProps {
    propertyDataObject: PropertyResponseObject;
}

export function BasicInfo({ propertyDataObject }: BasicInfoProps) {

    const bgColor = useColorModeValue("gray.300", "gray.900");
    const floorPlanTableBgColor = useColorModeValue("white", "gray.700");

    const [unitCountError, setUnitCountError] = useState(false)
    const handleInputChange = (value: string) => {
        setUnitCountError(value === 'incorrect');
    };

    return (
        <Box borderRadius="lg" borderWidth="1px" boxShadow="md" bg={floorPlanTableBgColor} p={4} mb={4}>
            <FormControl isInvalid={unitCountError}>
                <FormLabel>Rent Roll Data As Of:</FormLabel>
                <InputGroup mb={3}>
                    <InputLeftElement pointerEvents="none" children={<Icon as={FaCalendar} color="gray.300" />} />
                    <Input value={propertyDataObject.asOf} />
                </InputGroup>
                <FormLabel>Market</FormLabel>
                <InputGroup mb={3}>
                    <InputLeftElement pointerEvents="none" children={<Icon as={FaMapMarkerAlt} color="gray.300" />} />
                    <Input placeholder="Add API to search location" />
                </InputGroup>
                <FormLabel>Building</FormLabel>
                <InputGroup mb={3}>
                    <InputLeftElement pointerEvents="none" children={<Icon as={FaBuilding} color="gray.300" />} />
                    <Input value={propertyDataObject.location} />
                </InputGroup>
                <FormLabel mb={2}>Unit Count: {propertyDataObject.totalUnits}</FormLabel>
                <RadioGroup onChange={handleInputChange}>
                    <Stack direction='row'>
                        <Radio value='correct'>Correct</Radio>
                        <Radio value='incorrect'>Incorrect</Radio>
                    </Stack>
                    {unitCountError &&
                        <FormErrorMessage>Please contact customercare@leasepeek.com.</FormErrorMessage>
                    }
                </RadioGroup>
            </FormControl>
        </Box>
    )
}