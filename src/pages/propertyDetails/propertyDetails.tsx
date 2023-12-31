import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";
import { Heading, Box, useColorModeValue, Flex, Text } from '@chakra-ui/react';
import { BasicInfo } from './basicInfo';
import { FloorPlanDetailsComponent } from './floorPlanDetails';
import { UnitStatus } from './unitStatus';
import { ChargeCodes } from './chargeCodes';
import { UnitRenovations } from './unitRenovation';
import { FormCompletion } from './formCompletion';

const defaultPropertyData: PropertyResponseObject = {
    user_id: 0,
    location: {
        market: '',
        buildingName: '',
        address: {
            addressLine1: '',
            addressLine2: '',
            zipCode: '',
            city: '',
            state: '',
        }
    },
    asOf: "",
    date: "",
    vacancy: {},
    floorplans: {},
    totalUnits: 0,
    unitsConfirmed: false,
    totalBalance: 0,
    lossToLease: {
        marketSum: 0,
        rentIncome: 0,
    },
    charges: {},
    recentLeases: {},
    expiringLeases: {},
    leaseTrends: {},
    data: [
        {
            balance: 0,
            charges: [
                {
                    code: '',
                    value: 0,
                    type: '',
                }
            ],
            floorplan: '',
            leaseExpire: '',
            leaseStart: '',
            market: 0,
            moveIn: '',
            moveOut: '',
            otherDeposit: 0,
            rent: 0,
            residentDeposit: 0,
            sqft: 0,
            status: '',
            total: 0,
            unit: '',
            renovated: false,
        }]
};

export function PropertyDetails() {
    const { objectId } = useParams();
    const navigate = useNavigate();
    const [propertyDataObject, setPropertyDataObject] = useState<PropertyResponseObject>(defaultPropertyData);
    const [basicUnSavedChanges, setBasicUnSavedChanges] = useState(false);
    const [floorplanUnSavedChanges, setFloorplanUnSavedChanges] = useState(false);
    const [unitStatusUnSavedChanges, setUnitStatusUnSavedChanges] = useState(false);
    const [chargeCodesUnSavedChanges, setChargeCodesUnSavedChanges] = useState(false);
    const [renovationsUnSavedChanges, setRenovationsUnSavedChanges] = useState(false);
    const [unSavedChanges, setUnSavedChanges] = useState(false);

    const bgColor = useColorModeValue("gray.300", "gray.900");

    useEffect(() => {
        propertyDataRequest()
    }, [])

    useEffect(() => {
        if (basicUnSavedChanges || floorplanUnSavedChanges || unitStatusUnSavedChanges || chargeCodesUnSavedChanges || renovationsUnSavedChanges ) {
            setUnSavedChanges(true);
        }
        else {
            setUnSavedChanges(false);
        }
    }, [basicUnSavedChanges, floorplanUnSavedChanges, unitStatusUnSavedChanges, chargeCodesUnSavedChanges, renovationsUnSavedChanges, unSavedChanges])

    const propertyDataRequest = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/data/read`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    objectId: objectId
                }
            });
            setPropertyDataObject(response.data[0]);
        } catch (error) {
            console.error("Error loading data", error);
            navigate('/')
        }
    }

    const floorPlanArray: string[] = [];

    propertyDataObject.data.forEach(unit => {
        if (!floorPlanArray.includes(unit.floorplan)) {
            floorPlanArray.push(unit.floorplan)
        }
    })

    const floorPlanTableBgColor = useColorModeValue("white", "gray.700");

    return (
        <Box p={6} borderRadius="lg" borderWidth="1px" boxShadow="xl" bg={bgColor} display="flex" flexDirection="column" margin={2}>
            <Flex  justifyContent="space-between" alignItems="center"  mb={0}>
                <Heading as={'h2'}>Property Details</Heading>
                <FormCompletion unSavedChanges={unSavedChanges} />
            </Flex>
            <Text fontSize='lg' mb={4}>Please add additional rent roll information.</Text>
            <BasicInfo propertyDataObject={propertyDataObject} setBasicUnSavedChanges={setBasicUnSavedChanges} />
            <FloorPlanDetailsComponent propertyDataObject={propertyDataObject} setFloorplanUnSavedChanges={setFloorplanUnSavedChanges} />
            <UnitStatus propertyDataObject={propertyDataObject} setUnitStatusUnSavedChanges={setUnitStatusUnSavedChanges} />
            <ChargeCodes propertyDataObject={propertyDataObject} setChargeCodesUnSavedChanges={setChargeCodesUnSavedChanges} />
            <UnitRenovations propertyDataObject={propertyDataObject} setRenovationsUnSavedChanges={setRenovationsUnSavedChanges} />
            <FormCompletion unSavedChanges={unSavedChanges} />
        </Box>
    )
}