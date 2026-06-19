import React, { useState } from 'react'
import { useEffect } from 'react'

function City({getCityData}) {
  let [city,setCity]=useState([])
  let [search,setSearch]=useState("")
  let [cityfiltered,setcityFiltered]=useState([])

    let getdata=async()=>{
        let response=await fetch("http://localhost:5000/cityData")
        let result=await response.json()
        setCity(result)
    }

    useEffect(()=>{
        getdata()
    },[])
    
    let cityfilter=(e)=>{
      let val=e.target.value
      setSearch(val)
      setcityFiltered(val?city.filter(cityes=>cityes.cityname.toLowerCase().startsWith(val.toLowerCase())):[])
    }
    console.log(cityfiltered)

    let citySelectHandler=(cityData)=>{
    setSearch(cityData.cityname)
    getCityData(cityData.cityid)
    setcityFiltered([])
    }
  return (
    <div>
      <input type='text' onChange={cityfilter} value={search}placeholder="Search city..." className='control-form'name=""></input>
      <div>
       {
      cityfiltered.map(cityData=><>
        <ul className='u-style'>
          <li onClick={()=>citySelectHandler(cityData)}className='l-style'>{cityData.cityname}</li>
        </ul>
        </>)
       }
      </div>
    </div>
  )
}

export default City