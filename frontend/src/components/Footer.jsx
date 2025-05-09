import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <Container fluid className='p-5 border-top mt-5'>
      <Row>
        <Col sm={12} md={5} className='px-5'>
          <Row className='p-2 display-5'>Ideal Estate</Row>
          <Row className='p-2'>
            Ideal Estate is more than an agency – it is a trusted partner on your journey to your ideal space. Whether it is to invest, find a new home, or start a new chapter, Ideal Estate is there to make your new reality… ideal.
          </Row>
          <Row className='p-2'>
            <img src={assets.facebook_icon} style={{ width: '50px' }} alt="Facebook" />
            <img src={assets.instagram_icon} style={{ width: '50px' }} alt="Instagram" />
            <img src={assets.twitter_icon} style={{ width: '50px' }} alt="Twitter" />
            <img src={assets.share_icon} style={{ width: '50px' }} alt="Share" />
          </Row>
        </Col>

        <Col sm={12} md={2}>
          <Row className='p-2'>Home</Row>
          <Row className='p-2'>About Us</Row>
          <Row className='p-2'>Contact Us</Row>
          <Row className='p-2'>Home</Row>
        </Col>

        <Col sm={12} md={2}>
          <Row className='p-2'>Security</Row>
          <Row className='p-2'>Privacy Policy</Row>
          <Row className='p-2'>User Agreement</Row>
          <Row className='p-2'>Copyright</Row>
        </Col>

        <Col sm={12} md={3}>
          <Row className='p-2'>Subscribe to our newsletter</Row>
          <Row className='p-2'>
            The latest news, articles, and resources sent to your inbox weekly.
          </Row>
          <Row className='p-2'>
            <Col className="d-flex">
              <input
                className='p-2 w-75 border'
                type="text"
                placeholder='Enter your email'
                style={{ height: '38px' }} // Ensures the input and button match in height
              />
              <Button variant='dark' className="ms-2" style={{ height: '38px' }}>
                Submit
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
