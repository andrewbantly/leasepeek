import { Box, Flex, Heading, Spacer, Button, useColorModeValue } from '@chakra-ui/react';
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ColorModeSwitcher } from "../ui/ColorModeSwitcher";
import { NavBarProps } from "../../interfaces/navBarProps";
import { useNavigate } from 'react-router-dom';

export default function NavBar({ currentUser, setCurrentUser, handleLogout }: NavBarProps) {
    const bg = useColorModeValue("gray.200", "gray.700");
    const color = useColorModeValue("gray.800", "white");
    const hoverColor = useColorModeValue("blue.800", "blue.400");
    const navigate = useNavigate()

    const loginLogoutLink = currentUser 
      ? <Button as={Link} to="/" onClick={handleLogout} variant="link" _hover={{ color: hoverColor, textDecoration: "none" }}>Logout</Button>
      : <Button as={Link} to="/login" variant="link" _hover={{ color: hoverColor, textDecoration: "none" }}>Login</Button>;

    return (
        <Box bg={bg} color={color} px={4} py={2} boxShadow="md">
            <Flex>
                <Heading size="lg" cursor="pointer" onClick={() => navigate('/')}>LeasePeek</Heading>
                <Spacer />
                <Flex align="center">
                    <ChakraLink as={Link} to='/' mr={4} fontWeight="medium" _hover={{ color: hoverColor, textDecoration: "none" }}>Home</ChakraLink>
                    {loginLogoutLink}
                    <ColorModeSwitcher ml={4} />
                </Flex>
            </Flex>
        </Box>
    )
}
