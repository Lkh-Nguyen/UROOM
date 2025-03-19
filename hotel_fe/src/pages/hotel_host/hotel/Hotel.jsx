import React, { useState } from "react";
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

function Hotel({ show, handleClose }) {
  const [bedCount, setBedCount] = useState({
    singleBed: 1,
    doubleBed: 0,
    kingBed: 0,
    superKingBed: 0,
  });

  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);

  const handleBedCountChange = (bedType, value) => {
    setBedCount({
      ...bedCount,
      [bedType]: value,
    });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <div className="booking-app bg-light">
        <Container className="py-4">
          <h2 className="mb-4 fw-bold">Chi tiết phòng</h2>

          {/* Room Type Section */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Tên chỗ nghỉ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên chỗ nghỉ"
                  className="form-input"
                />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Room Type Section */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Thành phố</Form.Label>
                  <Form.Select className="form-input">
                    <option>Chọn thành phố</option>
                    <option>Hà Nội</option>
                    <option>TP. Hồ Chí Minh</option>
                    <option>Đà Nẵng</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Quận</Form.Label>
                  <Form.Select className="form-input">
                    <option>Chọn quận</option>
                    <option>Ngũ Hành Sơn</option>
                    <option>Sơn Trà</option>
                    <option>Thanh Khê</option>
                    <option>Cẩm Lệ</option>
                    <option>Liên Chiểu</option>
                    <option>Hải Châu</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Phường</Form.Label>
                  <Form.Select className="form-input">
                    <option>Chọn phường</option>
                    <option>Xuân Hà</option>
                    <option>Mỹ Khê</option>
                    <option>An nhơn</option>
                    <option>Thanh Khê Đông</option>
                    <option>An Khê</option>
                    <option>An Đông</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập địa chỉ cụ thể"
                    className="form-input"
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
                      <Form.Check type="checkbox" label="WiFi miễn phí" />
                      <Form.Check type="checkbox" label="Bãi đỗ xe miễn phí" />
                      <Form.Check type="checkbox" label="Điều hòa nhiệt độ" />
                      <Form.Check type="checkbox" label="Phòng gia đình" />
                      <Form.Check type="checkbox" label="Sân thượng" />
                      <Form.Check type="checkbox" label="Khu vườn" />
                    </Col>
                    <Col md={6}>
                      <Form.Check type="checkbox" label="Hồ bơi" />
                      <Form.Check type="checkbox" label="Lễ tân 24 giờ" />
                      <Form.Check type="checkbox" label="Quầy bar" />
                      <Form.Check
                        type="checkbox"
                        label="Bồn tắm nóng/Jacuzzi"
                      />
                      <Form.Check type="checkbox" label="Phòng xông hơi" />
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
                  <Form.Select defaultValue="15:00">
                    <option>14:00</option>
                    <option>15:00</option>
                    <option>16:00</option>
                    <option>17:00</option>
                    <option>18:00</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Đến</Form.Label>
                  <Form.Select defaultValue="18:00">
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
                  <Form.Select defaultValue="08:00">
                    <option>07:00</option>
                    <option>08:00</option>
                    <option>09:00</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Đến</Form.Label>
                  <Form.Select defaultValue="11:00">
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
                      <Form.Select defaultValue="1 sao">
                        <option>1 sao</option>
                        <option>2 sao</option>
                        <option>3 sao</option>
                        <option>4 sao</option>
                        <option>5 sao</option>
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={12}>
                      <Form.Label>Mô tả về khách sạn</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Nhập mô tả khách sạn..."
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
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
                onClick={handleClose}
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
