import React from 'react'
import { assets } from '../assets/assets.js'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import axios from 'axios'
import {useNavigate} from 'react-router'

const Navigationbar = () => {
  const nav = useNavigate()
  const { currentUser } = useSelector(state => state.user)
  const handleLogout = (e) => {
    // { withCredentials: true } kalon cookies me ane te kerkese (perdoret per token qe eshte marre nga jwt)
    axios.post('http://localhost:5000/api/auth/logout', null, { withCredentials: true })
      .then(res => {
        // Kalon te komponenti i login
        nav('/sign-in');
      })
      // Nese nuk ndodh logout
      .catch(error => {
        console.error('Error logging out:', error);
      });
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/"><img src={assets.logo} className='w-50' alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-5">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            <Nav.Link href="/testimonials">Testimonials</Nav.Link>
            <Nav.Link href='/profile'>
              {
                currentUser ? (
                  <img
                  src={currentUser.avatar}
                  alt="profile"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />

              ) : <span>Sign in</span>
              }
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigationbar