import { Box, Input, Text, Select, Table, Thead, Tbody, Tr, Th, Td, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useColorModeValue } from '@chakra-ui/react';
import { PropertyResponseObject } from "../../../interfaces/propertyProfile/propertyProfileProps";

interface RenovationsByUnitNumberProps {
    propertyDataObject: PropertyResponseObject;
}
export function RenovationsByUnitNumber({propertyDataObject}: RenovationsByUnitNumberProps) {
    return (
        <>
        show renovations by unit number
        </>
    )
}