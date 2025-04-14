import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Pagination,
} from "react-bootstrap";
import "../../../../css/customer/BookingHistory.css";
import * as Routers from "../../../../utils/Routes";
import { useNavigate } from "react-router-dom";
import CancelReservationModal from "pages/customer/home/components/CancelReservationModal";
import { showToast, ToastProvider } from "components/ToastContainer";
import { getStatusBooking, setStatusBooking } from "utils/handleToken";

const BookingHistory = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchIndex = async () => {
      const result = await getStatusBooking();
      setActiveFilter(Number(result)); // nhớ ép kiểu về số
    };
    fetchIndex();
  }, []);
  // Filter options
  const filters = [
    "Feedbacked",
    "Finished",
    "Processing",
    "Paid",
    "NoPaid",
    "Cancel",
  ];

  const colors = [
    "#00BBFF",
    "#00611D",
    "#EB8C08",
    "#54BDB1",
    "#FFB4B4",
    "#FF1717",
  ];
  // Sample reservation data
  const reservations = [
    {
      id: "01",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "Feedbacked",
    },
    {
      id: "02",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "Feedbacked",
    },
    {
      id: "03",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "Feedbacked",
    },
    {
      id: "04",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "Feedbacked",
    },
    {
      id: "05",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "Feedbacked",
    },
    {
      id: "06",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "Feedbacked",
    },

    {
      id: "07",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "Finished",
    },
    {
      id: "08",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "Processing",
    },
    {
      id: "09",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "Paid",
    },
    {
      id: "10",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "NoPaid",
    },
    {
      id: "12",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "Cancel",
    },
  ];
  const [filterBill, setFilterBill] = useState([]);
  useEffect(() => {
    const newList = reservations.filter(
      (e, i) => e.status === filters[activeFilter]
    );
    setFilterBill(newList);
  }, [activeFilter]);

  const handleFilterClick = (index) => {
    setActiveFilter(index);
    setStatusBooking(index);
  };

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  return (
    <Container className="py-4" >
      <h2 className="fw-bold mb-4">Booking History</h2>
      {/* Filter buttons */}
      <div
        className="filter-buttons mb-4"
        style={{ justifyContent: "space-between" }}
      >
        {filters.map((filter, index) => (
          <Button
            key={filter}
            className={`filter-btn ${activeFilter === index ? "active" : ""}`}
            style={{
              width: "130px",
              borderRadius: 10,
              color: activeFilter === index ? "white" : "black", // Màu chữ
              backgroundColor:
                activeFilter === index ? colors[activeFilter] : "white",
              borderColor:
                activeFilter === index ? colors[activeFilter] : "white",
              borderWidth: 1,
              borderStyle: "solid",
            }}
            onClick={() => handleFilterClick(index)}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Reservation cards */}
      <Row>
        {filterBill.map((reservation) => (
          <Col key={reservation.id} lg={4} md={6} sm={12} className="mb-4">
            <Card className="reservation-card">
              <Card.Body>
                <div className="reservation-header">
                  <h5>Reversation ID: {reservation.id}</h5>
                </div>
                <div className="reservation-details">
                  <p>
                    <strong>Hotel name:</strong> {reservation.hotelName}
                  </p>
                  <p>
                    <strong>Check-in:</strong> {reservation.checkIn}
                  </p>
                  <p>
                    <strong>Check-out:</strong> {reservation.checkOut}
                  </p>
                  <p>
                    <strong>Total price:</strong> {reservation.totalPrice}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    <b
                      style={{
                        marginLeft: 10,
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingLeft: 5,
                        paddingRight: 5,
                        borderRadius: 10,
                        backgroundColor: colors[activeFilter],
                        color: "white",
                        fontWeight: 400,
                      }}
                    >
                      {reservation.status}
                    </b>
                  </p>
                </div>
                <Button
                  variant="outline-primary"
                  style={{ width: "100%", marginTop: "10px" }}
                  onClick={() => {
                    navigate(Routers.BookingBill);
                  }}
                >
                  View Details
                </Button>
                {activeFilter == 1 && (
                  <Button
                    variant="outline-success"
                    style={{ width: "100%", marginTop: "10px" }}
                    onClick={() => {
                      navigate(Routers.CreateFeedback);
                    }}
                  >
                    Create Feedback
                  </Button>
                )}
                {activeFilter == 3 && (
                  <Button
                    variant="outline-danger"
                    style={{ width: "100%", marginTop: "10px" }}
                    onClick={() => setShowModal(true)}
                  >
                    Cancel Booking
                  </Button>
                )}
                {activeFilter == 4 && (
                  <Button
                    variant="outline-warning"
                    style={{ width: "100%", marginTop: "10px" }}
                    onClick={() => {
                      navigate(Routers.PaymentPage);
                    }}
                  >
                    Pay money
                  </Button>
                )}
              </Card.Body>
            </Card>
            <ToastProvider />
            <CancelReservationModal
              show={showModal}
              onHide={() => setShowModal(false)}
              onConfirm={() => {
                setShowModal(false);
                showToast.success("Cancel Booking Successfully!");
              }}
            />
          </Col>
        ))}
      </Row>

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
    </Container>
  );
};

export default BookingHistory;
