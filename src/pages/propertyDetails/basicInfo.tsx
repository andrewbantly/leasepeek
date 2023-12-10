import { Box, Icon, Input, FormControl, FormLabel, RadioGroup, Radio, FormErrorMessage, InputLeftElement, InputGroup, useColorModeValue, Button, HStack, Text, Flex } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaBuilding, FaRegBuilding, FaCalendarAlt, FaCity, FaFlag, FaMailBulk } from 'react-icons/fa';
import { useState, FormEvent, useEffect } from 'react';
import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface BasicInfoProps {
    propertyDataObject: PropertyResponseObject;
}

export function BasicInfo({ propertyDataObject }: BasicInfoProps) {
    // ObjectId of rent roll
    const { objectId } = useParams();

    // Form state - When the form data loads, the state is set to the property response object by default. Once a user saves changes, the default state is updated to the user-inputted state and is saved.
    const [asOfState, setAsOfState] = useState(propertyDataObject.asOf);
    const [marketState, setMarketState] = useState(propertyDataObject.location.market);
    const [buildingNameState, setBuildingNameState] = useState(propertyDataObject.location.buildingName);
    const [addressLine1State, setAddressLine1State] = useState(propertyDataObject.location.address.addressLine1);
    const [addressLine2State, setAddressLine2State] = useState(propertyDataObject.location.address.addressLine2);
    const [cityState, setCityState] = useState(propertyDataObject.location.address.city);
    const [stateState, setStateState] = useState(propertyDataObject.location.address.state);
    const [zipCodeState, setZipCodeState] = useState(propertyDataObject.location.address.zipCode);

    // Data state - The actual state of the input data that the user can change. When a user changes these data states, the form needs to be saved and sent to the server. 
    const [asOf, setAsOf] = useState(propertyDataObject.asOf);
    const [market, setMarket] = useState(propertyDataObject.location.market);
    const [buildingName, setBuildingName] = useState(propertyDataObject.location.buildingName);
    const [addressLine1, setAddressLine1] = useState(propertyDataObject.location.address.addressLine1);
    const [addressLine2, setAddressLine2] = useState(propertyDataObject.location.address.addressLine2);
    const [city, setCity] = useState(propertyDataObject.location.address.city);
    const [state, setState] = useState(propertyDataObject.location.address.state);
    const [zipCode, setZipCode] = useState(propertyDataObject.location.address.zipCode);
    const [unitsConfirmed, setUnitsConfirmed] = useState(propertyDataObject.unitsConfirmed);

    // Radio value for unit count confirmation. State is loaded as true or '' based on property data object. For the user, the confirmed button should be checked if the user has previously confirmed the unit count, otherwise leave the buttons unchecked. Uncomfirmed unit count data requires customer support. 
    const [radioValue, setRadioValue] = useState('');


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

    // Changes made tracks if the user has updated the form inputs and is different from the form state. The dependency array tracks changes the user makes to the data states as well as when a user saves the changes (and sends to server), which updates the form states.
    const [changesMade, setChangesMade] = useState(false);
    useEffect(() => {
        const isChanged = () => {
            return asOf !== asOfState || market !== marketState || buildingName !== buildingNameState || addressLine1 !== addressLine1State || addressLine2 !== addressLine2State || city !== cityState || state !== stateState || zipCode !== zipCodeState;
        };
        setChangesMade(isChanged());
    }, [asOf, asOfState, market, marketState, buildingName, buildingNameState, addressLine1, addressLine1State, addressLine2, addressLine2State, city, cityState, state, stateState, zipCode, zipCodeState])

    // Unit count error state that triggers an error message for the user.
    const [unitCountError, setUnitCountError] = useState(false);


    const handleInputChange = (value: string) => {
        setUnitCountError(value === 'incorrect');
        setUnitsConfirmed(value === 'correct');
        setRadioValue(value);
    };

    // form data payload that is sent to server when user saves changes
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

    // PUT request to server when user submits data changes
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

    // Styling based on light / dark modes
    const buttonBgColor = useColorModeValue("gray.300", "gray.900");
    const floorPlanTableBgColor = useColorModeValue("white", "gray.700");

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    // disabled button when the user has no changes to save or hasn't confirmed the unit count
    const dontSubmitButton = (<Button isDisabled bg={buttonBgColor}>Save Changes</Button>)

    // button when user is eligible to save changes
    const submitButton = (<Button type={'submit'} bg={buttonBgColor}>Save Changes</Button>)

    // conditional rendering of submit buttons
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
                <Flex justifyContent="space-between" alignItems="center">
                    <Text fontSize='xl' fontWeight='bold'>Background</Text>
                    {submit}
                </Flex>
                <Box display="flex" mb={3}>
                    <Box width="50%" pr={2} height={'fit-content'}>
                        <FormLabel>Rent Roll Data As Of</FormLabel>
                        <InputGroup mb={3} width={'75%'}>
                            <InputLeftElement pointerEvents="none" children={<Icon as={FaCalendarAlt} color="gray.300" />} />
                            <Input type='date' placeholder={asOf ? asOf : 'Enter a date for the rent roll data'} value={formatDate(asOf)} onChange={(e) => setAsOf(e.target.value)} />
                        </InputGroup>
                        <FormLabel>Market</FormLabel>
                        <InputGroup mb={3} width={'75%'}>
                            <InputLeftElement pointerEvents="none" children={<Icon as={FaMapMarkerAlt} color="gray.300" />} />
                            <Input placeholder={market ? market : 'Enter a city or region'} value={market} onChange={(e) => setMarket(e.target.value)} />
                        </InputGroup>
                        <FormLabel>Building Name</FormLabel>
                        <InputGroup width={'75%'}>
                            <InputLeftElement pointerEvents="none" children={<Icon as={FaRegBuilding} color="gray.300" />} />
                            <Input placeholder={buildingName ? buildingName : 'Enter a name for the building'} value={buildingName} onChange={(e) => setBuildingName(e.target.value)} />
                        </InputGroup>
                    </Box>
                    <Box width="50%" pl={2}>
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
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="flex-end">
                    <Box width="50%" pr={2}>
                        <FormLabel mb={2}>
                            Number of Units: <Box as="span" fontWeight="bold">{propertyDataObject.totalUnits}</Box>
                        </FormLabel>
                        <Box borderWidth="1px" borderRadius="md" p={3} width={'fit-content'}>
                            <Text mb={2} mr={1}><Text as="span" color="red.400" ml={1}>* </Text>Please confirm the number of units</Text>
                            <RadioGroup onChange={handleInputChange} value={radioValue}>
                                <HStack spacing={5} ml={4}>
                                    <Radio value='correct'>Correct</Radio>
                                    <Radio value='incorrect'>Incorrect</Radio>
                                </HStack>
                            </RadioGroup>
                        </Box>
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