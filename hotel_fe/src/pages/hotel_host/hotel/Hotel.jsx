import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { cityOptionSelect, districtsByCity, listFacilities } from "@utils/data";
import { useAppSelector } from "../../../redux/store";
import { useDispatch } from "react-redux";
import HotelActions from "../../../redux/hotel/actions";
import { showToast } from "@components/ToastContainer";
function Hotel({ show, handleClose, selectedHotelId }) {
  const [bedCount, setBedCount] = useState({
    singleBed: 1,
    doubleBed: 0,
    kingBed: 0,
    superKingBed: 0,
  });

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districtOptions, setDistrictOptions] = useState([]);
  const half = Math.ceil(listFacilities.length / 2);
  const facilitiesCol1 = listFacilities.slice(0, half);
  const facilitiesCol2 = listFacilities.slice(half);
  const Auth = useAppSelector((state) => state.Auth.Auth);
  const [loading, setLoading] = useState(false);
  const [hotelinfo, setHotelinfo] = useState(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(Auth);

  const [address, setAddress] = useState("");
  console.log("districtOptions: ", districtOptions)
  useEffect(() => {
    fetchHotelInfo();
  }, []);
  const fetchHotelInfo = () => {
    setLoading(true);
    dispatch({
      type: HotelActions.FETCH_OWNER_HOTEL,
      payload: {
        userId: formData._id,
        onSuccess: (data) => {
          setHotelinfo(data.hotels);
          console.log("hello tài dương", data.hotels);
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

  useEffect(() => {
    if (selectedCity && districtsByCity[selectedCity]) {
      setDistrictOptions(districtsByCity[selectedCity]);
    } else {
      setDistrictOptions([]);
    }
  }, [selectedCity]);
  
  useEffect(() => {
    if (selectedHotelId) {
      // TODO: fetch dữ liệu khách sạn từ selectedHotelId
      console.log("Hotel ID được chọn:", selectedHotelId);
    }
  }, [selectedHotelId]);



  const getDistrictOptions = (cityValue) => {
    return districtsByCity[cityValue] || [];
  };

 
  const findCityValue = (cityLabel) => {
    const city = cityOptionSelect.find((c) => cityLabel.includes(c.label));
    return city ? city.value : "";
  };

  const findDistrictValue = (districtLabel, cityValue) => {
    const districts = districtsByCity[cityValue] || [];
    const district = districts.find((d) => districtLabel.includes(d.label));
    return district ? district.value : "";
  };

  useEffect(() => {
    if (hotelinfo?.length) {
      const fullAddress = hotelinfo[0].address;
      const parts = fullAddress.split(",").map((s) => s.trim());
  
      const cityLabel = parts.find((p) => p.includes("Thành phố")) || "";
      const districtLabel = parts[2];
      const addressDetail = parts.slice(0, 2).join(", ");
  
      const cityValue = findCityValue(cityLabel);
      const districtValue = findDistrictValue(districtLabel, cityValue);
      
      setSelectedCity(cityValue);
      
      const districts = getDistrictOptions(cityValue);
      setDistrictOptions(districts);
  
      // Đảm bảo districtValue có trong districts trước khi setSelectedDistrict
      if (districts.some(d => d.value === districtValue)) {
        console.log("ABC: ", districtValue)
        setSelectedDistrict(districtValue)
      } else {
        setSelectedDistrict("");
      }
  
      setAddress(addressDetail);
  
      console.log("Full Address:", fullAddress);
      console.log("City Label:", cityLabel);
      console.log("District Label:", districtLabel);
      console.log("City Value:", cityValue);
      console.log("District Value (from function):", districtValue);
    }
  }, [hotelinfo]);

  
  
  useEffect(() => {
    if (selectedCity) {
      const districts = getDistrictOptions(selectedCity);
      console.log("🏙️ City selected:", selectedCity);
      console.log("🏘️ District list:", districts);
      setDistrictOptions(districts);
    }
  }, [selectedCity]);
  useEffect(() => {
    console.log("SelectedDistrict changed:", selectedDistrict);
  }, [selectedDistrict]);
  
  const [checkInStart, setCheckInStart] = useState("");
  const [checkInEnd, setCheckInEnd] = useState("");
  const [checkOutStart, setCheckOutStart] = useState("");
  const [checkOutEnd, setCheckOutEnd] = useState("");

  useEffect(() => {
    if (hotelinfo?.[0]) {
      setCheckInStart(hotelinfo[0].checkInStart);
      setCheckInEnd(hotelinfo[0].checkInEnd);
      setCheckOutStart(hotelinfo[0].checkOutStart);
      setCheckOutEnd(hotelinfo[0].checkOutEnd);
    }
  }, [hotelinfo]);

  const [hotelFacilities, setHotelFacilities] = useState([]);

  useEffect(() => {
    if (hotelinfo && hotelinfo.length > 0 && hotelinfo[0].facilities) {
      setHotelFacilities(hotelinfo[0].facilities.map((f) => f.name));
    }
  }, [hotelinfo]);

  // Xử lý thay đổi checkbox
  const handleFacilityChange = (facilityName) => {
    setHotelFacilities((prev) => {
      if (prev.includes(facilityName)) {
        // Bỏ tick
        return prev.filter((name) => name !== facilityName);
      } else {
        // Tick
        return [...prev, facilityName];
      }
    });
  };
  console.log("szzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", hotelinfo?.[0]?._id);


  /// UPDATE_HOTEL
  const handleSave = () => {
    if (!hotelinfo?.[0]?._id) {
      showToast.error("Không tìm thấy ID khách sạn để cập nhật.");
      return;
    }
  
    const cityLabel = cityOptionSelect.find((c) => c.value === selectedCity)?.label || "";
    const districtLabel = districtOptions.find((d) => d.value === selectedDistrict)?.label || "";
  
    if (!address || !cityLabel || !districtLabel) {
      showToast.error("Vui lòng điền đầy đủ địa chỉ, thành phố và quận.");
      return;
    }
  
    const fullAddress = `${address}, ${districtLabel}, Thành phố ${cityLabel}`;
  
    console.log("hotelFacilities:", hotelFacilities);
  
    const updateData = {
      hotelName: hotelinfo?.[0]?.hotelName,
      description: hotelinfo?.[0]?.description || "",
      address: fullAddress,
      phoneNumber: hotelinfo?.[0]?.phoneNumber || "0934726073",
      services: hotelinfo?.[0]?.services || [],
      facilities: hotelFacilities, // GỬI array name STRING
      rating: hotelinfo?.[0]?.rating || 0,
      star: hotelinfo?.[0]?.star || 0,
      pricePerNight: hotelinfo?.[0]?.pricePerNight || 0,
      images: hotelinfo?.[0]?.images || [],
      businessDocuments: hotelinfo?.[0]?.businessDocuments || [],
      adminStatus: hotelinfo?.[0]?.adminStatus || "",
      ownerStatus: hotelinfo?.[0]?.ownerStatus || "",
      checkInStart,
      checkInEnd,
      checkOutStart,
      checkOutEnd,
    };
  
    setLoading(true);
  
    dispatch({
      type: HotelActions.UPDATE_HOTEL,
      payload: {
        hotelId: hotelinfo?.[0]?._id,
        updateData,
        onSuccess: (data) => {
          showToast.success("Cập nhật khách sạn thành công!");
          setLoading(false);
             window.location.reload();
          handleClose();
        },
        onFailed: (message) => {
          showToast.error(message || "Cập nhật khách sạn thất bại!");
          setLoading(false);
        },
        onError: (err) => {
          console.error(err);
          showToast.error("Lỗi máy chủ trong khi cập nhật khách sạn.");
          setLoading(false);
        },
      },
    });
  };
  
  const [hotelImages, setHotelImages] = useState([]);
  useEffect(() => {
    if (hotelinfo?.length > 0 && hotelinfo[0].images) {
      setHotelImages(hotelinfo[0].images); // hotelinfo[0].images = [url1, url2, ...]
    }
  }, [hotelinfo]);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Nếu muốn preview file mới chọn
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setHotelImages(filePreviews);
  
    // TODO: xử lý upload file lên server hoặc lưu file tạm
  };
console.log("6666666666666666666666666666666:",selectedDistrict)


  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <div className="booking-app bg-light">
        <Container className="py-4">
          <h2 className="mb-4 fw-bold">Chi tiết phòng</h2>
          {/* <h1>{selectedHotelId}</h1> */}
          {/* Room Type Section */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Tên chỗ nghỉ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên chỗ nghỉ"
                  className="form-input"
                  value={hotelinfo?.[0]?.hotelName || ""}
                  onChange={(e) => {
                    const updatedHotels = [...hotelinfo];
                    updatedHotels[0] = {
                      ...updatedHotels[0],
                      hotelName: e.target.value,
                    };
                    setHotelinfo(updatedHotels);
                  }}
                />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Room Type Section */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Form>
                {/* Thành phố */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Thành phố</Form.Label>
                  <Form.Select
                    className="form-input"
                    value={selectedCity}
                    onChange={(e) => {
                      const cityVal = e.target.value;
                      setSelectedCity(cityVal);

                      const districts = getDistrictOptions(cityVal);
                      setDistrictOptions(districts);
                      setSelectedDistrict("");
                    }}
                  >
                    <option value="">Chọn thành phố</option>
                    {cityOptionSelect.map((city, index) => (
                      <option key={index} value={city.value}>
                        {city.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Quận */}
                {/* <h1>{selectedDistrict || "Chưa chọn quận"}</h1> */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Quận / Huyện</Form.Label>
                  <Form.Select
                    className="form-input"
                    value={selectedDistrict}
                    onChange={(e) => {
                      console.log("Quận đã chọn:", e.target.value); 
                      setSelectedDistrict(e.target.value);
                    }}
                  >
                    <option value="">Chọn quận</option>
                    {districtOptions.map((district) => (
                      <option key={district.value} value={district.value}>
                        {district.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Địa chỉ cụ thể */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập địa chỉ cụ thể"
                    className="form-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          {/* Room Size Section */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Các tiện nghi</Form.Label>
                  <Row>
                    <Col md={6}>
                      {facilitiesCol1.map((facility, index) => (
                        <Form.Check
                          key={`facility1-${index}`}
                          type="checkbox"
                          label={facility.name}
                          checked={hotelFacilities.includes(facility.name)}
                          onChange={() => handleFacilityChange(facility.name)}
                        />
                      ))}
                    </Col>
                    <Col md={6}>
                      {facilitiesCol2.map((facility, index) => (
                        <Form.Check
                          key={`facility2-${index}`}
                          type="checkbox"
                          label={facility.name}
                          checked={hotelFacilities.includes(facility.name)}
                          onChange={() => handleFacilityChange(facility.name)}
                        />
                      ))}
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          {/* Guest Capacity Section */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              {/* Nhận phòng */}
              <Row className="mb-2">
                <Col>
                  <h6>Nhận phòng</h6>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Từ</Form.Label>
                  <Form.Select
                    value={checkInStart}
                    onChange={(e) => setCheckInStart(e.target.value)}
                  >
                    <option>14:00</option>
                    <option>15:00</option>
                    <option>16:00</option>
                    <option>17:00</option>
                    <option>18:00</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Đến</Form.Label>
                  <Form.Select
                    value={checkInEnd}
                    onChange={(e) => setCheckInEnd(e.target.value)}
                  >
                    <option>16:00</option>
                    <option>17:00</option>
                    <option>18:00</option>
                    <option>19:00</option>
                  </Form.Select>
                </Col>
              </Row>

              {/* Trả phòng */}
              <Row className="mb-2 mt-4">
                <Col>
                  <h6>Trả phòng</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Từ</Form.Label>
                  <Form.Select
                    value={checkOutStart}
                    onChange={(e) => setCheckOutStart(e.target.value)}
                  >
                    <option>07:00</option>
                    <option>08:00</option>
                    <option>09:00</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Đến</Form.Label>
                  <Form.Select
                    value={checkOutEnd}
                    onChange={(e) => setCheckOutEnd(e.target.value)}
                  >
                    <option>10:00</option>
                    <option>11:00</option>
                    <option>12:00</option>
                  </Form.Select>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Room Name Section */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Row>
                <div className="mb-4">
                  <h1 className="main-heading">
                    Tiêu chuẩn và mô tả về khách sạn
                  </h1>
                </div>

                {/* Facility Form */}
                <div
                  className="facility-form-card"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "4px",
                    padding: "20px",
                  }}
                >
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Label>Tiêu chuẩn khách sạn</Form.Label>
                      <Form.Select
                        value={hotelinfo?.[0]?.star?.toString() || ""}
                        onChange={(e) => {
                          const updatedHotels = [...hotelinfo];
                          updatedHotels[0] = {
                            ...updatedHotels[0],
                            star: e.target.value,
                          };
                          setHotelinfo(updatedHotels);
                        }}
                      >
                        <option value="1">1 sao</option>
                        <option value="2">2 sao</option>
                        <option value="3">3 sao</option>
                        <option value="4">4 sao</option>
                        <option value="5">5 sao</option>
                      </Form.Select>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={12}>
                      <Form.Label>Mô tả về khách sạn</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={hotelinfo?.[0]?.description || ""}
                        placeholder="Nhập mô tả khách sạn..."
                        onChange={(e) => {
                          const updatedHotels = [...hotelinfo];
                          updatedHotels[0] = {
                            ...updatedHotels[0],
                            description: e.target.value, // cập nhật đúng field description
                          };
                          setHotelinfo(updatedHotels);
                        }}
                      />
                    </Col>
                  </Row>
                  {/* <Row className="mb-3">
                    <Col md={12}>
                      <Form.Label>
                        Hình ảnh khách sạn (Bắt buộc 5 ảnh)
                      </Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={() => {}}
                      />
                    </Col>
                  </Row> */}
                  <Row className="mb-3">
  <Col md={12}>
    <Form.Label>Hình ảnh khách sạn (Bắt buộc 5 ảnh)</Form.Label>
    <Form.Control
      type="file"
      multiple
      accept="image/*"
      onChange={handleFileChange}
    />
    <div className="mt-3 d-flex flex-wrap gap-2">
      {hotelImages.map((imgUrl, idx) => (
        <img
          key={idx}
          src={imgUrl}
          alt={`Hotel image ${idx + 1}`}
          style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 5 }}
        />
      ))}
    </div>
  </Col>
</Row>

                </div>
              </Row>
            </Card.Body>
          </Card>
          {/* Action Buttons */}
          <Row className="mt-4">
            <Col xs={6}>
              <Button
                variant="outline-danger"
                className="w-100 py-2"
                onClick={handleClose}
              >
                Hủy bỏ
              </Button>
            </Col>
            <Col xs={6}>
              <Button
                variant="primary"
                className="w-100 py-2"
                onClick={handleSave}
              >
                Chỉnh sửa
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </Modal>
  );
}

export default Hotel;
