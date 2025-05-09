import React from 'react'
import { assets } from '../assets/assets.js'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux'

const Navigationbar = () => {
  const { currentUser } = useSelector(state => state.user)
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
            <Nav.Link href="/search">Projects</Nav.Link>
            <Nav.Link href='/profile'>
              {
                currentUser ? (
                  <img
                    src={currentUser.avatar
                      ? `http://localhost:5000/images/${currentUser.avatar}`
                      : assets.defaultAvatar}
                    alt="avatar"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : <span>Sign in</span>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigationbar