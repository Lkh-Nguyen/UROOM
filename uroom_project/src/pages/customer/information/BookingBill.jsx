import React from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Table, 
  Form,
  Image
} from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import Banner from '../../../images/banner.jpg';
import '../../../css/customer/BookingBill.css';

const BookingBill = () => {
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
    <div 
      className="min-vh-100 d-flex py-5"
      style={{
        backgroundImage: `url(${Banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
        <Button 
            variant="light" 
            className="position-absolute start-0 top-0 rounded-pill d-flex align-items-center ms-3 mt-3" 
            style={{ zIndex: 100 }}
        >
            <FaArrowLeft className="me-2" /> Back
        </Button>
    
        <Container fluid className="booking-bill-container">
            <Card className="booking-bill-card">
                <Row className="g-0">
                {/* Left side - Hotel Image and Info */}
                <Col md={5} className="hotel-info-section" style={{paddingTop: '20px', paddingLeft: '20px'}}>
                        <Image 
                            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/647144068.jpg?k=acaba5abb30178b9f1c312eb53c94e59996dd9e624bb1835646a2a427cf87f0a&o=&hp=1" 
                            alt="Hotel Room" 
                            style={{height: '510px', width: '100%', objectFit: "cover"}}
                        />
                    <div className="hotel-details">
                    <h5 className="hotel-name-title">Hotel Name</h5>
                    <p className="hotel-full-name">Novotel Hotel Da Nang - Capital Pay</p>
                    
                    <div className="check-dates-container">
                        <div className="check-date-box">
                        <p className="date-label">Checkin Dates</p>
                        <p className="date-value">12/03/2024</p>
                        </div>
                        
                        <div className="star-rating-container">
                        <p className="star-hotel-text">Star Hotel</p>
                        <StarRating rating={4} />
                        </div>
                        
                        <div className="check-date-box">
                        <p className="date-label">Checkout Dates</p>
                        <p className="date-value">15/03/2024</p>
                        </div>
                    </div>
                    </div>
                </Col>
                
                {/* Right side - Booking Bill */}
                <Col md={7} className="bill-section">
                    <div className="bill-header">
                    <h2 className="uroom-title">UROOM</h2>
                    <div className="booking-bill-header">
                        <h4>Booking Bill</h4>
                        <p className="date-created">Date created: 20/02/2023</p>
                    </div>
                    </div>
                    
                    {/* Customer Information */}
                    <div className="info-section">
                    <h5 className="section-title">I. INFORMATION CUSTOMER</h5>
                    <Row className="mb-2">
                        <Col md={4} className="info-label">Name Customer:</Col>
                        <Col md={8} className="info-value">Le Kim Hoang Nguyen</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={4} className="info-label">Contact Customer:</Col>
                        <Col md={8} className="info-value">+84 934 726 073</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={4} className="info-label">Email Customer:</Col>
                        <Col md={8} className="info-value">lkhnguyven1305@gmail.com</Col>
                    </Row>
                    </div>
                    
                    {/* Hotel Information */}
                    <div className="info-section">
                    <h5 className="section-title">II. INFORMATION HOTEL</h5>
                    <Row className="mb-2">
                        <Col md={4} className="info-label">Contact Hotel:</Col>
                        <Col md={8} className="info-value">+84 905 123 456</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={4} className="info-label">Email Hotel:</Col>
                        <Col md={8} className="info-value">novoteldalang@email.com</Col>
                    </Row>
                    </div>
                    
                    {/* Booking Information */}
                    <div className="info-section">
                    <h5 className="section-title">III. INFORMATIN BOOKING</h5>
                    <Table bordered className="booking-table">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Room Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Standard Room</td>
                            <td>2</td>
                            <td>650,000 VND</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Deluxe Name</td>
                            <td>1</td>
                            <td>150,000 VND</td>
                        </tr>
                        <tr className="total-row">
                            <td colSpan={2}>Total Price</td>
                            <td colSpan={2}>800,000 VND</td>
                        </tr>
                        </tbody>
                    </Table>
                    </div>
                    
                    {/* Customer Signature */}
                    <div className="info-section">
                    <h5 className="section-title">IV. CUSTOMER SIGNATURE</h5>
                    <Form.Check 
                        type="checkbox"
                        id="terms-checkbox"
                        label="Agree the Terms & Privacy of hotels and web"
                        className="terms-checkbox"
                    />
                    <div className="export-button-container">
                        <Button variant="info" className="export-button" style={{color: 'white', borderRadius: 10}}>
                        Export File
                        </Button>
                    </div>
                    </div>
                </Col>
                </Row>
            </Card>
        </Container>
    </div>
  );
};

export default BookingBill;