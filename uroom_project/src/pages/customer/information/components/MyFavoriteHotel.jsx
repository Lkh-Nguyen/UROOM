import { Card, Row, Col, Form, Button, Pagination, Container} from "react-bootstrap"
import { FaStar, FaMapMarkerAlt, FaEye } from "react-icons/fa"
import "../../../../css/customer/MyFavoriteHotel.css"
import { useState } from "react"
import { Star, StarFill, X } from 'react-bootstrap-icons';

const MyFavoriteHotel = () => {
  const hotels = [
    {
      id: 1,
      name: "Balcona Nice Try Hotel Da Nang",
      image: "/placeholder.svg?height=200&width=300",
      address: "850/7 Tran Cao Van Street, Xuan Ha, Thanh Khe, Da Nang",
      rating: 3.2,
      feedbacks: 1,
      stars: 4,
    },
    {
      id: 2,
      name: "Novotel Hotel Da Nang",
      image: "/placeholder.svg?height=200&width=300",
      address: "70 Ho Huy Tap, Thanh Khe Dong, Thanh Khe, Da Nang",
      rating: 4.1,
      feedbacks: 12,
      stars: 5,
    },
  ]
  const[activePage, setActivePage] = useState(1);
  const renderStars = (count) => {
      const stars = [];
      for (let i = 0; i < 5; i++) {
        if (i < count) {
          stars.push(<StarFill key={i} className="text-warning" />);
        } else {
          stars.push(<Star key={i} className="text-warning" />);
        }
      }
      return stars;
    };
  return (
    <Container fluid className="bg-light py-4">
      <h2 className="fw-bold mb-4">My Favorite Hotels</h2>
      <Row className="mb-4 align-items-center">
        <Col xs="auto">
          <span className="me-2">Filter:</span>
        </Col>
        <Col xs="auto">
          <Form.Select className="border-primary" style={{ width: '200px' }}>
            <option>Score(High to low)</option>
            <option>Score(Low to high)</option>
            <option>Date(Newest first)</option>
            <option>Date(Oldest first)</option>
          </Form.Select>
        </Col>
        <Col xs="auto">
          <Form.Select className="border-primary" style={{ width: '120px' }}>
            <option>1 star</option>
            <option>2 stars</option>
            <option>3 stars</option>
            <option>4 stars</option>
            <option>5 stars</option>
          </Form.Select>
        </Col>
        <Col xs="auto">
          <Form.Select className="border-primary" style={{ width: '140px' }}>
            <option>Đà Nẵng</option>
            <option>Huế</option>
            <option>Hải Phòng</option>
            <option>Hà Nội</option>
            <option>Hồ Chí Minh</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="m-4">
        <Col md={12}>
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="mb-4 hotel-card">
              <Row className="g-0">
                <Col md={4}>
                  <Card.Img variant="top" src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/629251764.jpg?k=050e0b7a57991869eb2c714c9191d7eea3a712e3a37b66f665be9816c9a87b6c&o=&hp=1" className="hotel-image" />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title className="hotel-name">{hotel.name}</Card.Title>
                    <div className="stars mb-2">{renderStars(hotel.stars)}</div>
                    <div className="location mb-2">
                      <FaMapMarkerAlt className="me-1" />
                      <small>{hotel.address}</small>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <span className="rating-box me-2">{hotel.rating}</span>
                      <span className="text-muted">{hotel.feedbacks} feedbacks</span>
                    </div>
                    <Button variant="link" className="view-detail p-0" style={{fontSize: 16}}>
                      <FaEye className="me-1" />
                      View Detail Hotel
                    </Button>
                    <Button 
                      variant="link" 
                      className="text-dark p-0"
                      style={{position: 'absolute', top: 5, right: 5}}
                    >
                      <X size={20} />
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
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
        </Col>
      </Row>
    </Container>

  )
}

export default MyFavoriteHotel

