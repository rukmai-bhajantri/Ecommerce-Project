import React,{useState} from 'react'
// import img1 from '../assets/imges/shoping.svg'
// import reg from '../assets/imges/reg.svg'
import City from './City'
import OtpVerify from '../components/OtpVerify'
function Reg() {
    let [formdata,setformData]=useState({Firstname:"",Lastname:"",Email:"",Password:"",cityid:""})
    let [otp,setotp]=useState(true)
 
    let textbxHandler=(e)=>{
let{name,value}=e.target
setformData((existing)=>({
    ...existing,[name]:value
}))
}

let getCityData=(cityid)=>{
  setformData((existing)=>({
    ...existing,cityid:cityid
}))
}
   
let submitHandler=async(e)=>{
e.preventDefault()
let response=await fetch("http://localhost:5000/userData",{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify(formdata)
})
let result=await response.json()
// console.log(formdata)
if(response.status===400){
  alert(result.message)
  return;
}
else{
    setotp(false)
   alert(result.message)
}
}
  return (
    <>
    {
      otp==true?
      <>
       <section>
    <div className='container'>
         <div className='half-layout'>
          <div className='reg-card'>
          <i class="fa-solid fa-book-open-reader"></i>
          <h4 className='reg-heading'>Register Form</h4>
              <form onSubmit={submitHandler}>
          <div className='text-form'>
            <input type='text' placeholder='Firstname' onChange={textbxHandler} className='control-form' name="Firstname" required></input>
          </div>
            <div className='text-form'>
            <input type='text' placeholder='Lastname' onChange={textbxHandler} className='control-form' name="Lastname" required></input>
          </div>
           <div className='text-form'>
            <input type='text' placeholder='Email' onChange={textbxHandler} className='control-form' name="Email" required></input>
          </div>
           <div className='text-form'>
            <input type='password' placeholder='Password' onChange={textbxHandler} className='control-form' name="Password" required></input>
          </div>
            <div className='text-form'>
           <City getCityData={getCityData}/>
          </div>
            <div className='text-form'>
            <input type='submit' className='reg-btn'></input>
          </div>
        </form>
        </div>
            </div> 
        </div>
 </section>
      </>:
      <OtpVerify useremail={formdata.Email}/>
    }
    </>
  )
  
}

export default Reg