import { Box, Icon, Input, FormControl, FormLabel, RadioGroup, Radio, FormErrorMessage, InputLeftElement, InputGroup, useColorModeValue, Button, HStack, Text } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaBuilding, FaRegBuilding, FaCalendarAlt, FaCity, FaFlag, FaMailBulk } from 'react-icons/fa';
import { useState, FormEvent, useEffect } from 'react';
import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface BasicInfoProps {
    propertyDataObject: PropertyResponseObject;
}

export function BasicInfo({ propertyDataObject }: BasicInfoProps) {
    const [asOfState, setAsOfState] = useState(propertyDataObject.asOf);
    const [marketState, setMarketState] = useState(propertyDataObject.location.market);
    const [buildingNameState, setBuildingNameState] = useState(propertyDataObject.location.buildingName);
    const [addressLine1State, setAddressLine1State] = useState(propertyDataObject.location.address.addressLine1);
    const [addressLine2State, setAddressLine2State] = useState(propertyDataObject.location.address.addressLine2);
    const [cityState, setCityState] = useState(propertyDataObject.location.address.city);
    const [stateState, setStateState] = useState(propertyDataObject.location.address.state);
    const [zipCodeState, setZipCodeState] = useState(propertyDataObject.location.address.zipCode);


    const [asOf, setAsOf] = useState(propertyDataObject.asOf);
    const [market, setMarket] = useState(propertyDataObject.location.market);
    const [buildingName, setBuildingName] = useState(propertyDataObject.location.buildingName);
    const [addressLine1, setAddressLine1] = useState(propertyDataObject.location.address.addressLine1);
    const [addressLine2, setAddressLine2] = useState(propertyDataObject.location.address.addressLine2);
    const [city, setCity] = useState(propertyDataObject.location.address.city);
    const [state, setState] = useState(propertyDataObject.location.address.state);
    const [zipCode, setZipCode] = useState(propertyDataObject.location.address.zipCode);
    const [unitsConfirmed, setUnitsConfirmed] = useState(propertyDataObject.unitsConfirmed);

    const [radioValue, setRadioValue] = useState('');

    const [changesMade, setChangesMade] = useState(false);
    const [unitCountError, setUnitCountError] = useState(false)
    const { objectId } = useParams();

    useEffect(() => {
        setAsOf(propertyDataObject.asOf);
        setMarket(propertyDataObject.location.market);
        setBuildingName(propertyDataObject.location.buildingName);
        setAddressLine1(propertyDataObject.location.address.addressLine1);
        setAddressLine2(propertyDataObject.location.address.addressLine2);
        setCity(propertyDataObject.location.address.city);
        setState(propertyDataObject.location.address.state);
        setZipCode(propertyDataObject.location.address.zipCode);
        setUnitsConfirmed(propertyDataObject.unitsConfirmed);
        setRadioValue(propertyDataObject.unitsConfirmed ? 'correct' : '');
        setAsOfState(propertyDataObject.asOf);
        setMarketState(propertyDataObject.location.market);
        setBuildingNameState(propertyDataObject.location.buildingName);
        setAddressLine1State(propertyDataObject.location.address.addressLine1);
        setAddressLine2State(propertyDataObject.location.address.addressLine2);
        setCityState(propertyDataObject.location.address.city);
        setStateState(propertyDataObject.location.address.state);
        setZipCodeState(propertyDataObject.location.address.zipCode);
    }, [propertyDataObject]);

    useEffect(() => {
        const isChanged = () => {
            return asOf !== asOfState || market !== marketState || buildingName !== buildingNameState || addressLine1 !== addressLine1State || addressLine2 !== addressLine2State || city !== cityState || state !== stateState || zipCode !== zipCodeState;
        };
        setChangesMade(isChanged());
    }, [asOf, asOfState, market, marketState, buildingName, buildingNameState, addressLine1, addressLine1State, addressLine2, addressLine2State, city, cityState, state, stateState, zipCode, zipCodeState])

    const buttonBgColor = useColorModeValue("gray.300", "gray.900");
    const floorPlanTableBgColor = useColorModeValue("white", "gray.700");

    const handleInputChange = (value: string) => {
        setUnitCountError(value === 'incorrect');
        setUnitsConfirmed(value === 'correct');
        setRadioValue(value);
    };

    const formData = {
        'form': 'basic',
        objectId,
        asOf,
        market,
        buildingName,
        unitsConfirmed,
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
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
            })
            console.log(response)
            setAsOfState(asOf);
            setMarketState(market);
            setBuildingNameState(buildingName);
            setAddressLine1State(addressLine1);
            setAddressLine2State(addressLine2);
            setCityState(city);
            setStateState(state);
            setZipCodeState(zipCode);
        } catch (error) {
            console.log(error)
        }
    }

    const dontSubmitButton = (
        <Button isDisabled bg={buttonBgColor} alignSelf="flex-end" mr={3}>Save Changes</Button>
    )

    const submitButton = (
        <Button type={'submit'} bg={buttonBgColor} alignSelf="flex-end" mr={3}>Save Changes</Button>
    )

    const submit = unitsConfirmed && changesMade ? submitButton : dontSubmitButton;

    return (
        <Box px={6}
            pt={6}
            borderRadius="lg"
            borderWidth="1px"
            boxShadow="xl"
            bg={floorPlanTableBgColor}
            display="flex"
            flexDirection="column"
            mb={4}>
            <form onSubmit={handleSubmitInformation}>
                <FormLabel>Rent Roll Data As Of</FormLabel>
                <InputGroup mb={3}>
                    <InputLeftElement pointerEvents="none" children={<Icon as={FaCalendarAlt} color="gray.300" />} />
                    <Input placeholder={asOf ? asOf : 'Enter a date for the rent roll data'} value={asOf} onChange={(e) => setAsOf(e.target.value)} />
                </InputGroup>
                <FormLabel>Market</FormLabel>
                <InputGroup mb={3}>
                    <InputLeftElement pointerEvents="none" children={<Icon as={FaMapMarkerAlt} color="gray.300" />} />
                    <Input placeholder={market ? market : 'Enter a city or region'} value={market} onChange={(e) => setMarket(e.target.value)} />
                </InputGroup>
                <FormLabel>Building Name</FormLabel>
                <InputGroup mb={3}>
                    <InputLeftElement pointerEvents="none" children={<Icon as={FaRegBuilding} color="gray.300" />} />
                    <Input placeholder={buildingName ? buildingName : 'Enter a name for the building'} value={buildingName} onChange={(e) => setBuildingName(e.target.value)} />
                </InputGroup>
                <Box mt={4} mb={4} p={3} borderWidth="1px" borderRadius="lg">
                    <FormLabel>Address</FormLabel>
                    <InputGroup mb={3}>
                        <InputLeftElement pointerEvents="none" children={<Icon as={FaBuilding} color="gray.300" />} />
                        <Input placeholder="Address Line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
                    </InputGroup>
                    <InputGroup mb={3}>
                        <InputLeftElement pointerEvents="none" children={<Icon as={FaBuilding} color="gray.300" />} />
                        <Input placeholder="Address Line 2 (Optional)" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
                    </InputGroup>
                    <InputGroup mb={3}>
                        <InputLeftElement pointerEvents="none" children={<Icon as={FaCity} color="gray.300" />} />
                        <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                    </InputGroup>
                    <InputGroup mb={3}>
                        <InputLeftElement pointerEvents="none" children={<Icon as={FaFlag} color="gray.300" />} />
                        <Input placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
                    </InputGroup>
                    <InputGroup mb={3}>
                        <InputLeftElement pointerEvents="none" children={<Icon as={FaMailBulk} color="gray.300" />} />
                        <Input placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                    </InputGroup>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="flex-end">
                    <Box flexGrow={1} mr={3}>
                        <FormLabel mb={2}>
                            Number of Units: <Box as="span" fontWeight="bold">{propertyDataObject.totalUnits}</Box>
                        </FormLabel>
                        <Box borderWidth="1px" borderRadius="md" p={3} width={'fit-content'}>
                            <Text mb={2}>Please confirm the number of units</Text>
                            <RadioGroup onChange={handleInputChange} value={radioValue}>
                                <HStack spacing={5}>
                                    <Radio value='correct'>Correct</Radio>
                                    <Radio value='incorrect'>Incorrect</Radio>
                                </HStack>
                            </RadioGroup>
                        </Box>
                    </Box>
                    <Box alignSelf="flex-end">
                        {submit}
                    </Box>
                </Box>
                <Box height={4} mt={2} mb={2}>
                    <FormControl isInvalid={unitCountError}>
                        {unitCountError &&
                            <FormErrorMessage m={0}>Please contact customercare@leasepeek.com</FormErrorMessage>
                        }
                    </FormControl>
                </Box>
            </form>
        </Box>
    )
}