import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "../../../images/banner.jpg";
import Footer from "../Footer";
import Header from "../Header";
import * as Routers from "../../../utils/Routes";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "components/ConfirmationModal";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate(Routers.PaymentSuccessPage); // Redirect to timeout page
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const handleDelete = () => {
    navigate(Routers.PaymentFailedPage)
  }

  const handleCancelButton= () => {
    setShowDeleteModal(true);
  }
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
      <div className="flex-grow-1 d-flex align-items-center justify-content-center" style={{ padding: "50px 0" }}>
        <Card className="p-4 shadow-lg" style={{ maxWidth: "800px", width: "100%", backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "15px" }}>
          <Card.Body>
            <Row>
              <Col md={6} className="d-flex flex-column align-items-center">
                <div className="bg-white p-3 mb-3 rounded shadow-sm">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=UROOM-PAYMENT-VORQ00023Snha-400USD"
                    alt="Payment QR Code"
                    style={{ width: "300px", height: "300px" }}
                  />
                </div>
                <p className="text-danger fw-bold">Thời gian còn lại: {formatTime(timeLeft)}</p>
                <Button variant="danger" className="mt-2 px-4" onClick={handleCancelButton}>
                  Cancel
                </Button>
              </Col>
              <Col md={6} className="d-flex align-items-center">
                <div className="w-100">
                  <h6 className="text-muted">Account holder</h6>
                  <h5 className="mb-3">ABC</h5>
                  <h6 className="text-muted">Account number</h6>
                  <h5 className="mb-3">VORQ00023Snha</h5>
                  <h6 className="text-muted">Amount</h6>
                  <h5 className="mb-3">$400</h5>
                  <h6 className="text-muted">Content</h6>
                  <h5>Payment for UROOM</h5>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
      <Footer />
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirm Cancel Payment"
        message="Are you sure you want to cancel this payment? This action cannot be undone."
        confirmButtonText="Confirm"
        type="danger"
      />
    </div>
  );
};

export default PaymentPage;