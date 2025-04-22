import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { testimonialData } from '../assets/assets';

const Testimonials = () => {
    return (
        <Container>
            <Row className='p-5'>
                <Col className='display-1 text-center'>Don't Trust Us, Trust Their Voice</Col>
            </Row>
            <Row>
                {
                    testimonialData.map((data, index) => {
                        return (
                            <Col md={6} className='p-3' key={index}>
                                <Card style={{ width: '80%', padding: '10px', margin:'auto' }}>
                                    <Card.Img style={{width:'3rem', position: 'absolute', top:'-30px', left:'50px'}} variant="bottom" src={data.image} />
                                    <Card.Body style={{backgroundColor:"#F9F5EE"}}>
                                        <Card.Title>{data.name}</Card.Title>
                                        <Card.Text>
                                            {data.text}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default Testimonials