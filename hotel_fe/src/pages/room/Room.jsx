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

function Room({ show, handleClose }) {
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
                <Form.Label className="fw-medium">
                  Đây là loại chỗ nghỉ gì?
                </Form.Label>
                <Form.Select>
                  <option>Phòng đơn</option>
                  <option>Phòng đôi</option>
                  <option>Phòng giường đôi/ 2 giường đơn</option>
                  <option>Phòng gia đình</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">
                  Quý vị có bao nhiêu phòng loại này?
                </Form.Label>
                <InputGroup style={{ maxWidth: "150px" }}>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setRoomCount(Math.max(1, roomCount - 1))}
                  >
                    -
                  </Button>
                  <Form.Control
                    type="number"
                    min="1"
                    value={roomCount}
                    onChange={(e) =>
                      setRoomCount(parseInt(e.target.value) || 1)
                    }
                    className="text-center"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setRoomCount(roomCount + 1)}
                  >
                    +
                  </Button>
                </InputGroup>
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Bed Types Section */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Form.Label className="fw-medium mb-3">
                Có loại giường nào trong phòng này?
              </Form.Label>

              {/* Single Bed */}
              <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                <div className="d-flex align-items-center">
                  <span className="me-3 fs-5">🛏️</span>
                  <div>
                    <p className="mb-0 fw-medium">Giường đơn</p>
                    <p className="mb-0 text-muted small">Rộng 90 - 130 cm</p>
                  </div>
                </div>
                <InputGroup style={{ width: "120px" }}>
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      handleBedCountChange(
                        "singleBed",
                        Math.max(0, bedCount.singleBed - 1)
                      )
                    }
                  >
                    -
                  </Button>
                  <Form.Control
                    value={bedCount.singleBed}
                    readOnly
                    className="text-center"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      handleBedCountChange("singleBed", bedCount.singleBed + 1)
                    }
                  >
                    +
                  </Button>
                </InputGroup>
              </div>

              {/* Double Bed */}
              <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                <div className="d-flex align-items-center">
                  <span className="me-3 fs-5">🛏️</span>
                  <div>
                    <p className="mb-0 fw-medium">Giường đôi</p>
                    <p className="mb-0 text-muted small">Rộng 131 - 150 cm</p>
                  </div>
                </div>
                <InputGroup style={{ width: "120px" }}>
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      handleBedCountChange(
                        "doubleBed",
                        Math.max(0, bedCount.doubleBed - 1)
                      )
                    }
                  >
                    -
                  </Button>
                  <Form.Control
                    value={bedCount.doubleBed}
                    readOnly
                    className="text-center"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      handleBedCountChange("doubleBed", bedCount.doubleBed + 1)
                    }
                  >
                    +
                  </Button>
                </InputGroup>
              </div>

              {/* King Bed */}
              <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                <div className="d-flex align-items-center">
                  <span className="me-3 fs-5">🛏️</span>
                  <div>
                    <p className="mb-0 fw-medium">Giường lớn (cỡ King)</p>
                    <p className="mb-0 text-muted small">Rộng 151 - 180 cm</p>
                  </div>
                </div>
                <InputGroup style={{ width: "120px" }}>
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      handleBedCountChange(
                        "kingBed",
                        Math.max(0, bedCount.kingBed - 1)
                      )
                    }
                  >
                    -
                  </Button>
                  <Form.Control
                    value={bedCount.kingBed}
                    readOnly
                    className="text-center"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      handleBedCountChange("kingBed", bedCount.kingBed + 1)
                    }
                  >
                    +
                  </Button>
                </InputGroup>
              </div>

              {/* Super King Bed */}
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="me-3 fs-5">🛏️</span>
                  <div>
                    <p className="mb-0 fw-medium">
                      Giường rất lớn (cỡ Super King)
                    </p>
                    <p className="mb-0 text-muted small">Rộng 181 - 210 cm</p>
                  </div>
                </div>
                <InputGroup style={{ width: "120px" }}>
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      handleBedCountChange(
                        "superKingBed",
                        Math.max(0, bedCount.superKingBed - 1)
                      )
                    }
                  >
                    -
                  </Button>
                  <Form.Control
                    value={bedCount.superKingBed}
                    readOnly
                    className="text-center"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      handleBedCountChange(
                        "superKingBed",
                        bedCount.superKingBed + 1
                      )
                    }
                  >
                    +
                  </Button>
                </InputGroup>
              </div>
            </Card.Body>
          </Card>

          {/* Room Size Section */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Form.Label className="fw-medium mb-3">
                Phòng này rộng bao nhiêu?
              </Form.Label>
              <Row>
                <Col>
                  <Form.Label>Diện tích phòng - không kể toilet</Form.Label>
                  <Form.Select>
                    <option>Chọn diện tích</option>
                    <option>Dưới 10 m²</option>
                    <option>10 - 15 m²</option>
                    <option>15 - 20 m²</option>
                    <option>20 - 30 m²</option>
                    <option>Trên 30 m²</option>
                  </Form.Select>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Guest Capacity Section */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Form.Label className="fw-medium mb-3">
                Bao nhiêu khách có thể nghỉ ở phòng này?
              </Form.Label>
              <InputGroup style={{ maxWidth: "150px" }}>
                <Button
                  variant="outline-secondary"
                  onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                >
                  -
                </Button>
                <Form.Control
                  value={guestCount}
                  readOnly
                  className="text-center"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setGuestCount(guestCount + 1)}
                >
                  +
                </Button>
              </InputGroup>
            </Card.Body>
          </Card>

          {/* Room Name Section */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Tên của phòng này là gì?</h5>
              <div className="bg-light p-3 rounded mb-3">
                <p className="mb-0">
                  Đây là tên mà khách sẽ thấy trên trang chỗ nghỉ của Quý vị.
                  Hãy chọn tên miêu tả phòng này chính xác nhất.
                </p>
              </div>

              <Form.Group>
                <Form.Label>Tên phòng</Form.Label>
                <Form.Select>
                  <option>Phòng Standard</option>
                  <option>Phòng Family</option>
                  <option>Phòng Deluxe</option>
                  <option>Phòng Suite</option>
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Pricing Section */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Quý vị muốn thu bao nhiêu tiền mỗi đêm?</h5>
              <Form.Group className="mb-3">
                <Form.Label>Số tiền khách trả</Form.Label>
                <InputGroup>
                  <InputGroup.Text>VND</InputGroup.Text>
                  <Form.Control type="text" value="120.000" />
                </InputGroup>
                <Form.Text className="text-muted">
                  Bao gồm các loại thuế, phí và hoa hồng
                </Form.Text>
              </Form.Group>

              <div className="bg-light p-2 rounded mb-3">
                <span>15,00% Hoa hồng cho Booking.com</span>
              </div>

              <div className="mb-3">
                <div className="d-flex align-items-start mb-2">
                  <span className="text-success me-2">✓</span>
                  <span>Trợ giúp 24/7 bằng ngôn ngữ của Quý vị</span>
                </div>
                <div className="d-flex align-items-start mb-2">
                  <span className="text-success me-2">✓</span>
                  <span>
                    Tiết kiệm thời gian với đặt phòng được xác nhận tự động
                  </span>
                </div>
                <div className="d-flex align-items-start">
                  <span className="text-success me-2">✓</span>
                  <span>
                    Chúng tôi sẽ quảng bá chỗ nghỉ của Quý vị trên Google
                  </span>
                </div>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center">
                <strong className="fs-5">VND 105.000</strong>
                <span className="text-muted">
                  Doanh thu của Quý vị (bao gồm thuế)
                </span>
              </div>
            </Card.Body>
          </Card>

          {/* Room Images Section */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Hình ảnh về phòng</h5>
              <Form.Group>
                <Form.Label>Hình ảnh phòng (Bắt buộc 5 ảnh)</Form.Label>
                <Form.Control type="file" multiple accept="image/*" />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Action Buttons */}
          <Row className="mt-4">
            <Col xs={6}>
              <Button variant="outline-danger" className="w-100 py-2">
                Hủy bỏ
              </Button>
            </Col>
            <Col xs={6}>
              <Button variant="primary" className="w-100 py-2">
                Tiếp tục
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </Modal>
  );
}

export default Room;
