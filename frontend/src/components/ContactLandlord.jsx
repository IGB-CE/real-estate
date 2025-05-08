import React, { useEffect, useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Link } from 'react-router'

const ContactLandlord = ({ listing }) => {
    const [landlord, setLandlord] = useState(null)
    const [message, setMessage] = useState('')

    const onChange = (e) => {
        setMessage(e.target.value)
    }

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/user/${listing.userRef}`, {
                    credentials: 'include',
                });
                const data = await res.json()
                setLandlord(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchLandlord()
    }, [listing.userRef])
    return (
        <>
            {landlord && (
                <p className='m-3'>Contact <span className='fw-bold'>{landlord.username}</span> for <span className='fw-bold'>{listing.name.toLowerCase()}</span></p>
            )}
            <FloatingLabel controlId="textarea" label="Enter your message here..." name="message">
                <Form.Control rows={3} name='message' value={message} onChange={onChange}
                    as="textarea"
                    style={{ height: '200px' }}
                />
            </FloatingLabel>
            {landlord?.email && (
                <Link className="btn btn-primary d-block ms-auto mt-3" to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}>
                    Send Message
                </Link>
            )}

        </>
    )
}

export default ContactLandlord