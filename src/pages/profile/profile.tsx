import { UserProps } from '../../interfaces/currentUser';
import { UploadFileButon } from './uploadFileButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PropertyCards } from '../property-cards/propertyCards';
import { Box, Heading, Flex, Icon, VStack, Input, Text } from '@chakra-ui/react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { ResponseObject } from '../../interfaces/profileProps'

export function Profile({ currentUser, setCurrentUser }: UserProps) {
    const [responseObject, setResponseObject] = useState<ResponseObject>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [isSortedAsc, setIsSortedAsc] = useState(false);

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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const toggleSortOrder = () => {
        setIsSortedAsc(prev => !prev);
    }

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

    let propertiesToRender = responseObject.data || [];
    if (searchTerm) {
        propertiesToRender = propertiesToRender.filter(property =>
            property.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    } else {
        propertiesToRender.sort((a, b) => {
            if (isSortedAsc) {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            } else {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
        });
    }
    

    return (
        <>
            <VStack spacing={4} width="full">
                <Flex flexDirection={{ base: "column", md: "row" }} alignItems="flex-start" justifyContent="space-between" width="full" py={2}>
                    
                    <VStack spacing={2} alignItems="flex-start" ml={4} mt={2}>
                        <Heading as="h2" size="lg">Welcome, {currentUser?.username}</Heading>
                        <Flex align="center" width="100%">
                            <Input
                                flex="1"
                                placeholder="Search by building"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <Flex align="center" ml={4}>
                                <Text>Sort by Date:</Text>
                                <Icon
                                    as={isSortedAsc ? FaArrowUp : FaArrowDown}
                                    onClick={toggleSortOrder}
                                    cursor="pointer"
                                    ml={2}
                                    w={6}
                                    h={6}
                                />
                            </Flex>
                        </Flex>
                    </VStack>
        
                    <Box mt={4} mr={7}>
                        <UploadFileButon dataRequest={dataRequest} />
                    </Box>
                    
                </Flex>
        
                <VStack spacing={0} align="stretch">
                    {propertiesToRender.map((property, index) => (
                        <PropertyCards key={index} property={property} />
                    ))}
                </VStack>
            </VStack>
        </>
    );   
}