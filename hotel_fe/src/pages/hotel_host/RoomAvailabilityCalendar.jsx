"use client"

import { showToast, ToastProvider } from "@components/ToastContainer"
import { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Form,
  Modal,
  Table,
  Alert,
  OverlayTrigger,
  Tooltip,
  ButtonGroup,
} from "react-bootstrap"
import {
  FaCalendarAlt,
  FaFilter,
  FaUser,
  FaInfoCircle,
  FaCheck,
  FaClock,
  FaSignInAlt,
  FaSignOutAlt,
  FaPrint,
  FaWifi,
  FaUtensils,
  FaWineGlassAlt,
  FaCar,
  FaSpa,
  FaSwimmingPool,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaPhone,
  FaEnvelope,
  FaTrash,
  FaEye,
} from "react-icons/fa"

function RoomAvailabilityCalendar() {
  // State management
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewDays, setViewDays] = useState(14)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [filterRoomType, setFilterRoomType] = useState("all")
  const [showCheckInModal, setShowCheckInModal] = useState(false)
  const [showCheckOutModal, setShowCheckOutModal] = useState(false)
  const [checkInBooking, setCheckInBooking] = useState(null)
  const [checkOutBooking, setCheckOutBooking] = useState(null)
  const [selectedServices, setSelectedServices] = useState([])
  const [paymentMethod, setPaymentMethod] = useState("credit")

  // Quick booking state
  const [quickBookingData, setQuickBookingData] = useState({
    guestName: "",
    phoneNumber: "",
    email: "",
    nights: 1,
    guestCount: 1,
  })

  // Sample room data
  const [rooms, setRooms] = useState([
    { id: 101, name: "101", type: "Single", capacity: 1, price: 85, status: "available", floor: 1 },
    { id: 102, name: "102", type: "Single", capacity: 1, price: 85, status: "available", floor: 1 },
    { id: 103, name: "103", type: "Double", capacity: 2, price: 120, status: "available", floor: 1 },
    { id: 104, name: "104", type: "Double", capacity: 2, price: 120, status: "available", floor: 1 },
    { id: 105, name: "105", type: "Suite", capacity: 3, price: 200, status: "available", floor: 1 },
    { id: 201, name: "201", type: "Single", capacity: 1, price: 90, status: "available", floor: 2 },
    { id: 202, name: "202", type: "Double", capacity: 2, price: 130, status: "available", floor: 2 },
    { id: 203, name: "203", type: "Suite", capacity: 4, price: 250, status: "available", floor: 2 },
    { id: 204, name: "204", type: "Double", capacity: 2, price: 130, status: "available", floor: 2 },
    { id: 205, name: "205", type: "Single", capacity: 1, price: 90, status: "available", floor: 2 },
  ])

  // Sample booking data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      roomId: 101,
      guestName: "Nguyễn Văn A",
      startDate: new Date(2024, 11, 18),
      endDate: new Date(2024, 11, 20),
      status: "confirmed",
      type: "single",
      guestCount: 1,
      paymentStatus: "paid",
      checkedIn: true,
      checkedOut: false,
      services: [],
      depositAmount: 85,
      idNumber: "123456789",
      phoneNumber: "0987654321",
      email: "nguyen.van.a@example.com",
    },
    {
      id: 2,
      roomId: 103,
      guestName: "Trần Thị B",
      startDate: new Date(2024, 11, 19),
      endDate: new Date(2024, 11, 22),
      status: "confirmed",
      type: "double",
      guestCount: 2,
      paymentStatus: "pending",
      checkedIn: false,
      checkedOut: false,
      services: [],
      depositAmount: 0,
      idNumber: "987654321",
      phoneNumber: "0123456789",
      email: "tran.thi.b@example.com",
    },
    {
      id: 3,
      roomId: 105,
      guestName: "Lê Văn C",
      startDate: new Date(2024, 11, 17),
      endDate: new Date(2024, 11, 21),
      status: "confirmed",
      type: "suite",
      guestCount: 3,
      paymentStatus: "paid",
      checkedIn: true,
      checkedOut: false,
      services: [],
      depositAmount: 200,
      idNumber: "456789123",
      phoneNumber: "0345678912",
      email: "le.van.c@example.com",
    },
  ])

  // Available services
  const availableServices = [
    { id: 1, name: "WiFi Cao cấp", icon: FaWifi, price: 10 },
    { id: 2, name: "Bữa sáng", icon: FaUtensils, price: 15 },
    { id: 3, name: "Mini Bar", icon: FaWineGlassAlt, price: 25 },
    { id: 4, name: "Bãi đậu xe", icon: FaCar, price: 12 },
    { id: 5, name: "Dịch vụ Spa", icon: FaSpa, price: 50 },
    { id: 6, name: "Sử dụng hồ bơi", icon: FaSwimmingPool, price: 20 },
  ]

  // Utility functions
  const getDates = () => {
    const dates = []
    const startDate = new Date(currentDate)
    for (let i = 0; i < viewDays; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("vi-VN", { month: "short", day: "numeric" })
  }

  const formatDayOfWeek = (date) => {
    return date.toLocaleDateString("vi-VN", { weekday: "short" })
  }

  const isRoomBooked = (roomId, date) => {
    return bookings.some(
      (booking) =>
        booking.roomId === roomId && date >= booking.startDate && date < booking.endDate && !booking.checkedOut,
    )
  }

  const getBooking = (roomId, date) => {
    return bookings.find(
      (booking) =>
        booking.roomId === roomId && date >= booking.startDate && date < booking.endDate && !booking.checkedOut,
    )
  }

  const isCheckInDate = (booking, date) => {
    return date.toDateString() === booking.startDate.toDateString()
  }

  const isCheckOutDate = (booking, date) => {
    const checkoutDate = new Date(booking.endDate)
    checkoutDate.setDate(checkoutDate.getDate() - 1)
    return date.toDateString() === checkoutDate.toDateString()
  }

  const navigateDate = (days) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + days)
    setCurrentDate(newDate)
  }

  // Quick booking handler
  const handleQuickBooking = (room, date) => {
    if (!quickBookingData.guestName || !quickBookingData.phoneNumber) {
      showToast.warning("Vui lòng nhập tên khách và số điện thoại!")
      return
    }

    const startDate = new Date(date)
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + quickBookingData.nights)

    const newBooking = {
      id: bookings.length + 1,
      roomId: room.id,
      guestName: quickBookingData.guestName,
      startDate,
      endDate,
      status: "confirmed",
      type: room.type.toLowerCase(),
      guestCount: quickBookingData.guestCount,
      paymentStatus: "pending",
      checkedIn: false,
      checkedOut: false,
      services: [],
      depositAmount: 0,
      idNumber: "",
      phoneNumber: quickBookingData.phoneNumber,
      email: quickBookingData.email || "",
    }

    setBookings([...bookings, newBooking])
    setQuickBookingData({ guestName: "", phoneNumber: "", email: "", nights: 1, guestCount: 1 })
    showToast.success("Đặt phòng thành công!")
  }

  // Cancel booking handler
  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đặt phòng này?")) {
      setBookings(bookings.filter((booking) => booking.id !== bookingId))
      setShowDetailsModal(false)
      showToast.success("Đã hủy đặt phòng thành công!")
    }
  }

  // Check-in handler
  const handleCheckIn = (bookingId, depositAmount) => {
    const updatedBookings = bookings.map((booking) => {
      if (booking.id === bookingId) {
        return {
          ...booking,
          checkedIn: true,
          paymentStatus: depositAmount > 0 ? "partially paid" : "pending",
          depositAmount: depositAmount,
        }
      }
      return booking
    })
    setBookings(updatedBookings)
    setShowCheckInModal(false)
    showToast.success("Nhận phòng thành công!")
  }

  // Check-out handler
  const handleCheckOut = (bookingId, selectedServices) => {
    const updatedBookings = bookings.map((booking) => {
      if (booking.id === bookingId) {
        return {
          ...booking,
          checkedOut: true,
          paymentStatus: "paid",
          services: selectedServices,
        }
      }
      return booking
    })
    setBookings(updatedBookings)
    setShowCheckOutModal(false)
    showToast.success("Trả phòng thành công!")
  }

  // Service toggle
  const toggleService = (service) => {
    if (selectedServices.some((s) => s.id === service.id)) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id))
    } else {
      setSelectedServices([...selectedServices, service])
    }
  }

  // Calculate bill
  const calculateBill = (booking) => {
    if (!booking) return { roomCharge: 0, serviceCharge: 0, total: 0, deposit: 0, balance: 0 }

    const room = rooms.find((r) => r.id === booking.roomId)
    const roomPrice = room ? room.price : 0
    const nights = Math.round((booking.endDate - booking.startDate) / (1000 * 60 * 60 * 24))
    const roomCharge = roomPrice * nights
    const serviceCharge = selectedServices.reduce((total, service) => total + service.price, 0)
    const total = roomCharge + serviceCharge
    const deposit = booking.depositAmount || 0
    const balance = total - deposit

    return { roomCharge, serviceCharge, total, deposit, balance }
  }

  // Filter rooms
  const filteredRooms =
    filterRoomType === "all"
      ? rooms
      : filterRoomType === "available"
        ? rooms.filter(
            (room) =>
              !bookings.some(
                (booking) =>
                  booking.roomId === room.id &&
                  currentDate >= booking.startDate &&
                  currentDate < booking.endDate &&
                  !booking.checkedOut,
              ),
          )
        : rooms.filter((room) => room.type.toLowerCase() === filterRoomType.toLowerCase())

  // Get room stats
  const roomStats = {
    available: rooms.filter(
      (r) =>
        !bookings.some(
          (b) => b.roomId === r.id && currentDate >= b.startDate && currentDate < b.endDate && !b.checkedOut,
        ),
    ).length,
    occupied: rooms.filter((r) =>
      bookings.some(
        (b) =>
          b.roomId === r.id &&
          currentDate >= b.startDate &&
          currentDate < b.endDate &&
          b.paymentStatus === "paid" &&
          !b.checkedOut,
      ),
    ).length,
    pending: rooms.filter((r) =>
      bookings.some(
        (b) =>
          b.roomId === r.id &&
          currentDate >= b.startDate &&
          currentDate < b.endDate &&
          b.paymentStatus === "pending" &&
          !b.checkedOut,
      ),
    ).length,
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <ToastProvider/>
      <Container fluid className="py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={8}>
                    <h1 className="display-6 fw-bold text-primary mb-2">
                      <FaCalendarAlt className="me-3" />
                      Quản lý đặt phòng khách sạn
                    </h1>
                    <p className="text-muted mb-0">Theo dõi và quản lý tình trạng phòng một cách dễ dàng</p>
                  </Col>
                  <Col md={4} className="text-end">
                    <ButtonGroup>
                      <Button variant="outline-primary" onClick={() => navigateDate(-viewDays)}>
                        <FaChevronLeft className="me-2" />
                        Trước
                      </Button>
                      <Button variant="outline-secondary" disabled>
                        {formatDate(currentDate)} - {formatDate(getDates()[getDates().length - 1])}
                      </Button>
                      <Button variant="outline-primary" onClick={() => navigateDate(viewDays)}>
                        Sau
                        <FaChevronRight className="ms-2" />
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Quick Booking Panel */}
        <Row className="mb-4">
          <Col>
            <Card className="border-primary border-2 shadow">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">
                  <FaPlus className="me-2" />
                  Đặt phòng nhanh
                </h5>
              </Card.Header>
              <Card.Body className="bg-light">
                <Row>
                  <Col md={2}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tên khách *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên khách"
                        value={quickBookingData.guestName}
                        onChange={(e) => setQuickBookingData({ ...quickBookingData, guestName: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group className="mb-3">
                      <Form.Label>Số điện thoại *</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Nhập SĐT"
                        value={quickBookingData.phoneNumber}
                        onChange={(e) => setQuickBookingData({ ...quickBookingData, phoneNumber: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Nhập email"
                        value={quickBookingData.email}
                        onChange={(e) => setQuickBookingData({ ...quickBookingData, email: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group className="mb-3">
                      <Form.Label>Số đêm</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={quickBookingData.nights}
                        onChange={(e) =>
                          setQuickBookingData({ ...quickBookingData, nights: Number.parseInt(e.target.value) })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group className="mb-3">
                      <Form.Label>Số khách</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={quickBookingData.guestCount}
                        onChange={(e) =>
                          setQuickBookingData({ ...quickBookingData, guestCount: Number.parseInt(e.target.value) })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={1} className="d-flex align-items-end">
                    <Alert variant="info" className="mb-3 w-100 text-center">
                      <small>Nhấp vào ô trống để đặt phòng</small>
                    </Alert>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Stats and Filters */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="text-center border-success shadow-sm">
              <Card.Body>
                <h2 className="text-success fw-bold">{roomStats.available}</h2>
                <p className="text-muted mb-0">Phòng trống</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center border-danger shadow-sm">
              <Card.Body>
                <h2 className="text-danger fw-bold">{roomStats.occupied}</h2>
                <p className="text-muted mb-0">Đã thuê</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center border-warning shadow-sm">
              <Card.Body>
                <h2 className="text-warning fw-bold">{roomStats.pending}</h2>
                <p className="text-muted mb-0">Chờ xác nhận</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <Form.Group>
                  <Form.Label>
                    <FaFilter className="me-2" />
                    Lọc phòng
                  </Form.Label>
                  <Form.Select value={filterRoomType} onChange={(e) => setFilterRoomType(e.target.value)}>
                    <option value="all">Tất cả phòng</option>
                    <option value="available">Phòng trống</option>
                    <option value="single">Phòng đơn</option>
                    <option value="double">Phòng đôi</option>
                    <option value="suite">Phòng Suite</option>
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Calendar Grid */}
        <Row>
          <Col>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-0">
                <div style={{ overflowX: "auto" }}>
                  <div style={{ minWidth: "1200px" }}>
                    {/* Header Row */}
                    <div className="d-flex border-bottom bg-light">
                      <div
                        style={{ width: "200px" }}
                        className="p-3 border-end bg-white d-flex flex-column justify-content-center"
                      >
                        <h6 className="fw-bold mb-1">Phòng</h6>
                        <small className="text-muted">Nhấp để đặt/xem</small>
                      </div>
                      {getDates().map((date, index) => (
                        <div
                          key={index}
                          style={{ width: "120px" }}
                          className={`p-3 text-center border-end ${
                            date.getDay() === 0 || date.getDay() === 6 ? "bg-info bg-opacity-10" : "bg-white"
                          }`}
                        >
                          <div className="small text-muted">{formatDayOfWeek(date)}</div>
                          <div className="fw-medium">{formatDate(date)}</div>
                        </div>
                      ))}
                    </div>

                    {/* Room Rows */}
                    {filteredRooms.map((room) => (
                      <div key={room.id} className="d-flex border-bottom">
                        {/* Room Info */}
                        <div style={{ width: "200px" }} className="p-3 border-end bg-white">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="fw-bold mb-0">Phòng {room.name}</h6>
                            <Badge
                              bg={room.type === "Single" ? "info" : room.type === "Double" ? "primary" : "success"}
                            >
                              {room.type === "Single" ? "Đơn" : room.type === "Double" ? "Đôi" : "Suite"}
                            </Badge>
                          </div>
                          <div className="small text-muted mb-1">
                            <FaUser className="me-1" />
                            {room.capacity} khách
                          </div>
                          <div className="small fw-medium text-success">${room.price}/đêm</div>
                          <div className="small text-muted">Tầng {room.floor}</div>
                        </div>

                        {/* Date Cells */}
                        {getDates().map((date, dateIndex) => {
                          const isBooked = isRoomBooked(room.id, date)
                          const booking = isBooked ? getBooking(room.id, date) : null
                          const isPending = booking && booking.paymentStatus === "pending"
                          const isToday = date.toDateString() === new Date().toDateString()
                          const isCheckIn = booking && isCheckInDate(booking, date)
                          const isCheckOut = booking && isCheckOutDate(booking, date)

                          const cellStyle = {
                            width: "120px",
                            minHeight: "100px",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }

                          let cellClass = "p-2 border-end d-flex flex-column justify-content-center"

                          if (isBooked) {
                            if (isPending) {
                              cellClass += " bg-warning bg-opacity-25"
                              cellStyle.borderLeft = "4px solid #ffc107"
                            } else {
                              cellClass += " bg-danger bg-opacity-25"
                              cellStyle.borderLeft = "4px solid #dc3545"
                            }
                          } else {
                            cellClass += " bg-success bg-opacity-10"
                            cellStyle.borderLeft = "4px solid #198754"
                          }

                          if (date.getDay() === 0 || date.getDay() === 6) {
                            cellClass += " bg-info bg-opacity-5"
                          }

                          return (
                            <div
                              key={dateIndex}
                              className={cellClass}
                              style={cellStyle}
                              onClick={() => !isBooked && handleQuickBooking(room, date)}
                            >
                              {isBooked ? (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip>
                                      <strong>{booking.guestName}</strong>
                                      <br />
                                      Nhận: {booking.startDate.toLocaleDateString()}
                                      <br />
                                      Trả: {booking.endDate.toLocaleDateString()}
                                      <br />
                                      Trạng thái: {booking.paymentStatus === "paid" ? "Đã TT" : "Chưa TT"}
                                    </Tooltip>
                                  }
                                >
                                  <div>
                                    <div className="small fw-medium text-truncate mb-1">{booking.guestName}</div>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                      <Badge bg={isPending ? "warning" : "danger"} className="small">
                                        {isPending ? "Chờ TT" : "Đã TT"}
                                      </Badge>
                                      {booking.checkedIn ? (
                                        <FaCheck className="text-success" />
                                      ) : (
                                        <FaClock className="text-warning" />
                                      )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="d-grid gap-1">
                                      {!booking.checkedIn && isCheckIn && isToday && (
                                        <Button
                                          size="sm"
                                          variant="warning"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            setCheckInBooking(booking)
                                            setShowCheckInModal(true)
                                          }}
                                        >
                                          <FaSignInAlt className="me-1" />
                                          Nhận
                                        </Button>
                                      )}

                                      {booking.checkedIn && isCheckOut && isToday && !booking.checkedOut && (
                                        <Button
                                          size="sm"
                                          variant="danger"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            setCheckOutBooking(booking)
                                            setSelectedServices([])
                                            setShowCheckOutModal(true)
                                          }}
                                        >
                                          <FaSignOutAlt className="me-1" />
                                          Trả
                                        </Button>
                                      )}

                                      <Button
                                        size="sm"
                                        variant="outline-primary"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setSelectedBooking(booking)
                                          setShowDetailsModal(true)
                                        }}
                                      >
                                        <FaEye className="me-1" />
                                        Xem
                                      </Button>
                                    </div>
                                  </div>
                                </OverlayTrigger>
                              ) : (
                                <div className="text-center text-success">
                                  <FaCheck size={24} className="mb-2" />
                                  <div className="small fw-medium">Trống</div>
                                  <Button size="sm" variant="outline-success" className="mt-1">
                                    <FaPlus className="me-1" />
                                    Đặt ngay
                                  </Button>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Booking Details Modal */}
        <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg" centered>
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title>
              <FaInfoCircle className="me-2" />
              Chi tiết đặt phòng
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedBooking && (
              <div>
                <Row>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header className="bg-light">
                        <h6 className="mb-0">Thông tin khách hàng</h6>
                      </Card.Header>
                      <Card.Body>
                        <div className="mb-2">
                          <FaUser className="me-2 text-muted" />
                          <strong>{selectedBooking.guestName}</strong>
                        </div>
                        <div className="mb-2">
                          <FaPhone className="me-2 text-muted" />
                          {selectedBooking.phoneNumber}
                        </div>
                        <div className="mb-2">
                          <FaEnvelope className="me-2 text-muted" />
                          {selectedBooking.email}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header className="bg-light">
                        <h6 className="mb-0">Chi tiết đặt phòng</h6>
                      </Card.Header>
                      <Card.Body>
                        <div className="mb-2">
                          <strong>Phòng:</strong> {selectedBooking.roomId}
                        </div>
                        <div className="mb-2">
                          <strong>Nhận phòng:</strong> {selectedBooking.startDate.toLocaleDateString()}
                        </div>
                        <div className="mb-2">
                          <strong>Trả phòng:</strong> {selectedBooking.endDate.toLocaleDateString()}
                        </div>
                        <div className="mb-2">
                          <strong>Số khách:</strong> {selectedBooking.guestCount}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Card>
                      <Card.Header className="bg-light">
                        <h6 className="mb-0">Trạng thái</h6>
                      </Card.Header>
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <Badge bg={selectedBooking.status === "confirmed" ? "success" : "warning"} className="me-2">
                              {selectedBooking.status === "confirmed" ? "Đã xác nhận" : "Chờ xác nhận"}
                            </Badge>
                            <Badge
                              bg={
                                selectedBooking.paymentStatus === "paid"
                                  ? "success"
                                  : selectedBooking.paymentStatus === "partially paid"
                                    ? "info"
                                    : "warning"
                              }
                              className="me-2"
                            >
                              {selectedBooking.paymentStatus === "paid"
                                ? "Đã thanh toán"
                                : selectedBooking.paymentStatus === "partially paid"
                                  ? "Thanh toán một phần"
                                  : "Chưa thanh toán"}
                            </Badge>
                            <Badge bg={selectedBooking.checkedIn ? "success" : "secondary"}>
                              {selectedBooking.checkedIn ? "Đã nhận phòng" : "Chưa nhận phòng"}
                            </Badge>
                          </div>
                          <div>
                            {!selectedBooking.checkedIn && (
                              <Button
                                variant="warning"
                                size="sm"
                                className="me-2"
                                onClick={() => {
                                  setCheckInBooking(selectedBooking)
                                  setShowCheckInModal(true)
                                  setShowDetailsModal(false)
                                }}
                              >
                                <FaSignInAlt className="me-1" />
                                Nhận phòng
                              </Button>
                            )}
                            {selectedBooking.checkedIn && !selectedBooking.checkedOut && (
                              <Button
                                variant="danger"
                                size="sm"
                                className="me-2"
                                onClick={() => {
                                  setCheckOutBooking(selectedBooking)
                                  setSelectedServices([])
                                  setShowCheckOutModal(true)
                                  setShowDetailsModal(false)
                                }}
                              >
                                <FaSignOutAlt className="me-1" />
                                Trả phòng
                              </Button>
                            )}
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleCancelBooking(selectedBooking.id)}
                            >
                              <FaTrash className="me-1" />
                              Hủy đặt phòng
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
          </Modal.Body>
        </Modal>

        {/* Check-in Modal */}
        <Modal show={showCheckInModal} onHide={() => setShowCheckInModal(false)} size="lg" centered>
          <Modal.Header closeButton className="bg-warning text-dark">
            <Modal.Title>
              <FaSignInAlt className="me-2" />
              Nhận phòng
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {checkInBooking && (
              <div>
                <Row>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header className="bg-light">
                        <h6 className="mb-0">Thông tin khách hàng</h6>
                      </Card.Header>
                      <Card.Body>
                        <p>
                          <strong>Tên:</strong> {checkInBooking.guestName}
                        </p>
                        <p>
                          <strong>CMND/CCCD:</strong> {checkInBooking.idNumber}
                        </p>
                        <p>
                          <strong>Điện thoại:</strong> {checkInBooking.phoneNumber}
                        </p>
                        <p>
                          <strong>Email:</strong> {checkInBooking.email}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header className="bg-light">
                        <h6 className="mb-0">Chi tiết đặt phòng</h6>
                      </Card.Header>
                      <Card.Body>
                        <p>
                          <strong>Phòng:</strong> {checkInBooking.roomId}
                        </p>
                        <p>
                          <strong>Nhận phòng:</strong> {checkInBooking.startDate.toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Trả phòng:</strong> {checkInBooking.endDate.toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Số đêm:</strong>{" "}
                          {Math.round((checkInBooking.endDate - checkInBooking.startDate) / (1000 * 60 * 60 * 24))}
                        </p>
                        <p>
                          <strong>Số khách:</strong> {checkInBooking.guestCount}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Card>
                  <Card.Header className="bg-light">
                    <h6 className="mb-0">Thông tin thanh toán</h6>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Số tiền đặt cọc ($)</Form.Label>
                          <Form.Control
                            type="number"
                            id="depositAmount"
                            defaultValue={rooms.find((r) => r.id === checkInBooking.roomId)?.price || 0}
                            min="0"
                            step="0.01"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phương thức thanh toán</Form.Label>
                          <Form.Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="credit">Thẻ tín dụng</option>
                            <option value="cash">Tiền mặt</option>
                            <option value="bank">Chuyển khoản</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCheckInModal(false)}>
              Hủy
            </Button>
            <Button
              variant="warning"
              onClick={() => {
                const depositAmount = Number.parseFloat(document.getElementById("depositAmount").value)
                handleCheckIn(checkInBooking.id, depositAmount)
              }}
            >
              <FaSignInAlt className="me-2" />
              Xác nhận nhận phòng
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Check-out Modal */}
        <Modal show={showCheckOutModal} onHide={() => setShowCheckOutModal(false)} size="xl" centered>
          <Modal.Header closeButton className="bg-danger text-white">
            <Modal.Title>
              <FaSignOutAlt className="me-2" />
              Trả phòng
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {checkOutBooking && (
              <div>
                <Row>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header className="bg-light">
                        <h6 className="mb-0">Thông tin khách hàng</h6>
                      </Card.Header>
                      <Card.Body>
                        <p>
                          <strong>Tên:</strong> {checkOutBooking.guestName}
                        </p>
                        <p>
                          <strong>Điện thoại:</strong> {checkOutBooking.phoneNumber}
                        </p>
                        <p>
                          <strong>Email:</strong> {checkOutBooking.email}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header className="bg-light">
                        <h6 className="mb-0">Chi tiết lưu trú</h6>
                      </Card.Header>
                      <Card.Body>
                        <p>
                          <strong>Phòng:</strong> {checkOutBooking.roomId}
                        </p>
                        <p>
                          <strong>Nhận phòng:</strong> {checkOutBooking.startDate.toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Trả phòng:</strong> {checkOutBooking.endDate.toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Số đêm:</strong>{" "}
                          {Math.round((checkOutBooking.endDate - checkOutBooking.startDate) / (1000 * 60 * 60 * 24))}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Card className="mb-3">
                  <Card.Header className="bg-light">
                    <h6 className="mb-0">Dịch vụ bổ sung đã sử dụng</h6>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {availableServices.map((service) => (
                        <Col md={4} key={service.id} className="mb-2">
                          <Form.Check
                            type="checkbox"
                            id={`service-${service.id}`}
                            label={
                              <span>
                                <service.icon className="me-2" />
                                {service.name} (${service.price})
                              </span>
                            }
                            checked={selectedServices.some((s) => s.id === service.id)}
                            onChange={() => toggleService(service)}
                          />
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Header className="bg-light">
                    <h6 className="mb-0">Hóa đơn thanh toán</h6>
                  </Card.Header>
                  <Card.Body>
                    <Table striped bordered>
                      <thead>
                        <tr>
                          <th>Mô tả</th>
                          <th className="text-end">Số tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            Tiền phòng (
                            {Math.round((checkOutBooking.endDate - checkOutBooking.startDate) / (1000 * 60 * 60 * 24))}{" "}
                            đêm @ ${rooms.find((r) => r.id === checkOutBooking.roomId)?.price || 0}/đêm)
                          </td>
                          <td className="text-end">${calculateBill(checkOutBooking).roomCharge.toFixed(2)}</td>
                        </tr>
                        {selectedServices.map((service) => (
                          <tr key={service.id}>
                            <td>{service.name}</td>
                            <td className="text-end">${service.price.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr>
                          <td className="fw-bold">Tổng chi phí</td>
                          <td className="text-end fw-bold">
                            $
                            {(
                              calculateBill(checkOutBooking).roomCharge + calculateBill(checkOutBooking).serviceCharge
                            ).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td>Đã đặt cọc</td>
                          <td className="text-end">-${checkOutBooking.depositAmount.toFixed(2)}</td>
                        </tr>
                        <tr className="table-primary">
                          <td className="fw-bold">Số tiền cần thanh toán</td>
                          <td className="text-end fw-bold">${calculateBill(checkOutBooking).balance.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCheckOutModal(false)}>
              Hủy
            </Button>
            <Button variant="outline-primary" className="me-2">
              <FaPrint className="me-2" />
              In hóa đơn
            </Button>
            <Button variant="danger" onClick={() => handleCheckOut(checkOutBooking.id, selectedServices)}>
              <FaSignOutAlt className="me-2" />
              Xác nhận trả phòng
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}

export default RoomAvailabilityCalendar
