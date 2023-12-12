import {
    Button,
    Checkbox,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    FormHelperText,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { DecodedToken } from '../../interfaces/decodedToken'
import { UserProps } from '../../interfaces/currentUser'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export function Login({ currentUser, setCurrentUser }: UserProps) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const request = {
                email,
                password
            };
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/login`, request);
            const { access } = response.data;
            localStorage.setItem('jwt', access);
            const decoded = jwt_decode(access) as DecodedToken;
            setCurrentUser({
                userId: decoded.user_id,
                username: decoded.username
            })
            navigate('/')
        } catch (error) {
            console.error("Error decoding the token", error);
            setMessage('Incorrect username or password.')
            setEmail('')
            setPassword('')
        }
    }

    const login = (<Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={4} w={'full'} maxW={'md'}>
                <Heading fontSize={'2xl'}>Sign in to your account</Heading>
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
                <Stack spacing={6}>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}>
                        <Checkbox>Remember me</Checkbox>
                        <Text color={'blue.500'}>Forgot password?</Text>
                    </Stack>
                    <Button type='submit' colorScheme={'blue'} variant={'solid'}>
                        Sign in
                    </Button>
                    <Text color={'alphawhite.500'}>
                        New to LeasePeek?{' '}
                        <Link to="/register">
                            <Text as="span" color={'teal.500'} display="inline">
                                Register here.
                            </Text>
                        </Link>
                    </Text>
                    <Text color={'red.500'} opacity={message ? 1 : 0} transition="opacity 0.3s">{message || "Placeholder"}</Text>
                </Stack>
            </Stack>
        </Flex>
    </Stack>
    )

    return (
        <>
            <form onSubmit={handleSubmit}>
                {login}
            </form>
        </>
    )
}