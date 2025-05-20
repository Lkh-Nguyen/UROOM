import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
  Pagination,
  ProgressBar,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Star, StarFill, ExclamationTriangleFill } from "react-bootstrap-icons";
import "../../../css/hotelHost/ListFeedbackHotelPage.css";
import ReportedFeedbackHotel from "./ReportedFeedbackHotel";
import FeedbackActions from "../../../redux/feedback/actions";
import HotelActions from "@redux/hotel/actions";
import handleRating from "@utils/handleRating";

const ListFeedbackHotelPage = () => {
  const dispatch = useDispatch();
  const feedbacks = useSelector((state) => state.Feedback);
  const auth = useSelector((state) => state.Auth.Auth);
  const hotel = useSelector((state) => state.Hotel.hotel);

  const [showModal, setShowModal] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [selectedStar, setSelectedStar] = useState(0);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState();

  const ratingLabels = ["Cơ bản", "Tiêu Chuẩn", "Khá Tốt", "Tốt", "Rất Tốt"];
  const feedbackStats = [
    feedbacks.ratingBreakdown.oneStar || 0,
    feedbacks.ratingBreakdown.twoStar || 0,
    feedbacks.ratingBreakdown.threeStar || 0,
    feedbacks.ratingBreakdown.fourStar || 0,
    feedbacks.ratingBreakdown.fiveStar || 0,
  ];

  const filteredFeedbacks = useMemo(() => {
    if (!Array.isArray(feedbacks.feedbacks)) return [];
    return selectedStar === 0
      ? feedbacks.feedbacks
      : feedbacks.feedbacks.filter((fb) => fb.rating === selectedStar);
  }, [feedbacks.feedbacks, selectedStar]);

  useEffect(() => {
    if (auth) {
      dispatch({
        type: HotelActions.FETCH_HOTEL_BY_OWNER_ID,
        payload: { id: auth._id },
      });
    }
  }, [auth, dispatch]);

  useEffect(() => {
    if (!hotel) return;

    dispatch({
      type: FeedbackActions.FETCH_FEEDBACK_BY_HOTELID,
      payload: { hotelId: hotel._id, query: { page: activePage } },
    });
  }, [activePage, dispatch, hotel]);

  const renderStars = useCallback((count, total = 5) => {
    return Array.from({ length: total }).map((_, i) =>
      i < count ? (
        <StarFill key={i} className="text-warning" />
      ) : (
        <Star key={i} className="text-warning" />
      )
    );
  }, []);

  const total = feedbacks?.total || 0;
  const limit = feedbacks?.limit || 1;
  const totalPages = Math.ceil(total / limit);

  const visiblePages = useMemo(() => {
    const delta = 2;
    const pages = [];
    for (
      let i = Math.max(1, activePage - delta);
      i <= Math.min(totalPages, activePage + delta);
      i++
    ) {
      pages.push(i);
    }
    return pages;
  }, [activePage, totalPages]);

  return (
    <div className="main-content_1 p-3">
      <h2 className="fw-bold my-4">
        Những review khách của du khách về {hotel?.hotelName}
      </h2>

      <p className="text-muted mb-4">
        Xếp hạng và đánh giá tổng thể {hotel?.hotelName}
      </p>

      <Row className="mb-4 justify-content-center align-items-center">
        <Col md={2} />
        <Col md={4}>
          <Row>
            <Col xs="auto">
              <Card className="rating-box border-4 shadow-sm">
                <Card.Body className="d-flex align-items-center justify-content-center p-2">
                  <span className="rating-number">
                    {feedbacks?.averageRating}
                  </span>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <h2 className="rating-title mb-0">
                {handleRating(Math.round(feedbacks?.averageRating || 0))}
              </h2>
              <p className="rating-count mb-1">
                Từ {feedbacks?.totalFeedback || 0} đánh giá
              </p>
              <div className="rating-source">
                Bởi khách du lịch trong{" "}
                <span className="traveloka-text">uroom</span>
                <sup>®</sup>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          {ratingLabels.map((label, idx) => (
            <div key={idx} className="rating-item">
              <div className="d-flex justify-content-between mb-1">
                <span>{label}</span>
                <span>{feedbackStats[idx]}</span>
              </div>
              <ProgressBar
                now={
                  feedbacks && feedbacks.length
                    ? (feedbackStats[idx] / feedbacks.feedbacks.length) * 100
                    : 0
                }
              />
            </div>
          ))}
        </Col>
        <Col md={2} />
      </Row>

      <h2 className="fw-bold mb-4">Đánh giá của du khách</h2>

      <Row className="mb-4 align-items-center">
        <Col xs="auto">
          <span className="me-2">Filter:</span>
        </Col>
        <Col xs="auto">
          <Form.Select
            style={{ width: "120px" }}
            value={selectedStar}
            onChange={(e) => setSelectedStar(Number(e.target.value))}
          >
            <option value={0}>All star</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} star{star > 1 ? "s" : ""}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {filteredFeedbacks.map((review) => (
        <Card key={review._id} className="mb-3 border-0 shadow-sm">
          <Card.Body className="p-0 m-4">
            <Row className="g-0 justify-content-between">
              <Col md={12}>
                <Button
                  variant="link"
                  className="text-dark p-0"
                  style={{ position: "absolute", top: 15, right: 15 }}
                  onClick={() => {
                    setSelectedFeedbackId(review._id);
                    setShowModal(true);
                  }}
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
                      <h6 className="mb-0">
                        {review?.user?.fullName || "Ẩn danh"}
                      </h6>
                      <div>
                        {renderStars(review.rating)}
                        <small className="text-muted ms-2">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>

                <p>{review.content}</p>

                <div>
                  <b className="text-primary p-0 me-3">
                    {review.likedBy?.length || 0} lượt thích
                  </b>
                  <b className="text-danger p-0">
                    {review.dislikedBy?.length || 0} lượt không thích
                  </b>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          {visiblePages.map((number) => (
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

      <ReportedFeedbackHotel
        show={showModal}
        onHide={() => setShowModal(false)}
        handleClose={() => setShowModal(false)}
        feedbackId={selectedFeedbackId}
      />
    </div>
  );
};

export default ListFeedbackHotelPage;
