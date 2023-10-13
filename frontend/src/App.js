import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Hero from './pages/Hero'
import Forums from './pages/Forums'
import ProInfo from './pages/ProInfo'
import { useEffect, useState } from 'react'

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
        // Check window width and hide the sidebar if it's greater than 376px
        if (window.innerWidth < 376) {
            setShowSidebar(true);
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
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Hero />} />
            <Route path='/nav/catalogue' element={<Dashboard type="catalogue"/>} />
            <Route path='/nav/sell' element={<Dashboard type="sell"/>} />
            <Route path='/home' element={<Hero />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forums' element={<Forums />} />
            <Route path='/herbsinfo' element={<ProInfo />} />

          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
