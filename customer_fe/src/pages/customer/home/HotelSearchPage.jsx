"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
  Badge,
  Alert,
  Modal,
} from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStar,
  FaCheck,
  FaSearch,
  FaHotel,
  FaArrowRight,
  FaHeart,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../css/customer/HotelSearchPage.css";
import Footer from "../Footer";
import Header from "../Header";
import Banner from "../../../images/banner.jpg";
import { FaChild, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Routers from "../../../utils/Routes";
import Select from "react-select";
import {
  cityOptionSelect,
  districtsByCity,
  listFacilities,
} from "../../../utils/data";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/store";
import SearchActions from "../../../redux/search/actions";
import Factories from "../../../redux/search/factories";
import { showToast, ToastProvider } from "../../../components/ToastContainer";
import Pagination from "components/Pagination";
import MapComponent from "pages/MapLocation";

// Options for adults select
const adultsOptions = Array.from({ length: 20 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1} Adults`,
}));

// Options for children select
const childrenOptions = Array.from({ length: 11 }, (_, i) => ({
  value: i,
  label: `${i} Childrens`,
}));

const HotelSearchPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [starFilter, setStarFilter] = useState(0);
  const [priceRange, setPriceRange] = useState(1000);

  const SearchInformation = useAppSelector(
    (state) => state.Search.SearchInformation
  );
  // State for all search parameters
  const selectedCityTemp = SearchInformation.address;
  const [selectedCity, setSelectedCity] = useState(
    cityOptionSelect.find(
      (option) => option.value === SearchInformation.address
    ) || null
  );
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [checkinDate, setCheckinDate] = useState(SearchInformation.checkinDate);
  const [checkoutDate, setCheckoutDate] = useState(
    SearchInformation.checkoutDate
  );
  const [selectedAdults, setSelectedAdults] = useState(
    adultsOptions.find((option) => option.value === SearchInformation.adults) ||
      adultsOptions[0]
  );
  const [selectedChildren, setSelectedChildren] = useState(
    childrenOptions.find(
      (option) => option.value === SearchInformation.childrens
    ) || childrenOptions[0]
  );
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [searchHotel, setSearchHotel] = useState([]);
  console.log("searchHotel: ", searchHotel);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  const [searchParams, setSearchParams] = useState({
    address: SearchInformation.address,
    checkinDate: SearchInformation.checkinDate,
    checkoutDate: SearchInformation.checkoutDate,
    numberOfPeople: SearchInformation.adults + SearchInformation.childrens,
    page: currentPage,
    star: starFilter,
    district: selectedCity.value,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({
      ...searchParams,
      page: page,
    });
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await Factories.searchHotel(searchParams);
        if (response?.status === 200) {
          setSearchHotel(response?.data.hotels);
          setCurrentPage(response?.data.currentPage);
          setTotalPages(response?.data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchParams, starFilter]);

  const [formErrors, setFormErrors] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const handleFacilityChange = (e, name) => {
    const isChecked = e.target.checked;

    // Cập nhật state selectedFacilities
    setSelectedFacilities(
      (prev) =>
        isChecked
          ? [...prev, name] // Thêm name nếu checkbox được check
          : prev.filter((item) => item !== name) // Xóa name nếu checkbox bị uncheck
    );

    // Cập nhật searchParams với mảng selectedFacilities đã thay đổi
    setSearchParams({
      ...searchParams,
      page: 1,
      selectedFacilities: isChecked
        ? [...selectedFacilities, name] // Thêm name nếu được check
        : selectedFacilities.filter((item) => item !== name), // Xóa name nếu uncheck
    });
  };

  // Replace the handleSearch function with this updated version
  const handleSearch = () => {
    setSelectedDistrict(null);
    // Validate check-in date is before check-out date
    if (
      checkinDate &&
      checkoutDate &&
      new Date(checkinDate) >= new Date(checkoutDate)
    ) {
      showToast.warning("Check-in date cannot be later than check-out date.");
      return;
    }

    // Clear any previous errors
    setFormErrors({});

    // Set loading state
    setIsSearching(true);

    // Create query parameters
    const adults = selectedAdults ? selectedAdults.value : 1;
    const childrens = selectedChildren ? selectedChildren.value : 0;
    const numberOfPeople = adults + childrens;

    const SearchInformation = {
      address: selectedCity ? selectedCity.value : "",
      checkinDate,
      checkoutDate,
      adults,
      childrens,
    };

    // Simulate loading delay (1 second)
    setTimeout(() => {
      dispatch({
        type: SearchActions.SAVE_SEARCH,
        payload: { SearchInformation },
      });

      // Reset to page 1 when performing a new search
      setCurrentPage(1);

      const searchParamsTemp = {
        address: selectedCity ? selectedCity.value : "",
        checkinDate,
        checkoutDate,
        numberOfPeople,
        page: 1, // Reset to page 1
        star: starFilter, // Include star filter in search params
      };
      setSearchParams(searchParamsTemp);
      setIsSearching(false);
    }, 1000);
  };

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      border: "none",
      background: "transparent",
      boxShadow: "none",
      width: "100%",
    }),
  };

  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < count ? "text-warning" : "text-muted"}
          size={23}
        />
      );
    }
    return stars;
  };

  const [showModalMap, setShowModalMap] = useState(false);
  const [addressMap, setAddressMap] = useState("");
  const [isFavorite, setIsFavorite] = useState(false); // Trạng thái yêu thích

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${Banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <div
        className="flex-grow-1 d-flex justify-content-center"
        style={{ paddingTop: "50px", paddingBottom: "50px" }}
      >
        <Container
          style={{
            paddingTop: "50px",
            paddingBottom: "50px",
            marginTop: "50px",
          }}
        >
          <ToastProvider />

          <div
            style={{
              maxWidth: "100%",
              margin: "0 auto",
              marginTop: "-4.5%",
              marginBottom: "50px",
            }}
          >
            {/* Khối chứa cả Hotel và Search Bar */}
            <div
              style={{
                borderRadius: "20%",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {/* Hotel Title */}
              <div
                className="px-5 py-2 bg-white d-flex align-items-center pt-3"
                style={{
                  paddingRight: "40px",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "5px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  width: "fit-content",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  paddingLeft: "20px",
                  marginBottom: "-1%",
                  marginLeft: "-0.9%",
                }}
              >
                <FaHotel style={{ color: "#2D74FF", fontSize: "24px" }} />
                <span style={{ color: "black", marginLeft: "10px" }}>
                  Hotel
                </span>
              </div>

              {/* Search Bar */}
              <Row
                className="d-flex align-items-center bg-white px-4 py-4"
                style={{
                  borderBottomRightRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                }}
              >
                <Col md={3}>
                  <InputGroup
                    className="border"
                    style={{ borderRadius: "10px" }}
                  >
                    <InputGroup.Text className="bg-transparent border-0">
                      <FaMapMarkerAlt />
                    </InputGroup.Text>
                    <div style={{ flex: 1 }}>
                      <Select
                        options={cityOptionSelect}
                        value={selectedCity}
                        onChange={(option) => setSelectedCity(option)}
                        placeholder="Search location"
                        isSearchable
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            border: "none",
                            background: "transparent",
                            boxShadow: "none",
                            width: "100%",
                          }),
                        }}
                      />
                    </div>
                    <InputGroup.Text className="bg-transparent border-0">
                      <FaSearch />
                    </InputGroup.Text>
                  </InputGroup>
                  {formErrors.location && (
                    <div
                      className="text-danger mt-1"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {formErrors.location}
                    </div>
                  )}
                </Col>

                <Col md={4}>
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
                        <Form.Control
                          type="date"
                          className="border-0 bg-transparent"
                          value={checkinDate}
                          onChange={(e) => setCheckinDate(e.target.value)}
                          required
                          min={today} // ✅ Không cho chọn ngày trước hôm nay
                        />
                      </InputGroup>
                      {formErrors.checkinDate && (
                        <div
                          className="text-danger mt-1"
                          style={{ fontSize: "0.875rem" }}
                        >
                          {formErrors.checkinDate}
                        </div>
                      )}
                    </Col>

                    {/* Icon mũi tên */}
                    <Col
                      xs="auto"
                      className="d-flex align-items-center justify-content-center"
                    >
                      <FaArrowRight
                        style={{ fontSize: "1.2rem", color: "#555" }}
                      />
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
                        <Form.Control
                          type="date"
                          className="border-0 bg-transparent"
                          value={checkoutDate}
                          onChange={(e) => setCheckoutDate(e.target.value)}
                          min={today} // ✅ Không cho chọn ngày trước hôm nay
                          required
                        />
                      </InputGroup>
                      {formErrors.checkoutDate && (
                        <div
                          className="text-danger mt-1"
                          style={{ fontSize: "0.875rem" }}
                        >
                          {formErrors.checkoutDate}
                        </div>
                      )}
                    </Col>
                  </Row>
                </Col>

                {/* Ô chọn số lượng Adults và Children */}
                <Col md={4} className="px-3 ">
                  <InputGroup
                    className="border"
                    style={{ borderRadius: "10px", padding: "2px" }}
                  >
                    <InputGroup.Text className="bg-transparent border-0">
                      <FaUser />
                    </InputGroup.Text>
                    <div style={{ flex: 1 }}>
                      <Select
                        options={adultsOptions}
                        value={selectedAdults}
                        onChange={setSelectedAdults}
                        styles={selectStyles}
                        isSearchable={false}
                      />
                    </div>

                    <InputGroup.Text className="bg-transparent border-0">
                      <FaChild />
                    </InputGroup.Text>
                    <div style={{ flex: 1 }}>
                      <Select
                        options={childrenOptions}
                        value={selectedChildren}
                        onChange={setSelectedChildren}
                        styles={selectStyles}
                        isSearchable={false}
                      />
                    </div>
                  </InputGroup>
                </Col>

                {/* Search Button */}
                <Col xs="auto" className="px-2">
                  <Button
                    variant="primary"
                    style={{
                      width: "60px",
                      height: "45px",
                      borderRadius: "15px",
                    }}
                    onClick={handleSearch}
                    disabled={isSearching}
                  >
                    <FaSearch />
                  </Button>
                </Col>
              </Row>
            </div>
          </div>

          {/* Main Content */}
          <Row>
            {/* Filters */}
            <Col md={3}>
              <div
                className="shadow-sm mb-4"
                style={{
                  backgroundColor: "white",
                  padding: "16px",
                  borderRadius: "10px",
                }}
              >
                <h5 className="mb-3">Lọc khách sạn</h5>

                {/* Star Rating Filter */}
                <div className="mb-4">
                  <h6 className="mb-2">Star Range</h6>
                  <Form>
                    <Form.Check
                      type="radio"
                      id="star-all"
                      name="starRating"
                      label="All stars"
                      onChange={() => {
                        setStarFilter(0);
                        setSearchParams({
                          ...searchParams,
                          page: 1,
                          star: 0,
                        });
                      }}
                      checked={starFilter === 0}
                    />
                    {[5, 4, 3, 2, 1].map((star) => (
                      <Form.Check
                        key={star}
                        type="radio"
                        id={`star-${star}`}
                        name="starRating"
                        label={
                          <div className="d-flex align-items-center">
                            {[...Array(star)].map((_, i) => (
                              <FaStar key={i} className="text-warning me-1" />
                            ))}
                          </div>
                        }
                        onChange={() => {
                          setStarFilter(star);
                          setSearchParams({
                            ...searchParams,
                            page: 1,
                            star: star,
                          });
                        }}
                        checked={starFilter === star}
                      />
                    ))}
                  </Form>

                  <h6 className="mt-2">District select</h6>
                  <InputGroup
                    className="border"
                    style={{ borderRadius: "10px" }}
                  >
                    <InputGroup.Text className="bg-transparent border-0">
                      <FaMapMarkerAlt />
                    </InputGroup.Text>
                    <div style={{ flex: 1 }}>
                      <Select
                        options={districtsByCity[`${selectedCity.value}`]}
                        value={selectedDistrict}
                        onChange={(option) => {
                          setSelectedDistrict(option);
                          setSearchParams({
                            ...searchParams,
                            district: option.value,
                          });
                        }}
                        placeholder="Search District"
                        isSearchable
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            border: "none",
                            background: "transparent",
                            boxShadow: "none",
                            width: "100%",
                          }),
                        }}
                      />
                    </div>
                    <InputGroup.Text className="bg-transparent border-0">
                      <FaSearch />
                    </InputGroup.Text>
                  </InputGroup>

                  <h6 className="mt-4">Facilities select</h6>
                  {listFacilities.map((item, index) => {
                    const FacilityIcon = item.iconTemp;
                    return (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`facility-${index}`}
                          value={item.name}
                          onChange={(e) => handleFacilityChange(e, item.name)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`facility-${index}`}
                        >
                          {FacilityIcon && (
                            <FacilityIcon style={{ marginRight: "8px" }} />
                          )}
                          {item.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>

            <Col md={9}>
              {isSearching ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "300px" }}
                >
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : searchHotel.length > 0 ? (
                <>
                  {searchHotel.map((hotel, index) => {
                    const inforHotel = hotel.hotel;
                    return (
                      <Card key={hotel.id || index} className="mb-3 shadow-sm">
                        <Row className="g-0" style={{ height: "350px" }}>
                          <Col md={4}>
                            <div className="position-relative">
                              <div
                                style={{
                                  width: "35px",
                                  height: "35px",
                                  borderRadius: "50%",
                                  borderWidth: "2px",
                                  borderColor: isFavorite ? "red" : "white",
                                  borderStyle: "solid", // Thêm dòng này
                                  position: "absolute",
                                  top: 10,
                                  left: 10,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <FaHeart
                                  onClick={() => setIsFavorite(!isFavorite)}
                                  style={{
                                    fontSize: "20px",
                                    color: isFavorite ? "red" : "white",
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                              <img
                                src={
                                  inforHotel.images
                                    ? inforHotel.images[0]
                                    : "/placeholder.svg"
                                }
                                alt={hotel.name || "Unnamed Hotel"}
                                className="img-fluid rounded-start hotel-image"
                                style={{ height: "100%", objectFit: "cover" }}
                              />
                            </div>
                          </Col>
                          <Col md={8}>
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <h5 className="card-title">
                                    {inforHotel.hotelName || "No Name"}
                                  </h5>
                                  <p className="text-muted mb-1">
                                    {selectedCityTemp || "Unknown Location"} -{" "}
                                    <a
                                      onClick={() => {
                                        setAddressMap(inforHotel.address);
                                        setShowModalMap(true);
                                      }}
                                      className="text-primary"
                                    >
                                      Show on map
                                    </a>
                                  </p>
                                  <p className="text-muted small mb-2">
                                    <FaMapMarkerAlt className="me-1 text-secondary" />
                                    {inforHotel.address ||
                                      "No Address Provided"}
                                  </p>
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
                                          {hotel.totalFeedbacks} feedbacks about
                                          hotel
                                        </span>
                                      </>
                                    ) : (
                                      <span className="text-muted">
                                        No feedback about hotel
                                      </span>
                                    )}
                                  </p>

                                  <div className="mt-3 d-flex flex-wrap gap-2">
                                    {inforHotel.facilities &&
                                    inforHotel.facilities.length > 0 ? (
                                      inforHotel.facilities
                                        .slice(0, 7)
                                        .map((feature, i) => {
                                          // feature là 1 object: { _id, name, description, icon }
                                          const matchedFeature =
                                            listFacilities.find(
                                              (f) =>
                                                f.name.toLowerCase() ===
                                                feature.name.toLowerCase()
                                            );
                                          const FacilityIcon =
                                            matchedFeature?.iconTemp;

                                          return (
                                            <span
                                              key={feature._id || i}
                                              className="badge bg-light text-dark border"
                                              style={{
                                                fontSize: "14px",
                                                padding: "8px 12px",
                                                borderRadius: "20px",
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              {FacilityIcon && (
                                                <FacilityIcon
                                                  style={{ marginRight: "8px" }}
                                                />
                                              )}
                                              {feature.name}
                                            </span>
                                          );
                                        })
                                    ) : (
                                      <p className="text-muted small">
                                        No features available
                                      </p>
                                    )}
                                  </div>

                                  <div className="d-flex flex-wrap align-items-center gap-3 mt-2">
                                    <p
                                      className="text-success mb-0"
                                      style={{
                                        fontSize: 16,
                                        padding: "8px 12px",
                                      }}
                                    >
                                      <FaCheck className="me-1" /> Free
                                      cancellation
                                    </p>
                                    <p
                                      className="text-success mb-0"
                                      style={{
                                        fontSize: 16,
                                        padding: "8px 12px",
                                      }}
                                    >
                                      <FaCheck className="me-1" /> No immediate
                                      payment
                                    </p>
                                  </div>
                                </div>

                                <div className="d-flex">
                                  {inforHotel.star
                                    ? renderStars(inforHotel.star)
                                    : "No Rating"}
                                </div>
                              </div>

                              <div className="text-end mt-3">
                                <Button
                                  style={{
                                    position: "absolute",
                                    bottom: 20,
                                    right: 20,
                                  }}
                                  variant="primary"
                                  onClick={() => {
                                    navigate(Routers.Home_detail);
                                  }}
                                >
                                  Booking Room
                                </Button>
                              </div>
                            </Card.Body>
                          </Col>
                        </Row>
                      </Card>
                    );
                  })}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-4">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              ) : (
                <Alert variant="danger" style={{ textAlign: "center" }}>
                  No hotels available
                </Alert>
              )}
            </Col>
          </Row>
          <Modal
            show={showModalMap}
            onHide={() => {
              setShowModalMap(false);
              setAddressMap("");
            }}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Map Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <MapComponent addressMap={addressMap} />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowModalMap(false);
                  setAddressMap("");
                }}
              >
                Đóng
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default HotelSearchPage;
