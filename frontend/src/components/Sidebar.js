import '../styles/sidebar.css';
import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import mainlogo from '../utils/Mainlogo.png';

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="sidebar">
      <div className="sidebarContainer">

      <Link to="/home" className="sidebar-options">
        Home
      </Link>
      <Link to="/nav/catalogue" className="sidebar-options">
        Catalogue
      </Link>
      <Link to="/forums" className="sidebar-options">
        Forums
      </Link>
      <Link to="/nav/sell" className="sidebar-options">
        Sell
      </Link>
      <Link to="/home" className="sidebar-options">
        Contact
      </Link>

      {user ? (
        <button className="sidebarBtn" onClick={onLogout}>
          <FaSignOutAlt /> Logout
        </button>
      ) : (
        <>
          <Link to="/login">
            <FaSignInAlt className="sidebarButtons" /> Login
          </Link>
          <Link to="/register">
            <FaUser className="sidebarButtons" /> Register
          </Link>
        </>
      )}
      </div>
    </header>
  );
}
