import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  InputGroup,
  Image,
} from "react-bootstrap";
import {
  FaStar,
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaUtensils,
  FaSearch,
  FaCalendarAlt,
  FaChild,
  FaUser,
  FaQuoteLeft,
  FaThumbsUp,
  FaThumbsDown,
  FaShuttleVan,
  FaCoffee,
  FaConciergeBell,
  FaSnowflake,
  FaTv,
  FaCocktail,
  FaSpa,
  FaDumbbell,
  FaArrowRight,
  FaHeart,
} from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../src/css/customer/Home_detail.css";
import NavigationBar from "../Header";
import Footer from "../Footer";
import main_room from "../../../images/image_3.png";
import room1 from "../../../images/room1.png";
import room2 from "../../../images/room2.png";
import room3 from "../../../images/room3.png";
import image1 from "../../../images/image_(1).png";
import image2 from "../../../images/image_2.png";
import image3 from "../../../images/unsplash_7uXn7nudorc.png";
import image4 from "../../../images/image_3.png";
import image5 from "../../../images/image-1.png";
import image6 from "../../../images/unsplash_7uXn7nudorc_1.png";
import image7 from "../../../images/Ellipse_3_(1).png";
import image9 from "../../../images/Ellipse_3.png";
import image10 from "../../../images/Ellipse_3_(1).png";
import * as Routers from "../../../utils/Routes";
import { useLocation, useNavigate } from "react-router-dom";
import { ExclamationTriangleFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import HotelActions from "../../../redux/hotel/actions";
import RoomActions from "../../../redux/room/actions";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import { showToast, ToastProvider } from "components/ToastContainer";
function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('hotel_id');
  console.log('id: ', id);

  return (
    <div className="app-container">
      <NavigationBar />
      <HeroSection />
      <MainContent />
      <SearchBar />
      <HotelRooms />
      <OtherHotels />
      <CustomerReviews />
      <Footer />
    </div>
  );
}

function HeroSection() {
  const { id: hotelId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [hotelDetail, setHotelDetail] = useState(null);
  useEffect(() => {
    if (hotelId) {
      dispatch({
        type: HotelActions.FETCH_DETAIL_HOTEL,
        payload: {
          hotelId,
          onSuccess: (hotel) => {
            setHotelDetail(hotel);
          },
          onFailed: (msg) => {
            showToast.warning("Get hotel details failed");
          },
          onError: (err) => {
            showToast.warning("Server error");
            console.error("Server error", err);
          },
        },
      });
    }
  }, [hotelId, dispatch]);

  if (!hotelDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>{hotelDetail.hotelName || "Hotel Paradise"}</h1>
        <div className="rating">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={
                index < hotelDetail.rating ? "star-filled" : "star-empty"
              }
            />
          ))}
        </div>
        <Button
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: "20px",
          }}
          variant="outline-light"
          onClick={() => {
            navigate(Routers.ChatPage);
          }}
        >
          Contact with hotel
        </Button>
      </div>
    </div>
  );
}

function MainContent() {
  const renderIcon = (iconName) => {
    const iconLibraries = {
      ...FaIcons,
      ...MdIcons,
      ...GiIcons,
    };

    const IconComponent = iconLibraries[iconName];
    return IconComponent ? (
      <IconComponent style={{ fontSize: "20px", color: "#1a2b49" }} />
    ) : null;
  };

  const { id: hotelId } = useParams();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [hotelDetail, setHotelDetail] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (hotelId) {
      dispatch({
        type: HotelActions.FETCH_DETAIL_HOTEL,
        payload: {
          hotelId,
          onSuccess: (hotel) => {
            if (hotel.images && hotel.images.length > 0) {
              const limitedImages = hotel.images.slice(0, 3);

              setHotelDetail({
                ...hotel,
                images: limitedImages,
              });

              setMainImage(limitedImages[0]);
            } else {
              setHotelDetail(hotel);
            }
          },
          onFailed: (msg) => {
            showToast.warning("Get hotel details failed:");
            console.error("Get hotel details failed:", msg);
          },
          onError: (err) => {
            showToast.warning("Server error:");
            console.error("Server error:", err);
          },
        },
      });
    }
  }, [hotelId, dispatch]);

  const imageList = hotelDetail.images || [];

  return (
    <Container className="main-content">
      <Card className="content-card">
        <div
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            borderWidth: "2px",
            borderColor: isFavorite ? "red" : "gray",
            borderStyle: "solid",
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaHeart
            onClick={() => setIsFavorite(!isFavorite)}
            style={{
              fontSize: "20px",
              color: isFavorite ? "red" : "gray",
              cursor: "pointer",
            }}
          />
        </div>
        <Row>
          <Col lg={6}>
            <div className="main-image-container">
              <img
                src={mainImage || "https://via.placeholder.com/600x400"}
                alt="Main Room"
                className="main-image"
              />
              <div className="thumbnail-container">
                {imageList.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Room ${index + 1}`}
                    className={`thumbnail ${
                      mainImage === image ? "active" : ""
                    }`}
                    onClick={() => setMainImage(image)}
                    style={{
                      cursor: "pointer",
                      border:
                        mainImage === image
                          ? "2px solid blue"
                          : "2px solid transparent",
                      borderRadius: "5px",
                    }}
                  />
                ))}
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="hotel-info">
              <h1 style={{ fontWeight: "bold" }}>
                {hotelDetail.hotelName || "Hotel"}
              </h1>
              <p>{hotelDetail.description || "No description."}</p>

              <h3 style={{ fontWeight: "bold" }}>Highlights of the property</h3>
              <ul className="highlights-list">
                {hotelDetail.services?.length > 0 ? (
                  hotelDetail.services.map((service, index) => (
                    <li key={index}>{service.name}</li>
                  ))
                ) : (
                  <li>No highlights.</li>
                )}
              </ul>

              <h3 style={{ fontWeight: "bold", color: "#1a2b49" }}>
                Favorite amenities
              </h3>
              <div className="amenities-grid">
                {hotelDetail.facilities?.map((facility, index) => (
                  <div
                    key={index}
                    className="amenity-item"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {renderIcon(facility.icon)}
                    <span style={{ marginLeft: "5px" }}>{facility.name}</span>
                  </div>
                )) || <div>No amenities.</div>}
              </div>
              {/* <div>
                <h3 style={{ fontWeight: "bold", color: "#1a2b49" }}>
                  Price:{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(hotelDetail.pricePerNight)}
                  /day
                </h3>
              </div> */}
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

const SearchBar = () => {
  return (
    <Container fluid>
      <Row
        className="search-section d-flex align-items-center justify-content-center rounded shadow-sm bg-white  pt-5 pb-5"
        style={{ maxWidth: "1000px", margin: "0 auto" }}
      >
        <Col md={6}>
          <Row className="align-items-center">
            {/* Ngày bắt đầu */}
            <Col className="d-flex flex-grow-1">
              <InputGroup
                className="border w-100"
                style={{ borderRadius: "10px" }}
              >
                <InputGroup.Text className="bg-transparent border-0">
                  <FaCalendarAlt />
                </InputGroup.Text>
                <Form.Control type="date" className="border-0 bg-transparent" />
              </InputGroup>
            </Col>

            {/* Icon mũi tên */}
            <Col
              xs="auto"
              className="d-flex align-items-center justify-content-center"
            >
              <FaArrowRight style={{ fontSize: "1.2rem", color: "#555" }} />
            </Col>

            {/* Ngày kết thúc */}
            <Col className="d-flex flex-grow-1">
              <InputGroup
                className="border w-100"
                style={{ borderRadius: "10px" }}
              >
                <InputGroup.Text className="bg-transparent border-0">
                  <FaCalendarAlt />
                </InputGroup.Text>
                <Form.Control type="date" className="border-0 bg-transparent" />
              </InputGroup>
            </Col>
          </Row>
        </Col>

        {/* Ô chọn số lượng Adults và Children */}
        <Col md={5} className="text-center px-2">
          <InputGroup className="border rounded-pill px-2">
            <InputGroup.Text className="bg-transparent border-0">
              <FaUser />
            </InputGroup.Text>
            <Form.Select className="border-0 bg-transparent">
              <option>1 Adult</option>
              <option>2 Adults</option>
              <option>3 Adults</option>
              <option>4 Adults</option>
              <option>5 Adults</option>
              <option>6 Adults</option>
            </Form.Select>

            <InputGroup.Text className="bg-transparent border-0">
              <FaChild />
            </InputGroup.Text>
            <Form.Select className="border-0 bg-transparent">
              <option>0 Children</option>
              <option>1 Children</option>
              <option>2 Children</option>
              <option>3 Children</option>
              <option>4 Children</option>
              <option>5 Children</option>
            </Form.Select>
          </InputGroup>
        </Col>

        {/* Nút tìm kiếm */}
        <Col md={1} className="text-center">
          <Button variant="primary" style={{ padding: "0.375rem 1.5rem" }}>
            <FaSearch />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const HotelRooms = () => {
  const { id: hotelId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (hotelId) {
      dispatch({
        type: RoomActions.FETCH_ROOM,
        payload: {
          hotelId,
          onSuccess: (roomList) => {
            if (Array.isArray(roomList)) {
              setRooms(roomList);
              console.log("roomList", roomList);
            } else {
              console.warn("Unexpected data format received:", roomList);
            }
          },
          onFailed: (msg) => console.error("Failed to fetch rooms:", msg),
          onError: (err) => console.error("Server error:", err),
        },
      });
    }
  }, [hotelId, dispatch]);

  const handleRoomClick = (roomId) => {
    navigate(`${Routers.RoomDetailPage}/${roomId}`);
  };

  return (
    <Container className="rooms-section py-5">
      <h2
        className="text-center text-uppercase fw-bold mb-5"
        style={{ color: "#1a2b49", fontSize: "2.5rem" }}
      >
        Hotel Rooms
      </h2>

      <div
        className="d-flex gap-4 overflow-auto px-2 rooms-scroll"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {rooms.length === 0 ? (
          <div className="text-center w-100">
            <p style={{ color: "#999", fontSize: "1.2rem" }}>
              No rooms available for this hotel.
            </p>
          </div>
        ) : (
          rooms.map((room) => (
            <div
              key={room.id || room._id}
              style={{
                minWidth: "400px",
                maxWidth: "400px",
                scrollSnapAlign: "start",
              }}
            >
              <Card
                className="shadow-sm border-0 h-100 room-card"
                style={{
                  borderRadius: "15px",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div
                  className="overflow-hidden"
                  style={{
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={room.images?.[0] || "/default-room.jpg"}
                    alt={room.type}
                    onClick={() => handleRoomClick(room.id || room._id)}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  />
                </div>

                <Card.Body className="d-flex flex-column justify-content-between p-3">
                  <div>
                    <Card.Title
                      onClick={() => handleRoomClick(room.id || room._id)}
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        color: "#1a2b49",
                        cursor: "pointer",
                      }}
                    >
                      {room?.type}
                    </Card.Title>

                    <div className="d-flex align-items-center text-muted mb-2">
                      <FaUser className="me-2" />
                      {room.capacity} Guests
                    </div>

                    <div
                      className="text-primary fw-bold"
                      style={{ fontSize: "1.3rem" }}
                    >
                      ${room.price}{" "}
                      <span className="text-muted" style={{ fontSize: "0.9rem" }}>
                        / Day
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 d-flex justify-content-between align-items-center">
                    <span
                      className="text-muted"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Amount
                    </span>
                    <select
                      className="form-select w-auto"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {[0, 1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>

      <div className="text-center mt-5">
        <Button
          variant="primary"
          onClick={() => navigate(Routers.BookingCheckPage)}
          style={{
            padding: "0.8rem 4rem",
            borderRadius: "30px",
            backgroundColor: "#1a2b49",
            border: "none",
            fontSize: "1.1rem",
            fontWeight: 600,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#2c4373")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#1a2b49")
          }
        >
          Book Now
        </Button>
      </div>
    </Container>
  );
};

function OtherHotels() {
  const navigate = useNavigate();
  const hotels = [
    {
      id: 1,
      name: "Hotel Paradise",
      roomType: "Deluxe Room",
      price: 300,
      guests: 2,
      image: image4,
      sale: "Sale 30%",
    },
    {
      id: 2,
      name: "Royal Pearl Hotel",
      roomType: "Executive Room",
      price: 700,
      guests: 2,
      image: image5,
      sale: "Sale 40%",
    },
    {
      id: 3,
      name: "Blue Horizon Resort",
      roomType: "Sea View Room",
      price: 340,
      guests: 2,
      image: image6,
      sale: "Sale 50%",
    },
  ];

  return (
    <Container className="other-hotels-section">
      <h1 className="section-title" style={{ fontSize: "2.5rem" }}>
        Special Offers Just For You
      </h1>
      <Row className="mt-5">
        {hotels.map((hotel) => (
          <Col md={4} key={hotel.id}>
            <Card className="hotel-card">
              <div
                style={{
                  padding: "20px",
                  height: "250px",
                  paddingRight: "40px",
                }}
              >
                <Image
                  md={4}
                  variant="top"
                  src={hotel.image}
                  className="hotel-image"
                  style={{ borderRadius: "20px" }}
                />

                <div
                  className="rating-overlay"
                  style={{ paddingRight: "30px", paddingTop: "10px" }}
                >
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>
                <span
                  className="price"
                  style={{
                    color: "gray",
                    position: "absolute",
                    transform: "rotate(90deg)",
                    transformOrigin: "left bottom",
                    width: "1000px",
                    letterSpacing: "6px", // Điều chỉnh điểm xoay nếu cần
                  }}
                >
                  {hotel.sale}
                </span>
              </div>
              <Card.Body style={{ marginLeft: "10px" }}>
                <Card.Title className="hotel-name">{hotel.name}</Card.Title>
                <div className="room-info">
                  <span className="room-type">{hotel.roomType}</span>
                  <span className="guests-count">
                    <FaUser /> {hotel.guests}
                  </span>
                </div>
                <div className="price-container">
                  <span className="price">{hotel.price}$</span>
                  <span className="per-day">/Day</span>
                  <Button
                    variant="outline-primary"
                    style={{
                      marginLeft: "auto",
                      padding: "0.7rem 4.5rem",
                      fontWeight: "500",
                    }}
                    onClick={() => {
                      navigate(Routers.Home_detail);
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
function CustomerReviews() {
  const navigate = useNavigate();
  const reviews = [
    {
      id: 1,
      text: "Great experience! Professional service, clean and modern room.",
      author: "Vand D",
      rating: 4.5,
      image: image9,
    },
    {
      id: 2,
      text: "Quick booking process, many attractive offers",
      author: "Tru Vio",
      rating: 4.8,
      image: image10,
    },
  ];

  return (
    <Container className="reviews-section">
      <h2
        className="reviews-title"
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "3rem",
          color: "#1a2b49",
        }}
      >
        Customer Reviews
      </h2>
      <Row>
        {reviews.map((review) => (
          <Col md={6} key={review.id}>
            <div className="review-card">
              <Button
                variant="link"
                className="text-dark p-0"
                style={{ position: "absolute", top: 15, right: 15 }}
                onClick={() => {
                  navigate(Routers.ReportedFeedback);
                }}
              >
                <ExclamationTriangleFill size={20} color="red" />
              </Button>
              <FaQuoteLeft
                className="quote-icon"
                style={{ alignItems: "center" }}
              />
              <p className="review-text">{review.text}</p>
              <div className="review-actions">
                <button className="action-btn">
                  <FaThumbsUp />
                </button>
                <button className="action-btn">
                  <FaThumbsDown />
                </button>
              </div>
              <div className="reviewer-info">
                <div className="reviewer-name">-{review.author}</div>
                <div className="reviewer-status">Happy Treloo</div>
                <div className="reviewer-profile">
                  <img
                    src={review.image || image7}
                    alt={review.author}
                    className="reviewer-image"
                  />
                  <div className="rating">
                    <FaStar className="star-icon" />
                    <span>{review.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
