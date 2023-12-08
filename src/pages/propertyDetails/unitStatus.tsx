import { useState, useEffect, FormEvent } from 'react';
import { Box, Text, useColorModeValue, Grid, Button, } from '@chakra-ui/react';
import { PropertyResponseObject } from '../../interfaces/propertyProfile/propertyProfileProps';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UnitStatusForm } from './forms/unitStatusForm';

interface UnitStatusProps {
    propertyDataObject: PropertyResponseObject;
}

export function UnitStatus({ propertyDataObject }: UnitStatusProps) {
    const { objectId } = useParams();

    const [unitStatuses, setUnitStatuses] = useState(propertyDataObject.vacancy);
    const [unitStatusesState, setUnitStatusesState] = useState(propertyDataObject.vacancy);

    useEffect(() => {
        setUnitStatuses(propertyDataObject.vacancy);
        setUnitStatusesState(propertyDataObject.vacancy);
    }, [propertyDataObject]);

    const [changesMade, setChangesMade] = useState(false);
    useEffect(() => {
        const isChanged = () => {
            return JSON.stringify(unitStatuses) !== JSON.stringify(unitStatusesState);
        };
        setChangesMade(isChanged());
    }, [unitStatuses, unitStatusesState]);

    const handleInputChange = (status: string, value: string) => {
        const updatedUnitStatuses = { ...unitStatuses };
        updatedUnitStatuses[status] = { ...unitStatuses[status], ['type']: value };
        setUnitStatuses(updatedUnitStatuses);
    };

    const formData = {
        'form': 'unitStatus',
        objectId,
        unitStatuses
    }

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
            setUnitStatusesState(unitStatuses);
        } catch (error) {
            console.log(error)
        }
    }


    const floorPlanTableBgColor = useColorModeValue('white', 'gray.700');
    const buttonBgColor = useColorModeValue("gray.300", "gray.900");

    const dontSubmitButton = (<Button isDisabled bg={buttonBgColor}>Save Changes</Button>);
    const submitButton = (<Button type={'submit'} bg={buttonBgColor}>Save Changes</Button>);
    const submit = changesMade ? submitButton : dontSubmitButton;

    return (
        <Box
            p={6}
            borderRadius="lg"
            borderWidth="1px"
            boxShadow="xl"
            bg={floorPlanTableBgColor}
            display="flex"
            flexDirection="column"
            mb={4}
        >
            <form onSubmit={handleSubmitInformation}>

                <Text fontSize="xl" fontWeight="bold" mb={2}>
                    Unit Status Types
                </Text>
                <Text fontSize="sm" mb={3}>
                    Please enter updated unit status types, which have been automatically
                    pulled from the rent roll.
                </Text>
                <Grid
                    templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                    gap={4}
                >
                    {Object.entries(propertyDataObject.vacancy).map(([status, count]) => (
                        <UnitStatusForm
                            handleInputChange={handleInputChange}
                            key={status}
                            status={status}
                            count={count.count}
                            type={count.type}
                        />
                    ))}
                </Grid>
                <Box display={'flex'} flexDirection={'row-reverse'} mt={2}>
                    {submit}
                </Box>
            </form>
        </Box>
    );
}