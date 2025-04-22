import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <Container fluid className='p-5 border-top mt-5' >
            <Row>
                <Col sm={12} md={5} className='px-5'>
                    <Row className='p-2 display-5'>Ideal Estate</Row>
                    <Row className='p-2'>Ideal Estate is more than an agency – it is a trusted partner on your journey to your ideal space. Whether it is to invest, find a new home or start a new chapter, Ideal Estate is there to make your new reality… ideal.</Row>
                    <Row className='p-2'>
                        <img src={assets.facebook_icon} style={{ width: '50px' }} alt="" />
                        <img src={assets.instagram_icon} style={{ width: '50px' }} alt="" />
                        <img src={assets.twitter_icon} style={{ width: '50px' }} alt="" />
                        <img src={assets.share_icon} style={{ width: '50px' }} alt="" />
                    </Row>
                </Col>
                <Col sm={12} md={2}>
                    <Row className='p-2'>
                        <div>Home</div>
                    </Row>
                    <Row className='p-2'>
                        <div>About Us</div>
                    </Row>
                    <Row className='p-2'>
                        <div>Contact Us</div>
                    </Row>
                    <Row className='p-2'>
                        <div>Home</div>
                    </Row>
                </Col>
                <Col sm={12} md={2}>
                    <Row className='p-2'>
                        <div>Security</div>
                    </Row>
                    <Row className='p-2'>
                        <div>Privacy Policy</div>
                    </Row>
                    <Row className='p-2'>
                        <div>User Agreement</div>
                    </Row>
                    <Row className='p-2'>
                        <div>Copyright</div>
                    </Row>
                </Col>
                <Col sm={12} md={3}>
                    <Row className='p-2'>
                        <div>Subscribe to our newsletter</div>
                    </Row>
                    <Row className='p-2'>
                        <div>The latest news, articles and resources sent to your inbox weekly</div>
                    </Row>
                    <Row className='p-2'>
                        <Col>
                            <input className='p-1 m-1 border w-75' type="text" placeholder='Enter your email' />
                            <span><Button variant='dark'>Submit</Button></span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer