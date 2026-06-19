import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import profilebg from '../assets/imges/profilebg.png'
function Myprofile() {
  let [formData, setFormData] = useState({ firstname: "", lastname: "", email: "" })
  let [userdata, setUserdata] = useState([])
  let [editUserId, setEditUserId] = useState(0)
  let [saveData, setSaveData] = useState({ firstname: "", lastname: "", email: "" })

  let navigation = useNavigate()

  let getDetails = async () => {
    let token = localStorage.getItem("token")

    let response = await fetch("http://localhost:5000/userDetails", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    let result = await response.json()
    setUserdata(result)
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigation("/userlogin")
      return
    }
    getDetails()
  }, [])

  let EditeHandler = (user) => {
    setEditUserId(user.userid)
    setFormData(user)
  }

  let changeHandler = (e) => {
    let { name, value } = e.target
    setFormData((prev) => ({
      ...prev, [name]: value
    }))
  }

  let savaHandler = async () => {
    let response = await fetch("http://localhost:5000/saveData", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    let result = await response.json()
    if (response.status == 200) {
      setEditUserId(0)
      alert(result.message)
    }
    else {
      alert(result.message)
    }
  }
  console.log(formData)
  return (
    <div className='profile-main'>
    <div className='myprofile-page'>
      <div className='profile-card'>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          className='profile-img'
          alt="profile"
        />

        {
          userdata.map((user) => (
            <div className='profile-details'>

              <div className='profile-form'>

                {editUserId === user.userid ? (
                  <>
                    <div className='profile-form'>
                      <input name="firstname" value={formData.firstname} onChange={changeHandler} className='profile-control' />
                    </div>
                    <div className='profile-form'>
                      <input name="lastname" value={formData.lastname} onChange={changeHandler} className='profile-control' />
                    </div>
                    <div className='profile-form'>
                      <input name="email" value={formData.email} onChange={changeHandler} className='profile-control' />
                    </div>
                  </>
                ) : (
                  <>
                  <div className='profile-form'>
                    <input type="text" className='profile-control' value={user.firstname} readOnly />
                    </div>
                    <div className='profile-form'>
                    <input type="text" className='profile-control' value={user.lastname} readOnly />
                    </div>
                    <div className='profile-form'>
                    <input type="text" className='profile-control' value={user.email} readOnly />
                    </div>
                  </>
                )}

                <div className='profile-form'>
                  {editUserId === user.userid ? <><button onClick={savaHandler}><i className="fa-solid fa-check"></i></button> <button><i className="fa-regular fa-circle-xmark"></i></button></> : <button onClick={() => EditeHandler(user)}>
                    <i className="fa-solid fa-marker"></i>Edit Profile
                  </button>}
                </div>

              </div>

            </div>
          ))
        }

      </div>

    </div>
    </div>
  )
}

export default Myprofile