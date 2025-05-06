import React, { useEffect, useRef, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "../../../images/banner.jpg";
import Footer from "../Footer";
import Header from "../Header";
import * as Routers from "../../../utils/Routes";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmationModal from "components/ConfirmationModal";
import Factories from "../../../redux/search/factories";
import Factories2 from "../../../redux/reservation/factories";
import { showToast, ToastProvider } from "../../../components/ToastContainer";

const PaymentPage = () => {
  const timeoutRef = useRef(null);

  const location = useLocation();
  const { createdAt, totalPrice, idReservation, messageSuccess, messageError } = location.state || {};
  console.log("createAt: ", createdAt)
  console.log("idReservation: ", idReservation)

  const fetchReservation= async() => {
    try {
      const response = await Factories2.fetch_detail_reservation(idReservation);
      if (response?.status === 200) {
        if(response.data.reservation.status !== "NOT PAID"){
          navigate(Routers.ErrorPage)
        }
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
    }
  }
  useEffect( () => {
    fetchReservation();
  },[])

  useEffect(() => {
    if (messageSuccess) {
      showToast.success(location.state.messageSuccess);
    }

    if (messageError) {
      showToast.warning(location.state.messageError);
    }
    if (messageSuccess || messageError) {
      navigate(location.pathname, {
        replace: true,
        state: {
          createdAt,
          totalPrice,
          idReservation,
        },
      });
    }
  }, [location]);

  const navigate = useNavigate();
  const calculateTimeLeft = () => {
    if (!createdAt) return 0;
    const createdTime = new Date(createdAt).getTime();
    const now = new Date().getTime();
    const deadline = createdTime + 5 * 60 * 1000; // 10 phút tính bằng milliseconds
    const timeDiff = Math.floor((deadline - now) / 1000); // chuyển thành giây
    return timeDiff > 0 ? timeDiff : 0;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  console.log("timeleft: ", timeLeft)
  const handleAccept = async () => {
    try {
      const response = await Factories.accept_payment(idReservation);
      if (response?.status === 200) {
        navigate(Routers.PaymentSuccessPage);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
    }
  };

  useEffect(() => {
    // Bắt đầu đếm thời gian
    timeoutRef.current = setTimeout(() => {
      handleAccept();
    }, 30000);

    // Cleanup khi rời khỏi component (chuyển trang)
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        console.log("Timeout cleared on unmount!");
      }
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 && timeLeft) {
      handleDelete();
      navigate(Routers.PaymentFailedPage); // Redirect to timeout page
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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await Factories.cancel_payment(idReservation);
      if (response?.status === 200) {
        navigate(Routers.PaymentFailedPage);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
    }
  };

  const handleCancelButton = () => {
    setShowDeleteModal(true);
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
      <ToastProvider />
      <div
        className="flex-grow-1 d-flex align-items-center justify-content-center"
        style={{ padding: "50px 0" }}
      >
        <Card
          className="p-4 shadow-lg"
          style={{
            maxWidth: "800px",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "15px",
          }}
        >
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
                <p className="text-danger fw-bold">
                  Thời gian còn lại: {formatTime(timeLeft)}
                </p>
                <Button
                  variant="danger"
                  className="mt-2 px-4"
                  onClick={handleCancelButton}
                >
                  Cancel
                </Button>
              </Col>
              <Col md={6} className="d-flex align-items-center">
                <div className="w-100">
                  <h6 className="text-muted">Account holder</h6>
                  <h5 className="mb-3">Company Uroom Booking Hotel</h5>
                  <h6 className="text-muted">Account number</h6>
                  <h5 className="mb-3">447771209309</h5>
                  <h6 className="text-muted">Amount</h6>
                  <h5 className="mb-3">${totalPrice}</h5>
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
