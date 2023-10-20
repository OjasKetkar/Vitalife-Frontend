import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import mainlogo from '../utils/Mainlogo.png'
import { useEffect, useState } from 'react'
import '../styles/header.css'
import menu from "../utils/menu.svg"
import Sidebar from './Sidebar'

function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
  };
  const { user } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  useEffect(() => {
    const handleResize = () => {
        // Check window width and hide the sidebar if it's greater than 376px
        if (window.innerWidth > 376) {
            setShowSidebar(false);
        }
    };

    // Add a resize event listener
    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);


  return (
    <>
      {/* <Sidebar/> */}
    <header className='header'>
      <div className="header-left">
                <img src={mainlogo} alt="main logo" className='mainlogo' />
                <h1 className='mainname'>VitaLife</h1>
      </div>
      
      <ul className='header-right'>
        <img src={menu} alt="menu" className='sidebarMenu' onClick={toggleSidebar}/>
        
        {user ? (

          <>
          <ul className='header-list'>
          <li className="header-options"><Link to='/home'className="header-options">Home</Link></li>
          <li className="header-options"><Link to='/nav/catalogue'  className="header-options">Catalogue</Link></li>
          <li className="header-options"><Link to='/forums'  className="header-options">Forums</Link></li>
          <li className="header-options"><Link to='/seller/signin' className="header-options">Sell</Link></li>
          <li className="header-options"><Link to='/home' className="header-options">Contact</Link></li>
          <li className="header-options"><Link to='/herbsinfo' className="header-options">Herbs</Link></li>
          <li>
            <button className='headerBtn' onClick={onLogout}>
              <FaSignOutAlt /> Logout 
            </button>
          </li>
          </ul>
          </>
          
          ) : (
            <>
          <ul className='header-list'>
          <li className="header-options"><Link to='/home'className="header-options">Home</Link></li>
                <li className="header-options"><Link to='/nav/catalogue'  className="header-options">Catalogue</Link></li>
                <li className="header-options"><Link to='/forums'  className="header-options">Forums</Link></li>
                <li className="header-options"><Link to='/nav/sell'  className="header-options">Sell</Link></li>
                <li className="header-options"><Link to='/home' className="header-options">Contact</Link></li>
            <li className="header-options"><Link to='/herbsinfo' className="header-options">Herbs</Link></li>
            <li>
              <Link to='/login' >
                <FaSignInAlt className='headerbuttons'/> Login
              </Link>
            </li>
            <li>
              <Link to='/register' >
                <FaUser className='headerbuttons'/> Register
              </Link>
            </li>
            </ul>
          </>
        )}
      </ul>


    </header>

            {showSidebar && (
                <Sidebar/>
            )}
    </>
  )
}

export default Header
