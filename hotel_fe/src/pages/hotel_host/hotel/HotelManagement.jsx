import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Image,
  Button,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Clock,
  GeoAlt,
  Wifi,
  Tv,
  Droplet,
  Wind,
  Cup,
  Building,
  PersonCheck,
  ShieldCheck,
  Star,
  StarFill,
} from "react-bootstrap-icons";
import Hotel from "./Hotel";

import { useAppSelector } from "../../../redux/store";
import { useDispatch } from "react-redux";
import HotelActions from "../../../redux/hotel/actions";
import { showToast } from "@components/ToastContainer";
import "../../../css/hotelHost/HotelManagement.css";
import * as Routers from "../../../utils/Routes";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
function HotelManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Auth = useAppSelector((state) => state.Auth.Auth);
  const [formData, setFormData] = useState(Auth);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [hotelinfo, setHotelinfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  console.log("idsfbcdvfn", formData._id);
  useEffect(() => {
    fetchHotelInfo();
  }, []);
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
  const fetchHotelInfo = () => {
    setLoading(true);
    dispatch({
      type: HotelActions.FETCH_OWNER_HOTEL,
      payload: {
        userId: formData._id,
        onSuccess: (data) => {
          setHotelinfo(data.hotels);
          console.log("acsahjsikxx", data.hotels);
          setLoading(false);
        },
        onFailed: () => {
          showToast.error("Lấy thông tin khách sạn thất bại");
          setLoading(false);
        },
        onError: (err) => {
          console.error(err);
          showToast.error("Lỗi máy chủ khi lấy thông tin khách sạn");
          setLoading(false);
        },
      },
    });
  };

  const renderStars = (count = 0, total = 5) =>
    [...Array(total)].map((_, i) =>
      i < count ? (
        <StarFill key={i} className="text-warning" />
      ) : (
        <Star key={i} className="text-warning" />
      )
    );

  if (loading || !hotelinfo) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  console.log("infor: ", hotelinfo);

  return (
    <div className="main-content_1 p-3">
      <div style={styles.header}>
        {/* <h1>{hotelinfo[0]._id}</h1> */}
        <h1 style={styles.title}>Thông tin khách sạn</h1>
        <Button
          style={styles.addButton}
          onClick={() => {
            setSelectedHotelId(hotelinfo[0]._id);
            setShowModal(true);
          }}
        >
          + Chỉnh sửa khách sạn
        </Button>
      </div>

      <Card className="border-0 shadow">
        <Card.Body className="p-4">
          <div className="hotel-header mb-4">
            <h1 className="hotel-name">{hotelinfo[0]?.hotelName}</h1>
            <div className="d-flex align-items-center mb-2">
              <div className="stars me-2">{renderStars(hotelinfo[0].star)}</div>
              <Badge bg="warning" text="dark" className="star-badge">
                {hotelinfo.stars} sao
              </Badge>
            </div>
          </div>

          <Row>
            <Col lg={7}>
              <div className="main-image-container mb-3">
                <Image
                  src={
                    hotelinfo[0].images?.[selectedImage] || "/placeholder.svg"
                  }
                  alt="Ảnh khách sạn chính"
                  className="main-image"
                  fluid
                  style={{ height: "600px", width: "600px" }}
                />
              </div>

              <div className="image-thumbnails mb-4">
                {hotelinfo[0].images?.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Ảnh ${index + 1}`}
                    className={`thumbnail ${
                      selectedImage === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                    style={{
                      height: "120px",
                      width: "120px",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>

              <div className="hotel-description mb-4">
                <h3 className="section-title">Mô tả</h3>
                <p>{hotelinfo[0].description}</p>
              </div>

              <div className="hotel-amenities mb-4">
                <h3 className="section-title">Tiện nghi khách sạn</h3>
                <Row>
                  {hotelinfo[0].facilities?.map((facility, index) => (
                    <Col key={index} xs={6} md={4} lg={3} className="mb-3">
                      <div className="amenity-item d-flex align-items-center gap-2">
                        {renderIcon(facility.icon)}
                        <span style={{ marginLeft: "5px" }}>
                          {facility.name}
                        </span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>

            <Col lg={5}>
              <Card className="info-card">
                <Card.Body>
                  <div className="info-section">
                    <h4 className="info-title">
                      <GeoAlt className="me-2" />
                      Địa chỉ
                    </h4>
                    <p className="mb-1">{hotelinfo[0].address}</p>
                  </div>

                  <div className="info-section">
                    <h4 className="info-title">
                      <Clock className="me-2" />
                      Giờ nhận phòng
                    </h4>
                    <div className="time-badge check-in">
                      Từ {hotelinfo[0].checkInStart} đến{" "}
                      {hotelinfo[0].checkInEnd}
                    </div>
                  </div>

                  <div className="info-section">
                    <h4 className="info-title">
                      <Clock className="me-2" />
                      Giờ trả phòng
                    </h4>
                    <div className="time-badge check-out">
                      Từ {hotelinfo[0].checkOutStart} đến{" "}
                      {hotelinfo[0].checkOutEnd}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {/* 
      <Hotel
        show={showModal}
        onHide={() => setShowModal(false)}
        handleClose={() => setShowModal(false)}
      /> */}

      <Hotel
        show={showModal}
        handleClose={() => setShowModal(false)}
        selectedHotelId={selectedHotelId}
      />
    </div>
  );
}

// const getAmenityIcon = (name) => {
//   switch (name.toLowerCase()) {
//     case "wifi miễn phí":
//       return <Wifi />;
//     case "tv màn hình phẳng":
//       return <Tv />;
//     case "nước nóng":
//       return <Droplet />;
//     case "điều hòa":
//       return <Wind />;
//     case "quầy bar":
//       return <Cup />;
//     case "phòng họp":
//       return <Building />;
//     case "dịch vụ phòng":
//       return <PersonCheck />;
//     case "an ninh 24/7":
//       return <ShieldCheck />;
//     default:
//       return null;
//   }
// };

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    margin: 0,
  },
  addButton: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
};

export default HotelManagement;
