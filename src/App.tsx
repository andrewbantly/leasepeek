import * as React from "react"

import {
  BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import NavBar from "./components/partials/navBar"
import { Login } from "./pages/login/login"
import { Home } from "./pages/home/home"
import { SignUp } from "./pages/signup/signup"
import { NotFound } from "./pages/notfound/notfound"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route
          Component={Home}
          path='/'
        ></Route>
        <Route
          Component={Login}
          path='/login'
        ></Route>
        <Route
          Component={SignUp}
          path='/register'
        ></Route>     
        <Route
          Component={NotFound}
          path="*"
        ></Route>   
      </Routes>
    </Router>
  </ChakraProvider>
)
