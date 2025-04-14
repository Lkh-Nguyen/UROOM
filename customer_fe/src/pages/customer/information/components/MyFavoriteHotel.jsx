// import {
//   Card,
//   Row,
//   Col,
//   Form,
//   Button,
//   Pagination,
//   Container,
// } from "react-bootstrap";
// import { FaMapMarkerAlt, FaEye } from "react-icons/fa";
// import "../../../../css/customer/MyFavoriteHotel.css";
// import { useState } from "react";
// import { Star, StarFill, X } from "react-bootstrap-icons";
// import { useNavigate } from "react-router-dom";
// import * as Routers from "../../../../utils/Routes";
// import { showToast, ToastProvider } from "components/ToastContainer";
// import ConfirmationModal from "components/ConfirmationModal";
// import { useAppSelector } from "../../../../redux/store";

// const MyFavoriteHotel = () => {
//   const navigate = useNavigate();
//   const Auth = useAppSelector((state) => state.Auth.Auth);
//   const [formData, setFormData] = useState(Auth);
//   const hotels = [
//     {
//       id: 1,
//       name: "Balcona Nice Try Hotel Da Nang",
//       image: "/placeholder.svg?height=200&width=300",
//       address: "850/7 Tran Cao Van Street, Xuan Ha, Thanh Khe, Da Nang",
//       rating: 3.2,
//       feedbacks: 1,
//       stars: 4,
//     },
//     {
//       id: 2,
//       name: "Novotel Hotel Da Nang",
//       image: "/placeholder.svg?height=200&width=300",
//       address: "70 Ho Huy Tap, Thanh Khe Dong, Thanh Khe, Da Nang",
//       rating: 4.1,
//       feedbacks: 12,
//       stars: 5,
//     },
//   ];
//   const [activePage, setActivePage] = useState(1);
//   const renderStars = (count) => {
//     const stars = [];
//     for (let i = 0; i < 5; i++) {
//       if (i < count) {
//         stars.push(<StarFill key={i} className="text-warning" />);
//       } else {
//         stars.push(<Star key={i} className="text-warning" />);
//       }
//     }
//     return stars;
//   };
//   const [showAcceptModal, setShowAcceptModal] = useState(false);
//   return (
//     <Container fluid className="bg-light py-4">
//       <h2 className="fw-bold mb-4">My Favorite Hotels</h2>
//       <h1>{formData.favorites}</h1>
//       <Row className="mb-4 align-items-center">
//         <Col xs="auto">
//           <span className="me-2">Filter:</span>
//         </Col>
//         <Col xs="auto">
//           <Form.Select className="border-primary" style={{ width: "200px" }}>
//             <option>Score(High to low)</option>
//             <option>Score(Low to high)</option>
//             <option>Date(Newest first)</option>
//             <option>Date(Oldest first)</option>
//           </Form.Select>
//         </Col>
//         <Col xs="auto">
//           <Form.Select className="border-primary" style={{ width: "120px" }}>
//             <option>1 star</option>
//             <option>2 stars</option>
//             <option>3 stars</option>
//             <option>4 stars</option>
//             <option>5 stars</option>
//           </Form.Select>
//         </Col>
//         <Col xs="auto">
//           <Form.Select className="border-primary" style={{ width: "140px" }}>
//             <option>Đà Nẵng</option>
//             <option>Huế</option>
//             <option>Hải Phòng</option>
//             <option>Hà Nội</option>
//             <option>Hồ Chí Minh</option>
//           </Form.Select>
//         </Col>
//       </Row>
//       <Row className="m-4">
//         <Col md={12}>
//           {hotels.map((hotel) => (
//             <Card key={hotel.id} className="mb-4 hotel-card">
//               <Row className="g-0">
//                 <Col md={4}>
//                   <Card.Img
//                     variant="top"
//                     src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/629251764.jpg?k=050e0b7a57991869eb2c714c9191d7eea3a712e3a37b66f665be9816c9a87b6c&o=&hp=1"
//                     className="hotel-image"
//                   />
//                 </Col>
//                 <Col md={8}>
//                   <Card.Body>
//                     <Card.Title className="hotel-name">{hotel.name}</Card.Title>
//                     <div className="stars mb-2">{renderStars(hotel.stars)}</div>
//                     <div className="location mb-2">
//                       <FaMapMarkerAlt className="me-1" />
//                       <small>{hotel.address}</small>
//                     </div>
//                     <div className="d-flex align-items-center mb-2">
//                       <span className="rating-box1 me-2">{hotel.rating}</span>
//                       <span className="text-muted">
//                         {hotel.feedbacks} feedbacks
//                       </span>
//                     </div>
//                     <Button
//                       variant="link"
//                       className="view-detail p-0"
//                       style={{ fontSize: 16 }}
//                       onClick={() => {
//                         navigate(Routers.Home_detail);
//                       }}
//                     >
//                       <FaEye className="me-1" />
//                       View Detail Hotel
//                     </Button>
//                     <Button
//                       variant="link"
//                       className="text-dark p-0"
//                       style={{ position: "absolute", top: 5, right: 5 }}
//                       onClick={() => {setShowAcceptModal(true)}}
//                     >
//                       <X size={20} />
//                     </Button>
//                   </Card.Body>
//                 </Col>
//               </Row>
//               {/* Accept Confirmation Modal */}
//               <ConfirmationModal
//                 show={showAcceptModal}
//                 onHide={() => setShowAcceptModal(false)}
//                 onConfirm={() =>{
//                   showToast.warning("Delete Hotel Successfully!");
//                 }}
//                 title="Confirm Delete"
//                 message="Are you sure you want to delete hotel in list favorite hotels ?"
//                 confirmButtonText="Accept"
//                 type="danger"
//               />

//             </Card>
//           ))}
//           <div className="d-flex justify-content-center mt-4">
//             <Pagination>
//               {[1, 2, 3, 4].map((number) => (
//                 <Pagination.Item
//                   key={number}
//                   active={number === activePage}
//                   onClick={() => setActivePage(number)}
//                 >
//                   <b
//                     style={{
//                       color: number === activePage ? "white" : "#0d6efd",
//                     }}
//                   >
//                     {number}
//                   </b>
//                 </Pagination.Item>
//               ))}
//             </Pagination>
//           </div>
//           <ToastProvider/>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default MyFavoriteHotel;

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
