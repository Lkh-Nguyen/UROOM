import { Modal, Button, Badge } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./CancelReservationModal.css"

function CancelReservationModal({ show, onHide, reservationData, onConfirm }) {
  // Default data if none is provided
  const data = reservationData || {
    hotel: "Whispering Pines Resort",
    checkIn: "19/04/2025",
    total: "$943.17",
    status: "BOOKED",
    daysUntilCheckIn: 33,
    refundAmount: "$9437.00",
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>Cancel Reservation</Modal.Title>
        <Button variant="link" className="close-button" onClick={onHide}>
          <span aria-hidden="true">&times;</span>
        </Button>
      </Modal.Header>

      <Modal.Body>
        <div className="reservation-section">
          <h5>Reservation Details</h5>

          <div className="reservation-details">
            <div className="detail-row">
              <span>Hotel:</span>
              <span>{data.hotel}</span>
            </div>

            <div className="detail-row">
              <span>Check-in:</span>
              <span>{data.checkIn}</span>
            </div>

            <div className="detail-row">
              <span>Total:</span>
              <span>{data.total}</span>
            </div>

            <div className="detail-row">
              <span>Status:</span>
              <Badge bg="primary" className="status-badge">
                {data.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="cancellation-section">
          <h5>Cancellation Policy</h5>

          <div className="refund-alert">Full refund available</div>

          <div className="detail-row mt-3">
            <span>Days until check-in:</span>
            <span>{data.daysUntilCheckIn}</span>
          </div>

          <div className="detail-row">
            <span>Refund amount:</span>
            <span>{data.refundAmount}</span>
          </div>
        </div>

        <div className="disclaimer mt-4">
          By proceeding, you agree to our cancellation terms. Refunds are processed to your original payment method
          within 5-7 business days.
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="danger" className="confirm-button" onClick={onConfirm}>
          Confirm Cancellation
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CancelReservationModal

