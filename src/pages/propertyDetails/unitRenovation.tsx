import { Box, Text, useColorModeValue, FormLabel, RadioGroup, Radio, Stack, Flex, Button } from '@chakra-ui/react';
import { PropertyResponseObject, PropertyDataItem } from "../../interfaces/propertyProfile/propertyProfileProps";
import { useEffect, useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { RenovationsByFloorPlan } from './forms/renovationsByFloorPlan';
import { RenovationsByUnitNumber } from './forms/renovationsByUnitNumber';
import axios from 'axios';

interface UnitRenovationsProps {
    propertyDataObject: PropertyResponseObject;
}

export function UnitRenovations({ propertyDataObject }: UnitRenovationsProps) {

    const { objectId } = useParams();
     
    const [showForm, setShowForm] = useState(false);
    const [switchFormType, setSwitchForm] = useState(false);
    const [changesMade, setChangesMade] = useState(false);
    const [propertyUnitData, setPropertyUnitData] = useState<PropertyDataItem[]>(propertyDataObject.data);
    const [propertyFloorplanData, setpropertyFloorplanData] = useState(propertyDataObject.floorplans);
    const [initialRenovatedUnits, setInitialRenovatedUnits] = useState("false")
    const [renovatedUnits, setRenovatedUnits] = useState<string[]>([]);
    const [renovatedUnitsState, setRenovatedUnitsState] = useState<string[]>([]);
    const [payloadFormType, setpayloadFormType] = useState("floorPlan");

    useEffect(() => {
        setPropertyUnitData(propertyDataObject.data)

        const renoUnits: string[] = [];
        propertyDataObject.data.map(unit => {
            if (unit.renovated) {
                renoUnits.push(unit.unit)
            }
        })

        if (renoUnits.length > 0) {
            setInitialRenovatedUnits("true")
        }

        setRenovatedUnits(renoUnits);
        setRenovatedUnitsState(renoUnits);

    }, propertyDataObject.data)

    useEffect(() => {
        const isChanged = () => {
            return JSON.stringify(renovatedUnits) !== JSON.stringify(renovatedUnitsState);
        };
        setChangesMade(isChanged());
    }, [renovatedUnits, renovatedUnitsState, propertyUnitData])

    const handleShowFormChange = (value: string) => {
        setpayloadFormType(value);
        setSwitchForm(value === 'unitNumber');
    }

    const handleFloorplanRenovationChange = (floorplan: string, isRenovated: string) => {
        // const updatedRenovatedUnits = propertyUnitData.map(unit => {
        //     if (unit.unit === unitNumber) {
        //         if (isRenovated === "true") {
        //             const updatedRenoUnits = [...renovatedUnits, unitNumber]
        //             setRenovatedUnits(updatedRenoUnits)
        //         }
        //         else {
        //             const updatedRenoUnits = renovatedUnits.filter(unit => unit !== unitNumber);
        //             setRenovatedUnits(updatedRenoUnits);
        //         }
        //         return { ...unit, renovated: isRenovated === "true" };
        //     }
        //     return unit
        // });
        // setPropertyUnitData(updatedRenovatedUnits)
    }

    const handleUnitRenovationChange = (unitNumber: string, isRenovated: string) => {
        const updatedRenovatedUnits = propertyUnitData.map(unit => {
            if (unit.unit === unitNumber) {
                if (isRenovated === "true") {
                    const updatedRenoUnits = [...renovatedUnits, unitNumber]
                    setRenovatedUnits(updatedRenoUnits)
                }
                else {
                    const updatedRenoUnits = renovatedUnits.filter(unit => unit !== unitNumber);
                    setRenovatedUnits(updatedRenoUnits);
                }
                return { ...unit, renovated: isRenovated === "true" };
            }
            return unit
        });
        setPropertyUnitData(updatedRenovatedUnits)
    }

    const renovatedDisplayType = switchFormType ? <RenovationsByUnitNumber propertyUnitData={propertyUnitData} handleUnitRenovationChange={handleUnitRenovationChange} /> :
        <RenovationsByFloorPlan propertyFloorplanData={propertyFloorplanData} handleFloorplanRenovationChange={handleFloorplanRenovationChange}/>;

    const showRenovationsForm = (
        <Box>
            <Text>How would you like to mark renovated units?</Text>
            <RadioGroup onChange={handleShowFormChange} defaultValue={'floorPlan'}>
                <Stack direction='column'>
                    <Radio value={'floorPlan'}>By Floor Plan</Radio>
                    <Radio value={'unitNumber'}>By Unit Number</Radio>
                </Stack>
            </RadioGroup>
        </Box>
    )

    const handleInputChange = (value: string) => {
        if (value === 'false') {
            setRenovatedUnits([]);
            setRenovatedUnitsState([]);
        }
        setShowForm(value === 'true')
    }

    const formData = {
        'form': 'renovations',
        'type': payloadFormType,
        objectId,
        renovatedUnits
    }

    // PUT request to server when user submits data changes
    const handleSubmitInformation = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData)
        try {
            const token = localStorage.getItem('jwt');
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/data/update`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            setRenovatedUnitsState(renovatedUnits);
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
            <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <Text fontSize='xl' fontWeight='bold'>Renovations</Text>
                {submit}
            </Flex>
            <Flex direction={{ base: 'column', md: 'row' }} gap={6}>

                <Box flex="0.4">
                    <FormLabel>Does this property have renovated units?</FormLabel>
                    <RadioGroup mb={3} onChange={handleInputChange} defaultValue={initialRenovatedUnits}>
                        <Stack direction='row'>
                            <Radio value={'true'}>Yes</Radio>
                            <Radio value={'false'}>No</Radio>
                        </Stack>
                    </RadioGroup>

                    {showForm ? showRenovationsForm : ""}
                </Box>

                <Box flex="1">
                    {showForm ? renovatedDisplayType : ''}
                </Box>
            </Flex>
            </form>
        </Box>
    );
}