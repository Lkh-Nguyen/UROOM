import { useState } from "react";
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
  ProgressBar,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Star, StarFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../css/hotelHost/ListFeedbackHotelPage.css";
import * as Routers from "../../../utils/Routes";
import { useNavigate } from "react-router-dom";
import { ExclamationTriangleFill } from "react-bootstrap-icons";
import Sidebar from "../Sidebar";
import TransactionDetail from "../TransactionDetail";
import ReportedFeedbackHotel from "./ReportedFeedbackHotel";

const ListFeedbackHotelPage = () => {
  const [showModal, setShowModal] = useState(false);
  // Mở Modal và set dữ liệu
  const handleShowModal = () => {
    setShowModal(true);
  };
  const navigate = useNavigate();
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

  return (
    <div className="main-content_1 p-3">
      <h2 className="fw-bold mb-4">
        {" "}
        Những review khách của du khách về Tobu Hotel Levant Tokyo
      </h2>
      <p className="text-muted mb-4">
        Xếp hạng và đánh giá tổng thể Tobu Hotel Levant Tokyo
      </p>

      {/* Rating Overview */}
      <Row
        className="mb-4"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Col md={2} />
        <Col md={4} style={{ justifyContent: "center", alignItems: "center" }}>
          <Row>
            <Col xs="auto">
              <Card className="rating-box border-4 shadow-sm">
                <Card.Body className="d-flex align-items-center justify-content-center p-2">
                  <span className="rating-number">9,2</span>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <h2 className="rating-title mb-0">Xuất sắc</h2>
              <p className="rating-count mb-1">Từ 131 đánh giá</p>
              <div className="rating-source">
                Bởi khách du lịch trong
                <span className="traveloka-text">uroom</span>
                <sup>®</sup>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <div className="rating-details">
            <div className="rating-item">
              <div className="d-flex justify-content-between mb-1">
                <span>Cơ bản</span>
                <span>14</span>
              </div>
              <ProgressBar now={66} />
            </div>
            <div className="rating-item">
              <div className="d-flex justify-content-between mb-1">
                <span>Tiêu Chuẩn</span>
                <span>9,2</span>
              </div>
              <ProgressBar now={50} />
            </div>
            <div className="rating-item">
              <div className="d-flex justify-content-between mb-1">
                <span>Tốt</span>
                <span>16</span>
              </div>
              <ProgressBar now={40} />
            </div>
            <div className="rating-item">
              <div className="d-flex justify-content-between mb-1">
                <span>Khá Tốt</span>
                <span>19</span>
              </div>
              <ProgressBar now={30} />
            </div>
            <div className="rating-item">
              <div className="d-flex justify-content-between mb-1">
                <span>Rất Tốt</span>
                <span>19</span>
              </div>
              <ProgressBar now={15} />
            </div>
          </div>
        </Col>
        <Col md={2} />
      </Row>

      <h2 className="fw-bold mb-4">
        Đánh giá của du khách Tobu Hotel Levant Tokyo
      </h2>

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
          <Card.Body className="p-0 m-4">
            <Row className="g-0" style={{ justifyContent: "space-between" }}>
              <Col md={12}>
                  <Button
                    variant="link"
                    className="text-dark p-0"
                    style={{ position: "absolute", top: 15, right: 15 }}
                    onClick={handleShowModal}
                  >
                    <ExclamationTriangleFill size={20} color="red" />
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
              </Col>
            </Row>
          </Card.Body>
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
              <b
                style={{
                  color: number === activePage ? "white" : "#0d6efd",
                }}
              >
                {number}
              </b>
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <ReportedFeedbackHotel
        show={showModal}
        onHide={() => setShowModal(false)}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default ListFeedbackHotelPage;
