import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { assets } from '../assets/assets'

const About = () => {
  const card = {
    backgroundColor: "#F9F5EE",
    padding: "15px",
    margin: "10px"
  }

  return (
    <Container>
      {/* Image and text side by side */}
      <Row className="align-items-center">
        {/* Image on the left */}
        <Col md={6}>
          <Image 
            style={{ width: "100%", height: "auto", objectFit: "cover" }} 
            src={assets.about} 
          />
        </Col>

        {/* Text on the right with card style */}
        <Col md={5} style={card}>
          <h1>Our Mission</h1>
          <p>
            To help every client find not just a suitable property, but a place they will call "home." Ideal Estate builds bridges of trust between people and the spaces they represent – ​​with professionalism, transparency, and a passion for quality of life.
          </p>
        </Col>
      </Row>

      {/* "Our Values" section */}
      <Row style={card}>
        <Col className="text-center" md={12}>
          <h1>Our Values</h1>
        </Col>
        <Col md={12}>
          <h4>Trust and Quality</h4>
          <p>
            We only work with verified properties, proper documentation, and complete information for each listing. From new apartments to luxury villas or commercial premises, we offer guaranteed quality and dedicated service.
          </p>
        </Col>
        <Col md={12}>
          <h4>Client Experience</h4>
          <p>
            Every client is unique – that’s why we offer personalized advice, carefully organized visits, and full support every step of the way. At Ideal Estate, buying or selling a property becomes a smooth and professional experience.
          </p>
        </Col>
        <Col md={12}>
          <h4>Lifestyle Connection</h4>
          <p>
            We don't just offer buildings – we offer lives. By understanding the client's style, needs, and desires, we help find the property that best represents their identity and goals.
          </p>
        </Col>
      </Row>

      {/* Brand Identity Section */}
      <Row style={card}>
        <Col className="text-center" md={12}>
          <h1>Ideal Estate Brand Identity</h1>
        </Col>
        <Col md={12}>
          <p>
            Ideal Estate is more than an agency – it is a trusted partner on your journey to your ideal space. Whether it is to invest, find a new home, or start a new chapter, Ideal Estate is there to make your new reality… ideal.
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default About
