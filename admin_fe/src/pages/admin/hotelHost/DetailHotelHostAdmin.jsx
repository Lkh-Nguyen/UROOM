import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { MdLocationOn } from "react-icons/md";
import React, { useState } from "react";
import Sidebar from "../SidebarAdmin";
import {
  FaStar,
  FaDumbbell,
  FaUtensils,
  FaSwimmingPool,
  FaWifi,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import ListFeedbackAdminPage from "../feedback/ListFeedbackAdminPage";
import * as Routers from "../../../utils/Routes";
import { useNavigate } from "react-router-dom";
const transactions = [
  {
    date: "10/03/2025",
    id: "TX-2025-0342",
    type: "Completed",
    amount: "$4000",
    typeClass: "success",
  },
  {
    date: "15/03/2025",
    id: "TX-2025-0356",
    type: "Completed",
    amount: "$200",
    typeClass: "success",
  },
  {
    date: "17/03/2025",
    id: "TX-2025-0361",
    type: "pendding",
    amount: "1,500,000 VND",
    typeClass: "primary",
  },
];
const reviews = [
  {
    name: "Nguyễn Văn A",
    initials: "NA",
    color: "#AECBFA",
    rating: 5,
    comment: "Khách sạn rất đẹp, dịch vụ tuyệt vời!",
  },
  {
    name: "Trần Thị B",
    initials: "TB",
    color: "#FDCEDF",
    rating: 4,
    comment: "Phòng rộng rãi, sạch sẽ, giá hợp lý.",
  },
  {
    name: "Lê Hoàng C",
    initials: "LC",
    color: "#C8F7C5",
    rating: 5,
    comment: "Nhân viên thân thiện, đáng quay lại!",
  },
];

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-warning" />);
    } else if (i - 0.5 === rating) {
      stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-warning" />);
    }
  }
  return stars;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");
  return (
    <div className="container">
      <button
        className="btn btn-secondary mt-2"
        onClick={() => navigate(-1)}
      >
        ← Quay lại
      </button>

      <div className="main-content_1 p-3">
        <h2 className=" fw-bold mb-4 mt-4">Hotel management</h2>
        <Row>
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Header className="fw-bold bg-light d-flex align-items-center">
                <span role="img" aria-label="lock" className="me-2">
                  🔒
                </span>
                Account management
              </Card.Header>
              <Card.Body className="text-center">
                <Button variant="dark">Lock</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Header className="fw-bold text-primary">
                Trạng thái
              </Card.Header>
              <Card.Body>
                <p>
                  Account status <Badge bg="dark">Activity</Badge>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
          variant="pills"
          style={{ color: "black" }}
        >
          <Tab
            eventKey="info"
            title={<span style={{ color: "black" }}>Hotel Information</span>}
          >
            <Card className="p-4 shadow-sm border-0 bg-light">
              <h3 className="mb-4 text-success">Hotel Information</h3>
              <Row>
                <Col md={4} className="text-center">
                  <img
                    src="https://i.pinimg.com/736x/f4/30/5b/f4305bc51ee926d99fc9f0c6cefabfdc.jpg"
                    alt="Hotel"
                    className="img-fluid"
                  />
                  <div className="hotel-rating mt-2">{renderStars(5)}</div>
                </Col>
                <Col md={8}>
                  <Row>
                    <Col md={6}>
                      <Card className="p-3 mb-3 border-0 shadow-sm">
                        <small className="text-muted">Hotel Name</small>
                        <h5 className="fw-bold">Grand Palace Hotel</h5>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card className="p-3 mb-3 border-0 shadow-sm">
                        <small className="text-muted">Email</small>
                        <h5 className="fw-bold">
                          <FaEnvelope /> hotel@example.com
                        </h5>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card className="p-3 mb-3 border-0 shadow-sm">
                        <small className="text-muted">Phone</small>
                        <h5 className="fw-bold">
                          <FaPhone /> 0123 456 789
                        </h5>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card className="p-3 mb-3 border-0 shadow-sm">
                        <small className="text-muted">Address</small>
                        <h5 className="fw-bold">
                          <FaMapMarkerAlt /> 123 Nguyen Trai, Hanoi
                        </h5>
                      </Card>
                    </Col>
                  </Row>
                  <Card className="p-3 border-0 shadow-sm">
                    <small className="text-muted">Amenities</small>
                    <div className="d-flex gap-2 mt-2">
                      <Badge bg="dark">
                        <FaWifi /> Wifi
                      </Badge>
                      <Badge bg="dark">
                        <FaSwimmingPool /> Swimming Pool
                      </Badge>
                      <Badge bg="dark">
                        <FaUtensils /> Restaurant
                      </Badge>
                      <Badge bg="dark">
                        <FaDumbbell /> Gym
                      </Badge>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Tab>
          <Tab
            eventKey="transactions"
            title={<span style={{ color: "black" }}>Transaction History</span>}
          >
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Transaction ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={index}>
                    <td>{tx.date}</td>
                    <td>{tx.id}</td>
                    <td>
                      <Badge bg={tx.typeClass}>{tx.type}</Badge>
                    </td>
                    <td>{tx.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab
            eventKey="reviews"
            title={<span style={{ color: "black" }}>Customer Reviews</span>}
          >
            <ListFeedbackAdminPage />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
