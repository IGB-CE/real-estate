import React, { useState } from 'react'
import { assets, projectData } from '../assets/assets'
import { Container, Col, Row, Card, Button } from 'react-bootstrap'
import '../index.css'

const Projects = () => {
    return (
        <Container>
            <Row>
                <Col md={10} className='m-auto text-center'>
                    <div className='display-1'>
                        Projects Completed
                    </div>
                    <div>
                        Crafting Spaces, Building Legacies - Explore Our Portfolio
                    </div>
                </Col>
            </Row>
            <Row className='project-row p-4 d-flex flex-wrap flex-lg-nowrap'>
                {
                    projectData.map((project, index) => (
                        <Card
                            key={index}
                            className='project-card me-3 mb-4 flex-shrink-0'
                        >
                            <Card.Img variant="top" src={project.image} />
                            <Card.Body>
                                <Card.Title>{project.title}</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Card.Text>
                                    {
                                        Array.from({ length: 5 }).map((_, i) => (
                                            <span key={i}>
                                                {i < project.rating ? (
                                                    <img style={{ width: '20px' }} src={assets.star_filled} />
                                                ) : (
                                                    <img style={{ width: '20px' }} src={assets.star_empty} />
                                                )}
                                            </span>
                                        ))
                                    }
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                }
            </Row>

        </Container>
    )
}

export default Projects