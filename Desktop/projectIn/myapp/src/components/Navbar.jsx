import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/imges/logo.png'

function Navbar({ role }) {

    console.log(role)

    return (
        <div className='nav-container'>
            <div className='navbar'>

                <Link to='/' className='nav-logo'>
                    GlowCart
                </Link>

                <ul className='nav-menu'>

                    {
                        !role ? (
                            <>
                                <li className='nav-items'>
                                    <Link to='home' className='nav-label'>Home</Link>
                                </li>

                                <li className='nav-items'>
                                    <Link to='reg' className='nav-label'>Reg</Link>
                                </li>

                                <li className='nav-items'>
                                    <Link to='userlogin' className='nav-label'>Login</Link>
                                </li>

                                  <li className='nav-items'>
                                    <Link to='admin' className='nav-label'>Admin</Link>
                                </li>
                            </>
                        ) : role === "user" ? (
                            <>

                             <li className='nav-items'>
                                    <Link to='profile' className='nav-label'>MyProfile</Link>
                                </li>
                                
                                <li className='nav-items'>
                                    <Link to='/' className='nav-label'>Products</Link>
                                </li>

                                <li className='nav-items'>
                                    <Link to='cart' className='nav-label'>CartItems</Link>
                                </li>
                                 <li className='nav-items'>
                                    <Link to='out' className='nav-label'>Logout</Link>
                                </li>
                            </>
                        ) : (
                            <>

                                <li className='nav-items'>
                                    <Link to='add' className='nav-label'>AddProduct</Link>
                                </li>
                            </>
                        )
                    }

                </ul>

            </div>
        </div>
    )
}

export default Navbar