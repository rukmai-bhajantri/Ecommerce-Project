import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
// import Category from '../pages/Category'
import Reg from '../pages/Reg'
import Admin from '../pages/Admin'
import Navbar from '../components/Navbar'
import Addproduct from '../pages/Addproduct'
import Products from '../pages/Products'
import Login from '../pages/Login'
import Myprofile from '../pages/Myprofile'
import CartItems from '../pages/CartItems'
import Logout from '../components/Logout'


function Approuter() {
const[role,setrole]=useState(localStorage.getItem("role"))
const updaterole=(role)=>{
setrole(role)
if(role){
  localStorage.removeItem("role",role)
}
else{
  localStorage.removeItem("role")
}
}
  return (
    <div>
      <Router>
        <Navbar role={role}/>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="reg" element={<Reg />} />
          <Route path="admin" element={<Admin />} />
          <Route path="add" element={< Addproduct />} />
          <Route path="/" element={<Products />} />
          <Route path="userlogin" element={<Login updaterole={updaterole}/>} />
          <Route path="profile" element={<Myprofile />} />
          <Route path="cart" element={<CartItems/>} />
          <Route path="out" element={<Logout updaterole={updaterole}/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default Approuter