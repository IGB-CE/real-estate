import React from 'react'
import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import '../index.css'
import { assets } from '../assets/assets'

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)
  const fileRef = useRef(null)
  return (
    <Container fluid='md'>
      <Row className='w-50 m-auto'>
        <Col className='card'>
          <Row>
            <h1 className='text-center'>Profile</h1>
            <Form >
              <Col md={12}>
              <input type="file" ref={fileRef} hidden accept='image/*'/>
                <Image onClick={()=>fileRef.current.click()} src={currentUser.avatar} width={64} alt='profile' className="d-block mx-auto mb-3"/>
              </Col>
              <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="firstname" name="firstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name='firstName' />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="lastname" name="lastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name='lastName' />
                </Form.Group>
              </Col>
              </Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="email" name="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name='email' />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="password" name="password">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="password" name='password' />
                </Form.Group>
              </Col>
              <Row>
                <Col md={6}>
                  <Button variant="danger" style={{ width: "100%", margin: "10px 0" }}>
                    Delete Account
                  </Button>
                </Col>
                <Col md={6}>
                  <Button variant="danger" style={{ width: "100%", margin: "10px 0" }}>
                    Sign out
                  </Button>
                </Col>
              </Row>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile