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
import { useAppSelector } from "../../../../redux/store";
import Utils from "utils/Utils";

const ViewInformation = () => {
  const Auth = useAppSelector((state) => state.Auth.Auth);

  const [formData, setFormData] = useState(Auth);
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
    setFormData(Auth); // Reset form về giá trị ban đầu
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
                name="name"
                value={formData.name}
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
                  id="MALE"
                  value="MALE"
                  checked={formData.gender === "MALE"}
                  onChange={handleInputChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Female"
                  name="gender"
                  id="FEMALE"
                  value="FEMALE"
                  checked={formData.gender === "FEMALE"}
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
                  name="birthDate"
                  value={formData.birthDate ? Utils.getDate(formData.birthDate,3) : ""}
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
                name="phoneNumber"
                value={formData.phoneNumber}
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
                disabled
                style={{backgroundColor: 'white'}}
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
