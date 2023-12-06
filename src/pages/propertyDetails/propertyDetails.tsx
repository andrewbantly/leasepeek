import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { PropertyResponseObject } from "../../interfaces/propertyProfile/propertyProfileProps";
import { Box, useColorModeValue } from '@chakra-ui/react';
import { BasicInfo } from './basicInfo';
import { FloorPlanDetails } from './floorPlanDetails';
import { UnitStatus } from './unitStatus';
import { ChargeCodes } from './chargeCodes';
import { UnitRenovations } from './unitRenovation';

const defaultPropertyData: PropertyResponseObject = {
    user_id: 0,
    location: "",
    asOf: "",
    date: "",
    vacancy: {},
    floorplans: {},
    totalUnits: 0,
    totalBalance: 0,
    lossToLease: {
        marketSum: 0,
        rentIncome: 0,
    },
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
        }]
};

export function PropertyDetails() {
    const { objectId } = useParams();
    const navigate = useNavigate();
    const [propertyDataObject, setPropertyDataObject] = useState<PropertyResponseObject>(defaultPropertyData)

    const bgColor = useColorModeValue("gray.300", "gray.900");

    useEffect(() => {
        propertyDataRequest()
    }, [])

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

    return (
        <Box p={6} borderRadius="lg" borderWidth="1px" boxShadow="xl" bg={bgColor} display="flex" flexDirection="column" margin={2}>
            <BasicInfo propertyDataObject={propertyDataObject}/>
            <FloorPlanDetails propertyDataObject={propertyDataObject}/>
            <UnitStatus propertyDataObject={propertyDataObject}/>
            <ChargeCodes propertyDataObject={propertyDataObject}/>
            <UnitRenovations propertyDataObject={propertyDataObject}/>
        </Box>
    )
}