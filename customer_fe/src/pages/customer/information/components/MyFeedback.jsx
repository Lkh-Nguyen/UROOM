import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
  Pagination,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Star, StarFill, X, Pencil, Trash } from "react-bootstrap-icons";
import { showToast, ToastProvider } from "components/ToastContainer";
import ConfirmationModal from "components/ConfirmationModal";
import { useAppSelector, useAppDispatch } from "../../../../redux/store";
import FeedbackActions from "../../../../redux/feedback/actions";
import AuthActions from "../../../../redux/auth/actions";
const MyFeedback = () => {
  const dispatch = useAppDispatch();
  const Auth = useAppSelector((state) => state.Auth.Auth);

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [sortOption, setSortOption] = useState("date-desc");
  const [starFilter, setStarFilter] = useState("all");

  // States for the feedback detail modal
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedFeedback, setEditedFeedback] = useState({
    rating: 0,
    content: "",
  });

  // Fetch user feedbacks on component mount
  useEffect(() => {
    fetchUserFeedbacks();
  }, [dispatch, activePage, sortOption, starFilter]);

  const fetchUserFeedbacks = () => {
    setLoading(true);
    dispatch({
      type: FeedbackActions.FETCH_USER_FEEDBACKS,
      payload: {
        userId: Auth?.user?._id,
        onSuccess: (data) => {
          console.log("Fetched user feedbacks:", data);
          setFeedbacks(data);
          setTotalPages(Math.ceil(data.length / 4)); 
          setLoading(false);
        },
        onFailed: (msg) => {
          showToast.warning(msg || "Failed to fetch your feedbacks");
          setLoading(false);
        },
        onError: (err) => {
          showToast.error("Server error while fetching feedbacks");
          console.error(err);
          setLoading(false);
        },
      },
    });
  };

  // Apply filters and pagination to feedbacks
  const getFilteredFeedbacks = () => {
    let filtered = [...feedbacks];

    // Apply star filter
    if (starFilter !== "all") {
      const starRating = Number.parseInt(starFilter);
      filtered = filtered.filter((feedback) => feedback.rating === starRating);
    }

    // Apply sort
    switch (sortOption) {
      case "score-high":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "score-low":
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case "date-desc":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "date-asc":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }

    // Apply pagination
    const startIndex = (activePage - 1) * 4;
    return filtered.slice(startIndex, startIndex + 4);
  };

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

  // Function to handle opening the detail modal
  const handleOpenDetailModal = (feedback) => {
    setSelectedFeedback(feedback);
    setEditedFeedback({
      rating: feedback.rating,
      content: feedback.content,
    });
    setShowDetailModal(true);
    setEditMode(false);
  };

  // Function to handle closing the detail modal
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedFeedback(null);
    setEditMode(false);
  };

  // Function to handle deleting a feedback
  const handleDeleteFeedback = () => {
    setShowDetailModal(false);
    setSelectedFeedbackId(selectedFeedback._id);
    setShowAcceptModal(true);
  };

  // Function to confirm deletion
  const confirmDeleteFeedback = () => {
    dispatch({
      type: FeedbackActions.DELETE_FEEDBACK,
      payload: {
        feedbackId: selectedFeedbackId,
        onSuccess: () => {
          setFeedbacks(
            feedbacks.filter((feedback) => feedback._id !== selectedFeedbackId)
          );
          showToast.success("Feedback deleted successfully!");
          setShowAcceptModal(false);
        },
        onFailed: (msg) => {
          showToast.error(msg || "Failed to delete feedback");
          setShowAcceptModal(false);
        },
        onError: (err) => {
          showToast.error("Server error while deleting feedback");
          console.error(err);
          setShowAcceptModal(false);
        },
      },
    });
  };

  // Function to handle updating a feedback
  const handleUpdateFeedback = () => {
    if (!editedFeedback.content.trim()) {
      showToast.warning("Comment cannot be empty");
      return;
    }

    dispatch({
      type: FeedbackActions.UPDATE_FEEDBACK,
      payload: {
        feedbackId: selectedFeedback._id,
        data: {
          content: editedFeedback.content,
          rating: editedFeedback.rating,
        },
        onSuccess: (updatedFeedback) => {
          const updatedFeedbacks = feedbacks.map((feedback) => {
            if (feedback._id === selectedFeedback._id) {
              return {
                ...feedback,
                content: editedFeedback.content,
                rating: editedFeedback.rating,
              };
            }
            return feedback;
          });

          setFeedbacks(updatedFeedbacks);

          setSelectedFeedback((prev) => ({
            ...prev,
            content: editedFeedback.content,
            rating: editedFeedback.rating,
          }));

          setEditMode(false);
          showToast.success("Feedback updated successfully!");
        },
        onFailed: (msg) => {
          showToast.error(msg || "Failed to update feedback");
        },
        onError: (err) => {
          showToast.error("Server error while updating feedback");
          console.error(err);
        },
      },
    });
  };

  // Function to handle rating change in edit mode
  const handleRatingChange = (newRating) => {
    setEditedFeedback({
      ...editedFeedback,
      rating: newRating,
    });
  };

  // Editable star rating component
  const EditableStars = ({ rating, onChange }) => {
    return (
      <div className="d-flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            onClick={() => onChange(star)}
            style={{ cursor: "pointer" }}
          >
            {star <= rating ? (
              <StarFill className="text-warning" />
            ) : (
              <Star className="text-warning" />
            )}
          </div>
        ))}
      </div>
    );
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredFeedbacks = getFilteredFeedbacks();

  return (
    <Container fluid className="bg-light py-4">
      <h2 className="fw-bold mb-4">My Feedback</h2>

      <Row className="mb-4 align-items-center">
        <Col xs="auto">
          <span className="me-2">Filter:</span>
        </Col>
        <Col xs="auto">
          <Form.Select
            className="border-primary"
            style={{ width: "200px" }}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="score-high">Score (High to low)</option>
            <option value="score-low">Score (Low to high)</option>
            <option value="date-desc">Date (Newest first)</option>
            <option value="date-asc">Date (Oldest first)</option>
          </Form.Select>
        </Col>
        <Col xs="auto">
          <Form.Select
            style={{ width: "120px" }}
            value={starFilter}
            onChange={(e) => setStarFilter(e.target.value)}
          >
            <option value="all">All stars</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredFeedbacks.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">
            No feedback found matching your criteria.
          </p>
        </div>
      ) : (
        filteredFeedbacks.map((feedback) => (
          <Card
            key={feedback._id}
            className="mb-3 border-0 shadow-sm"
            onClick={() => handleOpenDetailModal(feedback)}
            style={{ cursor: "pointer" }}
          >
            <Card.Body className="p-0">
              <Row className="g-0" style={{ justifyContent: "space-between" }}>
                {/* Left side - Hotel info */}
                <Col md={5} className="border-end">
                  <Card className="border-0">
                    <Row className="g-0 p-3">
                      <Col xs={4}>
                        <img
                          src={
                            feedback.hotel?.images?.[0] ||
                            "https://via.placeholder.com/120x120?text=Hotel"
                          }
                          alt={feedback.hotel?.hotelName}
                          className="img-fluid rounded"
                          style={{
                            height: "120px",
                            width: "120px",
                            objectFit: "cover",
                          }}
                        />
                      </Col>
                      <Col xs={8} className="ps-3">
                        <h5 className="fw-bold mb-1">
                          {feedback.hotel?.hotelName || "Hotel Name"}
                        </h5>
                        <div className="mb-1">
                          <span className="text-muted me-2">Overview:</span>
                          {renderStars(feedback.hotel?.rating || 0)}
                        </div>
                        <div>
                          <span className="text-muted me-2">Address:</span>
                          {feedback.hotel?.address || "Hotel Address"}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFeedbackId(feedback._id);
                          setShowAcceptModal(true);
                        }}
                      >
                        <X size={20} />
                      </Button>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="d-flex align-items-center">
                          <Image
                            src={
                              Auth?.image?.url && Auth?.image?.url !== ""
                                ? Auth?.image?.url
                                : "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"
                            }
                            roundedCircle
                            style={{
                              width: "50px",
                              height: "50px",
                              marginRight: "10px",
                            }}
                          />

                          <div>
                            <h6 className="mb-0">
                              {Auth?.user?.name || "User"}
                            </h6>
                            <div>
                              {renderStars(feedback.rating)}
                              <small className="text-muted ms-2">
                                {formatDate(feedback.createdAt)}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p>{feedback.content}</p>
                      <div>
                        <b
                          className="text-primary p-0 me-3"
                          style={{ textDecoration: "none" }}
                        >
                          {feedback.likes || 0} lượt thích
                        </b>
                        <b
                          className="text-danger p-0"
                          style={{ textDecoration: "none" }}
                        >
                          {feedback.dislikes || 0} lượt không thích
                        </b>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
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
              )
            )}
          </Pagination>
        </div>
      )}

      {/* Feedback Detail Modal */}
      <Modal
        show={showDetailModal}
        onHide={handleCloseDetailModal}
        size="lg"
        centered
      >
        {selectedFeedback && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Feedback Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                {/* Hotel Information */}
                <Col md={5} className="border-end">
                  <h5 className="fw-bold mb-3">Hotel Information</h5>
                  <div className="mb-3">
                    <img
                      src={
                        selectedFeedback.hotel?.images?.[0] ||
                        "https://via.placeholder.com/300x200?text=Hotel"
                      }
                      alt={selectedFeedback.hotel?.name}
                      className="img-fluid rounded mb-3"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <h5 className="fw-bold">
                      {selectedFeedback.hotel?.hotelName || "Hotel Name"}
                    </h5>
                    <div className="mb-2">
                      <span className="text-muted me-2">Overview:</span>
                      {renderStars(selectedFeedback.hotel?.rating || 0)}
                    </div>
                    <div className="mb-2">
                      <span className="text-muted me-2">Address:</span>
                      {selectedFeedback.hotel?.address || "Hotel Address"}
                    </div>
                    {selectedFeedback.reservation && (
                      <div className="mb-2">
                        <span className="text-muted me-2">Stay Period:</span>
                        {formatDate(
                          selectedFeedback.reservation.checkIn
                        )} - {formatDate(selectedFeedback.reservation.checkOut)}
                      </div>
                    )}
                  </div>
                </Col>

                {/* Feedback Information */}
                <Col md={7}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">Your Feedback</h5>
                    {!editMode ? (
                      <div>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => setEditMode(true)}
                        >
                          <Pencil size={16} className="me-1" /> Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={handleDeleteFeedback}
                        >
                          <Trash size={16} className="me-1" /> Delete
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="me-2"
                          onClick={handleUpdateFeedback}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-3">
                      <Image
                        src={
                          Auth?.image?.url && Auth?.image?.url !== ""
                            ? Auth?.image?.url
                            : "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"
                        }
                        roundedCircle
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                      />

                      <div>
                        <h6 className="mb-0">{Auth?.user?.name || "User"}</h6>
                        <small className="text-muted">
                          {formatDate(selectedFeedback.createdAt)}
                        </small>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Rating</label>
                      {editMode ? (
                        <EditableStars
                          rating={editedFeedback.rating}
                          onChange={handleRatingChange}
                        />
                      ) : (
                        <div>{renderStars(selectedFeedback.rating)}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Comment</label>
                      {editMode ? (
                        <Form.Control
                          as="textarea"
                          rows={4}
                          value={editedFeedback.content}
                          onChange={(e) =>
                            setEditedFeedback({
                              ...editedFeedback,
                              content: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <p>{selectedFeedback.content}</p>
                      )}
                    </div>

                    <div>
                      <b className="text-primary p-0 me-3">
                        {selectedFeedback.likes || 0} lượt thích
                      </b>
                      <b className="text-danger p-0">
                        {selectedFeedback.dislikes || 0} lượt không thích
                      </b>
                    </div>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDetailModal}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        show={showAcceptModal}
        onHide={() => setShowAcceptModal(false)}
        onConfirm={confirmDeleteFeedback}
        title="Confirm Delete"
        message="Are you sure you want to delete your feedback in list my feedback?"
        confirmButtonText="Accept"
        type="danger"
      />

      <ToastProvider />
    </Container>
  );
};

export default MyFeedback;
