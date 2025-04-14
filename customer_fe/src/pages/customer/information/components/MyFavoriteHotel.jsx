import {
  Card,
  Row,
  Col,
  Button,
  Pagination,
  Container,
  Spinner,
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

const MyFavoriteHotel = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const Auth = useAppSelector((state) => state.Auth.Auth);

  const [hotels, setHotels] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 3;

  useEffect(() => {
    const favoriteHotelIds = Auth?.favorites || [];
    if (favoriteHotelIds.length > 0) {
      setLoading(true);
      dispatch({
        type: HotelActions.FETCH_FAVORITE_HOTELS,
        payload: {
          ids: favoriteHotelIds,
          onSuccess: (data) => {
            setHotels(data);
            setLoading(false);
          },
        },
      });
    } else {
      setHotels([]);
    }
  }, [dispatch, Auth?.favorites]);

  const handleDelete = (hotelId) => {
    dispatch({
      type: HotelActions.REMOVE_FAVORITE_HOTEL_REQUEST,
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
        <Col md={12}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : hotelsToShow.length > 0 ? (
            hotelsToShow.map((hotel) => (
              <Card key={hotel._id} className="mb-4 hotel-card">
                <Row className="g-0">
                  <Col md={4}>
                    <Card.Img
                      variant="top"
                      src={
                        hotel.images && hotel.images.length > 0
                          ? hotel.images[0]
                          : "/placeholder.svg?height=200&width=300"
                      }
                      className="hotel-image"
                    />
                  </Col>

                  <Col md={8}>
                    <Card.Body>
                      <Card.Title className="hotel-name">
                        {hotel.hotelName}
                      </Card.Title>
                      <div className="stars mb-2">
                        {renderStars(hotel.star)}
                      </div>
                      <div className="location mb-2">
                        <FaMapMarkerAlt className="me-1" />
                        <small>{hotel.address}</small>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <span className="rating-box1 me-2">{hotel.rating}</span>
                        <span className="text-muted">
                          {hotel.feedbacks} feedbacks
                        </span>
                      </div>
                      <Button
                        variant="link"
                        className="view-detail p-0"
                        style={{ fontSize: 16 }}
                        onClick={() =>
                          navigate(`${Routers.Home_detail}/${hotel._id}`)
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
                          setSelectedHotelId(hotel._id);
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
            <div className="text-center text-muted">
              <img
                src="/empty-state.svg"
                alt="No data"
                height={150}
                style={{ opacity: 0.6 }}
              />
              <p className="mt-3">You haven't saved any favorite hotel yet.</p>
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
                  onClick={() =>
                    setActivePage((prev) => Math.max(prev - 1, 1))
                  }
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
                            color:
                              number === activePage ? "white" : "#0d6efd",
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
