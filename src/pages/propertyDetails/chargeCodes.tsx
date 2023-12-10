import { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, useColorModeValue, Grid, Button, Flex} from '@chakra-ui/react';
import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";
import { ChargeCodesForm } from './forms/chargeCodesForm';
import axios from 'axios';

interface ChargeCodesProps {
    propertyDataObject: PropertyResponseObject;
}

type ChargeCodes = { [key: string]: ChargeCodeDetail };

type ChargeCodeDetail = {
    value: number;
    type: string;
};

export function ChargeCodes({ propertyDataObject }: ChargeCodesProps) {

    const { objectId } = useParams();

    const [charges, setCharges] = useState<ChargeCodes>({});
    const [chargeCodesState, setChargesState] = useState<ChargeCodes>({});
    const [changesMade, setChangesMade] = useState(false);

    useEffect(() => {
        setCharges(propertyDataObject.charges);
        setChargesState(propertyDataObject.charges);
    }, [propertyDataObject]);

    useEffect(() => {
        const isChanged = () => {
            return JSON.stringify(charges) !== JSON.stringify(chargeCodesState);
        }
        setChangesMade(isChanged());
    }, [charges, chargeCodesState, changesMade])

    const handleInputChange = (charge: string, chargeType: string) => {
        const updatedChargeCodes = { ...charges };
        updatedChargeCodes[charge] = { ...charges[charge], ['type']: chargeType };
        setCharges(updatedChargeCodes);
    };

    const formData = {
        'form': 'chargeCodes',
        objectId,
        charges
    }

    const handleSubmitInformation = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/data/update`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            setChargesState(charges)
        } catch (error) {
            console.log(error)
        }
    }

    const floorPlanTableBgColor = useColorModeValue("white", "gray.700");
    const buttonBgColor = useColorModeValue("gray.300", "gray.900");
    const dontSubmitButton = (<Button isDisabled bg={buttonBgColor}>Save Changes</Button>);
    const submitButton = (<Button type={'submit'} bg={buttonBgColor}>Save Changes</Button>);
    const submit = changesMade ? submitButton : dontSubmitButton;

    return (
        <Box p={6} borderRadius="lg" borderWidth="1px" boxShadow="xl" bg={floorPlanTableBgColor} display="flex" flexDirection="column" mb={4}>
            <form onSubmit={handleSubmitInformation}>
            <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize='xl' fontWeight='bold' mb={2}>Additional Charge Codes</Text>
                    {submit}
                </Flex>
                <Grid
                    templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                    gap={4}
                >
                    {Object.entries(charges).map(([charge, properties]) => (
                        <ChargeCodesForm
                            key={charge}
                            charge={charge}
                            chargeValue={properties.value}
                            chargeType={properties.type}
                            handleInputChange={handleInputChange}
                        />
                    ))}
                </Grid>
            </form>
        </Box>
    )
}