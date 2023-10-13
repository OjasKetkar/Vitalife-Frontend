import '../styles/sidebar.css'
import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import mainlogo from '../utils/Mainlogo.png'
import { useEffect, useState } from 'react'

export default function Sidebar(){
    const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

    return(
        <header className='header'>
      <div className="nav-left">
                <img src={mainlogo} alt="main logo" className='mainlogo' />
                <h1 className='mainname'>VitaLife</h1>
            </div>
      
      <ul>
        {user ? (

          <>
          <ul className='header-list'>
          <li className="header-options"><Link to='/home'className="nav-options">Home</Link></li>
          <li className="header-options"><Link to='/nav/catalogue'  className="nav-options">Catalogue</Link></li>
          <li className="header-options"><Link to='/forums'  className="nav-options">Forums</Link></li>
          <li className="header-options"><Link to='/nav/sell' className="nav-options">Sell</Link></li>
          <li className="header-options"><Link to='/home' className="nav-options">Contact Us</Link></li>
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
          </ul>
          </>
          
        ) : (
          <>
          <ul className='header-list'>
          <li className="nav-options"><Link to='/home'className="nav-options">Home</Link></li>
                <li className="nav-options"><Link to='/nav/catalogue'  className="nav-options">Catalogue</Link></li>
                <li className="nav-options"><Link to='/forums'  className="nav-options">Forums</Link></li>
                <li className="nav-options"><Link to='/nav/sell'  className="nav-options">Sell</Link></li>
                <li className="nav-options"><Link to='/home' className="nav-options">Contact</Link></li>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
            </ul>
          </>
        )}
      </ul>
    </header>
    )
}