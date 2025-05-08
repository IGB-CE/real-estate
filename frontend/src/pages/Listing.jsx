import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Badge, Carousel, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { FaBed, FaBath, FaParking, FaCouch, FaTag, FaMapMarkerAlt, FaRegMoneyBillAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import ContactLandlord from '../components/ContactLandlord';

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false)
  const params = useParams();
  const {currentUser} = useSelector((state) => state.user)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false || !res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  return (
    <Container className="my-4">
      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          Something went wrong!
        </Alert>
      )}

      {listing && !loading && !error && (
        <>
          <h1 className="mb-3">{listing.name}</h1>
          <Row>
            <Col md={8}>
              {listing.images?.length > 0 && (
                <Card className="mb-4">
                  <Carousel>
                    {listing.images.map((image, idx) => (
                      <Carousel.Item key={idx}>
                        <img
                          className="d-block w-100"
                          src={`http://localhost:5000/${image}`}
                          alt={`Slide ${idx + 1}`}
                          style={{ maxHeight: '400px', objectFit: 'cover' }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Card>
              )}
              <p><strong>Description:</strong> {listing.description}</p>
              <p><strong>Address:</strong> {listing.address}</p>

              <Row className="mt-3">
                <Col><Badge bg="secondary"><FaBed /> {listing.bedrooms} Bedrooms</Badge></Col>
                <Col><Badge bg="secondary"><FaBath /> {listing.bathrooms} Bathrooms</Badge></Col>
                <Col><Badge bg={listing.parking ? 'success' : 'danger'}><FaParking /> {listing.parking ? 'Parking Available' : 'No Parking'}</Badge></Col>
                <Col><Badge bg={listing.furnished ? 'success' : 'secondary'}><FaCouch /> {listing.furnished ? 'Furnished' : 'Unfurnished'}</Badge></Col>
              </Row>
            </Col>

            <Col md={4}>
              <Card className="p-3 shadow-sm">
                <h4>
                  <FaTag /> Price:{" "}
                  <span className="text-success">
                    ${listing.offer ? listing.discountPrice : listing.regularPrice}
                  </span>
                </h4>
                {listing.offer && (
                  <p className="text-muted">
                    <del>${listing.regularPrice}</del> Offer available!
                  </p>
                )}
                <Badge bg={listing.type === "sell" ? "info" : "primary"}>
                  {listing.type === "sell" ? "For Sale" : "For Rent"}
                </Badge>
              </Card>
                {
                  currentUser && listing.userRef !== currentUser._id && !contact && (
                    <Button onClick={()=>setContact(true)} className='w-100 my-4' variant='primary'>Contact landlord</Button>
                  )
                }
                {contact && <ContactLandlord listing={listing}/>}
            </Col>
          </Row>

          <Row className="mt-3">
            <Col><FaMapMarkerAlt /> <strong>Location:</strong> {listing.address}</Col>
            <Col><FaRegMoneyBillAlt /> <strong>Discounted Price:</strong> ${listing.discountPrice}</Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Listing;
