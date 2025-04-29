import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import '../index.css'
import { assets } from '../assets/assets'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice'

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const avatarSrc = file
    ? URL.createObjectURL(file)
    : currentUser.avatar
      ? `http://localhost:5000/images/${currentUser.avatar}`
      : assets.defaultAvatar;
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFormData(prev => ({ ...prev, avatar: selectedFile })); // assuming backend expects 'avatar'
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(formData);

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
        credentials: 'include',
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
  useEffect(() => {
    if (error) dispatch(updateUserFailure(null));
  }, [formData]);
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`http://localhost:5000/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
        credentials: 'include'
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  return (
    <Container fluid='md'>
      <Row className='w-50 m-auto'>
        <Col className='card'>
          <Row className='m-3'>
            <h1 className='text-center'>Profile</h1>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Col md={12}>
                <input type="file" ref={fileRef} hidden accept='image/*' onChange={handleImageChange} />
                <Image
                  onClick={() => fileRef.current.click()}
                  src={avatarSrc}
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
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name='password' onChange={handleChange} placeholder="Enter new password" />
                </Form.Group>
              </Col>
              <Row>
                <Col md={12}>
                  <Button
                    disabled={loading}
                    type='submit'
                    variant="success"
                    style={{ width: "100%", margin: "10px 0" }}>
                    {loading ? 'Loading...' : 'Update Account'}
                  </Button>
                </Col>
                <Col md={6}>
                  <Button onClick={handleDeleteUser} variant="danger" style={{ width: "100%", margin: "10px 0" }}>
                    Delete Account
                  </Button>
                </Col>
                <Col md={6}>
                  <Button variant="secondary" style={{ width: "100%", margin: "10px 0" }}>
                    Sign Out
                  </Button>
                </Col>
              </Row>
            </Form>
            <p className='text-danger'>{error ? error : ''}</p>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile