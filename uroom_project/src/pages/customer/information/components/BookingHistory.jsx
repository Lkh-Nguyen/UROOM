import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Badge, 
  Button, 
  Pagination
} from 'react-bootstrap';
import '../../../../css/customer/BookingHistory.css';

const BookingHistory = () => {
  const [activeFilter, setActiveFilter] = useState('Feedbacked');
  const [activePage, setActivePage] = useState(1);
  
  // Filter options
  const filters = ['Feedbacked', 'Finished', 'Processing', 'Paid', 'NoPaid', 'Cancel'];
  
  // Sample reservation data
  const reservations = [
    {
      id: '01',
      hotelName: 'Ha Noi Note',
      checkIn: '12/03/2024',
      checkOut: '12/03/2024',
      totalPrice: '$12,230',
      status: 'Feedbacked'
    },
    {
      id: '02',
      hotelName: 'Ha Noi Note',
      checkIn: '12/03/2024',
      checkOut: '12/03/2024',
      totalPrice: '$12,230',
      status: 'Feedbacked'
    },
    {
      id: '03',
      hotelName: 'Ha Noi Note',
      checkIn: '12/03/2024',
      checkOut: '12/03/2024',
      totalPrice: '$12,230',
      status: 'Feedbacked'
    },
    {
      id: '04',
      hotelName: 'Ha Noi Note',
      checkIn: '12/03/2024',
      checkOut: '12/03/2024',
      totalPrice: '$12,230',
      status: 'Feedbacked'
    },
    {
      id: '05',
      hotelName: 'Ha Noi Note',
      checkIn: '12/03/2024',
      checkOut: '12/03/2024',
      totalPrice: '$12,230',
      status: 'Feedbacked'
    },
    {
      id: '06',
      hotelName: 'Ha Noi Note',
      checkIn: '12/03/2024',
      checkOut: '12/03/2024',
      totalPrice: '$12,230',
      status: 'Feedbacked'
    }
  ];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  return (
    <Container className='py-4' >
      <h2 className="fw-bold mb-4">Booking History</h2>
      {/* Filter buttons */}
      <div className="filter-buttons mb-4" style={{justifyContent: 'space-between'}}>
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? 'primary' : 'outline-secondary'}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            style={{width: '130px', borderRadius: 10}}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
      
      {/* Reservation cards */}
      <Row>
        {reservations.map((reservation) => (
          <Col key={reservation.id} lg={4} md={6} sm={12} className="mb-4">
            <Card className="reservation-card">
              <Card.Body>
                <div className="reservation-header">
                  <h5>Reversation ID: {reservation.id}</h5>
                </div>
                <div className="reservation-details">
                  <p><strong>Hotel name:</strong> {reservation.hotelName}</p>
                  <p><strong>Check-in:</strong> {reservation.checkIn}</p>
                  <p><strong>Check-out:</strong> {reservation.checkOut}</p>
                  <p><strong>Total price:</strong> {reservation.totalPrice}</p>
                  <p>
                    <strong>Status:</strong> 
                    <Badge bg="info" className="status-badge" style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 10}}>{reservation.status}</Badge>
                  </p>
                </div>
                <Button variant="outline-primary" style={{width: '100%', marginTop: '10px'}} href='/bookingbill_customer'>
                  View Details
                </Button>
                <Button variant="outline-success" style={{width: '100%', marginTop: '10px'}} href='/createfeedback_customer'>
                  Create Feedback
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      <div className="d-flex justify-content-center mt-4">
          <Pagination>
          {[1, 2, 3, 4].map(number => (
              <Pagination.Item 
              key={number} 
              active={number === activePage}
              onClick={() => setActivePage(number)}
            >
              <b style={{color: number === activePage ? "white" : "#0d6efd"}}>{number}</b>
            </Pagination.Item>
          ))}
          </Pagination>
      </div>
    </Container>
  );
};

export default BookingHistory;