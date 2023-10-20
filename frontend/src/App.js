import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Hero from './pages/Hero'
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
            <Route path='/forums' element={<Dashboard type="forums"/>} />
            <Route path='/home' element={<Hero />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* <Route path='/forums' element={<Forums />} /> */}
            <Route path='/herbsinfo' element={<ProInfo />} />
            {/* <Route path='/catalogue/register' element={<BuyerRegister />} /> */}
            <Route path='/catalogue/register' element={<Dashboard type = "catalogueRegister" />} />
            {/* <Route path='/catalogue/signin' element={<BuyerSignin />} /> */}
            <Route path='/catalogue/signin' element={<Dashboard type = "catalogueSignin" />} />
            <Route path='/seller/register' element={<Dashboard type="registerSeller" />} />
            <Route path='/seller/signin' element={<Dashboard type="signinSeller"/>} />

          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
