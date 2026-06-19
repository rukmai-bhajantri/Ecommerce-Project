import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
// import adminimg from '../assets/imges/shoping.svg'
function Admin() {
   let navigation = useNavigate()
     let [adminform,setAdminform]=useState({email:"",Password:""})

    let textbxHandler=(e)=>{
    let{name,value}=e.target
    setAdminform((existing)=>({
        ...existing,[name]:value
    }))
    }
       
    let submitHandler=async(e)=>{
    e.preventDefault()
    
    let token = localStorage.getItem("token")
    let response=await fetch("http://localhost:5000/adminiLogin",{
      method:"POST",
      headers:{
      "Content-Type":"application/json"
      },
      body:JSON.stringify(adminform)
    })
    let result=await response.json()
    if(response.status!==200)
    {
      alert(result.message)
    }
    else{
       console.log("token",result.token)
       localStorage.setItem("token",result.token)
       localStorage.setItem("token",result.role)
       navigation("/add");
      return
    }
    }
    
  return (
    <>
        <section className='adminsection'>
         <div className='admin-page'>
        <i className="fa-solid fa-user-tie"></i>
            <h4 className='admin-heading'>Admin Sign in</h4>
             <form onSubmit={submitHandler}>
          <div className='text-form'>
            <input type='email' placeholder='👤email' onChange={textbxHandler} className='Admin-form' name="email" required></input>
          </div>
           <div className='text-form'>
            <input type='password' placeholder='🔐 Password' onChange={textbxHandler} className='Admin-form' name="Password" required></input>
          </div>
            <div className='text-form'>
            <input type='submit' className='admin-btn'></input>
          </div>
        </form>
         </div>
        </section>
    </>
  )
}

export default Admin