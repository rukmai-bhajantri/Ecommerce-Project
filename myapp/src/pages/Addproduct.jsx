import React, { useState, useEffect } from 'react'
import Imgdropdown from '../components/Imgdropdown'

function Addproduct() {
  let [fromdata, setFromData] = useState({ ProductName: "", Price: "", Description: "", catid: "" })
  let [category, setCategory] = useState([])
  let [pimg, setPimg] = useState([])

  let getData = async () => {
    let response = await fetch("http://localhost:5000/category")
    let result = await response.json()
    setCategory(result)
  }

  useEffect(() => {
    getData()
  }, [])

   let texbxhandler=(e)=>{
    let{name,value}=e.target
    setFromData((existing)=>({
        ...existing,[name]:value
    }))
      }
    let getImages=(img)=>{
      setPimg(img)
    }
         let submitHandler = async () => {
      const fromHandler = new FormData()
      fromHandler.append("ProductName", fromdata.ProductName)
      fromHandler.append("Price", fromdata.Price)
      fromHandler.append("Description",fromdata.Description)
      fromHandler.append("catid",fromdata.catid)
      pimg.map(pimg => fromHandler.append("images", pimg.file))

      let response = await fetch("http://localhost:5000/addproduct", {
        method: "POST",
        body: fromHandler
      })
      let result = await response.json()
      if (response.status == 200) {
        alert(result.message)
    }
  }
  console.log(fromdata)
  return (
    <>
      <div className='addproduct-main'>

        <div className='addproduct-category'>

          <div className='ctegory-text'>
            <select name="catid" onChange={texbxhandler} className='product-cate'>
              {
                category.map((categorys, index) => (
                  <option value={categorys.catid}>{categorys.catename}</option>
                ))
              }

            </select>
          </div>

          <div className='ctegory-text'>
            <input type='text' onChange={texbxhandler} placeholder='ProductName' className='product-cate' name='ProductName' />
          </div>

          <div className='ctegory-text'>
            <input type='text' onChange={texbxhandler} placeholder='Price' className='product-cate' name="Price" />
          </div>

          <div className='ctegory-text'>
            <input type='text' onChange={texbxhandler} placeholder='Description' className='product-cate' name="Description" />
          </div>
          <div className='ctegory-text'>
            <Imgdropdown getImages={getImages} />
          </div>
          <div className='ctegory-text'>
            <input type='Submit' className='product-btn' onClick={submitHandler}></input>
          </div>
        </div>

      </div>
    </>
  )
}

export default Addproduct