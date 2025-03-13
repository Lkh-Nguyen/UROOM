
import { useState } from "react"
import { Container, Row, Col, Form, Button, Card, InputGroup, Badge, Alert } from "react-bootstrap"
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaBed, FaStar, FaCheck, FaSearch } from "react-icons/fa"
import "bootstrap/dist/css/bootstrap.min.css"
import "../../../css/customer/HotelSearchPage.css"
import Footer from '../Footer';
import Header from '../Header';
import Banner from '../../../images/banner.jpg';


const hotelData = [
  {
    id: 1,
    name: "Khách sạn và căn hộ Seashore",
    location: "Đà Nẵng",
    address: "Đia điểm: 15-16 Hoàng Sa, Mân Thái, Sơn Trà, Đà Nẵng, Việt Nam",
    star: 4,
    rating: 1.3,
    feedbacks: 4,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/629251764.jpg?k=050e0b7a57991869eb2c714c9191d7eea3a712e3a37b66f665be9816c9a87b6c&o=",
    features: ["Free cancellation", "No prepayment needed - pay at property"],
  },
  {
    id: 2,
    name: "Danue Hotel Da Nang",
    location: "Đà Nẵng",
    address: "Đia điểm: 57-59 Đỗ Bí, Mỹ An, Ngũ Hành Sơn, Đà Nẵng, Việt Nam",
    star: 3,
    rating: 4.3,
    feedbacks: 4,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/531732579.jpg?k=5f6be2537974a0e620c275efe41a2aa9b7549a8547800f7a71e1748f0d360604&o=",
    features: ["Free cancellation", "No prepayment needed - pay at property"],

  },
  {
    id: 3,
    name: "Cicilia Danang Hotels & Spa Powered by ASTON",
    location: "Đà Nẵng",
    address: "Đia điểm: 06 10 Đỗ Bá, Đại Biển T20, Phường Mỹ An, Mỹ An, Ngũ Hành Sơn, Đà Nẵng, Việt Nam",
    star: 3,
    rating: 3.3,
    feedbacks: 4,
    image: "https://cf.bstatic.com/xdata/images/hotel/max500/531742767.jpg?k=1ba12672d85a3117cd06ba6428159756a32fe585c68830c9e5260600e1512aae&o=",
    features: ["Free cancellation", "No prepayment needed - pay at property"],
  },
  {
    id: 4,
    name: "Bay Capital Danang",
    location: "Đà Nẵng",
    address: "Đia điểm: 06 10 Đỗ Bá, Đại Biển T20, Phường Mỹ An, Mỹ An, Ngũ Hành Sơn, Đà Nẵng, Việt Nam",
    star: 2,
    rating: 4.5,
    feedbacks: 4,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/43888647.jpg?k=16f396d5316c15a6404b8e2c8654a7d62fca55dd2d7cebe08b30bdc5167b5bf7&o=",
    features: ["Free cancellation", "No prepayment needed - pay at property"],
  },
]

const HotelSearchPage = () => {
  const [location, setLocation] = useState("Đà Nẵng")
  const [people, setPeople] = useState("5")
  const [rooms, setRooms] = useState("2")
  const [departureDate, setDepartureDate] = useState("06/18/2024")
  const [returnDate, setReturnDate] = useState("06/19/2024")
  const [starFilter, setStarFilter] = useState(null)
  const [priceRange, setPriceRange] = useState(1000)
 
  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Search parameters:", { location, people, rooms, departureDate, returnDate })
  }

  const filteredHotels = hotelData.filter((hotel) => {
    if (starFilter && hotel.star !== starFilter) {
      return false
    }
    return true
  })

  const renderStars = (count) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(<FaStar key={i} className={i < count ? "text-warning" : "text-muted"}  size={23}/>)
    }
    return stars
  }

  return (
    <div 
      className="d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${Banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Header/>
      <div className="flex-grow-1 d-flex align-items-center justify-content-center" style={{paddingTop: "50px", paddingBottom: "50px"}}>
        <Container style={{paddingTop: '50px', paddingBottom: '50px'}}>
        {/* Search Form */}
        <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
            <Form onSubmit={handleSearch}>
                <Row className="align-items-end g-3">
                <Col md={3}>
                    <Form.Group>
                    <Form.Label className="small text-muted">Where are you going?</Form.Label>
                    <InputGroup>
                        <InputGroup.Text className="bg-white">
                        <FaMapMarkerAlt className="text-primary" />
                        </InputGroup.Text>
                        <Form.Select value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option>Đà Nẵng</option>
                        <option>Hà Nội</option>
                        <option>Hồ Chí Minh</option>
                        </Form.Select>
                    </InputGroup>
                    </Form.Group>
                </Col>

                <Col md={2}>
                    <Form.Group>
                    <Form.Label className="small text-muted">No. of people</Form.Label>
                    <InputGroup>
                        <InputGroup.Text className="bg-white">
                        <FaUserFriends className="text-primary" />
                        </InputGroup.Text>
                        <Form.Control
                        type="number"
                        placeholder="Add guests"
                        value={people}
                        onChange={(e) => setPeople(e.target.value)}
                        />
                    </InputGroup>
                    </Form.Group>
                </Col>

                <Col md={2}>
                    <Form.Group>
                    <Form.Label className="small text-muted">Departure</Form.Label>
                    <InputGroup>
                        <InputGroup.Text className="bg-white">
                        <FaCalendarAlt className="text-primary" />
                        </InputGroup.Text>
                        <Form.Control
                        type="text"
                        placeholder="Add date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        />
                    </InputGroup>
                    </Form.Group>
                </Col>

                <Col md={2}>
                    <Form.Group>
                    <Form.Label className="small text-muted">Return</Form.Label>
                    <InputGroup>
                        <InputGroup.Text className="bg-white">
                        <FaCalendarAlt className="text-primary" />
                        </InputGroup.Text>
                        <Form.Control
                        type="text"
                        placeholder="Add date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        />
                    </InputGroup>
                    </Form.Group>
                </Col>

                <Col md={2}>
                    <Form.Group>
                    <Form.Label className="small text-muted">Rooms</Form.Label>
                    <InputGroup>
                        <InputGroup.Text className="bg-white">
                        <FaBed className="text-primary" />
                        </InputGroup.Text>
                        <Form.Control
                            type="number"
                            placeholder="Number of rooms"
                            value={rooms}
                            onChange={(e) => setRooms(e.target.value)}
                        />
                    </InputGroup>
                    </Form.Group>
                </Col>

                <Col md={1}>
                    <Button
                    variant="primary"
                    type="submit"
                    className="w-100 d-flex align-items-center justify-content-center"
                    >
                    <FaSearch className="me-1" /> Search
                    </Button>
                </Col>
                </Row>
            </Form>
            </Card.Body>
        </Card>

        {/* Main Content */}
        <Row>
            {/* Filters */}
            <Col md={3}>
            <Card className="shadow-sm mb-4">
                <Card.Body>
                <h5 className="mb-3">Lọc khách sạn</h5>

                {/* Star Rating Filter */}
                <div className="mb-4">
                    <Form>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Form.Check
                        key={star}
                        type="radio"
                        id={`star-${star}`}
                        name="starRating"
                        label={
                            <div className="d-flex align-items-center">
                            {[...Array(star)].map((_, i) => (
                                <FaStar key={i} className="text-warning me-1" />
                            ))}
                            </div>
                        }
                        onChange={() => setStarFilter(star)}
                        checked={starFilter === star}
                        />
                    ))}
                    <Form.Check
                        type="radio"
                        id="star-all"
                        name="starRating"
                        label="All ratings"
                        onChange={() => setStarFilter(null)}
                        checked={starFilter === null}
                    />
                    </Form>
                </div>

                {/* Price Range */}
                <div>
                    <h6 className="mb-2">Price Range</h6>
                    <Form.Label className="d-flex justify-content-between">
                    <span>0</span>
                    <span>1000$</span>
                    </Form.Label>
                    <Form.Range value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
                    <div className="text-center mt-2">
                    <Badge bg="secondary">${priceRange * 10}</Badge>
                    </div>
                </div>
                </Card.Body>
            </Card>
            </Col>
            
            {/* Hotel Listings */}
        <Col md={9}>
        {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel, index) => (
            <Card key={hotel.id || index} className="mb-3 shadow-sm">
                <Row className="g-0">
                    <Col md={4}>
                        <div className="position-relative h-100">
                        {hotel.isHot && (
                            <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
                            HOT
                            </Badge>
                        )}
                        <img
                            src={hotel.image ? hotel.image : "/placeholder.svg"}
                            alt={hotel.name || "Unnamed Hotel"}
                            className="img-fluid rounded-start hotel-image"
                            style={{ height: "100%", objectFit: "cover" }}
                        />
                        </div>
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <h5 className="card-title">{hotel.name || "No Name"}</h5>
                                <p className="text-muted mb-1">
                                    {hotel.location || "Unknown Location"} -{" "}
                                    <a href="#" className="text-primary">
                                    Show on map
                                    </a>
                                </p>
                                <p className="text-muted small mb-2">
                                    <FaMapMarkerAlt className="me-1 text-secondary" />
                                    {hotel.address || "No Address Provided"}
                                </p>
                                <p style={{marginTop: '15px'}}>
                                    <span className="rating-box p-2" style={{marginRight: '10px'}}>{hotel.rating}</span>
                                    <span className="text-muted">{hotel.feedbacks} feedbacks</span>
                                </p>
                                {/* Features */}
                                <div className="mt-3">
                                    {hotel.features && hotel.features.length > 0 ? (
                                    hotel.features.map((feature, i) => (
                                        <p key={i} className="mb-1 text-success small" style={{fontSize: 18}}>
                                        <FaCheck className="me-1" /> {feature}
                                        </p>
                                    ))
                                    ) : (
                                    <p className="text-muted small">No features available</p>
                                    )}
                                </div>
                            </div>
                            <div className="d-flex">
                                {hotel.star ? renderStars(hotel.star) : "No Rating"}
                            </div>
                            
                        </div>
                        
                        <div className="text-end mt-3">
                            <Button variant="primary">Đặt Phòng</Button>
                        </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            ))
        ) : (
                <Alert variant="danger" style={{textAlign: "center"}}>No hotels available</Alert>
        )}
        </Col>
    </Row>
    </Container>
    </div>
        <Footer/>
    </div>
    );
}

export default HotelSearchPage

