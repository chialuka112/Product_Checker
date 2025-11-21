import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from './Component/Landingpage.jsx'
import Regcom from './Component/Regcom.jsx'
import Hero from './Component/Hero.jsx'
import Login from './Component/Login.jsx';
import Prodadd from './Component/Prodadd.jsx';
import Checkprod from './Component/Checkprod.jsx';
import './App.css'

function App() {

  return (
     <Router>
      <div>
    <Landingpage />  
      <Routes>
        <Route path='/' element={<Hero/>} />
        <Route path="register" element={<Regcom />} />
        <Route path='login' element={<Login/>} />
        <Route path='product' element={<Prodadd />} />
      <Route path='check' element={<Checkprod />} />
      </Routes>
  </div>
  </Router>
  )
}

export default App
