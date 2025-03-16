import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Form,
  Tooltip,
  OverlayTrigger,
  Modal,
  Dropdown,
  Table,
} from "react-bootstrap";
import {
  FaFilter,
  FaCalendarAlt,
  FaUser,
  FaInfoCircle,
  FaCheck,
  FaTimes,
  FaPlus,
  FaEllipsisV,
  FaTrash,
  FaClock,
  FaSignInAlt,
  FaSignOutAlt,
  FaEdit,
  FaPrint,
  FaWifi,
  FaUtensils,
  FaWineGlassAlt,
  FaCar,
  FaSpa,
  FaSwimmingPool,
} from "react-icons/fa";
import Sidebar from "./Sidebar";
import "../../css/hotelHost/BookingSchedule.css";

function RoomAvailabilityCalendar() {
  // State for current date and view range
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewDays, setViewDays] = useState(14); // Number of days to show
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filterRoomType, setFilterRoomType] = useState("all");

  // New state for room management
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [showEditRoomModal, setShowEditRoomModal] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState(null);

  // New state for check-in and check-out
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [checkInBooking, setCheckInBooking] = useState(null);
  const [checkOutBooking, setCheckOutBooking] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("credit");

  // Sample room data
  const [rooms, setRooms] = useState([
    {
      id: 101,
      name: "101",
      type: "Single",
      capacity: 1,
      price: 85,
      status: "available",
    },
    {
      id: 102,
      name: "102",
      type: "Single",
      capacity: 1,
      price: 85,
      status: "available",
    },
    {
      id: 103,
      name: "103",
      type: "Double",
      capacity: 2,
      price: 120,
      status: "available",
    },
    {
      id: 104,
      name: "104",
      type: "Double",
      capacity: 2,
      price: 120,
      status: "available",
    },
    {
      id: 105,
      name: "105",
      type: "Suite",
      capacity: 3,
      price: 200,
      status: "available",
    },
    {
      id: 201,
      name: "201",
      type: "Single",
      capacity: 1,
      price: 90,
      status: "available",
    },
    {
      id: 202,
      name: "202",
      type: "Double",
      capacity: 2,
      price: 130,
      status: "available",
    },
    {
      id: 203,
      name: "203",
      type: "Suite",
      capacity: 4,
      price: 250,
      status: "available",
    },
    {
      id: 204,
      name: "204",
      type: "Double",
      capacity: 2,
      price: 130,
      status: "available",
    },
    {
      id: 205,
      name: "205",
      type: "Single",
      capacity: 1,
      price: 90,
      status: "available",
    },
  ]);

  // Sample bookings data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      roomId: 101,
      guestName: "Nguyen Van A",
      startDate: new Date(2024, 2, 18),
      endDate: new Date(2024, 2, 20),
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
      guestName: "Tran Thi B",
      startDate: new Date(2024, 2, 19),
      endDate: new Date(2024, 2, 22),
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
      guestName: "Le Van C",
      startDate: new Date(2024, 2, 17),
      endDate: new Date(2024, 2, 21),
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
    {
      id: 4,
      roomId: 202,
      guestName: "Pham Thi D",
      startDate: new Date(2024, 2, 20),
      endDate: new Date(2024, 2, 25),
      status: "confirmed",
      type: "double",
      guestCount: 2,
      paymentStatus: "paid",
      checkedIn: true,
      checkedOut: false,
      services: [],
      depositAmount: 130,
      idNumber: "789123456",
      phoneNumber: "0567891234",
      email: "pham.thi.d@example.com",
    },
    {
      id: 5,
      roomId: 204,
      guestName: "Hoang Van E",
      startDate: new Date(2024, 2, 18),
      endDate: new Date(2024, 2, 19),
      status: "confirmed",
      type: "double",
      guestCount: 2,
      paymentStatus: "paid",
      checkedIn: true,
      checkedOut: false,
      services: [],
      depositAmount: 130,
      idNumber: "321654987",
      phoneNumber: "0789123456",
      email: "hoang.van.e@example.com",
    },
  ]);

  // Available services
  const availableServices = [
    { id: 1, name: "WiFi Premium", icon: FaWifi, price: 10 },
    { id: 2, name: "Breakfast", icon: FaUtensils, price: 15 },
    { id: 3, name: "Mini Bar", icon: FaWineGlassAlt, price: 25 },
    { id: 4, name: "Parking", icon: FaCar, price: 12 },
    { id: 5, name: "Spa Service", icon: FaSpa, price: 50 },
    { id: 6, name: "Pool Access", icon: FaSwimmingPool, price: 20 },
  ];

  // Generate dates for the calendar
  const getDates = () => {
    const dates = [];
    const startDate = new Date(currentDate);

    for (let i = 0; i < viewDays; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Format day of week
  const formatDayOfWeek = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  // Check if a room is booked on a specific date
  const isRoomBooked = (roomId, date) => {
    return bookings.some(
      (booking) =>
        booking.roomId === roomId &&
        date >= booking.startDate &&
        date < booking.endDate
    );
  };

  // Get booking for a specific room and date
  const getBooking = (roomId, date) => {
    return bookings.find(
      (booking) =>
        booking.roomId === roomId &&
        date >= booking.startDate &&
        date < booking.endDate
    );
  };

  // Check if today is check-in date for a booking
  const isCheckInDate = (booking, date) => {
    return date.toDateString() === booking.startDate.toDateString();
  };

  // Check if today is check-out date for a booking
  const isCheckOutDate = (booking, date) => {
    const checkoutDate = new Date(booking.endDate);
    checkoutDate.setDate(checkoutDate.getDate() - 1);
    return date.toDateString() === checkoutDate.toDateString();
  };

  // Handle date navigation
  const navigateDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  // Handle room click for booking
  const handleRoomClick = (room, date) => {
    const booking = getBooking(room.id, date);

    if (booking) {
      // Show booking details
      setSelectedBooking(booking);
      setShowDetailsModal(true);
    } else {
      // Show booking form
      setSelectedRoom({ ...room, date });
      setShowBookingModal(true);
    }
  };

  // Handle new booking
  const handleAddBooking = (e) => {
    e.preventDefault();

    // Get form data
    const guestName = e.target.guestName.value;
    const startDate = new Date(selectedRoom.date);
    const nights = Number.parseInt(e.target.nights.value);
    const guestCount = Number.parseInt(e.target.guestCount.value);
    const idNumber = e.target.idNumber.value;
    const phoneNumber = e.target.phoneNumber.value;
    const email = e.target.email.value;

    // Calculate end date
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + nights);

    // Create new booking
    const newBooking = {
      id: bookings.length + 1,
      roomId: selectedRoom.id,
      guestName,
      startDate,
      endDate,
      status: "confirmed",
      type: selectedRoom.type.toLowerCase(),
      guestCount,
      paymentStatus: "pending",
      checkedIn: false,
      checkedOut: false,
      services: [],
      depositAmount: 0,
      idNumber,
      phoneNumber,
      email,
    };

    // Add booking to list
    setBookings([...bookings, newBooking]);

    // Close modal
    setShowBookingModal(false);
  };

  // Handle adding a new room


  // Open edit room modal
  const openEditRoomModal = (room) => {
    setRoomToEdit(room);
    setShowEditRoomModal(true);
  };

  // Open check-in modal
  const openCheckInModal = (booking) => {
    setCheckInBooking(booking);
    setShowCheckInModal(true);
  };

  // Open check-out modal
  const openCheckOutModal = (booking) => {
    setCheckOutBooking(booking);
    setSelectedServices([]);
    setShowCheckOutModal(true);
  };

  // Handle check-in confirmation
  const handleCheckIn = (bookingId, depositAmount) => {
    const updatedBookings = bookings.map((booking) => {
      if (booking.id === bookingId) {
        return {
          ...booking,
          checkedIn: true,
          paymentStatus: depositAmount > 0 ? "partially paid" : "pending",
          depositAmount: depositAmount,
        };
      }
      return booking;
    });
    setBookings(updatedBookings);
    setShowCheckInModal(false);
  };

  // Handle check-out confirmation
  const handleCheckOut = (bookingId, selectedServices) => {
    const updatedBookings = bookings.map((booking) => {
      if (booking.id === bookingId) {
        return {
          ...booking,
          checkedOut: true,
          paymentStatus: "paid",
          services: selectedServices,
        };
      }
      return booking;
    });
    setBookings(updatedBookings);
    setShowCheckOutModal(false);
  };

  // Toggle service selection
  const toggleService = (service) => {
    if (selectedServices.some((s) => s.id === service.id)) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  // Calculate total bill for check-out
  const calculateBill = (booking) => {
    if (!booking)
      return {
        roomCharge: 0,
        serviceCharge: 0,
        total: 0,
        deposit: 0,
        balance: 0,
      };

    // Get room price
    const room = rooms.find((r) => r.id === booking.roomId);
    const roomPrice = room ? room.price : 0;

    // Calculate number of nights
    const nights = Math.round(
      (booking.endDate - booking.startDate) / (1000 * 60 * 60 * 24)
    );

    // Calculate room charge
    const roomCharge = roomPrice * nights;

    // Calculate service charge
    const serviceCharge = selectedServices.reduce(
      (total, service) => total + service.price,
      0
    );

    // Calculate total
    const total = roomCharge + serviceCharge;

    // Calculate balance due (total - deposit)
    const deposit = booking.depositAmount || 0;
    const balance = total - deposit;

    return {
      roomCharge,
      serviceCharge,
      total,
      deposit,
      balance,
    };
  };

  // Filter rooms based on type
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
                !booking.checkedOut
            )
        )
      : rooms.filter(
          (room) => room.type.toLowerCase() === filterRoomType.toLowerCase()
        );

  return (
    <div className="d-flex">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10">
        <Container>
          <div>
            <div className=" text-black d-flex justify-content-between align-items-center">
              <h2
                className="fw-bold text-secondary mb-4"
                style={{ marginTop: "2.5%" }}
              >
                Room Availability Calendar
              </h2>
              <div className="d-flex">
                <Button
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => navigateDate(-viewDays)}
                >
                  &lt;&lt; Previous
                </Button>
                <div className="d-flex">
                  <div style={{ color: "black" }} className="mt-1 me-2">
                    <FaCalendarAlt
                      className="me-2"
                      style={{ justifyContent: "center", alignItems: "center" }}
                    />
                    {formatDate(currentDate)} -{" "}
                    {formatDate(getDates()[getDates().length - 1])}
                  </div>
                </div>

                <Button
                  variant="outline-primary"
                  onClick={() => navigateDate(viewDays)}
                >
                  Next &gt;&gt;
                </Button>
              </div>
            </div>

            <Card.Body className="p-0">
              {/* Filters and Actions */}
              <div
                className="calendar-filters p-3  border-bottom"
                style={{ backgroundColor: "white", borderRadius: "10px" }}
              >
                <Row className="align-items-center">
                  <Col md={3}>
                    <div className="d-flex align-items-center">
                      <FaFilter className="me-2 text-primary" />
                      <span className="fw-bold">Filters:</span>
                    </div>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Room Type</Form.Label>
                      <Form.Select
                        value={filterRoomType}
                        onChange={(e) => setFilterRoomType(e.target.value)}
                      >
                        <option value="all">All Rooms</option>
                        <option value="available">Available Rooms</option>
                        <option value="single">Single Rooms</option>
                        <option value="double">Double Rooms</option>
                        <option value="suite">Suite Rooms</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>View Range</Form.Label>
                      <Form.Select
                        value={viewDays}
                        onChange={(e) =>
                          setViewDays(Number.parseInt(e.target.value))
                        }
                      >
                        <option value="7">7 Days</option>
                        <option value="14">14 Days</option>
                        <option value="30">30 Days</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                 
                </Row>
              </div>

              {/* Add a room availability summary at the top */}
              <Row className="mt-3 mb-2">
                <Col>
                  <Card className="availability-summary">
                    <Card.Body className="py-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>Room Availability Summary:</strong>
                          <Badge bg="success" className="ms-2">
                            {
                              rooms.filter(
                                (r) =>
                                  !bookings.some(
                                    (b) =>
                                      b.roomId === r.id &&
                                      currentDate >= b.startDate &&
                                      currentDate < b.endDate &&
                                      !b.checkedOut
                                  )
                              ).length
                            }{" "}
                            Available
                          </Badge>
                          <Badge bg="danger" className="ms-2">
                            {
                              rooms.filter((r) =>
                                bookings.some(
                                  (b) =>
                                    b.roomId === r.id &&
                                    currentDate >= b.startDate &&
                                    currentDate < b.endDate &&
                                    b.paymentStatus === "paid" &&
                                    !b.checkedOut
                                )
                              ).length
                            }{" "}
                            Occupied
                          </Badge>
                          <Badge bg="warning" className="ms-2">
                            {
                              rooms.filter((r) =>
                                bookings.some(
                                  (b) =>
                                    b.roomId === r.id &&
                                    currentDate >= b.startDate &&
                                    currentDate < b.endDate &&
                                    b.paymentStatus === "pending" &&
                                    !b.checkedOut
                                )
                              ).length
                            }{" "}
                            Pending
                          </Badge>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Calendar Grid */}
              <div className="calendar-container">
                <div className="calendar-grid">
                  {/* Header Row with Dates */}
                  <div className="calendar-header">
                    <div className="calendar-cell room-header">
                      Room
                      <div className="room-actions">
                        <small>Click room for options</small>
                      </div>
                    </div>
                    {getDates().map((date, index) => (
                      <div
                        key={index}
                        className={`calendar-cell date-header ${
                          date.getDay() === 0 || date.getDay() === 6
                            ? "weekend"
                            : ""
                        }`}
                      >
                        <div className="day-of-week">
                          {formatDayOfWeek(date)}
                        </div>
                        <div className="date">{formatDate(date)}</div>
                      </div>
                    ))}
                  </div>

                  {/* Room Rows */}
                  {filteredRooms.map((room) => (
                    <div key={room.id} className="calendar-row">
                      <div className="calendar-cell room-info">
                        <div className="room-header-row">
                          <div className="room-number">{room.name}</div>
                         
                        </div>
                        <div className="room-type">
                          <Badge
                            bg={
                              room.type === "Single"
                                ? "info"
                                : room.type === "Double"
                                ? "primary"
                                : "success"
                            }
                          >
                            {room.type}
                          </Badge>
                        </div>
                        <div className="room-capacity">
                          <FaUser /> {room.capacity}
                        </div>
                        <div className="room-price">${room.price}/night</div>
                      </div>

                      {/* Date Cells */}
                      {getDates().map((date, dateIndex) => {
                        const isBooked = isRoomBooked(room.id, date);
                        const booking = isBooked
                          ? getBooking(room.id, date)
                          : null;
                        const isPending =
                          booking && booking.paymentStatus === "pending";
                        const isCheckedOut = booking && booking.checkedOut;
                        const isToday =
                          date.toDateString() === new Date().toDateString();
                        const isCheckIn =
                          booking && isCheckInDate(booking, date);
                        const isCheckOut =
                          booking && isCheckOutDate(booking, date);

                        // Determine cell class
                        let cellClass = "available";
                        if (isBooked) {
                          if (isCheckedOut) {
                            cellClass = "available";
                          } else if (isPending) {
                            cellClass = "pending";
                          } else {
                            cellClass = "booked";
                          }
                        }

                        return (
                          <div
                            key={dateIndex}
                            className={`calendar-cell date-cell ${cellClass} ${
                              date.getDay() === 0 || date.getDay() === 6
                                ? "weekend"
                                : ""
                            }`}
                            onClick={() =>
                              !isBooked && handleRoomClick(room, date)
                            }
                          >
                            {isBooked && !isCheckedOut ? (
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip>
                                    <strong>{booking.guestName}</strong>
                                    <br />
                                    Check-in:{" "}
                                    {booking.startDate.toLocaleDateString()}
                                    <br />
                                    Check-out:{" "}
                                    {booking.endDate.toLocaleDateString()}
                                    <br />
                                    Status: {booking.paymentStatus}
                                    <br />
                                    {booking.checkedIn
                                      ? "Checked In"
                                      : "Not Checked In"}
                                  </Tooltip>
                                }
                              >
                                <div className="booking-info">
                                  <div className="guest-name">
                                    {booking.guestName}
                                  </div>
                                  <div
                                    className={`status-icon ${
                                      isPending ? "pending-icon" : "booked-icon"
                                    }`}
                                  >
                                    {isPending ? <FaClock /> : <FaTimes />}
                                  </div>

                                  {/* Check-in button for pending bookings on check-in date */}
                                  {!booking.checkedIn &&
                                    isCheckIn &&
                                    isToday && (
                                      <Button
                                        size="sm"
                                        variant="warning"
                                        className="check-action-btn"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openCheckInModal(booking);
                                        }}
                                      >
                                        <FaSignInAlt className="me-1" />{" "}
                                        Check-in
                                      </Button>
                                    )}

                                  {/* Check-out button for booked rooms on check-out date */}
                                  {booking.checkedIn &&
                                    isCheckOut &&
                                    isToday &&
                                    !booking.checkedOut && (
                                      <Button
                                        size="sm"
                                        variant="danger"
                                        className="check-action-btn"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openCheckOutModal(booking);
                                        }}
                                      >
                                        <FaSignOutAlt className="me-1" />{" "}
                                        Check-out
                                      </Button>
                                    )}
                                </div>
                              </OverlayTrigger>
                            ) : (
                              <div className="available-cell">
                                <FaCheck className="available-icon" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}

                  {/* Empty state if no rooms match filter */}
                  {filteredRooms.length === 0 && (
                    <div className="calendar-row empty-state">
                      <div
                        className="calendar-cell empty-message"
                        colSpan={getDates().length + 1}
                      >
                        No rooms match the selected filter.{" "}
                        <Button
                          variant="link"
                          onClick={() => setShowAddRoomModal(true)}
                        >
                          Add a new room
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card.Body>
          </div>

          {/* Booking Modal */}
          <Modal
            show={showBookingModal}
            onHide={() => setShowBookingModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Book Room {selectedRoom?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedRoom && (
                <Form onSubmit={handleAddBooking}>
                  <Form.Group className="mb-3">
                    <Form.Label>Guest Name</Form.Label>
                    <Form.Control type="text" name="guestName" required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>ID Number</Form.Label>
                    <Form.Control type="text" name="idNumber" required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" name="phoneNumber" required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Check-in Date</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedRoom.date.toLocaleDateString()}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Number of Nights</Form.Label>
                    <Form.Control
                      type="number"
                      name="nights"
                      min="1"
                      defaultValue="1"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Number of Guests</Form.Label>
                    <Form.Control
                      type="number"
                      name="guestCount"
                      min="1"
                      max={selectedRoom.capacity}
                      defaultValue="1"
                      required
                    />
                    <Form.Text className="text-muted">
                      Maximum capacity: {selectedRoom.capacity}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Room Type</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedRoom.type}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Price per Night</Form.Label>
                    <Form.Control
                      type="text"
                      value={`$${selectedRoom.price}`}
                      disabled
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Confirm Booking
                    </Button>
                  </div>
                </Form>
              )}
            </Modal.Body>
          </Modal>

          {/* Booking Details Modal */}
          <Modal
            show={showDetailsModal}
            onHide={() => setShowDetailsModal(false)}
            centered
          >
            <Modal.Header closeButton className="bg-primary text-white">
              <Modal.Title>Booking Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedBooking && (
                <div>
                  <h4>
                    Room {selectedBooking.roomId} - {selectedBooking.guestName}
                  </h4>

                  <div className="booking-details">
                    <div className="detail-item">
                      <div className="detail-label">Check-in:</div>
                      <div className="detail-value">
                        {selectedBooking.startDate.toLocaleDateString()}
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-label">Check-out:</div>
                      <div className="detail-value">
                        {selectedBooking.endDate.toLocaleDateString()}
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-label">Nights:</div>
                      <div className="detail-value">
                        {Math.round(
                          (selectedBooking.endDate -
                            selectedBooking.startDate) /
                            (1000 * 60 * 60 * 24)
                        )}
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-label">Room Type:</div>
                      <div className="detail-value">
                        <Badge
                          bg={
                            selectedBooking.type === "single"
                              ? "info"
                              : selectedBooking.type === "double"
                              ? "primary"
                              : "success"
                          }
                        >
                          {selectedBooking.type.charAt(0).toUpperCase() +
                            selectedBooking.type.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-label">Guests:</div>
                      <div className="detail-value">
                        {selectedBooking.guestCount}
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-label">Status:</div>
                      <div className="detail-value">
                        <Badge
                          bg={
                            selectedBooking.status === "confirmed"
                              ? "success"
                              : "warning"
                          }
                        >
                          {selectedBooking.status.charAt(0).toUpperCase() +
                            selectedBooking.status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-label">Payment:</div>
                      <div className="detail-value">
                        <Badge
                          bg={
                            selectedBooking.paymentStatus === "paid"
                              ? "success"
                              : selectedBooking.paymentStatus ===
                                "partially paid"
                              ? "info"
                              : "warning"
                          }
                        >
                          {selectedBooking.paymentStatus
                            .charAt(0)
                            .toUpperCase() +
                            selectedBooking.paymentStatus.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-label">Check-in:</div>
                      <div className="detail-value">
                        <Badge
                          bg={
                            selectedBooking.checkedIn ? "success" : "secondary"
                          }
                        >
                          {selectedBooking.checkedIn
                            ? "Checked In"
                            : "Not Checked In"}
                        </Badge>
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-label">Check-out:</div>
                      <div className="detail-value">
                        <Badge
                          bg={
                            selectedBooking.checkedOut ? "success" : "secondary"
                          }
                        >
                          {selectedBooking.checkedOut
                            ? "Checked Out"
                            : "Not Checked Out"}
                        </Badge>
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-label">Contact:</div>
                      <div className="detail-value">
                        {selectedBooking.phoneNumber}
                        <br />
                        {selectedBooking.email}
                      </div>
                    </div>

                    {selectedBooking.services &&
                      selectedBooking.services.length > 0 && (
                        <div className="detail-item">
                          <div className="detail-label">Services:</div>
                          <div className="detail-value">
                            {selectedBooking.services.map((service) => (
                              <Badge
                                key={service.id}
                                bg="info"
                                className="me-1 mb-1"
                              >
                                {service.name} (${service.price})
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>

                  <div className="mt-4 d-flex justify-content-between">
                    {!selectedBooking.checkedIn ? (
                      <Button
                        variant="warning"
                        onClick={() => openCheckInModal(selectedBooking)}
                      >
                        <FaSignInAlt className="me-2" /> Check-in Guest
                      </Button>
                    ) : !selectedBooking.checkedOut ? (
                      <Button
                        variant="danger"
                        onClick={() => openCheckOutModal(selectedBooking)}
                      >
                        <FaSignOutAlt className="me-2" /> Check-out Guest
                      </Button>
                    ) : (
                      <Button variant="outline-primary">
                        <FaInfoCircle className="me-2" /> View Full Details
                      </Button>
                    )}
                    <Button variant="outline-danger">
                      <FaTimes className="me-2" /> Cancel Booking
                    </Button>
                  </div>
                </div>
              )}
            </Modal.Body>
          </Modal>

          {/* Check-in Modal */}
          <Modal
            show={showCheckInModal}
            onHide={() => setShowCheckInModal(false)}
            centered
            size="lg"
          >
            <Modal.Header closeButton className="bg-warning text-white">
              <Modal.Title>
                <FaSignInAlt className="me-2" /> Check-in Guest
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {checkInBooking && (
                <div>
                  <Row>
                    <Col md={6}>
                      <Card className="mb-3">
                        <Card.Header className="bg-light">
                          <h5 className="mb-0">Guest Information</h5>
                        </Card.Header>
                        <Card.Body>
                          <p>
                            <strong>Name:</strong> {checkInBooking.guestName}
                          </p>
                          <p>
                            <strong>ID Number:</strong>{" "}
                            {checkInBooking.idNumber}
                          </p>
                          <p>
                            <strong>Phone:</strong> {checkInBooking.phoneNumber}
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
                          <h5 className="mb-0">Booking Details</h5>
                        </Card.Header>
                        <Card.Body>
                          <p>
                            <strong>Room:</strong> {checkInBooking.roomId} (
                            {
                              rooms.find((r) => r.id === checkInBooking.roomId)
                                ?.type
                            }
                            )
                          </p>
                          <p>
                            <strong>Check-in:</strong>{" "}
                            {checkInBooking.startDate.toLocaleDateString()}
                          </p>
                          <p>
                            <strong>Check-out:</strong>{" "}
                            {checkInBooking.endDate.toLocaleDateString()}
                          </p>
                          <p>
                            <strong>Nights:</strong>{" "}
                            {Math.round(
                              (checkInBooking.endDate -
                                checkInBooking.startDate) /
                                (1000 * 60 * 60 * 24)
                            )}
                          </p>
                          <p>
                            <strong>Guests:</strong> {checkInBooking.guestCount}
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  <Card className="mb-3">
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Payment Information</h5>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Room Rate per Night</Form.Label>
                              <Form.Control
                                type="text"
                                value={`$${
                                  rooms.find(
                                    (r) => r.id === checkInBooking.roomId
                                  )?.price || 0
                                }`}
                                disabled
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Total Room Charge</Form.Label>
                              <Form.Control
                                type="text"
                                value={`$${
                                  (rooms.find(
                                    (r) => r.id === checkInBooking.roomId
                                  )?.price || 0) *
                                  Math.round(
                                    (checkInBooking.endDate -
                                      checkInBooking.startDate) /
                                      (1000 * 60 * 60 * 24)
                                  )
                                }`}
                                disabled
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Deposit Amount</Form.Label>
                              <Form.Control
                                type="number"
                                id="depositAmount"
                                defaultValue={
                                  rooms.find(
                                    (r) => r.id === checkInBooking.roomId
                                  )?.price || 0
                                }
                                min="0"
                                step="0.01"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Payment Method</Form.Label>
                              <Form.Select
                                value={paymentMethod}
                                onChange={(e) =>
                                  setPaymentMethod(e.target.value)
                                }
                              >
                                <option value="credit">Credit Card</option>
                                <option value="cash">Cash</option>
                                <option value="bank">Bank Transfer</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                    </Card.Body>
                  </Card>

                  <div className="d-flex justify-content-between">
                    <Button
                      variant="secondary"
                      onClick={() => setShowCheckInModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => {
                        const depositAmount = Number.parseFloat(
                          document.getElementById("depositAmount").value
                        );
                        handleCheckIn(checkInBooking.id, depositAmount);
                      }}
                    >
                      <FaSignInAlt className="me-2" /> Confirm Check-in
                    </Button>
                  </div>
                </div>
              )}
            </Modal.Body>
          </Modal>

          {/* Check-out Modal */}
          <Modal
            show={showCheckOutModal}
            onHide={() => setShowCheckOutModal(false)}
            centered
            size="lg"
          >
            <Modal.Header closeButton className="bg-danger text-white">
              <Modal.Title>
                <FaSignOutAlt className="me-2" /> Check-out Guest
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {checkOutBooking && (
                <div>
                  <Row>
                    <Col md={6}>
                      <Card className="mb-3">
                        <Card.Header className="bg-light">
                          <h5 className="mb-0">Guest Information</h5>
                        </Card.Header>
                        <Card.Body>
                          <p>
                            <strong>Name:</strong> {checkOutBooking.guestName}
                          </p>
                          <p>
                            <strong>ID Number:</strong>{" "}
                            {checkOutBooking.idNumber}
                          </p>
                          <p>
                            <strong>Phone:</strong>{" "}
                            {checkOutBooking.phoneNumber}
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
                          <h5 className="mb-0">Booking Details</h5>
                        </Card.Header>
                        <Card.Body>
                          <p>
                            <strong>Room:</strong> {checkOutBooking.roomId} (
                            {
                              rooms.find((r) => r.id === checkOutBooking.roomId)
                                ?.type
                            }
                            )
                          </p>
                          <p>
                            <strong>Check-in:</strong>{" "}
                            {checkOutBooking.startDate.toLocaleDateString()}
                          </p>
                          <p>
                            <strong>Check-out:</strong>{" "}
                            {checkOutBooking.endDate.toLocaleDateString()}
                          </p>
                          <p>
                            <strong>Nights:</strong>{" "}
                            {Math.round(
                              (checkOutBooking.endDate -
                                checkOutBooking.startDate) /
                                (1000 * 60 * 60 * 24)
                            )}
                          </p>
                          <p>
                            <strong>Guests:</strong>{" "}
                            {checkOutBooking.guestCount}
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  <Card className="mb-3">
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Additional Services Used</h5>
                    </Card.Header>
                    <Card.Body>
                      <p>Select any additional services the guest has used:</p>
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
                              checked={selectedServices.some(
                                (s) => s.id === service.id
                              )}
                              onChange={() => toggleService(service)}
                            />
                          </Col>
                        ))}
                      </Row>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3">
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Bill Summary</h5>
                    </Card.Header>
                    <Card.Body>
                      <Table striped bordered>
                        <thead>
                          <tr>
                            <th>Description</th>
                            <th className="text-end">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              Room Charge (
                              {Math.round(
                                (checkOutBooking.endDate -
                                  checkOutBooking.startDate) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              nights @ $
                              {rooms.find(
                                (r) => r.id === checkOutBooking.roomId
                              )?.price || 0}
                              /night)
                            </td>
                            <td className="text-end">
                              $
                              {calculateBill(
                                checkOutBooking
                              ).roomCharge.toFixed(2)}
                            </td>
                          </tr>
                          {selectedServices.map((service) => (
                            <tr key={service.id}>
                              <td>{service.name}</td>
                              <td className="text-end">
                                ${service.price.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td className="fw-bold">Total Charges</td>
                            <td className="text-end fw-bold">
                              $
                              {(
                                calculateBill(checkOutBooking).roomCharge +
                                calculateBill(checkOutBooking).serviceCharge
                              ).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td>Deposit Paid</td>
                            <td className="text-end">
                              -${checkOutBooking.depositAmount.toFixed(2)}
                            </td>
                          </tr>
                          <tr className="table-primary">
                            <td className="fw-bold">Balance Due</td>
                            <td className="text-end fw-bold">
                              $
                              {calculateBill(checkOutBooking).balance.toFixed(
                                2
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </Table>

                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Payment Method</Form.Label>
                          <Form.Select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          >
                            <option value="credit">Credit Card</option>
                            <option value="cash">Cash</option>
                            <option value="bank">Bank Transfer</option>
                          </Form.Select>
                        </Form.Group>
                      </Form>
                    </Card.Body>
                  </Card>

                  <div className="d-flex justify-content-between">
                    <Button
                      variant="secondary"
                      onClick={() => setShowCheckOutModal(false)}
                    >
                      Cancel
                    </Button>
                    <div>
                      <Button variant="outline-primary" className="me-2">
                        <FaPrint className="me-2" /> Print Receipt
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() =>
                          handleCheckOut(checkOutBooking.id, selectedServices)
                        }
                      >
                        <FaSignOutAlt className="me-2" /> Confirm Check-out
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Modal.Body>
          </Modal>

          {/* Add Room Modal */}
         
        </Container>
      </div>
    </div>
  );
}

export default RoomAvailabilityCalendar;
