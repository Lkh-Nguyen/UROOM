import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Pagination,
  Form,
} from "react-bootstrap";
import "../../../../css/customer/BookingHistory.css";
import * as Routers from "../../../../utils/Routes";
import { useNavigate } from "react-router-dom";
import CancelReservationModal from "pages/customer/home/components/CancelReservationModal";
import { showToast, ToastProvider } from "components/ToastContainer";
import { getStatusBooking, setStatusBooking } from "utils/handleToken";
import Select from "react-select";
import { set } from "date-fns";

const BookingHistory = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(0);
  const [dateFilter, setDateFilter] = useState("NEWEST");
  const [activePage, setActivePage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchIndex = async () => {
      const result = await getStatusBooking();
      setActiveFilter(Number(result)); // nhớ ép kiểu về số
    };
    fetchIndex();
    console.log("abc");
  }, []);

  // Filter options
  const filters = [
    "COMPLETED", // Hoàn thành, đã phản hồi
    "CHECKED OUT", // Đã check-out, có thể để lại phản hồi
    "CHECKED IN", // Đang ở, đã check-in
    "BOOKED", // Đã đặt, trả tiền nhưng chưa check-in
    "PENDING", // Chờ xử lý hoặc xác nhận
    "NOT PAID", // Chưa trả tiền
    "CANCELLED", // Đã hủy
  ];

  const colors = [
    "#6F42C1", // COMPLETED - Tím (hoàn thành, khác biệt rõ)
    "#17A2B8", // CHECKED OUT - Xanh cyan (đã trả phòng, thông báo nhẹ)
    "#28A745", // CHECKED IN - Xanh lá (đã nhận phòng, thành công)
    "#007BFF", // BOOKED - Xanh dương (trạng thái đã đặt, trung lập)
    "#FFC107", // PENDING - Vàng cam (đang chờ xử lý, cảnh báo nhẹ)
    "#FD7E14", // NOT PAID - Cam đậm (chưa thanh toán, cảnh báo)
    "#DC3545", // CANCELLED - Đỏ (hủy bỏ, lỗi)
  ];
  // Sample reservation data
  const reservations = [
    {
      id: "01",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "BOOKED",
    },
    {
      id: "02",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "BOOKED",
    },
    {
      id: "03",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "BOOKED",
    },
    {
      id: "04",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "CHECKED IN",
    },
    {
      id: "05",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "CHECKED IN",
    },
    {
      id: "06",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "CHECKED OUT",
    },

    {
      id: "07",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "CHECKED OUT",
    },
    {
      id: "08",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "COMPLETED",
    },
    {
      id: "09",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "COMPLETED",
    },
    {
      id: "10",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "PENDING",
    },
    {
      id: "12",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "PENDING",
    },
    {
      id: "13",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "CANCELLED",
    },
    {
      id: "14",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "CANCELLED",
    },
    {
      id: "15",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "NOT PAID",
    },
    {
      id: "16",
      hotelName: "Ha Noi Note",
      checkIn: "12/03/2024",
      checkOut: "12/03/2024",
      totalPrice: "$12,230",
      status: "NOT PAID",
    },
  ];
  const [filterBill, setFilterBill] = useState([]);
  useEffect(() => {
    const newList = reservations.filter(
      (e, i) => e.status === filters[activeFilter]
    );
    setFilterBill(newList);
  }, [activeFilter]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "1px solid #0d6efd" : "1px solid #ced4da",
      boxShadow: state.isFocused
        ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)"
        : "none",
      borderRadius: "0.375rem",
      backgroundColor: "#fff",
      padding: "2px 4px",
      transition: "border 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
      minHeight: "40px",
      fontSize: "0.95rem",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6c757d",
    }),
  };

  console.log("DateFilter: ", dateFilter);
  return (
    <Container fluid className="py-4">
      <h2 className="fw-bold mb-4">Booking History</h2>
      <Row className="align-items-center mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="mb-2">Filter by Status</Form.Label>
            <Select
              options={filters.map((status, index) => ({
                value: index,
                label: status,
                color: colors[index], // Màu sắc tùy chỉnh cho mỗi option
              }))}
              value={
                filters[activeFilter]
                  ? { value: activeFilter, label: filters[activeFilter] }
                  : null
              }
              onChange={(option) => {
                setActiveFilter(option.value);
                setStatusBooking(option.value);
              }}
              placeholder="Select Status"
              isSearchable
              styles={{
                ...customStyles,
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected
                    ? colors[state.data.value]
                    : "white",
                  color: state.isSelected ? "white" : "black",
                }),
              }}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label className="mb-2">Filter by Date</Form.Label>
            <Select
              options={[
                { value: "NEWEST", label: "NEWEST DATE" },
                { value: "OLDEST", label: "OLDEST DATE" },
              ]}
              value={
                dateFilter === "NEWEST"
                  ? { value: "NEWEST", label: "NEWEST DATE" }
                  : dateFilter === "OLDEST"
                  ? { value: "OLDEST", label: "OLDEST DATE" }
                  : null
              }
              onChange={(option) => {
                setDateFilter(option.value); // Xử lý lọc theo giá trị chọn
              }}
              placeholder="Chọn thứ tự"
              isSearchable={false}
              styles={customStyles} // nếu bạn có custom styles chung
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Reservation cards */}
      <Row>
        {filterBill.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
            <div
              className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-4"
              style={{
                width: 140,
                height: 140,
                transition: "transform 0.3s",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src="/empty-state.svg"
                alt="No data"
                style={{ width: 80, height: 80, opacity: 0.75 }}
              />
            </div>
            <h5 className="text-muted fw-semibold">No Reservations Yet</h5>
            <p className="text-secondary mb-0" style={{ maxWidth: 300 }}>
              You hasn’t has any bookings yet. Be the first to make
              a reservation!
            </p>
          </div>
        ) : (
          filterBill.map((reservation) => (
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
                          marginLeft: 8,
                          paddingTop: 8,
                          paddingBottom: 8,
                          paddingLeft: 16,
                          paddingRight: 16,
                          borderRadius: 8,
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
          ))
        )}
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
