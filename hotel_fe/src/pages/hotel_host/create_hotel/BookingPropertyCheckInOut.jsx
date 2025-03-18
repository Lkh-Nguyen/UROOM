import React from "react";
import {
  Navbar,
  Container,
  Button,
  Form,
  Card,
  ProgressBar,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiArrowLeft } from "react-icons/fi";
import * as Routers from "../../../utils/Routes";
import { useNavigate } from "react-router-dom";

function BookingPropertyCheckInOut() {
  const navigate = useNavigate();

  return (
    <div className="booking-app">
      {/* Navigation Bar */}
      <Navbar className="navbar-custom">
        <Container>
          <Navbar.Brand href="#home" className="text-white fw-bold">
            <b style={{ fontSize: 30 }}>
              UR<span style={{ color: "#f8e71c" }}>OO</span>M
            </b>
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Progress Bar */}
      <Container className="mt-4">
        <div className="progress-section">
          <div className="progress-label mb-2">
            <h5>Thông tin cơ bản</h5>
          </div>
          <ProgressBar style={{ height: "20px" }}>
            <ProgressBar variant="primary" now={20} key={1} />
            <ProgressBar variant="primary" now={20} key={2} />
            <ProgressBar variant="primary" now={20} key={3} />
            <ProgressBar variant="primary" now={20} key={4} />
            <ProgressBar variant="secondary" now={20} key={5} />
          </ProgressBar>
        </div>
      </Container>

      {/* Main Content */}
      <Container className="main-content py-4">
        <Row>
          <Col md={7}>
            {/* Main Content */}
            <Container className="main-content">
              <div className="mb-4">
                <h1 className="main-heading">Các quy định về checkin checkout</h1>
              </div>

              {/* Facility Form */}
              <div
                className="facility-form-card"
                style={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  padding: "20px",
                }}
              >
                {/* Nhận phòng */}
                <Row className="mb-2">
                  <Col>
                    <h6>Nhận phòng</h6>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>Từ</Form.Label>
                    <Form.Select defaultValue="15:00">
                      <option>14:00</option>
                      <option>15:00</option>
                      <option>16:00</option>
                      <option>17:00</option>
                      <option>18:00</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Label>Đến</Form.Label>
                    <Form.Select defaultValue="18:00">
                      <option>16:00</option>
                      <option>17:00</option>
                      <option>18:00</option>
                      <option>19:00</option>
                    </Form.Select>
                  </Col>
                </Row>

                {/* Trả phòng */}
                <Row className="mb-2 mt-4">
                  <Col>
                    <h6>Trả phòng</h6>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Từ</Form.Label>
                    <Form.Select defaultValue="08:00">
                      <option>07:00</option>
                      <option>08:00</option>
                      <option>09:00</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Label>Đến</Form.Label>
                    <Form.Select defaultValue="11:00">
                      <option>10:00</option>
                      <option>11:00</option>
                      <option>12:00</option>
                    </Form.Select>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="navigation-buttons mt-4">
              <Button
                variant="outline-primary"
                onClick={() => {
                  navigate("/BookingPropertyFacility");
                }}
              >
                <FiArrowLeft className="back-icon" />
              </Button>
              <Button
                variant="primary"
                className="continue-button"
                onClick={() => {
                  navigate("/BookingPropertyDescription");
                }}
              >
                Tiếp tục
              </Button>
            </div>
          </Col>

          <Col md={5}>
            <div className="info-cards">
              {/* Second Info Card */}
              <Card className="info-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="info-icon lightbulb">
                      <span role="img" aria-label="lightbulb">
                        💡
                      </span>
                    </div>
                    <div className="info-content">
                      <h5 className="info-title">
                        Nếu quy tắc chung của chỗ nghỉ thay đổi thì sao?
                      </h5>
                    </div>
                  </div>
                  <p className="info-text mt-3">
                    Quý vị có thể dễ dàng tùy chỉnh các quy tắc chung này sau và
                    các quy tắc chung bổ sung có thể được cài đặt trong trang
                    Chính sách trên extranet sau khi hoàn tất đăng ký.
                  </p>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx="true">{`
        /* Custom CSS */
        .booking-app {
          min-height: 100vh;
        }

        /* Navbar styles */
        .navbar-custom {
          background-color: #003580;
          padding: 10px 0;
        }

        .help-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background-color: #fff;
          color: #003580;
          border-radius: 50%;
          font-weight: bold;
        }

        .user-icon-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background-color: #fff;
          border-radius: 50%;
          margin-left: 10px;
        }

        /* Progress bar styles */
        .progress-section {
          margin: 0 auto;
        }

        .progress-label {
          font-size: 14px;
          color: #333;
        }

        .progress {
          height: 8px;
          background-color: #e7e7e7;
        }

        .progress-bar-primary {
          background-color: #0071c2;
        }

        .progress-bar-secondary {
          background-color: #e7e7e7;
        }

        /* Main content styles */
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .main-heading {
          font-size: 28px;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
        }

        /* Property form styles */
        .property-form-card {
          background-color: #fff;
          border-radius: 4px;
          padding: 20px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        }

        .form-input {
          height: 45px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 16px;
        }

        /* Navigation buttons */
        .navigation-buttons {
          display: flex;
          justify-content: space-between;
        }

        .back-button {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-color: #0071c2;
          color: #0071c2;
        }

        .continue-button {
          flex-grow: 1;
          margin-left: 10px;
          height: 45px;
          background-color: #0071c2;
          border: none;
          font-weight: bold;
        }

        .continue-button:hover {
          background-color: #005999;
        }

        /* Info cards styles */
        .info-card {
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
          border: none;
        }

        .info-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 20px;
        }

        .thumbs-up {
          background-color: #f5f5f5;
          color: #0071c2;
        }

        .lightbulb {
          background-color: #f5f5f5;
          color: #0071c2;
        }

        .info-content {
          flex-grow: 1;
          padding: 0 15px;
        }

        .info-title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 0;
        }

        .close-button {
          color: #666;
          padding: 0;
        }

        .info-list {
          padding-left: 20px;
          margin-bottom: 0;
        }

        .info-list li {
          margin-bottom: 5px;
        }

        .info-text {
          font-size: 14px;
          color: #333;
          margin-bottom: 0;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}

export default BookingPropertyCheckInOut;
