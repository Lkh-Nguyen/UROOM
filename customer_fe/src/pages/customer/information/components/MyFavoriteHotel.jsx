import {
  Card,
  Row,
  Col,
  Button,
  Pagination,
  Container,
  Spinner,
  Form,
} from "react-bootstrap";
import { FaMapMarkerAlt, FaEye } from "react-icons/fa";
import "../../../../css/customer/MyFavoriteHotel.css";
import { useState, useEffect } from "react";
import { Star, StarFill, X } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import * as Routers from "../../../../utils/Routes";
import { showToast, ToastProvider } from "components/ToastContainer";
import ConfirmationModal from "components/ConfirmationModal";
import { useAppSelector, useAppDispatch } from "../../../../redux/store";
import HotelActions from "../../../../redux/hotel/actions";
import AuthActions from "../../../../redux/auth/actions";
import Select from "react-select";
import { cityOptionSelect, districtsByCity } from "utils/data";

const starOptions = [
  { value: "0", label: "All stars" },
  { value: "1", label: "1 star" },
  { value: "2", label: "2 stars" },
  { value: "3", label: "3 stars" },
  { value: "4", label: "4 stars" },
  { value: "5", label: "5 stars" },
];
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

const MyFavoriteHotel = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const Auth = useAppSelector((state) => state.Auth.Auth);
  console.log("Auth: ", Auth);
  const [hotels, setHotels] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 3;
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedStar, setSelectedStar] = useState(starOptions[0]); // default là "All"
  const [paramsQuery, setParamQuery] = useState({
    selectedCity,
    selectedDistrict,
    selectedStar: selectedStar.value,
  });
  useEffect(() => {
    const favoriteHotelIds = Auth?.favorites || [];
    if (favoriteHotelIds.length > 0) {
      setLoading(true);
      dispatch({
        type: HotelActions.FETCH_FAVORITE_HOTELS,
        payload: {
          ids: favoriteHotelIds,
          paramsQuery: paramsQuery,

          onSuccess: (data) => {
            console.log(data);
            setHotels(data);
            setLoading(false);
          },
        },
      });
    } else {
      setHotels([]);
    }
  }, [dispatch, Auth?.favorites, paramsQuery]);

  const handleDelete = (hotelId) => {
    dispatch({
      type: AuthActions.REMOVE_FAVORITE_HOTEL_REQUEST,
      payload: {
        hotelId,
        onSuccess: () => {
          showToast.success("Deleted hotel from favorites successfully!");
          setHotels((prev) => {
            const updated = prev.filter((h) => h._id !== hotelId);
            const maxPages = Math.ceil(updated.length / itemsPerPage);
            if (activePage > maxPages) {
              setActivePage(Math.max(activePage - 1, 1));
            }
            return updated;
          });
        },
        onFailed: (msg) => {
          showToast.error(`Failed to remove: ${msg}`);
        },
        onError: (error) => {
          showToast.error("Something went wrong!");
          console.error(error);
        },
      },
    });
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < count ? (
        <StarFill key={i} className="text-warning" />
      ) : (
        <Star key={i} className="text-warning" />
      )
    );
  };

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const hotelsToShow = hotels.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(hotels.length / itemsPerPage);

  return (
    <Container fluid className="bg-light py-4">
      <h2 className="fw-bold mb-4">My Favorite Hotels</h2>
      <Row className="m-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="mb-2">City</Form.Label>
            <Select
              options={cityOptionSelect}
              value={selectedCity}
              onChange={(option) => {
                setSelectedCity(option);
                setSelectedDistrict("");
                setParamQuery({ 
                  ...paramsQuery, 
                  selectedCity: option.value,
                  selectedDistrict: ""
                });
              }}
              placeholder="Select City"
              isSearchable
              styles={customStyles}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label className="mb-2">District</Form.Label>
            <Select
              options={districtsByCity[selectedCity?.value] || []}
              value={selectedDistrict}
              onChange={(option) => {
                setSelectedDistrict(option);
                setParamQuery({
                  ...paramsQuery,
                  selectedDistrict: option.value,
                });
              }}
              placeholder="Select District"
              isSearchable
              styles={customStyles}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label className="mb-2">Stars</Form.Label>
            <Select
              options={starOptions}
              value={selectedStar}
              onChange={(option) => {
                setSelectedStar(option);
                setParamQuery({ ...paramsQuery, selectedStar: option.value });
              }}
              placeholder="Select star"
              isSearchable
              styles={customStyles}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="m-4">
        <Col md={12}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : hotelsToShow.length > 0 ? (
            hotelsToShow.map((hotel) => (
              <Card key={hotel.hotel._id} className="mb-4 hotel-card">
                <Row className="g-0">
                  <Col md={4}>
                    <Card.Img
                      variant="top"
                      src={
                        hotel.hotel.images && hotel.hotel.images.length > 0
                          ? hotel.hotel.images[0]
                          : "/placeholder.svg?height=200&width=300"
                      }
                      style={{ height: "220px" }}
                      className="hotel-image"
                    />
                  </Col>

                  <Col md={8}>
                    <Card.Body>
                      <Card.Title className="hotel-name">
                        {hotel.hotel.hotelName}
                      </Card.Title>
                      <div className="stars mb-2">
                        {renderStars(hotel.hotel.star)}
                      </div>
                      <div className="location mb-2">
                        <FaMapMarkerAlt className="me-1" />
                        <small>{hotel.hotel.address}</small>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <p style={{ marginTop: "15px" }}>
                          {hotel.totalFeedbacks > 0 ? (
                            <>
                              <span
                                className="rating-box p-2"
                                style={{
                                  display: "inline-flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  width: "30px",
                                  height: "30px",
                                  backgroundColor: "#FFC107",
                                  borderRadius: "20%",
                                  color: "white",
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                  textAlign: "center",
                                  marginRight: "8px",
                                }}
                              >
                                {hotel.avgValueRating.toFixed(1)}
                              </span>
                              <span className="text-muted">
                                {hotel.totalFeedbacks} feedbacks about hotel
                              </span>
                            </>
                          ) : (
                            <span className="text-muted">
                              No feedback about hotel
                            </span>
                          )}
                        </p>
                      </div>
                      <Button
                        variant="link"
                        className="view-detail d-flex align-items-center gap-1 p-0 text-primary fw-medium"
                        style={{ fontSize: "16px", textDecoration: "none" }}
                        onClick={() =>
                          navigate(`${Routers.Home_detail}/${hotel.hotel._id}`)
                        }
                      >
                        <FaEye className="me-1" />
                        View Detail Hotel
                      </Button>
                      <Button
                        variant="link"
                        className="text-dark p-0"
                        style={{ position: "absolute", top: 5, right: 5 }}
                        onClick={() => {
                          setSelectedHotelId(hotel.hotel._id);
                          setShowAcceptModal(true);
                        }}
                      >
                        <X size={20} />
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
              <img
                src="/empty-state.svg"
                alt="No data"
                height={170}
                style={{ opacity: 0.6, transition: "opacity 0.3s" }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = 0.8)}
                onMouseOut={(e) => (e.currentTarget.style.opacity = 0.6)}
              />
              <p className="mt-4 text-secondary fs-5">
                You haven't saved any favorite hotel yet.
              </p>
            </div>
          )}

          {/* Modal xác nhận xóa */}
          <ConfirmationModal
            show={showAcceptModal}
            onHide={() => {
              setShowAcceptModal(false);
              setSelectedHotelId(null);
            }}
            onConfirm={() => {
              if (selectedHotelId) {
                handleDelete(selectedHotelId);
              }
              setShowAcceptModal(false);
              setSelectedHotelId(null);
            }}
            title="Confirm Delete"
            message="Are you sure you want to delete this hotel from your favorites?"
            confirmButtonText="Accept"
            type="danger"
          />

          {/* Pagination */}
          {hotels.length > itemsPerPage && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev
                  onClick={() => setActivePage((prev) => Math.max(prev - 1, 1))}
                  disabled={activePage === 1}
                />

                {(() => {
                  const pages = [];
                  let startPage = Math.max(activePage - 1, 1);
                  let endPage = Math.min(startPage + 3, totalPages);

                  if (endPage - startPage < 3 && startPage > 1) {
                    startPage = Math.max(endPage - 3, 1);
                  }

                  for (let number = startPage; number <= endPage; number++) {
                    pages.push(
                      <Pagination.Item
                        key={number}
                        active={number === activePage}
                        onClick={() => setActivePage(number)}
                      >
                        <b
                          style={{
                            color: number === activePage ? "white" : "#0d6efd",
                          }}
                        >
                          {number}
                        </b>
                      </Pagination.Item>
                    );
                  }

                  return pages;
                })()}

                <Pagination.Next
                  onClick={() =>
                    setActivePage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={activePage === totalPages}
                />
              </Pagination>
            </div>
          )}

          <ToastProvider />
        </Col>
      </Row>
    </Container>
  );
};

export default MyFavoriteHotel;
