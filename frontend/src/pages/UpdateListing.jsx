import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, InputGroup, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { useSelector } from 'react-redux';

const checkboxOptions = [
    { label: 'Sell', name: 'sell' },
    { label: 'Rent', name: 'rent' },
    { label: 'Parking spot', name: 'parking' },
    { label: 'Furnished', name: 'furnished' },
    { label: 'Offer', name: 'offer' },
];

const UpdateListing = () => {
    const nav = useNavigate();
    const params = useParams();
    const { currentUser } = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [existingImages, setExistingImages] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        type: '',
        sell: false,
        rent: false,
        parking: false,
        furnished: false,
        offer: false,
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 0,
        discountPrice: 0,
        images: [],
    });

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const listingId = params.listingId;
                const res = await fetch(`http://localhost:5000/api/listing/get/${listingId}`);
                const data = await res.json();
                if (data.success === false) {
                    console.log(data.message);
                    return;
                }
    
                // Convert relative image paths to full URLs
                const fullImageURLs = (data.images || []).map(path =>
                    path.startsWith("http") ? path : `http://localhost:5000/${path}`
                );
    
                setFormData({
                    ...data,
                    images: [], // reset images
                });
                setExistingImages(fullImageURLs);
            } catch (error) {
                console.log("Failed to fetch listing:", error);
            }
        };
    
        fetchListing();
    }, [params.listingId]);
    


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckbox = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleImages = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({ ...prev, images: files }));

        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
    
        const submissionData = new FormData();
    
        // Check if new images were selected
        if (formData.images.length > 0) {
            // Append newly selected images
            formData.images.forEach((image) => {
                submissionData.append('images', image);
            });
        }
    
        // If no new images are selected, send existing images properly
        if (existingImages.length > 0) {
            submissionData.append('existingImages', JSON.stringify(existingImages));
        }
    
        // Append other fields
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'images') {
                submissionData.append(key, value);
            }
        });
    
        submissionData.append("userRef", currentUser._id);
    
        try {
            const res = await axios.post(
                `http://localhost:5000/api/listing/update/${params.listingId}`,
                submissionData,
                { withCredentials: true }
            );
    
            if (res.data.success === false) {
                setError(res.data.message || "Something went wrong");
            } else {
                nav("/");  // Navigate to another page after success
            }
        } catch (err) {
            setError(err.response?.data?.message || "Submission failed");
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
        <Container>
            <Row className="mb-4">
                <h1 className="text-center">Update a Listing</h1>
            </Row>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <FloatingLabel controlId="description" label="Add a description" className="mb-3">
                            <Form.Control
                                as="textarea"
                                name="description"
                                style={{ height: '200px' }}
                                value={formData.description || ''}
                                onChange={handleChange}
                            />
                        </FloatingLabel>

                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Listing Type</Form.Label>
                            <Form.Select
                                name="type"
                                value={formData.type || ''}
                                onChange={handleChange}
                            >
                                <option value="">Select Type</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="studio">Studio</option>
                            </Form.Select>
                        </Form.Group>

                        <div className="mb-3">
                            {checkboxOptions.map(({ label, name }) => (
                                <Form.Check
                                    inline
                                    key={name}
                                    label={label}
                                    name={name}
                                    type="checkbox"
                                    checked={!!formData[name]}
                                    onChange={handleCheckbox}
                                    id={`checkbox-${name}`}
                                />
                            ))}
                        </div>

                        <Row>
                            <Col md={6}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Beds</InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        name="bedrooms"
                                        min={0}
                                        max={10}
                                        value={formData.bedrooms ?? 1}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col md={6}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Baths</InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        name="bathrooms"
                                        min={0}
                                        max={10}
                                        value={formData.bathrooms ?? 1}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type="number"
                                        name="regularPrice"
                                        placeholder="Regular price"
                                        min={0}
                                        value={formData.regularPrice ?? 0}
                                        onChange={handleChange}
                                    />
                                    <InputGroup.Text>(L / month)</InputGroup.Text>
                                </InputGroup>
                            </Col>
                            <Col md={6}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type="number"
                                        name="discountPrice"
                                        placeholder="Discounted price"
                                        min={0}
                                        value={formData.discountPrice ?? 0}
                                        onChange={handleChange}
                                    />
                                    <InputGroup.Text>(L / month)</InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>The first image will be the cover:</Form.Label>
                            <Form.Control
                                type="file"
                                name="images"
                                accept="image/*"
                                multiple
                                onChange={handleImages}
                            />
                        </Form.Group>

                        {(existingImages.length > 0 || imagePreviews.length > 0) && (
                            <div className="d-flex overflow-auto gap-3 mb-3" style={{ whiteSpace: 'nowrap' }}>
                                {existingImages.map((src, index) => (
                                    <img
                                        key={`existing-${index}`}
                                        src={src}
                                        alt={`existing-${index}`}
                                        className="rounded"
                                        style={{ height: '150px', objectFit: 'cover' }}
                                    />
                                ))}
                                {imagePreviews.map((src, index) => (
                                    <img
                                        key={`preview-${index}`}
                                        src={src}
                                        alt={`preview-${index}`}
                                        className="rounded"
                                        style={{ height: '150px', objectFit: 'cover' }}
                                    />
                                ))}
                            </div>
                        )}

                        <Button variant="dark" className="w-100" type="submit">
                            {loading ? 'Updating...' : 'Update Listing'}
                        </Button>
                        {error && <p className="text-danger mt-2">{error}</p>}
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default UpdateListing;
