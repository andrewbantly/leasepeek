import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { DecodedToken } from '../../interfaces/decodedToken'


export function SignUp() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState(''); 

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("register request sent")
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
        } catch (error) {
            console.error("Error registering user", error)
        }
    }

    return(
        <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type='text' value={username} onChange={handleUsernameChange} />
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
            loadingText='Signing you up'
            colorScheme='teal'
            type='submit'
          >
            Register
          </Button>
    </form>
    )
}