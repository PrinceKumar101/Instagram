import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../src/components/Home'
import Login from '../src/components/Login'

const Routing = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login"  element={<Login/>} />
      </Routes>
    </>
  )
}

export default Routing