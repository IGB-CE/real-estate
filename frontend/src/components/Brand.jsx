import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { assets } from '../assets/assets';
import { Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { motion } from "motion/react"
import CountUp, { useCountUp } from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const Brand = () => {

    return (
        <Container>
            <Row>
                <Col className='p-5' xs={12} lg={6}><Image fluid src={assets.building} /></Col>
                <Col className='p-5' xs={12} lg={6}>
                    <Row className='display-1 text-center p-4'>Our Brand</Row>
                    <Row className='p-4'>
                        <Col><strong className='display-3'><CountUp end={10} enableScrollSpy /></strong> <br /> years of experience</Col>
                        <Col><strong className='display-3'><CountUp end={12} enableScrollSpy />+</strong> <br /> projects completed</Col>
                    </Row>
                    <Row className='p-4'>
                        <Col><strong className='display-3'><CountUp end={20} enableScrollSpy/></strong> <br /> Mn. Sq. Ft. Delivered</Col>
                        <Col><strong className='display-3'><CountUp end={25} enableScrollSpy/>+</strong> <br /> Ongoing Projects</Col>
                    </Row>
                    <Row className='p-4'>
                        <Col>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum exercitationem, unde dolorem provident culpa delectus dignissimos temporibus obcaecati voluptatum cumque magni placeat tempora suscipit saepe voluptatem ipsam impedit amet autem?</Col>
                    </Row>
                    <Row className='p-4'>
                        <Col>
                            <Button variant="dark">Learn More</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Brand