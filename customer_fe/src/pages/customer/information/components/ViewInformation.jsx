import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import React, { useState } from "react";
import ConfirmationModal from "components/ConfirmationModal";
import { showToast, ToastProvider } from "components/ToastContainer";

const ViewInformation = () => {
  const initialFormData = {
    fullName: "Le Kim Hoang Nguyen",
    gender: "male",
    birthdate: "01/01/1999",
    cmnd: "402116290302",
    phone: "0905123983",
    email: "0934726073",
    address:
      "650/7 Trần Cao Vân, phường Xuân Hà, quận Thanh Khê, thành phố Đà Nẵng, Việt Nam.",
  };

  const [formData, setFormData] = useState(initialFormData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleCancel = () => {
    console.log("Item Cancel!");
    setFormData(initialFormData); // Reset form về giá trị ban đầu
  };

  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const handleSave = () => {
    console.log("Item Update!");
    showToast.success("Update Information Successfully!")
  };
  return (
    <Card.Body>
      <h2 className="fw-bold mb-4">View Information</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name in here"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Male"
                  name="gender"
                  id="male"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleInputChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Female"
                  name="gender"
                  id="female"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleInputChange}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Birthdate</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="DD/MM/YYYY"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                />
                <InputGroup.Text>
                  <FaCalendarAlt />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>CMND</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your CMND in here"
                name="cmnd"
                value={formData.cmnd}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Number phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your number phone in here"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your number email in here"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your address in here"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button
            variant="danger"
            className="me-2"
            style={{ width: "100px" }}
            onClick={() => {
              setShowUpdateModal(true);
            }}
          >
            CANCEL
          </Button>
          <Button
            variant="primary"
            type="submit"
            style={{ width: "100px" }}
            onClick={() => {
              setShowAcceptModal(true);
            }}
          >
            SAVE
          </Button>
        </div>
      </Form>

      {/* Update Confirmation Modal */}
      <ConfirmationModal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        onConfirm={handleCancel}
        title="Confirm Cancel"
        message="Are you sure you want to reset this information ?"
        confirmButtonText="Confirm"
        type="warning"
      />

      {/* Accept Confirmation Modal */}
      <ConfirmationModal
        show={showAcceptModal}
        onHide={() => setShowAcceptModal(false)}
        onConfirm={handleSave}
        title="Confirm Update"
        message="Are you sure you want to update this new information"
        confirmButtonText="Accept"
        type="accept"
      />
      <ToastProvider/>
    </Card.Body>
  );
};

export default ViewInformation;
