import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { FaKey, FaImage, FaHistory, FaHeart, FaComment } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../css/customer/MyAccountPage.css";
import ChangePassword from "./components/ChangePasswordHotel";
import ViewInformation from "./components/ViewInformationHotel";
import ViewAvatar from "./components/ViewAvatarHotel";
import Banner from "../../../images/banner.jpg";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../customer/Header";
import Footer from "../../customer/Footer";
import Sidebar from "pages/hotelHost/Sidebar";

function MyAccountHotelPage() {
  const location = useLocation();
  const { id } = location.state || {}; // Lấy dữ liệu từ state
  useEffect(() => {
    if (id) {
      setIndexActive(id);
    }
  }, [location.state?.id]);
  const [indexActive, setIndexActive] = useState(0);
  const handleMenuClick = (index) => {
    setIndexActive(index);
  };
  const menuItems = [
    { name: "My Account", icon: <IoSettingsSharp /> },
    { name: "Change Password", icon: <FaKey /> },
    { name: "View Avatar", icon: <FaImage /> },
  ];

  return (
    <div className="d-flex ">
      {/* Sidebar */}
      <div className="col-md-2">
        <Sidebar/>
      </div>

      {/* Main content */}
      <div className="col-md-10" style={{height: '100vh', alignItems: "center"}}>
        <Container className="mt-4">
          <Row>
            <Col md={3} className="mb-4">
              <Card className="sidebar">
                <div className="user-profile text-center p-3 border-bottom">
                  <div className="avatar-circle">
                    <img
                      src="https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"
                      className="rounded-circle mb-2"
                      style={{ width: "80px", height: "80px" }}
                      alt="avatar"
                    />
                  </div>
                  <h5 className="mt-2 mb-0">Nguyễn Văn Nam</h5>
                  <small className="text-muted">Google</small>
                </div>
                <ListGroup variant="flush">
                  {menuItems.map((item, index) => (
                    <ListGroup.Item
                      key={item.name}
                      className={`menu-item ${
                        index === indexActive ? "active" : ""
                      }`}
                      onClick={() => handleMenuClick(index)}
                    >
                      <span className="menu-icon">{item.icon}</span>
                      <span className="menu-text">{item.name}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
            <Col md={9}>
              <Card style={{ backgroundColor: "rgba(255, 255, 255,0.9)" }}>
                {indexActive == 0 && <ViewInformation />}
                {indexActive == 1 && <ChangePassword />}
                {indexActive == 2 && <ViewAvatar />}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default MyAccountHotelPage;
