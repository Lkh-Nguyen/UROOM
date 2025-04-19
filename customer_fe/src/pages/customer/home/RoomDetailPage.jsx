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
import { FaBed } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../../../../src/css/customer/RoomDetailPage.css";
// import "../../../../src/css/customer/Home_detail.css";
import NavigationBar from "../Header";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import Banner from "../../../images/banner.jpg";
import { useNavigate } from "react-router-dom";
import * as Routers from "../../../utils/Routes";
import { FaHeart } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
import RoomActions from "../../../redux/room/actions";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import { showToast, ToastProvider } from "components/ToastContainer";
import { useParams } from "react-router-dom";

function App() {
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${Banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <NavigationBar className="custom-navbar" />
      <MainContent />
      <Footer />
    </div>
  );
}
function MainContent() {
  const { id: roomId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [roomDetail, setRoomDetail] = useState({
    images: [],
    facilities: [],
    bed: [],
  });
  const [mainImage, setMainImage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const renderIcon = (iconName) => {
    const iconLibraries = { ...FaIcons, ...MdIcons, ...GiIcons };
    const IconComponent = iconLibraries[iconName];
    return IconComponent ? (
      <IconComponent style={{ fontSize: "20px", color: "#1a2b49" }} />
    ) : null;
  };

  useEffect(() => {
    if (roomId) {
      dispatch({
        type: RoomActions.FETCH_ROOM_DETAIL,
        payload: {
          roomId,
          onSuccess: (room) => {
            console.log("room detail fetched:", room);
            setRoomDetail({
              ...room,
              images: room?.images || [],
              facilities: room?.facilities || [],
              bed: room?.bed || [],
            });
            if (room?.images?.length > 0) {
              setMainImage(room.images[0]);
            }
          },
          onFailed: (msg) => {
            showToast.warning("Get room details failed!");
            console.error("Get room details failed:", msg);
          },
          onError: (err) => {
            showToast.error("Server error.");
            console.error("Server error:", err);
          },
        },
      });
    }
  }, [roomId, dispatch]);

  const imageList = roomDetail.images || [];

  return (
    <Container
      className="main-content mt-4"
      style={{
        marginTop: "-2rem",
        marginBottom: "3rem",
        position: "relative",
        zIndex: 2,
      }}
    >
      <Card
        className="content-card"
        style={{
          background: "white",
          borderRadius: "1rem",
          padding: "2rem",
          marginTop: "5%",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></div>
        <Row>
          <Col lg={6}>
            <div className="main-image-container">
              <img
                src={mainImage || "https://via.placeholder.com/600x400"}
                alt="Main Room"
                className="main-image"
              />
              <div className="thumbnail-container">
                {Array.isArray(imageList) &&
                  imageList.slice(0, 3).map((image, index) => (
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
            <div className="room-info_1">
              <h1 style={{ fontWeight: "bold" }}>
                {roomDetail.name || "Room"}
              </h1>
              <p style={{ color: "#666" }}>
                {roomDetail.description || "No description available."}
              </p>

              <h4 style={{ fontWeight: "bold", color: "#1a2b49" }}>
                Type: {roomDetail.type}
              </h4>
              <h5>
                Capacity: {roomDetail.capacity} people | Quantity:{" "}
                {roomDetail.quantity}
              </h5>

              <h3 style={{ fontWeight: "bold", color: "#1a2b49" }}>
                Facilities
              </h3>
              <div className="amenities-grid">
                {roomDetail.facilities?.map((facility, index) => (
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

              <h3 style={{ fontWeight: "bold", color: "#1a2b49" }}>Beds</h3>
              <ul style={{ paddingLeft: "1rem", listStyleType: "none" }}>
                {roomDetail.bed.length > 0 ? (
                  roomDetail.bed.map((b, index) => (
                    <li
                      key={index}
                      className="d-flex align-items-center mb-2"
                      style={{
                        fontSize: "16px",
                        color: "#333",
                      }}
                    >
                      <FaBed style={{ marginRight: "8px", color: "#1a2b49" }} />
                      <span>
                        {b.quantity} x {b.bed?.name || "Unknown Bed Type"}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-muted">No bed info.</li>
                )}
              </ul>
              <h3 style={{ fontWeight: "bold", color: "#1a2b49" }}>
                Price:{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(roomDetail.price || 0)}
                /day
              </h3>
              <Form>
                <Form.Group controlId="checkin" className="mb-3 mt-3">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Check-in Date
                  </Form.Label>
                  <Form.Control type="date" />
                </Form.Group>

                <Form.Group controlId="checkout" className="mb-3">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Check-out Date
                  </Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Form>
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
                  marginLeft:"65%"
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
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default App;
