import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router';
import '../index.css'
import OAuth from '../components/OAuth';

const SignUp = () => {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData(
            {
                ...formData,
                [e.target.id]: e.target.value
            }
        )
    }
    console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch('http://localhost:5000/api/auth/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                setLoading(false)
                setError(data.message)
                return;
            }
            setLoading(false)
            setError(null)
            navigate('/sign-in')
        } catch (error) {
            setError(data.message)
            setLoading(false)
        }
    }
    return (
        <Container fluid="sm" className="d-flex justify-content-center align-items-center">
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4} className="card p-4">
                    <h1 className="text-center mb-4">Sign Up</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" id='username' onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" id='email' onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" id='password' onChange={handleChange} />
                            <Form.Text className="text-muted">
                                Must contain 8 characters, at least 1 number, 1 capital letter, 1 symbol
                            </Form.Text>
                        </Form.Group>

                        <Button disabled={loading} variant="secondary" type="submit" className="w-100 mb-3">
                            {loading ? 'Loading...' : 'Sign Up'}
                        </Button>
                        <OAuth />
                    </Form>
                    <div className="d-flex justify-content-between">
                        <p className="mb-0">Have an account?</p>
                        <Link to="/sign-in" className="text-primary">Sign-in</Link>
                    </div>
                    {error && <p className='text-danger'>{error}</p>}
                </Col>
            </Row>
        </Container>

    )
}

export default SignUp