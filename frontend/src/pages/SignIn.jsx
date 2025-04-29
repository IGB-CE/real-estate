import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router';  // Changed to 'react-router-dom'
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });  // Initialized formData with default values
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
        if (error) dispatch(signInFailure(null));  // Reset error on input change
    };

    console.log(formData);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signInStart());
        try {
            const res = await fetch('http://localhost:5000/api/auth/signin', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) {
                dispatch(signInFailure(data.message || 'Something went wrong'));
                return;
            }

            dispatch(signInSuccess(data));
            navigate('/');  // Redirect to home page or another page as needed
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <Container fluid="sm" className="d-flex justify-content-center align-items-center">
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4} className="card p-4">
                    <h1 className="text-center mb-4">Sign In</h1>
                    <Form onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                id="email" 
                                value={formData.email}  // Controlled input
                                onChange={handleChange} 
                            />
                        </Form.Group>

                        {/* Password Input */}
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                id="password" 
                                value={formData.password}  // Controlled input
                                onChange={handleChange} 
                            />
                            <Form.Text className="text-muted">
                                Must contain 8 characters, at least 1 number, 1 capital letter, 1 symbol
                            </Form.Text>
                        </Form.Group>

                        {/* Submit Button */}
                        <Button disabled={loading} variant="secondary" type="submit" className="w-100 mb-3">
                            {loading ? 'Loading...' : 'Sign In'}
                        </Button>

                        {/* OAuth */}
                        <OAuth />
                    </Form>

                    {/* Sign up link */}
                    <div className="d-flex justify-content-between">
                        <p className="mb-0">Don't have an account?</p>
                        <Link to="/sign-up" className="text-primary">Sign up</Link>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-danger">{error}</p>}
                </Col>
            </Row>
        </Container>
    );
};

export default SignIn;
