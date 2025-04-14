import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Image, Pagination, Modal } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { Star, StarFill, X, Pencil, Trash } from "react-bootstrap-icons"
import { showToast, ToastProvider } from "components/ToastContainer"
import ConfirmationModal from "components/ConfirmationModal"

const MyFeedback = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      hotelName: "Novotel Hotel Da Nang",
      hotelImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Lh4TUCfFQEC3WeD2k2IKX4lQPRI3xi.png",
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
      hotelImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Lh4TUCfFQEC3WeD2k2IKX4lQPRI3xi.png",
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
      hotelImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Lh4TUCfFQEC3WeD2k2IKX4lQPRI3xi.png",
      overview: 4,
      address: "Ho Chi Minh",
      reviewer: "Nguyễn Văn Nam",
      rating: 5,
      date: "12:03:49 04-06-2025",
      comment: "Clean hotel, great service, friendly and helpful staff!",
      likes: 1,
      dislikes: 3,
    },
  ])

  const [activePage, setActivePage] = useState(1)
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [selectedReviewId, setSelectedReviewId] = useState(null)

  // New states for the feedback detail modal
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedReview, setSelectedReview] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editedReview, setEditedReview] = useState({
    rating: 0,
    comment: "",
  })

  const renderStars = (count, total = 5) => {
    const stars = []
    for (let i = 0; i < total; i++) {
      if (i < count) {
        stars.push(<StarFill key={i} className="text-warning" />)
      } else {
        stars.push(<Star key={i} className="text-warning" />)
      }
    }
    return stars
  }

  // Function to handle opening the detail modal
  const handleOpenDetailModal = (review) => {
    setSelectedReview(review)
    setEditedReview({
      rating: review.rating,
      comment: review.comment,
    })
    setShowDetailModal(true)
    setEditMode(false)
  }

  // Function to handle closing the detail modal
  const handleCloseDetailModal = () => {
    setShowDetailModal(false)
    setSelectedReview(null)
    setEditMode(false)
  }

  // Function to handle deleting a review
  const handleDeleteReview = () => {
    setShowDetailModal(false)
    setSelectedReviewId(selectedReview.id)
    setShowAcceptModal(true)
  }

  // Function to confirm deletion
  const confirmDeleteReview = () => {
    setReviews(reviews.filter((review) => review.id !== selectedReviewId))
    setShowAcceptModal(false)
    showToast.warning("Delete Feedback Successfully!")
  }

  // Function to handle updating a review
  const handleUpdateReview = () => {
    const updatedReviews = reviews.map((review) => {
      if (review.id === selectedReview.id) {
        return {
          ...review,
          rating: editedReview.rating,
          comment: editedReview.comment,
        }
      }
      return review
    })

    setReviews(updatedReviews)
    setEditMode(false)
    showToast.success("Update Feedback Successfully!")
  }

  // Function to handle rating change in edit mode
  const handleRatingChange = (newRating) => {
    setEditedReview({
      ...editedReview,
      rating: newRating,
    })
  }

  // Editable star rating component
  const EditableStars = ({ rating, onChange }) => {
    return (
      <div className="d-flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} onClick={() => onChange(star)} style={{ cursor: "pointer" }}>
            {star <= rating ? <StarFill className="text-warning" /> : <Star className="text-warning" />}
          </div>
        ))}
      </div>
    )
  }

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
        <Card
          key={review.id}
          className="mb-3 border-0 shadow-sm"
          onClick={() => handleOpenDetailModal(review)}
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
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedReviewId(review.id)
                        setShowAcceptModal(true)
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
                            <small className="text-muted ms-2">{review.date}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p>{review.comment}</p>
                    <div>
                      <b className="text-primary p-0 me-3" style={{ textDecoration: "none" }}>
                        {review.likes} lượt thích
                      </b>
                      <b className="text-danger p-0" style={{ textDecoration: "none" }}>
                        {review.dislikes} lượt không thích
                      </b>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          {[1, 2, 3, 4].map((number) => (
            <Pagination.Item key={number} active={number === activePage} onClick={() => setActivePage(number)}>
              <b style={{ color: number === activePage ? "white" : "#0d6efd" }}>{number}</b>
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      {/* Feedback Detail Modal */}
      <Modal show={showDetailModal} onHide={handleCloseDetailModal} size="lg" centered>
        {selectedReview && (
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
                      src="https://cf.bstatic.com/xdata/images/hotel/square240/629251764.jpg?k=050e0b7a57991869eb2c714c9191d7eea3a712e3a37b66f665be9816c9a87b6c&o="
                      alt={selectedReview.hotelName}
                      className="img-fluid rounded mb-3"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <h5 className="fw-bold">{selectedReview.hotelName}</h5>
                    <div className="mb-2">
                      <span className="text-muted me-2">Overview:</span>
                      {renderStars(selectedReview.overview)}
                    </div>
                    <div className="mb-2">
                      <span className="text-muted me-2">Address:</span>
                      {selectedReview.address}
                    </div>
                  </div>
                </Col>

                {/* Feedback Information */}
                <Col md={7}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">Your Feedback</h5>
                    {!editMode ? (
                      <div>
                        <Button variant="outline-primary" size="sm" className="me-2" onClick={() => setEditMode(true)}>
                          <Pencil size={16} className="me-1" /> Edit
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={handleDeleteReview}>
                          <Trash size={16} className="me-1" /> Delete
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Button variant="outline-success" size="sm" className="me-2" onClick={handleUpdateReview}>
                          Save
                        </Button>
                        <Button variant="outline-secondary" size="sm" onClick={() => setEditMode(false)}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-3">
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
                        <h6 className="mb-0">{selectedReview.reviewer}</h6>
                        <small className="text-muted">{selectedReview.date}</small>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Rating</label>
                      {editMode ? (
                        <EditableStars rating={editedReview.rating} onChange={handleRatingChange} />
                      ) : (
                        <div>{renderStars(selectedReview.rating)}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Comment</label>
                      {editMode ? (
                        <Form.Control
                          as="textarea"
                          rows={4}
                          value={editedReview.comment}
                          onChange={(e) => setEditedReview({ ...editedReview, comment: e.target.value })}
                        />
                      ) : (
                        <p>{selectedReview.comment}</p>
                      )}
                    </div>

                    <div>
                      <b className="text-primary p-0 me-3">{selectedReview.likes} lượt thích</b>
                      <b className="text-danger p-0">{selectedReview.dislikes} lượt không thích</b>
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
        onConfirm={confirmDeleteReview}
        title="Confirm Delete"
        message="Are you sure you want to delete your feedback in list my feedback?"
        confirmButtonText="Accept"
        type="danger"
      />

      <ToastProvider />
    </Container>
  )
}

export default MyFeedback
