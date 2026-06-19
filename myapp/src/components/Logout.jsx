import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Logout({updaterole }) {
let navegate=useNavigate()
  useEffect(()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("role")
         updaterole(null)
        navegate('/')
    },[navegate,updaterole])
  return (
  <div></div>
  )
}

export default Logout