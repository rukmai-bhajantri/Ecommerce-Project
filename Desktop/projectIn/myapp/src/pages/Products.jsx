import React from 'react'
import Card from '../components/Card'
import { useEffect } from 'react'
import { useState } from 'react'
import prodvideo from '../assets/video/productvideo.mp4'
function Products() {
let [product,setProduct]=useState([])

    let getData=async()=>{
    let response=await fetch("http://localhost:5000/displayProducts")
    let result=await response.json()
    setProduct(result)
    }

    useEffect(()=>{
    getData()
    },[])
    console.log(product)
  return (
<>
<div className='product-video'>
<video src={prodvideo} className='product-video' controls autoPlay muted loop></video>
</div>
        <div className='container'>
            <div className='row'>
                {
                    product.map(products=><>
                     <Card product={products}/>
                    </>)
                }
            </div>
        </div>
    </>
  )
}

export default Products
