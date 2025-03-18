import { Container, Row, Col, Navbar, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../css/hotel_host/HomeHotel.css";
import { CheckCircle } from "react-bootstrap-icons";
import * as Routers from "../../../utils/Routes";
import { useNavigate } from 'react-router-dom';

function HomeHotel() {
  const navigate= useNavigate();
  return (
    <div className="booking-app">
      <Navbar bg="primary" variant="dark" className="booking-navbar">
        <Container>
          <Navbar.Brand href="#home">
            <b style={{ fontSize: 30 }}>
              UR<span style={{ color: "#f8e71c" }}>OO</span>M
            </b>
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <div className="language-selector me-3">
              <img
                src="https://t-cf.bstatic.com/design-assets/assets/v3.99.1/images-flags/Vn@3x.png"
                alt="Vietnam flag"
                className="flag-icon"
              />
              <span className="text-white ms-2">Already a partner?</span>
            </div>
            <Button variant="outline-light" className="me-2"
              onClick={() => {
                navigate(Routers.LoginHotelPage)
              }}
            >
              Login
            </Button>
            <Button variant="light">Help</Button>
          </div>
        </Container>
      </Navbar>

      <div className="hero-section1">
        <Container>
          <Row className="align-items-center">
            <Col md={7}>
              <div className="hero-content">
                <h1>
                  List your
                  <div className="highlight-text">apartment</div>
                  on Uroom.com
                </h1>
                <p
                  className="hero-description"
                  style={{ fontSize: 20, fontWeight: 500 }}
                >
                  Whether hosting is your sideline passion or full-time job,
                  list your home today and quickly start earning more income.
                </p>
              </div>
            </Col>
            <Col md={5}>
              <Card className="registration-card">
                <Card.Body>
                  <h2 className="registration-title">Register for free</h2>

                  <div className="benefit-item">
                    <div className="check-icon">✓</div>
                    <div className="benefit-text">
                      45% of hosts get their first booking within a week
                    </div>
                  </div>

                  <div className="benefit-item">
                    <div className="check-icon">✓</div>
                    <div className="benefit-text">
                      Choose between instant bookings and booking requests
                    </div>
                  </div>

                  <div className="benefit-item">
                    <div className="check-icon">✓</div>
                    <div className="benefit-text">
                      We'll facilitate payments for you
                    </div>
                  </div>

                  <Button variant="primary" className="start-button"
                    onClick={() => {
                      navigate(Routers.RegisterHotelPage)
                    }}
                  >
                    Get started now <span className="arrow">→</span>
                  </Button>

                  <div className="continue-section">
                    <p className="continue-text">
                      Already started a registration?
                    </p>
                    <a href="#" className="continue-link">
                      Continue your registration
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="py-5">
        <Row className="justify-content-center mb-4">
          <Col xs={12} className="text-center">
            <h2 className="fw-bold fs-1 mb-5">List with peace of mind</h2>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={12} lg={10}>
            <Row className="g-4">
              {/* Left Column */}
              <Col md={6}>
                {/* Benefit 1 */}
                <div className="d-flex mb-4">
                  <div className="me-3">
                    <CheckCircle className="text-primary" size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Damage payments</h5>
                    <p className="mb-0">
                      Our{" "}
                      <a href="#" className="text-primary text-decoration-none">
                        damage programme
                      </a>{" "}
                      covers your property in case of damages.
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="d-flex mb-4">
                  <div className="me-3">
                    <CheckCircle className="text-primary" size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Your own house rules</h5>
                    <p className="mb-0">
                      Communicate your house rules to potential guests who must
                      agree to them in order to book.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="d-flex mb-4">
                  <div className="me-3">
                    <CheckCircle className="text-primary" size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">
                      Choose how you prefer to receive bookings
                    </h5>
                    <p className="mb-0">
                      Either by letting guests book instantly, or by{" "}
                      <a href="#" className="text-primary text-decoration-none">
                        reviewing booking requests
                      </a>{" "}
                      before accepting them.
                    </p>
                  </div>
                </div>

                {/* Benefit 4 */}
                <div className="d-flex mb-4">
                  <div className="me-3">
                    <CheckCircle className="text-primary" size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">
                      Protection from liability claims
                    </h5>
                    <p className="mb-0">
                      Receive{" "}
                      <a href="#" className="text-primary text-decoration-none">
                        protection against liability claims
                      </a>{" "}
                      from guests and neighbours of up to €/£/$1,000,000 for
                      each reservation.
                    </p>
                  </div>
                </div>
              </Col>

              {/* Right Column */}
              <Col md={6}>
                {/* Benefit 5 */}
                <div className="d-flex mb-4">
                  <div className="me-3">
                    <CheckCircle className="text-primary" size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">
                      Get paid and secure your finances
                    </h5>
                    <p className="mb-0">
                      Get guaranteed payouts and fraud protection through{" "}
                      <a href="#" className="text-primary text-decoration-none">
                        Payments by Booking.com
                      </a>
                      .
                    </p>
                  </div>
                </div>

                {/* Benefit 6 */}
                <div className="d-flex mb-4">
                  <div className="me-3">
                    <CheckCircle className="text-primary" size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Verified guests</h5>
                    <p className="mb-0">
                      We verify guests email addresses and credit cards for
                      partners on Payments by Booking.com.
                    </p>
                  </div>
                </div>

                {/* Benefit 7 */}
                <div className="d-flex mb-4">
                  <div className="me-3">
                    <CheckCircle className="text-primary" size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Robust support</h5>
                    <p className="mb-0">
                      Access support in 45 languages and manage your property
                      through Pulse, our app for partners like you.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col xs={12} md={6} lg={4}>
                <Button 
                  variant="primary" 
                  className="px-4 py-2 fw-bold"
                  onClick={() => {
                    navigate(Routers.LoginHotelPage)
                  }}
                >
                  List with peace of mind today
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomeHotel;
