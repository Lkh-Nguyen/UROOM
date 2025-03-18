import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Image,
  Pagination,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Star, StarFill, X } from "react-bootstrap-icons";
import { showToast, ToastProvider } from "components/ToastContainer";
import ConfirmationModal from "components/ConfirmationModal";

const MyFeedback = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      hotelName: "Novotel Hotel Da Nang",
      hotelImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Lh4TUCfFQEC3WeD2k2IKX4lQPRI3xi.png",
      overview: 4,
      address: "Da Nang",
      reviewer: "Nguyễn Văn Nam",
      rating: 4,
      date: "12:03:49 04-06-2025",
      comment: "Clean hotel, great service, friendly and helpful staff!",
      likes: 1,
      dislikes: 3,
    },
    {
      id: 2,
      hotelName: "Bigbang HCM City",
      hotelImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Lh4TUCfFQEC3WeD2k2IKX4lQPRI3xi.png",
      overview: 4,
      address: "Ha Noi",
      reviewer: "Nguyễn Văn Nam",
      rating: 4,
      date: "12:03:49 04-06-2025",
      comment: "Clean hotel, great service, friendly and helpful staff!",
      likes: 1,
      dislikes: 3,
    },
    {
      id: 3,
      hotelName: "Resort Ha Noi City",
      hotelImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Lh4TUCfFQEC3WeD2k2IKX4lQPRI3xi.png",
      overview: 4,
      address: "Ho Chi Minh",
      reviewer: "Nguyễn Văn Nam",
      rating: 5,
      date: "12:03:49 04-06-2025",
      comment: "Clean hotel, great service, friendly and helpful staff!",
      likes: 1,
      dislikes: 3,
    },
  ]);

  const [activePage, setActivePage] = useState(1);

  const renderStars = (count, total = 5) => {
    const stars = [];
    for (let i = 0; i < total; i++) {
      if (i < count) {
        stars.push(<StarFill key={i} className="text-warning" />);
      } else {
        stars.push(<Star key={i} className="text-warning" />);
      }
    }
    return stars;
  };
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  return (
    <Container fluid className="bg-light py-4">
      <h2 className="fw-bold mb-4">My Feedback</h2>

      <Row className="mb-4 align-items-center">
        <Col xs="auto">
          <span className="me-2">Filter:</span>
        </Col>
        <Col xs="auto">
          <Form.Select className="border-primary" style={{ width: "200px" }}>
            <option>Score(High to low)</option>
            <option>Score(Low to high)</option>
            <option>Date(Newest first)</option>
            <option>Date(Oldest first)</option>
          </Form.Select>
        </Col>
        <Col xs="auto">
          <Form.Select style={{ width: "120px" }}>
            <option>All star</option>
            <option>1 star</option>
            <option>2 stars</option>
            <option>3 stars</option>
            <option>4 stars</option>
            <option>5 stars</option>
          </Form.Select>
        </Col>
      </Row>

      {reviews.map((review) => (
        <Card key={review.id} className="mb-3 border-0 shadow-sm">
          <Card.Body className="p-0">
            <Row className="g-0" style={{ justifyContent: "space-between" }}>
              {/* Left side - Hotel info */}
              <Col md={5} className="border-end">
                <Card className="border-0">
                  <Row className="g-0 p-3">
                    <Col xs={4}>
                      <img
                        src="https://cf.bstatic.com/xdata/images/hotel/square240/629251764.jpg?k=050e0b7a57991869eb2c714c9191d7eea3a712e3a37b66f665be9816c9a87b6c&o="
                        alt={review.hotelName}
                        className="img-fluid rounded"
                        style={{
                          height: "120px",
                          width: "120px",
                          objectFit: "cover",
                        }}
                      />
                    </Col>
                    <Col xs={8} className="ps-3">
                      <h5 className="fw-bold mb-1">{review.hotelName}</h5>
                      <div className="mb-1">
                        <span className="text-muted me-2">Overview:</span>
                        {renderStars(review.overview)}
                      </div>
                      <div>
                        <span className="text-muted me-2">Address:</span>
                        {review.address}
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Right side - Review */}
              <Col md={7}>
                <Card className="border-0">
                  <Card.Body>
                    <Button
                      variant="link"
                      className="text-dark p-0"
                      style={{ position: "absolute", top: 5, right: 5 }}
                      onClick={() => {
                        setShowAcceptModal(true);
                      }}
                    >
                      <X size={20} />
                    </Button>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="d-flex align-items-center">
                        <Image
                          src="https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"
                          roundedCircle
                          style={{
                            width: "50px",
                            height: "50px",
                            marginRight: "10px",
                          }}
                        />
                        <div>
                          <h6 className="mb-0">{review.reviewer}</h6>
                          <div>
                            {renderStars(review.rating)}
                            <small className="text-muted ms-2">
                              {review.date}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p>{review.comment}</p>
                    <div>
                      <b
                        className="text-primary p-0 me-3"
                        style={{ textDecoration: "none" }}
                      >
                        {review.likes} lượt thích
                      </b>
                      <b
                        className="text-danger p-0"
                        style={{ textDecoration: "none" }}
                      >
                        {review.dislikes} lượt không thích
                      </b>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
          {/* Accept Confirmation Modal */}
          <ConfirmationModal
            show={showAcceptModal}
            onHide={() => setShowAcceptModal(false)}
            onConfirm={() => {
              showToast.warning("Delete Feedback Successfully!");
            }}
            title="Confirm Delete"
            message="Are you sure you want to delete your feedback in list my feedback ?"
            confirmButtonText="Accept"
            type="danger"
          />
        </Card>
      ))}

      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          {[1, 2, 3, 4].map((number) => (
            <Pagination.Item
              key={number}
              active={number === activePage}
              onClick={() => setActivePage(number)}
            >
              <b style={{ color: number === activePage ? "white" : "#0d6efd" }}>
                {number}
              </b>
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <ToastProvider />
    </Container>
  );
};

export default MyFeedback;
