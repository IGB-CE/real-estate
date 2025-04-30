import React, { useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, InputGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useSelector } from 'react-redux'

const checkboxOptions = [
    { label: 'Sell', name: 'sell' },
    { label: 'Rent', name: 'rent' },
    { label: 'Parking spot', name: 'parking' },
    { label: 'Furnished', name: 'furnished' },
    { label: 'Offer', name: 'offer' },
];

const CreateListing = () => {
    const nav = useNavigate();
    const { currentUser } = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [product, setProduct] = useState({
        name: "",
        description: "",
        address: "",
        sell: false,
        rent: false,
        parking: false,
        furnished: false,
        offer: false,
        beds: 1,
        baths: 1,
        regularPrice: 0,
        discountedPrice: 0,
        images: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleCheckbox = (e) => {
        const { name, checked } = e.target;
        setProduct({ ...product, [name]: checked });
    };

    const handleImages = (e) => {
        const files = Array.from(e.target.files);
        setProduct({ ...product, images: files });

        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
    
        const formData = new FormData();
    
        // Append images
        product.images.forEach((image) => {
            formData.append("images", image);
        });
    
        // Append fields
        Object.entries(product).forEach(([key, value]) => {
            if (key !== "images") {
                formData.append(key, value);
            }
        });
    
        // Add user reference
        formData.append("userRef", currentUser._id);
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        try {
            const res = await axios.post("http://localhost:5000/api/listing/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    
            const data = res.data;
            if (data.success === false) {
                setError(data.message || "Something went wrong");
            } else {
                nav("/");
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Submission failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Row className="mb-4">
                <h1 className="text-center">Create a Listing</h1>
            </Row>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" onChange={handleChange} />
                        </Form.Group>

                        <FloatingLabel controlId="description" label="Add a description" className="mb-3">
                            <Form.Control as="textarea" name="description" style={{ height: '200px' }} onChange={handleChange} />
                        </FloatingLabel>

                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" onChange={handleChange} />
                        </Form.Group>

                        <div className="mb-3">
                            {checkboxOptions.map(({ label, name }) => (
                                <Form.Check
                                    inline
                                    key={name}
                                    label={label}
                                    name={name}
                                    type="checkbox"
                                    checked={product[name]}
                                    onChange={handleCheckbox}
                                    id={`checkbox-${name}`}
                                />
                            ))}
                        </div>

                        <Row>
                            <Col md={6}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Beds</InputGroup.Text>
                                    <Form.Control type="number" name="beds" min={0} max={10} onChange={handleChange} />
                                </InputGroup>
                            </Col>
                            <Col md={6}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Baths</InputGroup.Text>
                                    <Form.Control type="number" name="baths" min={0} max={10} onChange={handleChange} />
                                </InputGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <InputGroup className="mb-3">
                                    <Form.Control type="number" name="regularPrice" placeholder="Regular price" min={0} onChange={handleChange} />
                                    <InputGroup.Text>(L / month)</InputGroup.Text>
                                </InputGroup>
                            </Col>
                            <Col md={6}>
                                <InputGroup className="mb-3">
                                    <Form.Control type="number" name="discountedPrice" placeholder="Discounted price" min={0} onChange={handleChange} />
                                    <InputGroup.Text>(L / month)</InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>The first image will be the cover:</Form.Label>
                            <Form.Control type="file" name="images" accept="image/*" multiple onChange={handleImages} />
                        </Form.Group>

                        {imagePreviews.length > 0 && (
                            <div className="d-flex overflow-auto gap-3 mb-3" style={{ whiteSpace: 'nowrap' }}>
                                {imagePreviews.length > 0 &&
                                    imagePreviews.map((src, index) => (
                                        <img
                                            key={index}
                                            src={src}
                                            alt={`preview-${index}`}
                                            className="rounded"
                                            style={{ height: '150px', objectFit: 'cover' }}
                                        />
                                    ))}
                            </div>

                        )}

                        <Button variant="dark" className="w-100" type="submit">
                            {loading ? 'Creating...' : 'Create Listing'}
                        </Button>
                        {error && <p>{error}</p>}
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default CreateListing;
