import { Container, Row, Col, Button, Card, Form, InputGroup } from "react-bootstrap"
import {FaMapMarkerAlt,FaHotel,FaSearch,FaCalendarAlt,FaChild,FaUser,FaStar} from "react-icons/fa"
import NavigationBar  from "../header";
import Footer  from "../footer";
import "../../../css/customer/home.css"
import image4 from "../../../images/image_3.png";
import image5 from "../../../images/image-1.png";
import image6 from "../../../images/unsplash_7uXn7nudorc_1.png";
import travel1 from "../../../images/image 10.png";
import travel2 from "../../../images/image 10 (1).png";
import travel3 from "../../../images/unsplash_tQpypKA92k8.png";
function Home() {
    return (
      <div className="app-container">
        <NavigationBar />
        <HeroSection />
       <SearchBar/>
       <OtherHotels/>
       <AboutUs/>
       <HotelBooking/>
        <Footer />
        
      
      </div>
    )
  }
  
  
  function HeroSection() {
    return (
      <div className="hero-section">
        <div className="hero-content">
          <h1 style={{textAlign:"center"}}>Discover Your Life, Travel 
            <br></br>Where You Want</h1>
            <h5 style={{marginTop:"16",textAlign:"center"}}>Would you explore natur paradise in the world, let’s find the<br></br> best destination in world with us.</h5>
          
        </div>
      </div>
    )
  }

const SearchBar = () => {
  return (
    <Container fluid style={{marginTop:"-4%"}}>
      <Row className="search search-section d-flex align-items-center justify-content-center rounded shadow-sm bg-white py-3 pt-4 pb-4" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Ô nhập địa điểm */}
        <Col md={3} className="text-center px-2">
          <InputGroup className="border rounded-pill px-2">
            <InputGroup.Text className="bg-transparent border-0">
              <FaMapMarkerAlt />
            </InputGroup.Text>
            <Form.Control type="text" placeholder="Enter location..." className="border-0 bg-transparent" />
          </InputGroup>
        </Col>

        {/* Ô nhập tìm kiếm khách sạn */}
        <Col md={3} className="text-center px-2">
          <InputGroup className="border rounded-pill px-2">
            <InputGroup.Text className="bg-transparent border-0">
              <FaHotel />
            </InputGroup.Text>
            <Form.Control type="text" placeholder="Search hotels, places..." className="border-0 bg-transparent" />
          </InputGroup>
        </Col>

        {/* Ô chọn ngày */}
        <Col md={2} className="text-center px-2">
          <InputGroup className="border rounded-pill px-2">
            <InputGroup.Text className="bg-transparent border-0">
              <FaCalendarAlt />
            </InputGroup.Text>
            <Form.Control type="date" className="border-0 bg-transparent" />
          </InputGroup>
        </Col>

        {/* Ô chọn số lượng Adults và Children */}
        <Col md={3} className="text-center px-2">
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
          <Button variant="primary" style={{ padding: "0.375rem 1.5rem" }}>
            <FaSearch />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
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
      <Container className="other-hotels-section" style={{marginTop:"8%"}}>
        <h1 className="section-title">Other hotels in the area</h1>
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
  };
  const AboutUs = () => {
    return (
      <Container className="about-us-container">
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h2 className="about-title">About Us</h2>
            <p className="about-subtitle">Book Anywhere, Perfect Experience</p>
          </Col>
        </Row>
  
        <Row className="align-items-center">
          {/* Nội dung giới thiệu */}
          <Col md={6} className="ms-auto">
          <p className="about-text">
  At our core, we strive to be the ultimate bridge connecting travelers with extraordinary stays across the globe. 
  With a vast network spanning over 10,000 hotels, from serene beach resorts to luxurious city-center accommodations, 
  we ensure you always have access to the perfect lodging that fits your style and budget.
  <br />
  <br />
  Our platform is designed to provide a seamless and efficient booking experience, offering you competitive prices, 
  exclusive seasonal discounts, and a hassle-free reservation process. Whether you're planning a short business trip 
  or a long-term getaway, our user-friendly system helps you make informed choices with ease.
  <br />
  <br />
  More than just a booking service, we take pride in delivering a superior travel experience. Our dedicated 
  customer support team is available 24/7 to assist you, ensuring every aspect of your journey is smooth and stress-free. 
  From personalized recommendations to last-minute changes, we are here to make your travel plans effortless. 
  Let us be your trusted travel partner, accompanying you on every adventure, big or small.
</p>


          </Col>
  
          {/* Hình ảnh */}
          <Col md={6} className="about-images">
            <div className="image-stack" style={{marginLeft:"30%",marginTop:"5%"}}>
              <img src={travel1} alt="Travel 1" className="top-image" />
              <img src={travel2} alt="Travel 2" className="bottom-image" />
            </div>
          </Col>
        </Row>
      </Container>
    );
  };
  const HotelBooking = () => {
    return (
      <Container className="hotel-booking" style={{marginTop:"15%"}}>
        <Row className="align-items-center">
          <Col md={6} className="position-relative">
            <div className="image-container">
              <img
                src={travel3}
                alt="Traveler"
                className="main-image"
              />
              <div className="info-badge top-right"><span style={{color:"#3E86F5",fontSize:"25px"}}>100+</span><br></br> DESTINATIONS</div>
              <div className="info-badge bottom-right"><span style={{color:"#3E86F5",fontSize:"25px"}}>150+</span><br></br>HOTELS</div>
              <div className="info-badge bottom-left"><span style={{color:"#3E86F5",fontSize:"25px"}}>50+</span><br></br> ROOM TYPE</div>
            </div>
          </Col>
          <Col md={6} style={{ marginTop: "-15%" }}>
  <h2 style={{ fontWeight: "bold" }}>Book Hotels Anywhere with Us</h2>
  <p style={{ fontSize: "16px", color: "#666" }}>
    Whether you're planning a luxurious getaway, a family vacation, or a business trip, we are here to make your hotel booking experience seamless and hassle-free. 
    Our platform connects you with thousands of hotels worldwide, from high-end resorts by the beach to cozy stays in the heart of the city. 
  </p>
  <p style={{ fontSize: "16px", color: "#666" }}>
    Enjoy exclusive deals, seasonal discounts, and a wide range of accommodations tailored to your budget and preferences. 
    Our easy-to-use online booking system ensures that you find the perfect place to stay with just a few clicks. 
    Plus, our dedicated customer support team is available 24/7 to assist you at every step of your journey.
  </p>
  <p style={{ fontSize: "16px", color: "#666" }}>
    Experience a seamless travel planning process with us, whether you're looking for a short weekend escape or a long-term stay. 
    Let us take care of your accommodation needs so you can focus on creating unforgettable memories.
  </p>
  <Button variant="primary" style={{ marginTop: "5%" }}>Contact Us</Button>
</Col>

        </Row>
      </Container>
    );
  };



  export default Home;
  