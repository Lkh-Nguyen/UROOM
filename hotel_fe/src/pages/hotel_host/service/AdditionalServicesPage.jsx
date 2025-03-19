import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Modal,
  Table,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AdditionalServicesPage() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Bữa sáng",
      description: "Bữa sáng phong phú với nhiều món ăn Việt Nam và quốc tế",
      price: 250000,
      type: "per_person",
      availability: "daily",
      timeSlots: ["06:00 - 10:00"],
      options: ["Buffet", "Phục vụ tại phòng"],
      active: true,
    },
    {
      id: 2,
      name: "Buffet tối",
      description: "Buffet tối với hơn 50 món ăn và đồ uống không giới hạn",
      price: 450000,
      type: "per_person",
      availability: "daily",
      timeSlots: ["18:00 - 22:00"],
      options: ["Buffet"],
      active: true,
    },
    {
      id: 3,
      name: "Đưa đón sân bay",
      description: "Dịch vụ đưa đón sân bay bằng xe sang trọng",
      price: 350000,
      type: "per_booking",
      availability: "on_request",
      timeSlots: [],
      options: ["Xe 4 chỗ", "Xe 7 chỗ"],
      active: true,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState({
    name: "",
    description: "",
    price: "",
    type: "per_person",
    availability: "daily",
    timeSlots: [""],
    options: [""],
    active: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
  };

  const handleShowModal = () => {
    setCurrentService({
      name: "",
      description: "",
      price: "",
      type: "per_person",
      availability: "daily",
      timeSlots: [""],
      options: [""],
      active: true,
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditService = (service) => {
    setCurrentService({ ...service });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const handleToggleActive = (id) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, active: !service.active } : service
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentService({ ...currentService, [name]: value });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCurrentService({ ...currentService, price: value });
  };

  const handleTimeSlotChange = (index, value) => {
    const newTimeSlots = [...currentService.timeSlots];
    newTimeSlots[index] = value;
    setCurrentService({...currentService, timeSlots: newTimeSlots});
  };

  const addTimeSlot = () => {
    setCurrentService({
      ...currentService,
      timeSlots: [...currentService.timeSlots, ""],
    });
  };

  const removeTimeSlot = (index) => {
    const newTimeSlots = [...currentService.timeSlots];
    newTimeSlots.splice(index, 1);
    setCurrentService({ ...currentService, timeSlots: newTimeSlots });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentService.options];
    newOptions[index] = value;
    setCurrentService({ ...currentService, options: newOptions });
  };

  const addOption = () => {
    setCurrentService({
      ...currentService,
      options: [...currentService.options, ""],
    });
  };

  const removeOption = (index) => {
    const newOptions = [...currentService.options];
    newOptions.splice(index, 1);
    setCurrentService({ ...currentService, options: newOptions });
  };

  const handleSubmit = () => {
    if (isEditing) {
      setServices(
        services.map((service) =>
          service.id === currentService.id ? currentService : service
        )
      );
    } else {
      const newService = {
        ...currentService,
        id:
          services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1,
        price: parseInt(currentService.price) || 0,
      };
      setServices([...services, newService]);
    }
    handleCloseModal();
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getTypeLabel = (type) => {
    return type === "per_person" ? "Theo người" : "Theo đặt phòng";
  };

  const getAvailabilityLabel = (availability) => {
    switch (availability) {
      case "daily":
        return "Hàng ngày";
      case "weekdays":
        return "Ngày trong tuần";
      case "weekends":
        return "Cuối tuần";
      case "on_request":
        return "Theo yêu cầu";
      default:
        return "";
    }
  };

  return (
        <div className="main-content_1 p-3">
          <div style={styles.header}>
            <h1 style={styles.title}>Dịch Vụ Đi Kèm</h1>
            <Button style={styles.addButton} onClick={handleShowModal}>
              + Thêm Dịch Vụ Mới
            </Button>
          </div>

          {services.length === 0 ? (
            <div style={styles.emptyState}>
              <h3>Không có dịch vụ nào</h3>
              <p>Hãy thêm dịch vụ mới để tăng doanh thu của bạn</p>
            </div>
          ) : (
            <Row>
              {services.map((service) => (
                <Col key={service.id} xs={4} md={4} lg={4}>
                  <Card
                    style={styles.serviceCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 16px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow =
                        "0 2px 8px rgba(0,0,0,0.1)";
                    }}
                  >
                    <div style={styles.serviceHeader}>
                      <h3 style={styles.serviceName}>
                        {service.name}
                        <Button
                          variant={service.active ? "success" : "danger"}
                          style={{marginLeft: '10px'}}
                        >
                          {service.active ? "Đang hoạt động" : "Đã tắt"}
                        </Button>
                      </h3>
                      <div style={styles.servicePrice}>
                        VND {formatPrice(service.price)}
                      </div>
                    </div>

                    <div style={styles.serviceDetails}>
                      <p>{service.description}</p>

                      <Table borderless style={styles.detailsTable}>
                        <tbody>
                          <tr>
                            <td style={styles.tableCell}>
                              <strong>Loại tính phí:</strong>
                            </td>
                            <td style={styles.tableCell}>
                              {getTypeLabel(service.type)}
                            </td>
                          </tr>
                          <tr>
                            <td style={styles.tableCell}>
                              <strong>Khả dụng:</strong>
                            </td>
                            <td style={styles.tableCell}>
                              {getAvailabilityLabel(service.availability)}
                            </td>
                          </tr>
                          {service.timeSlots.length > 0 && (
                            <tr>
                              <td style={styles.tableCell}>
                                <strong>Thời gian:</strong>
                              </td>
                              <td style={styles.tableCell}>
                                {service.timeSlots.join(", ")}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>

                      {service.options.length > 0 && (
                        <div>
                          <strong>Tùy chọn:</strong>
                          <div style={styles.optionsList}>
                            {service.options.map((option, index) => (
                              <Button 
                                variant="dark"
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={styles.actionButtons}>
                      <Button
                        variant="outline-secondary"
                        style={{
                          ...styles.toggleButton,
                          ...(service.active
                            ? styles.activeToggle
                            : styles.inactiveToggle),
                        }}
                        onClick={() => handleToggleActive(service.id)}
                      >
                        {service.active ? "Tắt" : "Bật"}
                      </Button>
                      <Button
                        variant="outline-danger"
                        style={styles.deleteButton}
                        onClick={() => handleDeleteService(service.id)}
                      >
                        Xóa
                      </Button>
                      <Button
                        style={styles.editButton}
                        onClick={() => handleEditService(service)}
                      >
                        Chỉnh sửa
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          {/* Modal for adding/editing services */}
          <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title style={styles.modalTitle}>
                {isEditing ? "Chỉnh Sửa Dịch Vụ" : "Thêm Dịch Vụ Mới"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group style={styles.formGroup}>
                  <Form.Label style={styles.formLabel}>Tên dịch vụ</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={currentService.name}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: Bữa sáng, Buffet tối, Spa..."
                  />
                </Form.Group>

                <Form.Group style={styles.formGroup}>
                  <Form.Label style={styles.formLabel}>Mô tả</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={currentService.description}
                    onChange={handleInputChange}
                    placeholder="Mô tả chi tiết về dịch vụ"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group style={styles.formGroup}>
                      <Form.Label style={styles.formLabel}>
                        Giá (VND)
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text>VND</InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="price"
                          value={currentService.price}
                          onChange={handlePriceChange}
                          placeholder="Ví dụ: 250000"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group style={styles.formGroup}>
                      <Form.Label style={styles.formLabel}>
                        Loại tính phí
                      </Form.Label>
                      <Form.Select
                        name="type"
                        value={currentService.type}
                        onChange={handleInputChange}
                      >
                        <option value="per_person">Theo người</option>
                        <option value="per_booking">Theo đặt phòng</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group style={styles.formGroup}>
                  <Form.Label style={styles.formLabel}>Khả dụng</Form.Label>
                  <Form.Select
                    name="availability"
                    value={currentService.availability}
                    onChange={handleInputChange}
                  >
                    <option value="daily">Hàng ngày</option>
                    <option value="weekdays">Ngày trong tuần</option>
                    <option value="weekends">Cuối tuần</option>
                    <option value="on_request">Theo yêu cầu</option>
                  </Form.Select>
                </Form.Group>

                {currentService.availability !== "on_request" && (
                  <Form.Group style={styles.formGroup}>
                    <Form.Label style={styles.formLabel}>Thời gian</Form.Label>
                    {currentService.timeSlots.map((timeSlot, index) => (
                      <div key={index} style={styles.timeSlotRow}>
                        <Form.Control
                          type="text"
                          value={timeSlot}
                          onChange={(e) =>
                            handleTimeSlotChange(index, e.target.value)
                          }
                          placeholder="Ví dụ: 06:00 - 10:00"
                        />
                        {currentService.timeSlots.length > 1 && (
                          <button
                            type="button"
                            style={styles.removeButton}
                            onClick={() => removeTimeSlot(index)}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      style={styles.addButton2}
                      onClick={addTimeSlot}
                    >
                      + <span style={styles.addButtonText}>Thêm khung giờ</span>
                    </button>
                  </Form.Group>
                )}

                <Form.Group style={styles.formGroup}>
                  <Form.Label style={styles.formLabel}>Tùy chọn</Form.Label>
                  {currentService.options.map((option, index) => (
                    <div key={index} style={styles.timeSlotRow}>
                      <Form.Control
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        placeholder="Ví dụ: Buffet, Phục vụ tại phòng..."
                      />
                      {currentService.options.length > 1 && (
                        <button
                          type="button"
                          style={styles.removeButton}
                          onClick={() => removeOption(index)}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    style={styles.addButton2}
                    onClick={addOption}
                  >
                    + <span style={styles.addButtonText}>Thêm tùy chọn</span>
                  </button>
                </Form.Group>

                <Form.Group style={styles.formGroup}>
                  <Form.Check
                    type="checkbox"
                    id="active-checkbox"
                    label="Kích hoạt dịch vụ này"
                    checked={currentService.active}
                    onChange={(e) =>
                      setCurrentService({
                        ...currentService,
                        active: e.target.checked,
                      })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Hủy
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                style={styles.editButton}
              >
                {isEditing ? "Lưu Thay Đổi" : "Thêm Dịch Vụ"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "30px auto",
    padding: "0 15px",
  },
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
    backgroundColor: "#0071c2",
    border: "none",
  },
  serviceCard: {
    marginBottom: "20px",
    border: "none",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    overflow: "hidden",
  },
  serviceHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    borderBottom: "1px solid #f0f0f0",
    backgroundColor: "#f9f9f9",
  },
  serviceName: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: 0,
    display: "flex",
    alignItems: "center",
  },
  servicePrice: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#0071c2",
  },
  serviceDetails: {
    padding: "15px 20px",
  },
  detailsTable: {
    marginBottom: "15px",
  },
  tableCell: {
    padding: "8px 0",
    borderColor: "#f0f0f0",
  },
  optionsList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "10px",
  },
  optionBadge: {
    backgroundColor: "#e6f2ff",
    color: "#0071c2",
    fontWeight: "normal",
    padding: "6px 12px",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    padding: "10px 20px",
    borderTop: "1px solid #f0f0f0",
  },
  editButton: {
    backgroundColor: "#0071c2",
    border: "none",
  },
  deleteButton: {
    backgroundColor: "white",
    color: "#e74c3c",
    border: "1px solid #e74c3c",
  },
  toggleButton: {
    backgroundColor: "white",
    border: "1px solid #6c757d",
  },
  activeToggle: {
    color: "#28a745",
    border: "1px solid #28a745",
  },
  inactiveToggle: {
    color: "#6c757d",
  },
  statusBadge: {
    marginLeft: "10px",
    fontSize: "12px",
    padding: "4px 8px",
  },
  activeStatus: {
    backgroundColor: "#d4edda",
    color: "#155724",
  },
  inactiveStatus: {
    backgroundColor: "#f8f9fa",
    color: "#6c757d",
  },
  modalTitle: {
    color: "#0071c2",
  },
  formGroup: {
    marginBottom: "20px",
  },
  formLabel: {
    fontWeight: "bold",
  },
  timeSlotRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  removeButton: {
    marginLeft: "10px",
    color: "#e74c3c",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    padding: "0 5px",
  },
  addButton2: {
    color: "#0071c2",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
    display: "flex",
    alignItems: "center",
  },
  addButtonText: {
    marginLeft: "5px",
  },
  emptyState: {
    textAlign: "center",
    padding: "50px 0",
    color: "#6b6b6b",
  },
};

export default AdditionalServicesPage;
