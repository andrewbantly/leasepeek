import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { User } from '../../data/tempUser'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { DecodedToken } from '../../interfaces/decodedToken'
import { UserProps } from '../../interfaces/currentUser'

export function Login({currentUser, setCurrentUser}: UserProps) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("request sent")
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
        } catch (error) {
            console.error("Error decoding the token", error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type='email' value={email} onChange={handleEmailChange} />
                <FormHelperText>
                    We will never share your email.
                </FormHelperText>
                <FormLabel>Password</FormLabel>
                <Input type='password' value={password} onChange={handlePasswordChange}/>
            </FormControl>
            <Button
                mt={4}
                loadingText='Logging you in'
                colorScheme='teal'
                type='submit'
            >
                Submit
            </Button>
        </form>
    )
}