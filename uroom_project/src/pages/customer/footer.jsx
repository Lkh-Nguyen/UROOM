import { Container, Row, Col } from "react-bootstrap"
import {FaFacebookF,FaTwitter,FaInstagram} from "react-icons/fa"
import "../../css/customer/Footer.css"
function Footer() {
    return (
      <footer className="footer">
        <Container>
          <Row className="align-items-center justify-content-between">
            <Col md={3}>
              <div className="footer-logo">
                UR<span style={{color: "#f8e71c"}}>OO</span>M
              </div>
            </Col>
            <Col md={3}>
              <div className="footer-links">
                <a href="#">About Us</a>
                <a href="#">Contact</a>
                <a href="#">Terms & Conditions</a>
              </div>
            </Col>
            <Col md={3}>
              <div className="social-links">
                <a href="#" className="social-link">
                  <FaFacebookF /> Facebook
                </a>
                <a href="#" className="social-link">
                  <FaTwitter /> Twitter
                </a>
                <a href="#" className="social-link">
                  <FaInstagram /> Instagram
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
  export default Footer;