import {
    Button,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    FormHelperText,
    FormErrorMessage,
} from '@chakra-ui/react'
import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { DecodedToken } from '../../interfaces/decodedToken'
import { UserProps } from '../../interfaces/currentUser'
import { useNavigate, Link } from 'react-router-dom'


export function SignUp({ currentUser, setCurrentUser }: UserProps) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()


    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);
    

    const validatePasswords = useCallback(() => {
        if (password !== confirmedPassword) {
            setError('Passwords do not match');
            return false;
        }
        setError('');
        return true;
    }, [password, confirmedPassword]);
    
    useEffect(() => {
        validatePasswords();
    }, [confirmedPassword, validatePasswords]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validatePasswords()) {
            return;
        }
        try {
            const request = {
                username,
                email,
                password
            };
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/register`, request)
            const { access } = response.data;
            localStorage.setItem('jwt', access);
            const decoded = jwt_decode(access) as DecodedToken;
            console.log("signup decoded", decoded)
            setCurrentUser({
                userId: decoded.user_id,
                username: decoded.username
            })
            navigate('/')
        } catch (error) {
            console.error("Error registering user", error)
        }
    }

    const signUp = (<Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={4} w={'full'} maxW={'md'}>
                <Heading fontSize={'2xl'}>Create an account</Heading>
                <FormControl id="username">
                    <FormLabel>Username</FormLabel>
                    <Input type='text' value={username} onChange={handleUsernameChange} />
                </FormControl>
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' value={email} onChange={handleEmailChange} />
                    <FormHelperText>
                        We will never share your email.
                    </FormHelperText>
                </FormControl>
                <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input type='password' value={password} onChange={handlePasswordChange} />
                </FormControl>
                <FormControl id="confirmPassword" isInvalid={!!error}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type='password' value={confirmedPassword} onChange={handleConfirmPasswordChange} />
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
                <Stack spacing={6}>
                    <Button type='submit' colorScheme={'blue'} variant={'solid'}>
                        Register
                    </Button>
                    <Text color={'alphawhite.500'}>
                        Have an account?{' '}
                        <Link to="/login">
                            <Text as="span" color={'teal.500'} display="inline">
                                Login here.
                            </Text>
                        </Link>
                    </Text>
                </Stack>
            </Stack>
        </Flex>
    </Stack>
    )

    return (
        <form onSubmit={handleSubmit}>
            {signUp}
        </form>
    )
}