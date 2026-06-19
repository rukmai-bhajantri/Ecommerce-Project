import React, { useState } from 'react'
import {useDropzone} from 'react-dropzone'

import '../assets/css/imgstyle.css'
import {MdCancel} from 'react-icons/md'
function Imgdropdown({ getImages}) {
    let[files,setFiles]=useState([])
    
    let onDrop=(acceptedFile)=>{
    if(acceptedFile.length+files.length>5){
        alert("You can upload 5 imgs")
        return
    }
    let fileurl=acceptedFile.map(file=>({file,
        preview:URL.createObjectURL(file)}))

        setFiles((existingimg)=>
            [...existingimg,...fileurl])
    }

     let cancelimgHandler=(index)=>{
    let remianingfiles=files.filter((file,i)=>i!==index)
    setFiles(remianingfiles)
    } 
  if(files.length>0){
  getImages(files)
  }
    console.log("files",files)
  const {getRootProps, getInputProps} = useDropzone({onDrop,
    multiple:true,
    accept:'Image/*'
  })
  return (
    <div className='container'>
     <div {...getRootProps()} className='drag-box'>
      <input {...getInputProps()} />
      {
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
    <div className='addproduct-img'>
        {
            files.map((imgfile,index)=><>
            <div className='addproduct'>
            <img src={imgfile.preview} className='add-img'></img>
            <button className='cancel-btn' onClick={()=>cancelimgHandler(index)}>
            <MdCancel/>
            </button>
            </div>
            </>)
        }
    </div>
    </div>
  )
}

export default Imgdropdown
