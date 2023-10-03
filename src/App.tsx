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
import axios from "axios"


export const App = () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      console.log('token found')
      setCurrentUser(jwt_decode(token))
    } else {
      console.log('token not found')
      setCurrentUser(null)
    }
  }, [])
  
  return ( 
    <ChakraProvider theme={theme}>
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route
            element={<Home/>}
            path='/'
          ></Route>
          <Route
            element={<Login/>}
            path='/login'
          ></Route>
          <Route
            element={<SignUp/>}
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