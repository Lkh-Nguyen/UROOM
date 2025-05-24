import React, { useEffect, useState } from "react";
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
import { showToast } from "@components/ToastContainer";
import { useAppSelector } from "../../../redux/store";
import { useDispatch } from "react-redux";
import HotelActions from "../../../redux/hotel/actions";
import HotelservicesActions from "../../../redux/Hotelservices/actions";

function AdditionalServicesPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const Auth = useAppSelector((state) => state.Auth.Auth);
  const [showModal, setShowModal] = useState(false);
  const [hotelinfo, setHotelinfo] = useState(null);
  console.log("hotel: ", hotelinfo);
  const [currentService, setCurrentService] = useState({
    name: "",
    description: "",
    price: "",
    type: "per_person",
    availability: "daily",
    active: true,
  });
  console.log("formData._id có giá trị:", Auth._id);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log("formData._id có giá trị 2:", Auth._id);
    fetchHotelInfo();
  }, []);

  const fetchHotelInfo = () => {
    setLoading(true);

    dispatch({
      type: HotelActions.FETCH_OWNER_HOTEL,
      payload: {
        userId: Auth._id,
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
  const handleEditService = (service) => {
    setCurrentService({
      ...service,
      price: formatPrice(service.price),
      timeSlots: service.timeSlots || [],
      options: service.options || [],
    });
    setIsEditing(true);
    setShowModal(true);
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCurrentService({ ...currentService, [name]: value });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCurrentService({ ...currentService, price: value });
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmitService = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
  
    const payload = {
      ...currentService,
      price: Number(currentService.price.toString().replace(/\D/g, "")),
    };
  
    const onSuccess = (data) => {
      alert("Thao tác thành công!");
      setIsSubmitting(false);
      window.location.reload();
      handleCloseModal();
    };
  
    const onFailed = (message) => {
      // alert(`Lỗi: ${message}`);
      setIsSubmitting(false);
    };
  
    const onError = (error) => {
      console.error("Lỗi hệ thống:", error);
      alert("Lỗi hệ thống. Vui lòng thử lại sau.");
      setIsSubmitting(false);
    };
  
    if (isEditing) {
      dispatch({
        type: HotelservicesActions.UPDATE_HOTEL_SERVICE,
        payload: {
          serviceId: currentService._id,
          updateData: payload,
          onSuccess,
          onFailed,
          onError,
        },
      });
    } else {
      dispatch({
        type: HotelActions.CREATE_HOTEL_SERVICE,
        payload: {
          serviceData: {
            hotelId: hotelinfo[0]?._id,
            ...payload,
          },
          onSuccess,
          onFailed,
          onError,
        },
      });
    }
  };

  const handleToggleStatus = (service) => {
    const newStatus =
      service.statusActive === "ACTIVE" ? "NONACTIVE" : "ACTIVE";

    console.log("newStatus: ", newStatus);
    console.log("service: ", service);

    dispatch({
      type: HotelActions.UPDATE_HOTEL_SERVICE_STATUS,
      payload: {
        hotelId: hotelinfo[0]?._id,
        serviceId: service._id,
        statusActive: newStatus,
        onSuccess: () => {
          showToast.success("Cập nhật trạng thái thành công");
          window.location.reload();
        },
        onFailed: (msg) => {
          showToast.error("Cập nhật thất bại: " + msg);
        },
        onError: (err) => {
          showToast.error("Lỗi hệ thống:", err);
        },
      },
    });
  };

  return (
    <div className="main-content_1 p-3">
      <div style={styles.header}>
        <h1 style={styles.title}>Dịch Vụ Đi Kèm</h1>
        <Button style={styles.addButton} onClick={handleShowModal}>
          + Thêm Dịch Vụ Mới
        </Button>
      </div>

      {!hotelinfo ||
      hotelinfo.length === 0 ||
      !hotelinfo[0]?.services ||
      hotelinfo[0].services.length === 0 ? (
        <div style={styles.emptyState}>
          <h3>Không có dịch vụ nào</h3>
          <p>Hãy thêm dịch vụ mới để tăng doanh thu của bạn</p>
        </div>
      ) : (
        <Row>
          {hotelinfo[0].services.map((service, index) => (
            <Col key={index} xs={4} md={4} lg={4}>
              <Card
                style={styles.serviceCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                }}
              >
                <div style={styles.serviceHeader}>
                  <h3 style={styles.serviceName}>
                    {service.name}
                    <Form.Check
                      type="switch"
                      id={`status-switch-${service._id}`}
                      // label={
                      //   service.statusActive === "ACTIVE"
                      //     ? "Đang hoạt động"
                      //     : "Đã tắt"
                      // }
                      checked={service.statusActive === "ACTIVE"}
                      onChange={() => handleToggleStatus(service)}
                      style={{ marginLeft: "20px" }}
                    />
                  </h3>
                  <div style={styles.servicePrice}>
                    {formatPrice(service.price)} VND
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
                        <td style={styles.tableCell}>{service.type}</td>
                      </tr>
                    </tbody>
                  </Table>

                  {service.options?.map((option, index) => (
                    <Button key={index} variant="dark">
                      {option}
                    </Button>
                  ))}
                </div>

                <div style={styles.actionButtons}>
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

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Chỉnh Sửa Dịch Vụ" : "Thêm Dịch Vụ Mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Tên dịch vụ</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentService.name}
                onChange={handleInputChange}
                placeholder="Ví dụ: Bữa sáng, Buffet tối, Spa..."
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={currentService.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Giá (VND)</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={formatPrice(currentService.price)}
                onChange={handlePriceChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Loại tính phí</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formatPrice(currentService.type)}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Loại tính phí</Form.Label>
              <Form.Select
                name="type"
                value={currentService.type}
                onChange={handleInputChange}
              >
                <option value="per_person">Theo người</option>
                <option value="per_room">Theo đặt phòng</option>
              </Form.Select>
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Huỷ
          </Button>
          <Button variant="primary" onClick={handleSubmitService}>
            {isEditing ? "Lưu thay đổi" : "Thêm dịch vụ"}
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
