import { UserProps } from '../../interfaces/currentUser';
import { UploadFileButon } from './uploadFileButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PropertyCards } from '../property-cards/propertyCards';
import { Box, Heading, Flex, Spacer, VStack } from '@chakra-ui/react';

interface ResponseObject {
    data?: Property[];
    message?: string;
}
type ISODateString = string;

interface Property {
    location: string;
    date: ISODateString;
    asOf: string;
    objectId: string;
    totalUnits: number;
    vacants: number;
    floorplans: FloorPlans;
}

type FloorPlanName = string;

interface FloorPlanDetails {
    avg: number;
    count: number;
}

type FloorPlans = Record<FloorPlanName, FloorPlanDetails>;

export function Profile({ currentUser, setCurrentUser }: UserProps) {
    const [responseObject, setResponseObject] = useState<ResponseObject>({});

    useEffect(() => {
        dataRequest();
    }, []);

    const dataRequest = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/data/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setResponseObject(response.data);
        } catch (error) {
            console.error("Error loading data", error);
        }
    };

    const renderProperties = () => {
        return (
            <VStack spacing={4} align="stretch">
                {responseObject.data
                    ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((property, index) => (
                        <PropertyCards key={index} property={property} />
                    ))}
            </VStack>
        );
    };
    

    return (
        <Box py={6} px={4}>
            <Flex alignItems="center" justifyContent="space-between" marginBottom="4">
                <Heading as="h2" size="lg">Welcome, {currentUser?.username}</Heading>
                <UploadFileButon dataRequest={dataRequest} />
            </Flex>
            {renderProperties()}
        </Box>
    );
}
