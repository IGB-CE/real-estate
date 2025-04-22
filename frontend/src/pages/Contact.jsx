import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { assets } from '../assets/assets'
import { Form, Button } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from 'react-toastify';
import axios from 'axios'

const Contact = () => {
  const [result, setResult] = React.useState("");
  const [addContact, setAddContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    comment: "",
  });

  const handleChange = (e) => {
    setAddContact({ ...addContact, [e.target.name]: e.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    console.log(formData);


    formData.append("access_key", "0f606158-4e4a-4a2a-af82-8c8fbdd07cf2");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("");
      toast.success("Form Submitted Successfully")
      event.target.reset();
    } else {
      console.log("Error", data);
      toast.error(data.message)
      setResult("");
    }

    await axios
      .post("http://localhost:5000/addContact", addContact)
      .then((res) => {
        console.log("Contact added")
      })
      .catch((err) => console.log("Contact not saved", err))
  };

  const card = {
    backgroundColor: "#F9F5EE",
    boxShadow: "10px 10px 10px #ffcc99",
    padding: "30px",
    margin: "50px"
  }
  const innerCard = {
    backgroundColor: "#FFFFFF",
    padding: "30px",
    margin: "20px"
  }
  return (
    <Container>
      <Row>
        <Col style={card}>
          <Row><h1>Get in touch</h1></Row>
          <Row style={innerCard}>
            <Col md={4}>
              <img src={assets.location_icon} alt="" />
            </Col>
            <Col>
              <h5>Location</h5>
              <p>Tirane, Albania</p>
            </Col>
          </Row>
          <Row style={innerCard}>
            <Col md={4}>
              <img src={assets.location_icon} alt="" />
            </Col>
            <Col>
              <h5>Emergency Call</h5>
              <p>+355 696514506</p>
            </Col>
          </Row>
          <Row style={innerCard}>
            <Col md={4}>
              <img src={assets.location_icon} alt="" />
            </Col>
            <Col>
              <h5>Follow Us</h5>
              <p>
                <img src={assets.facebook_icon} className='mx-2' alt="" />
                <img src={assets.twitter_icon} className='mx-2' alt="" />
                <img src={assets.instagram_icon} className='mx-2' alt="" />
              </p>
            </Col>
          </Row>
        </Col>
        <Col style={card}>
          <Row>
            <h1>Contact me</h1>
            <Form onSubmit={onSubmit}>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="firstname" name="firstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" value={addContact.firstName} name='firstName' onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="lastname" name="lastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" value={addContact.lastName} name='lastName' onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="email" name="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={addContact.email} name='email' onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={12}>
                <FloatingLabel controlId="textarea" label="Comments" name="comment">
                  <Form.Control rows={3} value={addContact.comment} name='comment' onChange={handleChange}
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '200px' }}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <Button variant="secondary" type="submit" style={{ width: "100%", margin: "10px 0" }}>
                  {result ? result : "Send Message"}
                </Button>
              </Col>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Contact