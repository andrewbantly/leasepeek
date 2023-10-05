import { UserProps } from '../../interfaces/currentUser';
import { UploadFileButon } from './uploadFileButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PropertyCards } from '../property-cards/propertyCards';
import { Box, Heading, Flex, Spacer, VStack, Input } from '@chakra-ui/react';

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
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }
    
    let propertiesToRender = responseObject.data || [];
    if (searchTerm) {
        propertiesToRender = propertiesToRender.filter(property => 
            property.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    } else {
        propertiesToRender.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return (
        <>
        <Box py={6} px={4}>
            <Flex alignItems="center" justifyContent="space-between" marginBottom="4">
                <Heading as="h2" size="lg">Welcome, {currentUser?.username}</Heading>
                <UploadFileButon dataRequest={dataRequest} />
            </Flex>
        </Box>
        <VStack spacing={4}>
            <Input 
                placeholder="Search by building"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <VStack spacing={4} align="stretch">
                {propertiesToRender.map((property, index) => (
                    <PropertyCards key={index} property={property} />
                ))}
            </VStack>
        </VStack>
        </>
    );
}