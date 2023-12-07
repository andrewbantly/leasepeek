import { Box, Icon, Stack, Input, FormControl, FormLabel, RadioGroup, Radio, FormErrorMessage, InputLeftElement, InputGroup, useColorModeValue, Button } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaBuilding, FaCalendar } from 'react-icons/fa';
import { useState, FormEvent, useEffect } from 'react';
import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";
import axios from 'axios';

interface BasicInfoProps {
    propertyDataObject: PropertyResponseObject;
}

export function BasicInfo({ propertyDataObject }: BasicInfoProps) {
    const [asOf, setAsOf] = useState(propertyDataObject.asOf);
    const [market, setMarket] = useState(propertyDataObject.location.market);
    const [building, setBuilding] = useState(propertyDataObject.location.building);
    console.log(`asOf: ${asOf} asOf from props: ${propertyDataObject.asOf}`)

    useEffect(() => {
        setAsOf(propertyDataObject.asOf);
        setMarket(propertyDataObject.location.market);
        setBuilding(propertyDataObject.location.building);
    }, [propertyDataObject]);


    const bgColor = useColorModeValue("gray.300", "gray.900");
    const floorPlanTableBgColor = useColorModeValue("white", "gray.700");

    const [unitCountError, setUnitCountError] = useState(false)
    const handleInputChange = (value: string) => {
        setUnitCountError(value === 'incorrect');
    };

    const formData = {
        asOf,
        market,
        building,
    }


    const handleSubmitInformation = async (event: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        console.log("handling sumbit")
        
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/data/update`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box borderRadius="lg" borderWidth="1px" boxShadow="md" bg={floorPlanTableBgColor} p={4} mb={4}>
            <form onSubmit={handleSubmitInformation}>
                <FormControl isInvalid={unitCountError}>
                    <FormLabel>Rent Roll Data As Of</FormLabel>
                    <InputGroup mb={3}>
                        <InputLeftElement pointerEvents="none" children={<Icon as={FaCalendar} color="gray.300" />} />
                        <Input placeholder={asOf ? asOf : 'No as of date found'} value={asOf} onChange={(e) => setAsOf(e.target.value)}/>
                    </InputGroup>
                    <FormLabel>Market</FormLabel>
                    <InputGroup mb={3}>
                        <InputLeftElement pointerEvents="none" children={<Icon as={FaMapMarkerAlt} color="gray.300" />} />
                        <Input placeholder={ market ? market : 'Type the market' } value={market} onChange={(e) => setMarket(e.target.value)} />
                    </InputGroup>
                    <FormLabel>Building Name</FormLabel>
                    <InputGroup mb={3}>
                        <InputLeftElement pointerEvents="none" children={<Icon as={FaBuilding} color="gray.300" />} />
                        <Input placeholder={building ? building : 'No Building Name Found'} value={building} onChange={(e) => setBuilding(e.target.value)}/>
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
                    <Button type={'submit'}>Save Changes</Button>
                </FormControl>
            </form>
        </Box>
    )
}