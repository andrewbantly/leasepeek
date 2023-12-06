import { Box, Text, useColorModeValue, Grid, } from '@chakra-ui/react';
import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";
import { ChargeCodesForm } from './forms/chargeCodesForm';

interface ChargeCodesProps {
    propertyDataObject: PropertyResponseObject;
}

export function ChargeCodes({ propertyDataObject }: ChargeCodesProps) {
    const floorPlanTableBgColor = useColorModeValue("white", "gray.700");
    const charges: { [key: string]: number } = {};

    propertyDataObject.data.forEach(unit => {
        unit.charges.forEach(charge => {
            if (charges[charge.code]) {
                charges[charge.code] += charge.value;
            } else {
                charges[charge.code] = charge.value;
            }
        });
    });

    return (
        <Box p={6} borderRadius="lg" borderWidth="1px" boxShadow="xl" bg={floorPlanTableBgColor} display="flex" flexDirection="column" mb={4}>
            <Text fontSize='xl' fontWeight='bold' mb={2}>Additional Charge Codes
            </Text>
            <Grid
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                gap={4}
            >
                {Object.entries(charges).map(([charge, value]) => (
                    <ChargeCodesForm
                        key={charge}
                        charge={charge}
                        value={value}
                    />
                ))}
            </Grid>
        </Box>
    )
}