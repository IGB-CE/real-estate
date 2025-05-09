import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router';

const Search = () => {
    const defaultFilters = {
        searchTerm: '',
        type: '',
        furnished: false,
        parking: false,
        offer: false,
        sort: '',
        order: ''
    };

    const [filters, setFilters] = useState(defaultFilters); // Current filter values
    const [appliedFilters, setAppliedFilters] = useState(defaultFilters); // Applied filters state
    const [listings, setListings] = useState([]);

    const fetchListings = async () => {
        try {
            const params = {};

            if (appliedFilters.searchTerm) params.searchTerm = appliedFilters.searchTerm;
            if (appliedFilters.type === 'sell') params.sell = true;
            if (appliedFilters.type === 'rent') params.rent = true;
            if (appliedFilters.furnished) params.furnished = true;
            if (appliedFilters.parking) params.parking = true;
            if (appliedFilters.offer) params.offer = true;
            if (appliedFilters.sort) params.sort = appliedFilters.sort;
            if (appliedFilters.order) params.order = appliedFilters.order;

            const res = await axios.get('http://localhost:5000/api/listing/get', {
                params,
                withCredentials: true,
            });
            setListings(res.data);
        } catch (error) {
            console.error("Error fetching listings", error);
        }
    };

    useEffect(() => {
        fetchListings(); // Fetch listings on initial render
    }, [appliedFilters]); // Fetch when applied filters change

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setAppliedFilters(filters); // Apply filters only when the button is clicked
    };

    const resetFilters = () => {
        setFilters(defaultFilters); // Reset to default filter values
        setAppliedFilters(defaultFilters); // Reset applied filters as well
    };

    return (
        <Container fluid className="py-4">
            <Row>
                {/* Filters - Left Side with Vertical Gray Line */}
                <Col
                    md={3}
                    style={{
                        borderRight: '2px solid #ddd', // Add border for larger screens
                        paddingTop: '20px', // Make sure it's aligned at the top
                    }}
                    className="mb-4 mb-md-0"
                >
                    <h5>Filters</h5>
                    <Form onSubmit={handleSearch}>
                        <Form.Group className="mb-3">
                            <Form.Label>Purpose</Form.Label>
                            <Form.Select name="type" value={filters.type} onChange={handleInputChange}>
                                <option value="">Any</option>
                                <option value="sell">Sell</option>
                                <option value="rent">Rent</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Check
                            type="checkbox"
                            name="furnished"
                            label="Furnished"
                            checked={filters.furnished}
                            onChange={handleInputChange}
                            className="mb-2"
                        />
                        <Form.Check
                            type="checkbox"
                            name="parking"
                            label="Parking"
                            checked={filters.parking}
                            onChange={handleInputChange}
                            className="mb-2"
                        />
                        <Form.Check
                            type="checkbox"
                            name="offer"
                            label="Offer"
                            checked={filters.offer}
                            onChange={handleInputChange}
                            className="mb-2"
                        />

                        <Form.Group className="mb-3">
                            <Form.Label>Sort By</Form.Label>
                            <Form.Select name="sort" value={filters.sort} onChange={handleInputChange}>
                                <option value="">Created At</option>
                                <option value="regularPrice">Price</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Order</Form.Label>
                            <Form.Select name="order" value={filters.order} onChange={handleInputChange}>
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </Form.Select>
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                            <Button variant="secondary" type="button" className="w-100" onClick={resetFilters}>
                                    Reset All Filters
                                </Button>
                            </Col>
                            <Col md={6}>
                                 <Button variant="primary" type="submit" className="w-100 mb-2">
                                    Apply Filters
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>

                {/* Main Content - Search + Listings */}
                <Col md={9}>
                    {/* Search Bar - Top Middle */}
                    <div className="d-flex justify-content-center mb-4">
                        <Form className="w-75">
                            <Form.Control
                                type="text"
                                placeholder="Search listings..."
                                name="searchTerm"
                                value={filters.searchTerm}
                                onChange={handleInputChange}
                                className="rounded-4 px-4 py-2 border-dark shadow text-center fs-5"
                            />
                        </Form>
                    </div>

                    {/* Listings */}
                    <Row>
                        {listings.length > 0 ? (
                            listings.map((listing) => (
                                <Col key={listing._id} md={6} lg={4} className="mb-4">
                                    <Link to={`/listing/${listing._id}`}>
                                        <Card>
                                            <Card.Img variant="top" src={`http://localhost:5000/${listing.images?.[0]}`} style={{ height: '200px', objectFit: 'cover' }} />
                                            <Card.Body>
                                                <Card.Title>{listing.name}</Card.Title>
                                                <Card.Text>{listing.address}</Card.Text>
                                                <Card.Text><strong>Price:</strong> {listing.regularPrice} L</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            ))
                        ) : (
                            <p>No listings found.</p>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Search;
