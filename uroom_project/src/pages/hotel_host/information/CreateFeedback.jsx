import { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { FaStar, FaChevronLeft } from "react-icons/fa";
import "../../../css/customer/CreateFeedback.css";
import { FaArrowLeft } from "react-icons/fa";
import Banner from "../../../images/banner.jpg";
import Header from '../Header';
import Footer from '../Footer';

const CreateFeedback = () => {
  const [rating, setRating] = useState(4);
  const [description, setDescription] = useState("");
  const [hover, setHover] = useState(null);

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= 150) {
      setDescription(text);
    }
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${Banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <div className="flex-grow-1 d-flex align-items-center justify-content-center content-wrapper">
        <Container className="py-4">
          <Card className="feedback-card">
            <Card.Body>
              <div className="d-flex align-items-center mb-4">
                <h4 className="mb-0">Create new feedback</h4>
              </div>

              <Form>
                <Row className="mb-3">
                  <Col md={3}>
                    <Form.Label className="text-muted">Hotel:</Form.Label>
                  </Col>
                  <Col md={9}>
                    <p className="mb-0">Novotel Hotel Da Nang - Capital Pay</p>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={3}>
                    <Form.Label className="text-muted">
                      Checkin - Checkout:
                    </Form.Label>
                  </Col>
                  <Col md={9}>
                    <p className="mb-0">12/03/2024 - 15/03/2024 (5 days)</p>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={3}>
                    <Form.Label className="text-muted">Rating:</Form.Label>
                  </Col>
                  <Col md={9}>
                    <div
                      className="star-rating"
                      style={{ justifyContent: "start" }}
                    >
                      {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                          <label key={index}>
                            <input
                              type="radio"
                              name="rating"
                              value={ratingValue}
                              onClick={() => setRating(ratingValue)}
                            />
                            <FaStar
                              className="star"
                              color={
                                ratingValue <= (hover || rating)
                                  ? "#ffc107"
                                  : "#e4e5e9"
                              }
                              onMouseEnter={() => setHover(ratingValue)}
                              onMouseLeave={() => setHover(null)}
                            />
                          </label>
                        );
                      })}
                    </div>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={3}>
                    <Form.Label className="text-muted">Description:</Form.Label>
                  </Col>
                  <Col md={9}>
                    <Form.Group className="position-relative">
                      <Form.Control
                        as="textarea"
                        rows={6}
                        placeholder="Enter your feedback in herre"
                        value={description}
                        onChange={handleDescriptionChange}
                        maxLength={150}
                      />
                      <small className="char-count">
                        {description.length}/150
                      </small>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-center gap-3">
                  <Button variant="danger" className="px-4">
                    CANCEL
                  </Button>
                  <Button variant="primary" className="px-4">
                    CREATE
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default CreateFeedback;
