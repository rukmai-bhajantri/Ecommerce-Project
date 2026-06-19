import React, { useEffect, useState } from 'react'
import login from '../assets/imges/login.png'
import { useNavigate } from 'react-router-dom'
function Login({updaterole}) {
    let [formdata, setformData] = useState({ Email: "", Password: "" })
    let navegate=useNavigate()

    let submitHandler = async (e) => {
        e.preventDefault()
        let response = await fetch("http://localhost:5000/userLogin", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formdata)
        })
        let result=await response.json()
        if(response.status!=200){
            alert(result.message)
        }
        else{
            console.log("token",result.token)
            localStorage.setItem("token",result.token)
            localStorage.setItem("role",result.role)
            updaterole(result.role)
            let cartItems=JSON.parse(localStorage.getItem("Cartitems"))||[]
            console.log(cartItems)
            if(cartItems.length>0){
                console.log("hello Rukmai")
                let resp=await fetch("http://localhost:5000/CartItemsadd",{
                    method:"POST",
                    headers:{"Authorization": `Bearer ${result.token}`,
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(cartItems)
                })
                let reslt=await resp.json()
                if(resp.status==200){
                    alert(reslt.message)
                    localStorage.removeItem("Cartitems")
                }
            }
            navegate('/profile')
        }
    }

    let txtbxHandler = (e) => {
        let { name, value } = e.target 
        setformData((existing) => ({
            ...existing, [name]: value
        }))
    }
    return (
        <>
            <div className='login-page'>
                <div className='login-row'>
                    <div className='login-layout'>
                        <img src={login} className='login-img'></img>
                    </div>
                    <div className='login-layout'>
                        <h1 className='login-heading'>Login</h1>
                        <p>Welcome back!Please login to your account</p>
                        <div className='login-card'>
                            <form onSubmit={submitHandler}>
                                <div className='login-form'>
                                    <label className='login-label'>Email address</label>
                                    <i class="fa-solid fa-envelope"></i>
                                    <input type="text" onChange={txtbxHandler} placeholder='Email' className='login-control' name='Email' required></input>
                                </div>
                                <div className='login-form'>
                                    <label className='login-label'>password</label>
                                    <i class="fa-solid fa-unlock"></i>
                                    <input type="password" onChange={txtbxHandler} placeholder='Password' className='login-control' name='Password' required></input>
                                </div>
                                <div className='login-form'>
                                    {/* <i class="fa-solid fa-right-long"></i> */}
                                    <button className='login-btn'>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login