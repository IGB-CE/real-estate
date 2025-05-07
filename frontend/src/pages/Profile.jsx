import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import '../index.css'
import { assets } from '../assets/assets'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice'
import { Link } from 'react-router'

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const [formData, setFormData] = useState({})
  const [showListingError, setShowListingError] = useState(false)
  const [userListings, setUserListings] = useState([])
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
      const res = await fetch(`http://localhost:5000/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
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
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('http://localhost:5000/api/auth/signout', {
        method: 'GET', // Ensure this is the correct method
        credentials: 'include', // This is required for sending cookies
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message))
        return
      }
      dispatch(signOutUserSuccess(data))
    } catch (error) {
      dispatch(signOutUserFailure(data.message))
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingError(false)
      console.log(currentUser._id);

      const res = await fetch(`http://localhost:5000/api/user/listings/${currentUser._id}`,
        {
          method: 'GET', // Ensure this is the correct method
          credentials: 'include', // This is required for sending cookies
        }
      )
      const data = await res.json()
      if (data.success === false) {
        setShowListingError(true)
        return
      }
      setUserListings(data)
    } catch (error) {
      setShowListingError(true)
    }
  }

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/listing/delete/${listingId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const data = res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))
    } catch (error) {
      console.log(error.message);

    }
  }
  return (
    <Container fluid='md'>
      <Row className='w-50 m-auto'>
        <Col md={12} className='card'>
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
                    <Form.Label>Username</Form.Label>
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
                <Col md={12}>
                  <Link to={"/create-listing"} >
                    <Button variant='secondary' className='w-100'>
                      Create Listing
                    </Button>
                  </Link>
                </Col>
                <Col md={6}>
                  <Button onClick={handleDeleteUser} variant="danger" style={{ width: "100%", margin: "10px 0" }}>
                    Delete Account
                  </Button>
                </Col>
                <Col md={6}>
                  <Button onClick={handleSignOut} variant="danger" style={{ width: "100%", margin: "10px 0" }}>
                    Sign Out
                  </Button>
                </Col>
              </Row>
            </Form>
            <p className='text-danger'>{error ? error : ''}</p>
          </Row>
          <Row>
          </Row>
        </Col>
        <Col md={12} className='mt-4 text-center'>
          <Button onClick={handleShowListings} variant='outline-success'>
            Show Listings
          </Button>
          <p className='text-danger'>
            {showListingError && 'Error showing listings'}
          </p>
          {userListings && userListings.length > 0 &&
            userListings.map((listing) => (
              <Row key={listing._id} className="align-items-center my-4 border p-3 rounded shadow-sm">
                <Col md={4} className="text-start">
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={`http://localhost:5000/${listing.images[0]}`}
                      alt="listing cover"
                      className="img-fluid rounded"
                      style={{ maxHeight: '150px', objectFit: 'cover' }}
                    />
                  </Link>
                </Col>
                <Col md={4}>
                  <Link to={`/listing/${listing._id}`} className="text-decoration-none text-dark">
                    <h5>{listing.name}</h5>
                    <p className="mb-1"><strong>Type:</strong> {listing.type}</p>
                    <p className="mb-1"><strong>Price:</strong> ${listing.regularPrice}</p>
                  </Link>
                </Col>
                <Col md={4} className="d-flex flex-column align-items-end">
                  <Link className='mb-2 w-75' to={`/update-listing/${listing._id}`}>
                    <Button variant='success' >Edit</Button>
                  </Link>
                  <Button onClick={() => handleListingDelete(listing._id)} variant='danger' className='w-75'>Delete</Button>
                </Col>
              </Row>
            ))
          }
        </Col>

      </Row>
    </Container>
  )
}

export default Profile