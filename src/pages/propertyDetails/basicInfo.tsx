import { Box, Heading, Flex, Icon, Stack, Input, Text, FormControl, FormLabel, RadioGroup, HStack, Radio, FormErrorMessage, Select, InputLeftElement, InputGroup, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useColorModeValue } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';
import { useEffect, useState, ChangeEvent } from 'react';
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
            <Heading as={'h2'} mb={4}>Property Details</Heading>
            <FormControl isInvalid={unitCountError}>
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