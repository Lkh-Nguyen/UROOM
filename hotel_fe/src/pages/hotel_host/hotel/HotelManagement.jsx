import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Image,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Clock,
  GeoAlt,
  Wifi,
  Tv,
  Droplet,
  Wind,
  Cup,
  Building,
  PersonCheck,
  ShieldCheck,
} from "react-bootstrap-icons";
import "../../../css/hotelHost/HotelManagement.css";
import { Star, StarFill } from "react-bootstrap-icons";
import Hotel from "./Hotel";

function HotelManagement() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showModal, setShowModal]= useState(false);

  // Hotel data
  const hotel = {
    name: "Khách Sạn Sunshine Palace",
    address: {
      city: "Hà Nội",
      district: "Phường Xuân Hà, Quận Hai Bà Trưng",
      specific: "15 Phố Trần Hưng Đạo",
    },
    amenities: [
      { name: "WiFi miễn phí", icon: <Wifi /> },
      { name: "TV màn hình phẳng", icon: <Tv /> },
      { name: "Nước nóng", icon: <Droplet /> },
      { name: "Điều hòa", icon: <Wind /> },
      { name: "Quầy bar", icon: <Cup /> },
      { name: "Phòng họp", icon: <Building /> },
      { name: "Dịch vụ phòng", icon: <PersonCheck /> },
      { name: "An ninh 24/7", icon: <ShieldCheck /> },
    ],
    checkIn: {
      from: "14:00",
      to: "22:00",
    },
    checkOut: {
      from: "06:00",
      to: "12:00",
    },
    stars: 4,
    description:
      "Khách sạn Sunshine Palace là một khách sạn sang trọng nằm ở trung tâm Hà Nội. Với vị trí thuận lợi, khách sạn cung cấp dịch vụ chất lượng cao và tiện nghi hiện đại. Phòng nghỉ được thiết kế tinh tế, tạo cảm giác thoải mái cho du khách. Nhà hàng trong khách sạn phục vụ các món ăn đặc sản địa phương và quốc tế. Đội ngũ nhân viên thân thiện và chuyên nghiệp luôn sẵn sàng hỗ trợ khách hàng 24/7.",
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/636651297.jpg?k=a174332a012227fd1eef89fc4b281941ecb1d12cb20d18ce2217bd660e95b8f2&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/636651307.jpg?k=8a543b0b236f4d31f049e39055cb5aba7f3bd9399a0feb77807813af9a8cc13c&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/636651309.jpg?k=61bd2ee76be2704cbad7d10869392496661990e79ef0af625af2e29d93d565f9&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/636651287.jpg?k=7279f5d268aa315a461733a33e3109caae28946287f43bd9901ff03711a7028d&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/636651315.jpg?k=75d77cb9c4fda006f58d48be6f19af16d31e084cb6840c37f41bb6220bd99d9e&o=&hp=1   ",
    ],
  };

  const renderStars = (count, total = 5) => {
    return [...Array(total)].map((_, i) =>
      i < count ? (
        <StarFill key={i} className="text-warning" />
      ) : (
        <Star key={i} className="text-warning" />
      )
    );
  };

  return (
    <div className="main-content_1 p-3">
      <div style={styles.header}>
        <h1 style={styles.title}>Thông tin khách sạn</h1>
        <Button style={styles.addButton} onClick={() => {setShowModal(true)}}>
          + Chỉnh sửa khách sạn
        </Button>
      </div>
      <Card className="border-0 shadow">
        <Card.Body className="p-4">
          <div className="hotel-header mb-4">
            <h1 className="hotel-name">{hotel.name}</h1>
            <div className="d-flex align-items-center mb-2">
              <div className="stars me-2">{renderStars(hotel.stars)}</div>
              <Badge bg="warning" text="dark" className="star-badge">
                {hotel.stars} sao
              </Badge>
            </div>
          </div>

          <Row>
            <Col lg={8}>
              <div className="main-image-container mb-3">
                <Image
                  src={hotel.images[selectedImage] || "/placeholder.svg"}
                  alt={`${hotel.name} - Ảnh chính`}
                  className="main-image"
                  fluid
                  style={{ height: "500px", width: "500px" }}
                />
              </div>

              <div className="image-thumbnails mb-4">
                {hotel.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${hotel.name} - Ảnh ${index + 1}`}
                    className={`thumbnail ${
                      selectedImage === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                    style={{ height: "100px", width: "100px" }}
                  />
                ))}
              </div>

              <div className="hotel-description mb-4">
                <h3 className="section-title">Mô tả</h3>
                <p>{hotel.description}</p>
              </div>

              <div className="hotel-amenities mb-4">
                <h3 className="section-title">Tiện nghi khách sạn</h3>
                <Row>
                  {hotel.amenities.map((amenity, index) => (
                    <Col key={index} xs={6} md={4} lg={3} className="mb-3">
                      <div className="amenity-item">
                        <span className="amenity-icon">{amenity.icon}</span>
                        <span className="amenity-name">{amenity.name}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>

            <Col lg={4}>
              <Card className="info-card">
                <Card.Body>
                  <div className="info-section">
                    <h4 className="info-title">
                      <GeoAlt className="me-2" />
                      Địa chỉ
                    </h4>
                    <p className="mb-1">{hotel.address.specific}</p>
                    <p>
                      {hotel.address.district}, {hotel.address.city}
                    </p>
                  </div>

                  <div className="info-section">
                    <h4 className="info-title">
                      <Clock className="me-2" />
                      Giờ nhận phòng
                    </h4>
                    <div className="time-badge check-in">
                      Từ {hotel.checkIn.from} đến {hotel.checkIn.to}
                    </div>
                  </div>

                  <div className="info-section">
                    <h4 className="info-title">
                      <Clock className="me-2" />
                      Giờ trả phòng
                    </h4>
                    <div className="time-badge check-out">
                      Từ {hotel.checkOut.from} đến {hotel.checkOut.to}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Hotel
        show={showModal}
        onHide={() => setShowModal(false)}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "30px auto",
    padding: "0 15px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    margin: 0,
  },
  addButton: {
    backgroundColor: "#0071c2",
    border: "none",
  },
};

export default HotelManagement;
