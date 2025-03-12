import React, { useState } from 'react';
import { 
    Container, 
    Row, 
    Col, 
    Card, 
    Form, 
    Button, 
    InputGroup 
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Banner from '../../../images/banner.jpg';

const BookingCheckPage = () => {
    const [bookingFor, setBookingFor] = useState('mainGuest');
    // Star rating component
    const StarRating = ({ rating }) => {
        return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => (
            index < rating ? 
                <FaStar key={index} className="star filled" /> : 
                <FaRegStar key={index} className="star" />
            ))}
        </div>
        );
    };
    return (
        <div className="booking-page" style={{
            backgroundImage: `url(${Banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            padding: '50px 0'
        }}>
            <Container>
                <Row className="justify-content-center">
                    {/* Left Card - Booking Details */}
                    <Col md={5} lg={4}>
                        <Card className="booking-card text-white" style={{ 
                            backgroundColor: 'rgba(20, 30, 70, 0.85)',
                            borderRadius: '10px',
                            padding: '20px',
                            marginBottom: '20px'
                        }}>
                            <div className="stars mb-2" style={{justifyContent: 'flex-start', justifyItems: 'self-start'}}>
                                <StarRating rating={4} />
                            </div>
                            
                            <h4 className="hotel-name mb-1">Hotel Paradise</h4>
                            
                            <p className="hotel-address small mb-4">
                                123 Bien Kinh Street, Central District, Da Nang City, Vietnam
                            </p>
                            
                            <div className="booking-divider mb-3" style={{ 
                                height: '1px', 
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                margin: '15px 0'
                            }}></div>
                            
                            <h5 className="mb-4">Your booking detail</h5>
                            
                            <Row className="mb-4">
                                <Col xs={6}>
                                    <div className="checkin">
                                        <div className="small mb-1 fw-bold" style={{fontSize: 20}}>Checkin</div>
                                        <div className="time">12:00:00 2/3/2025</div>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="checkout">
                                        <div className="small mb-1 fw-bold" style={{fontSize: 20}}>Checkout</div>
                                        <div className="time">10:00:00 2/3/2025</div>
                                    </div>
                                </Col>
                            </Row>
                            
                            <div className="stay-info mb-2">
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Total length of stay:</span>
                                    <span className="fw-bold">1 night</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Total number of people:</span>
                                    <span className="fw-bold">2 people</span>
                                </div>
                            </div>
                            
                            <div className="booking-divider mb-3" style={{ 
                                height: '1px', 
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                margin: '15px 0'
                            }}></div>
                            
                            <div className="selected-room mb-2">
                                <h5 className="mb-4">You selected</h5>
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <span>1 x Family Room:</span>
                                    <span className="fw-bold">$400</span>
                                </div>
                                <div className="small mb-3">
                                    <a href="#" className="text-blue text-decoration-none">
                                        Change your selection
                                    </a>
                                </div>
                            </div>
                            
                            <div className="booking-divider mb-3" style={{ 
                                height: '1px', 
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                margin: '15px 0'
                            }}></div>
                            
                            <div className="total-price">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="text-danger mb-0">Total: $400</h5>
                                </div>
                                <div className="small">Includes taxes and fees</div>
                            </div>
                        </Card>
                    </Col>
                    
                    {/* Right Card - Customer Information */}
                    <Col md={5} lg={4}>
                        <Card className="info-card" style={{ 
                            backgroundColor: 'rgba(20, 30, 70, 0.85)',
                            borderRadius: '10px',
                            padding: '20px',
                            color: 'white'
                        }}>
                            <h4 className="mb-4">Check your information</h4>
                            
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Nguyen Van X"
                                        className="bg-transparent text-white"
                                        style={{
                                            border: '1px solid rgba(255,255,255,0.3)',
                                            borderRadius: '5px'
                                        }}
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="nguyenvanx@gmail.com"
                                        className="bg-transparent text-white"
                                        style={{
                                            border: '1px solid rgba(255,255,255,0.3)',
                                            borderRadius: '5px'
                                        }}
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-4">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control 
                                        type="tel" 
                                        placeholder="0912345678"
                                        className="bg-transparent text-white"
                                        style={{
                                            border: '1px solid rgba(255,255,255,0.3)',
                                            borderRadius: '5px'
                                        }}
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-4">
                                    <Form.Label>Who are you booking for?</Form.Label>
                                    <div>
                                        <Form.Check
                                            type="radio"
                                            id="mainGuest"
                                            label="I'm the main guest"
                                            name="bookingFor"
                                            checked={bookingFor === 'mainGuest'}
                                            onChange={() => setBookingFor('mainGuest')}
                                            className="mb-2"
                                        />
                                        <Form.Check
                                            type="radio"
                                            id="someoneElse"
                                            label="I'm booking for someone else"
                                            name="bookingFor"
                                            checked={bookingFor === 'someoneElse'}
                                            onChange={() => setBookingFor('someoneElse')}
                                        />
                                    </div>
                                </Form.Group>
                                
                                <div className="text-center">
                                    <Button 
                                        type="submit"
                                        className="px-4 py-2"
                                        style={{
                                            borderRadius: '10px',
                                            backgroundColor: 'white',
                                            color: '#007bff',
                                            border: 'none',
                                            fontWeight: 'bold'
                                        }}
                                        href='/payment_customer'
                                    >
                                        Booking
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default BookingCheckPage;