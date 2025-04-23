import React from 'react'
import { Routes, Route } from 'react-router';
import Navigationbar from './components/Navigationbar'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import About from './pages/About';
import Contact from './pages/Contact';
import { ToastContainer } from 'react-toastify';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navigationbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App