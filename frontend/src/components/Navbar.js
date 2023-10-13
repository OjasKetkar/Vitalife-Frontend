import mainlogo from '../utils/Mainlogo.png'
import '../styles/navbar.css'
import menu from '../utils/menu.svg'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function NavBar({
    homesectionref,
    testimonialsectionref,
    contactsectionref
}) {
    const [showSidebar, setShowSidebar] = useState(false);


    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

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
        <div className="navbar">
            {/* project image to the left */}
            <div className="nav-left">
                <img src={mainlogo} alt="main logo" className='mainlogo' />
                <h1 className='mainname'>VitaLife</h1>
            </div>

            {/* options to the right */}
            <ul className="nav-right">
                <li className="nav-options"><Link to='/home'className="nav-options">Home</Link></li>
                <li className="nav-options"><Link to='/nav/catalogue' target="_blank" className="nav-options">Catalogue</Link></li>
                <li className="nav-options"><Link to='/forums' target="_blank" className="nav-options">Forums</Link></li>
                <li className="nav-options"><Link to='/nav/sell' target="_blank" className="nav-options">Sell</Link></li>
                <li className="nav-options"><Link to='/home' className="nav-options">Contact Us</Link></li>
                
            </ul>



            <img src={menu} alt="menu" className="menu" onClick={toggleSidebar} />

            {showSidebar && (
                <Sidebar
                    homeSectionRef={homesectionref}
                    testimonialSectionRef={testimonialsectionref}
                    contactSectionRef={contactsectionref}
                />
            )}

        </div>
    )
}