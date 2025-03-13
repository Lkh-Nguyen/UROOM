import { Container, Row, Col, Button, Card, Form, InputGroup,Image } from "react-bootstrap"
import { FaStar, FaWifi, FaSwimmingPool, FaParking, FaUtensils, FaSearch,FaCalendarAlt,FaChild,FaUser,FaQuoteLeft,FaThumbsUp,FaThumbsDown } from "react-icons/fa"
import "bootstrap/dist/css/bootstrap.min.css"
import "../../../../src/css/customer/RoomDetailPage.css"
import NavigationBar from "../Header"; 
import Footer from "../Footer"; 
// import main_room from "../../../images/image_3.png";
import room1 from "../../../images/room1.png";
import room2 from "../../../images/room2.png";
import room3 from "../../../images/room3.png";
import { useState,useEffect } from "react";
const imageList = [room1, room2, room3];


function App() {
  return (
    <div className="app-container">
     <NavigationBar className="custom-navbar" />

      
      <MainContent />
     
      <Footer />
      
    
    </div>
  )
}




function MainContent() {
    const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 3000); // Đổi ảnh sau mỗi 3 giây

    return () => clearInterval(interval);
  }, []);
  return (
    <Container className="main-content_1">
        <h1 style={{textAlign:"center",marginTop:"10%",marginBottom:"-3%"}}>
        Standard Room
        </h1>
      <Card className="content-card_1">
        <Row>
          <Col lg={6}>
          <div className="main-image-container">
              <img src={imageList[currentIndex]} alt="Room Slide" className="main-image" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="hotel-info">
             
              <h2 style={{fontWeight:"bold",color: "#1a2b49"}}>Favorite amenities</h2>
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
            <div style={{marginTop:"15%"}}>
                <ul>
                    <li>Size: Typically ranges from 18 - 25m², depending on the hotel design.</li>
                    <li>Occupancy: Suitable for 1 - 2 guests.</li>
                    <li>Bed Options: 1 Queen/King-size bed or 2 Twin beds</li>
                </ul>
               
            </div>
            <div className="price-container" style={{marginTop:"30%"}}>
                <div style={{   marginLeft: "auto"}}>
                <span className="price">150$</span>
                <span className="per-day">/Day</span>
                </div>
                
                  <Button
                    variant="outline-primary"
                    style={{   marginLeft: "auto",padding:"0.7rem 4.5rem",fontWeight:"500"}}
                  >
                    Book Now
                  </Button>
                </div>
           
          </Col>
        </Row>
       
       
    
   
      </Card>
    </Container>
  )
}





export default App

