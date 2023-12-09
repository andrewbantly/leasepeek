import { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, useColorModeValue, Grid, } from '@chakra-ui/react';
import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";
import { ChargeCodesForm } from './forms/chargeCodesForm';
import axios from 'axios';

interface ChargeCodesProps {
    propertyDataObject: PropertyResponseObject;
}

type ChargeCodes = { [key: string]: number };

export function ChargeCodes({ propertyDataObject }: ChargeCodesProps) {

    const { objectId } = useParams();

    const [charges, setCharges] = useState<{ [key: string]: number }>({});
    const [chargeCodesState, setChargesState] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const newCharges: ChargeCodes = {};

        propertyDataObject.data.forEach(unit => {
            unit.charges.forEach(charge => {
                if (newCharges[charge.code]) {
                    newCharges[charge.code] += charge.value;
                } else {
                    newCharges[charge.code] = charge.value;
                }
            });
        });

        setCharges(newCharges);
        setChargesState(newCharges);
    }, [propertyDataObject.data]);

                    
    const floorPlanTableBgColor = useColorModeValue("white", "gray.700");

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