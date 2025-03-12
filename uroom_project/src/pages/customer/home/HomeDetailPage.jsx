import { Container, Row, Col, Button, Card, Form, InputGroup } from "react-bootstrap"
import { FaStar, FaWifi, FaSwimmingPool, FaParking, FaUtensils, FaSearch,FaCalendarAlt,FaChild,FaUser,FaQuoteLeft,FaThumbsUp,FaThumbsDown } from "react-icons/fa"
import "bootstrap/dist/css/bootstrap.min.css"
import "../../../../src/css/customer/Home_detail.css"
import NavigationBar from "../Header"; 
import Footer from "../Footer"; 
import main_room from "../../../images/image_3.png";
import room1 from "../../../images/room1.png";
import room2 from "../../../images/room2.png";
import room3 from "../../../images/room3.png";
import image1 from "../../../images/image_(1).png";
import image2 from "../../../images/image_2.png";
import image3 from "../../../images/unsplash_7uXn7nudorc.png";
import image4 from "../../../images/image_3.png";
import image5 from "../../../images/image-1.png";
import image6 from "../../../images/unsplash_7uXn7nudorc_1.png";
import image7 from "../../../images/Ellipse_3_(1).png";
import image8 from "../../../images/Ellipse_3.png";
import * as Routers from "../../../utils/Routes";

const imageList = [room1, room2, room3];


function App() {
  return (
    <div className="app-container">
      <NavigationBar />
      <HeroSection />
      <MainContent />
      <SearchBar />
      <HotelRooms />
      <OtherHotels />
      <CustomerReviews/>
      <Footer />
      
    
    </div>
  )
}


function HeroSection() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Hotel Paradise</h1>
        <div className="rating">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} className="star-filled" />
          ))}
        </div>
      </div>
    </div>
  )
}

function MainContent() {
  return (
    <Container className="main-content">
      <Card className="content-card">
        <Row>
          <Col lg={6}>
          <div className="main-image-container">
      <img src={main_room} alt="Main Room" className="main-image" />
      <div className="thumbnail-container">
        {imageList.map((image, index) => (
          <img key={index} src={image} alt={`Room ${index + 1}`} className="thumbnail" />
        ))}
      </div>
    </div>
          </Col>
          <Col lg={6}>
            <div className="hotel-info">
              <h2 style={{fontWeight:"bold"}}>Introducing the accommodation</h2>
              <p>
              Experience unparalleled luxury and comfort at our hotel, where modern amenities meet exceptional hospitality. Enjoy high-speed Wi-Fi in every room, unwind at our world-class spa, stay active in our state-of-the-art fitness center, and indulge in exquisite dining at our restaurant. Take in breathtaking views from our scenic terrace, creating the perfect setting for relaxation. Conveniently located near top attractions, our hotel is the ideal choice for both business and leisure travelers seeking a seamless and memorable stay.
              </p>

              <h3 style={{fontWeight:"bold"}}>Highlights of the property</h3>
              <ul className="highlights-list">
                <li>Luxurious rooms with mountain views</li>
                <li>Full-service spa and wellness center</li>
                <li>Fine dining restaurant and bar</li>
                <li>24/7 concierge service</li>
              </ul>
              <h3 style={{fontWeight:"bold",color: "#1a2b49"}}>Favorite amenities</h3>
              <div className="amenities-grid">
                <div className="amenity-item">
                  <FaWifi />
                  <span>Free WiFi</span>
                </div>
                <div className="amenity-item">
                  <FaSwimmingPool />
                  <span>Swimming pool</span>
                </div>
                <div className="amenity-item">
                  <FaParking />
                  <span>Parking</span>
                </div>
                <div className="amenity-item">
                  <FaUtensils />
                  <span>Restaurant</span>
                </div>
              </div>
             
            </div>
           
          </Col>
        </Row>
       
       
    
   
      </Card>
    </Container>
  )
}
const SearchBar = () => {
  return (
    <Container fluid>
      <Row className="search-section d-flex align-items-center justify-content-center rounded shadow-sm bg-white  pt-5 pb-5" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Ô chọn ngày */}
        <Col md={3} className="text-center px-2">
          <InputGroup className="border rounded-pill px-2">
            <InputGroup.Text className="bg-transparent border-0">
              <FaCalendarAlt />
            </InputGroup.Text>
            <Form.Control type="date" className="border-0 bg-transparent" />
          </InputGroup>
        </Col>

        {/* Ô chọn số lượng Adults và Children */}
        <Col md={4} className="text-center px-2">
          <InputGroup className="border rounded-pill px-2">
            <InputGroup.Text className="bg-transparent border-0">
              <FaUser />
            </InputGroup.Text>
            <Form.Select className="border-0 bg-transparent">
              <option>Adults 2</option>
              <option>1</option>
              <option>2</option>
              <option>3+</option>
            </Form.Select>

            <InputGroup.Text className="bg-transparent border-0">
              <FaChild />
            </InputGroup.Text>
            <Form.Select className="border-0 bg-transparent">
              <option>Children 0</option>
              <option>0</option>
              <option>1</option>
              <option>2+</option>
            </Form.Select>
          </InputGroup>
        </Col>

        {/* Nút tìm kiếm */}
        <Col md={1} className="text-center">
          <Button variant="primary"  style={{ padding: "0.375rem 1.5rem" }}>
            <FaSearch />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};


function HotelRooms() {
  const rooms = [
    {
      id: 1,
      type: "Standard Room",
      price: 150,
      guests: 2,
      image: image1,
    },
    {
      id: 2,
      type: "Deluxe Room",
      price: 200,
      guests: 2,
      image: image2,
    },
    {
      id: 3,
      type: "Superior Room",
      price: 300,
      guests: 4,
      image: image3,
    },
  ]

  return (
    <Container className="rooms-section">
      <h2 className="section-title">Hotel rooms</h2>
      <Row>
        {rooms.map((room) => (
          <Col md={4} key={room.id}>
            <Card className="room-card">
              <div className="room-image-container">
                <Card.Img variant="top" src={room.image} className="room-image" />
              </div>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Card.Title className="room-title">{room.type}</Card.Title>
                  <div className="guests-count">
                    <i className="fas fa-user"></i> {room.guests}
                  </div>
                </div>
                <div className="price-container">
                  <span className="price">{room.price}$</span>
                  <span className="per-day">/Day</span>
                  <div className="amount-container">
                    Amount <span className="amount">0</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Button variant="primary" size="lg" className="book-now-btn" href={Routers.BookingCheckPage}>
          Book Now
        </Button>
      </div>
    </Container>
  )
}

function OtherHotels() {
  const hotels = [
    {
      id: 1,
      name: "Hotel Paradise",
      roomType: "Deluxe Room",
      price: 300,
      guests: 2,
      image: image4,
    },
    {
      id: 2,
      name: "Royal Pearl Hotel",
      roomType: "Executive Room",
      price: 700,
      guests: 2,
      image: image5,
    },
    {
      id: 3,
      name: "Blue Horizon Resort",
      roomType: "Sea View Room",
      price: 340,
      guests: 2,
      image: image6,
    },
  ]

  return (
    <Container className="other-hotels-section">
      <h2 className="section-title">Other hotels in the area</h2>
      <Row>
        {hotels.map((hotel) => (
          <Col md={4} key={hotel.id}>
            <Card className="hotel-card">
              <div className="hotel-image-container">
                <Card.Img variant="top" src={hotel.image} className="hotel-image" />
                <div className="rating-overlay">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>
              </div>
              <Card.Body>
                <Card.Title className="hotel-name">{hotel.name}</Card.Title>
                <div className="room-info">
                  <span className="room-type">{hotel.roomType}</span>
                  <span className="guests-count">
                    <i className="fas fa-user"></i> {hotel.guests}
                  </span>
                </div>
                <div className="price-container_1">
                  <span className="price">{hotel.price}$</span>
                  <span className="per-day">/Day</span>
                  <Button  className="book-now-btn " style={{marginLeft:"18%"}}>
                    Book Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      text: "Great experience! Professional service, clean and modern room.",
      author: "Vand D",
      rating: 4.5,
      image: "/placeholder.svg?height=60&width=60&text=VD",
    },
    {
      id: 2,
      text: "Quick booking process, many attractive offers",
      author: "Tru Vio",
      rating: 4.8,
      image: "/placeholder.svg?height=60&width=60&text=TV",
    },
  ]

  return (
    <Container className="reviews-section">
      <h2 className="reviews-title">Customer Reviews</h2>
      <Row>
        {reviews.map((review) => (
          <Col md={6} key={review.id}>
            <div className="review-card">
              <FaQuoteLeft className="quote-icon" style={{alignItems:"center"}} />
              <p className="review-text">{review.text}</p>
              <div className="review-actions">
                <button className="action-btn">
                  <FaThumbsUp />
                </button>
                <button className="action-btn">
                  <FaThumbsDown />
                </button>
              </div>
              <div className="reviewer-info">
                <div className="reviewer-name">-{review.author}</div>
                <div className="reviewer-status">Happy Treloo</div>
                <div className="reviewer-profile">
                  <img src={review.image || image7} alt={review.author} className="reviewer-image" />
                  <div className="rating">
                    <FaStar className="star-icon" />
                    <span>{review.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}




export default App

