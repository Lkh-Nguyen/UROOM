"use client"

import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Button, Pagination, Form } from "react-bootstrap"
import "../../../../css/customer/BookingHistory.css"
import * as Routers from "../../../../utils/Routes"
import { useNavigate } from "react-router-dom"
import CancelReservationModal from "pages/customer/home/components/CancelReservationModal"
import { showToast, ToastProvider } from "components/ToastContainer"
import { getStatusBooking, setStatusBooking } from "../../../../utils/handleToken"
import Select from "react-select"
import { useAppSelector, useAppDispatch } from "../../../../redux/store"
import ReservationActions from "../../../../redux/reservations/actions"
import React from "react"
const BookingHistory = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const Auth = useAppSelector((state) => state.Auth.Auth)
  const [activeFilter, setActiveFilter] = useState(0)
  const [dateFilter, setDateFilter] = useState("NEWEST")
  const [activePage, setActivePage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6) // 3 columns x 2 rows = 6 items per page
  const [totalPages, setTotalPages] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [filterBill, setFilterBill] = useState([])
  const [reservations, setReservations] = useState([])

  // Filter options
  const filters = [
    "COMPLETED", // Hoàn thành, đã phản hồi
    "CHECKED OUT", // Đã check-out, có thể để lại phản hồi
    "CHECKED IN", // Đang ở, đã check-in
    "BOOKED", // Đã đặt, trả tiền nhưng chưa check-in
    "PENDING", // Chờ xử lý hoặc xác nhận
    "NOT PAID", // Chưa trả tiền
    "CANCELLED", // Đã hủy
  ]

  const colors = [
    "#6F42C1", // COMPLETED - Tím (hoàn thành, khác biệt rõ)
    "#17A2B8", // CHECKED OUT - Xanh cyan (đã trả phòng, thông báo nhẹ)
    "#28A745", // CHECKED IN - Xanh lá (đã nhận phòng, thành công)
    "#007BFF", // BOOKED - Xanh dương (trạng thái đã đặt, trung lập)
    "#FFC107", // PENDING - Vàng cam (đang chờ xử lý, cảnh báo nhẹ)
    "#FD7E14", // NOT PAID - Cam đậm (chưa thanh toán, cảnh báo)
    "#DC3545", // CANCELLED - Đỏ (hủy bỏ, lỗi)
  ]

  useEffect(() => {
    const fetchIndex = async () => {
      const result = await getStatusBooking()
      setActiveFilter(Number(result)) // nhớ ép kiểu về số
    }
    fetchIndex()
  }, [])

  // Fetch user reservations from API
  useEffect(() => {
    fetchUserReservations()
  }, dispatch)

  const fetchUserReservations = () => {
    setIsLoading(true)
    dispatch({
      type: ReservationActions.FETCH_USER_RESERVATIONS,
      payload: {
        userId: Auth?.user?._id,
        onSuccess: (data) => {
          console.log("Fetched reservations:", data)
          // Transform API data to match the expected format
          const transformedData = data.map((reservation) => ({
            id: reservation._id,
            hotelId: reservation.hotel?._id,
            hotelName: reservation.hotel?.hotelName || "Unknown Hotel",
            checkIn: new Date(reservation.checkInDate).toLocaleDateString(),
            checkOut: new Date(reservation.checkOutDate).toLocaleDateString(),
            totalPrice: formatCurrency(reservation.totalPrice),
            status: reservation.status || "PENDING",
            originalData: reservation, // Keep the original data for reference
            createdAt: reservation.createdAt
          }))
          setReservations(transformedData)
          setIsLoading(false)
        },

        onFailed: (msg) => {
          setIsLoading(false)
          // Set empty reservations if fetch fails
          setReservations([])
        },
        onError: (err) => {
          console.error("Error fetching reservations:", err)
          setIsLoading(false)
          // Set empty reservations if fetch fails
          setReservations([])
        },
      },
    })
  }

  // Format currency for display
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "$0"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Filter reservations based on selected status
  useEffect(() => {
    const newList = reservations.filter((e) => e.status === filters[activeFilter])

    // Apply date sorting
    const sortedList = [...newList]
    if (dateFilter === "NEWEST") {
      sortedList.sort((a, b) => {
        return new Date(b.originalData?.createdAt || b.checkIn) - new Date(a.originalData?.createdAt || a.checkIn)
      })
    } else {
      sortedList.sort((a, b) => {
        return new Date(a.originalData?.createdAt || a.checkIn) - new Date(b.originalData?.createdAt || b.checkIn)
      })
    }

    setFilterBill(sortedList)
  }, [activeFilter, reservations, dateFilter])

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "1px solid #0d6efd" : "1px solid #ced4da",
      boxShadow: state.isFocused ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)" : "none",
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
  }

  // Handle cancel reservation
  const handleCancelReservation = (reservation) => {
    setSelectedReservation(reservation)
    setShowModal(true)
  }

  // Get paginated data
  const getPaginatedData = () => {
    const startIndex = (activePage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filterBill.slice(startIndex, endIndex)
  }

  // Calculate total pages whenever filtered data changes
  useEffect(() => {
    setTotalPages(Math.ceil(filterBill.length / itemsPerPage))
    // Reset to page 1 if current page is now invalid
    if (activePage > Math.ceil(filterBill.length / itemsPerPage) && filterBill.length > 0) {
      setActivePage(1)
    }
  }, [filterBill, itemsPerPage])

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
              value={filters[activeFilter] ? { value: activeFilter, label: filters[activeFilter] } : null}
              onChange={(option) => {
                setActiveFilter(option.value)
                setStatusBooking(option.value)
              }}
              placeholder="Select Status"
              isSearchable
              styles={{
                ...customStyles,
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? colors[state.data.value] : "white",
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
                setDateFilter(option.value) // Xử lý lọc theo giá trị chọn
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
        {isLoading ? (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filterBill.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
            <div
              className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-4"
              style={{
                width: 140,
                height: 140,
                transition: "transform 0.3s",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img src="/empty-state.svg" alt="No data" style={{ width: 80, height: 80, opacity: 0.75 }} />
            </div>
            <h5 className="text-muted fw-semibold">No Reservations Yet</h5>
            <p className="text-secondary mb-0" style={{ maxWidth: 300 }}>
              You haven't had any {filters[activeFilter].toLowerCase()} bookings yet.
            </p>
          </div>
        ) : (
          getPaginatedData().map((reservation) => (
            <Col key={reservation.id} lg={4} md={6} sm={12} className="mb-4">
              <Card className="reservation-card">
                <Card.Body>
                  <div className="reservation-header">
                    {/* <h5>Reservation ID: {reservation.id.substring(0, 8)}</h5> */}
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
                  {/* <h1>{reservation.id}</h1> */}
                  <Button
                    variant="outline-primary"
                    style={{ width: "100%", marginTop: "10px" }}
                    onClick={() => {
                      navigate(`${Routers.BookingBill}/${reservation.id}`)
                    }}
                  >
                    View Details
                  </Button>
                  {activeFilter == 1 && (
                    <Button
                      variant="outline-success"
                      style={{ width: "100%", marginTop: "10px" }}
                      onClick={() => {
                        navigate(`${Routers.CreateFeedback}/${reservation.id}`);
                      }}
                    >
                      Create Feedback
                    </Button>
                  )}
                  {activeFilter == 4 && (
                    <Button
                      variant="outline-danger"
                      style={{ width: "100%", marginTop: "10px" }}
                      onClick={() => handleCancelReservation(reservation)}
                    >
                      Cancel Booking
                    </Button>
                  )}
                  {activeFilter == 5 && (
                    <Button
                      variant="outline-warning"
                      style={{ width: "100%", marginTop: "10px" }}
                      onClick={() => {
                        console.log(reservation)
                        navigate(Routers.PaymentPage,
                          {
                            state: {
                              createdAt: reservation.createdAt,
                              idReservation: reservation.id,
                              totalPrice: reservation.totalPrice,
                            }
                          }
                        )
                      }}
                    >
                      Pay money
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {filterBill.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First onClick={() => setActivePage(1)} disabled={activePage === 1} />
            <Pagination.Prev
              onClick={() => setActivePage((prev) => Math.max(prev - 1, 1))}
              disabled={activePage === 1}
            />

            {/* Show page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                // Show current page, and pages close to current page
                return page === 1 || page === totalPages || Math.abs(page - activePage) <= 1
              })
              .map((page, index, array) => {
                // Add ellipsis if there are gaps
                if (index > 0 && array[index - 1] !== page - 1) {
                  return (
                    <React.Fragment key={`ellipsis-${page}`}>
                      <Pagination.Ellipsis disabled />
                      <Pagination.Item key={page} active={page === activePage} onClick={() => setActivePage(page)}>
                        <b style={{ color: page === activePage ? "white" : "#0d6efd" }}>{page}</b>
                      </Pagination.Item>
                    </React.Fragment>
                  )
                }
                return (
                  <Pagination.Item key={page} active={page === activePage} onClick={() => setActivePage(page)}>
                    <b style={{ color: page === activePage ? "white" : "#0d6efd" }}>{page}</b>
                  </Pagination.Item>
                )
              })}

            <Pagination.Next
              onClick={() => setActivePage((prev) => Math.min(prev + 1, totalPages))}
              disabled={activePage === totalPages}
            />
            <Pagination.Last onClick={() => setActivePage(totalPages)} disabled={activePage === totalPages} />
          </Pagination>
        </div>
      )}

      <ToastProvider />
      <CancelReservationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false)
          showToast.success("Cancel Booking Successfully!")
          // After successful cancellation, refresh the reservations
          fetchUserReservations()
        }}
      />
    </Container>
  )
}

export default BookingHistory
