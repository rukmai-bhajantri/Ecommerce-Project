import React, { useState } from 'react'
// import otp from '../assets/imges/otp.webp'
import lock1 from '../assets/imges/lock1.png'
import { Form } from 'react-router-dom'
function OtpVerify({useremail}) {
let [txtbxHandler,seTexbxHandler]=useState("")

let submitHandler=async(e)=>{
  e.preventDefault()
  let response=await fetch("http://localhost:5000/OtpVerify",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({otp:txtbxHandler,useremail:useremail})
  })
  let result=await response.json()
  if(response.status==400){
    alert(result.message)
  }
  else{
    alert(result.message)
  }
}
  return (
    <>
    <div className='otp-main'>
     <div className='otp-page'>
      <div className='otp-card'>
        <img src={lock1} className='otp-img'></img>
                <h1 className='otp-heading'>OTP Verification</h1>
                <p>Enter Your OTP 6 digits</p>
               <form onSubmit={submitHandler}>
                <div>
                <input type="text" placeholder='Enter Otp' className='otp-form' onChange={(e)=>seTexbxHandler(e.target.value)}></input>
                </div>
                 <div>
                <input type="submit" className='otp-btn'></input>
                </div>
               </form>
     </div>
     </div>
     </div>
    </>
  )
}

export default OtpVerify
