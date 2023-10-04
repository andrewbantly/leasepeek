import * as React from "react"
import './assets/index.css'
import {
  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider, theme } from "@chakra-ui/react"
import NavBar from "./components/partials/navBar"
import { Login } from "./pages/login/login"
import { Home } from "./pages/home/home"
import { SignUp } from "./pages/signup/signup"
import { NotFound } from "./pages/notfound/notfound"
import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { DecodedToken } from "./interfaces/decodedToken"
import { CurrentUserType } from "./interfaces/currentUser"
import axios from 'axios'

export const App = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      const decoded = jwt_decode(token) as DecodedToken;
      setCurrentUser({
        userId: decoded.user_id,
        username: decoded.username
    })
    } else {
      console.log('token not found')
      setCurrentUser(null)
    }
  }, [])

  useEffect(() => {
    console.log('current user', currentUser);
}, [currentUser]);

const handleLogout = () => {
  if (localStorage.getItem('jwt')) {
    localStorage.removeItem('jwt')
    setCurrentUser(null)
  }
}

axios.interceptors.response.use(
  response => response,
  error => {
      if (error.response && error.response.status === 401) {
          handleLogout();
      }
      return Promise.reject(error);
  }
);


  return ( 
    <ChakraProvider theme={theme}>
      <Router>
        <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} handleLogout={handleLogout}></NavBar>
        <Routes>
          <Route
            element={<Home currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
            path='/'
          ></Route>
          <Route
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
            path='/login'
          ></Route>
          <Route
            element={<SignUp currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
            path='/register'
          ></Route>
          <Route
            element={<NotFound/>}
            path="*"
          ></Route>
        </Routes>
      </Router>
    </ChakraProvider>
  )

}