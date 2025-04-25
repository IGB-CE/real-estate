import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import '../index.css'
import { assets } from '../assets/assets'
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice'

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)
  console.log(currentUser);
  
  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFormData(prev => ({ ...prev, avatar: selectedFile })); // assuming backend expects 'avatar'
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      const res = await fetch(`http://localhost:5000/api/user/update/${currentUser._id}`, {
        method: 'POST',
        body: formPayload,
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  return (
    <Container fluid='md'>
      <Row className='w-50 m-auto'>
        <Col className='card'>
          <Row>
            <h1 className='text-center'>Profile</h1>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Col md={12}>
                <input type="file" ref={fileRef} hidden accept='image/*' onChange={handleImageChange} />
                <Image
                  onClick={() => fileRef.current.click()}
                  src={file ? URL.createObjectURL(file) : currentUser.avatar}
                  width={64}
                  alt='profile'
                  className="d-block mx-auto mb-3"
                  roundedCircle
                />
              </Col>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name='username' defaultValue={currentUser.username} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="email" >
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name='email' defaultValue={currentUser.email} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="password" >
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="password" name='password' onChange={handleChange} />
                </Form.Group>
              </Col>
              <Row>
                <Col md={6}>
                  <Button variant="danger" style={{ width: "100%", margin: "10px 0" }}>
                    Delete Account
                  </Button>
                </Col>
                <Col md={6}>
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