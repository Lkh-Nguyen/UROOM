import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Card, Form, Button } from "react-bootstrap";

function ViewAvatar() {
  // State để điều khiển modal
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // State lưu ảnh upload
  const [selectedImage, setSelectedImage] = useState("https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg");

  // Xử lý mở modal
  const handleOpenModal = () => setShowAvatarModal(true);
  const handleCloseModal = () => setShowAvatarModal(false);

  // Xử lý chọn file ảnh
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <Card.Body>
      <h2 className="fw-bold mb-4">View Avatar</h2>
      <div className="text-center">
        <img
          src={selectedImage}
          className="rounded-circle mb-2"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
          alt="avatar"
        />
        <br />
        <Button
          className="fw-bold mb-4"
          variant="outline-primary"
          onClick={handleOpenModal}
        >View Avatar</Button>
      </div>
      <p className="text-center text-muted">
        Maximum file size is 1 MB<br />Format JPEG, PNG, JPG, ...
      </p>
      <Form>
        <Form.Group controlId="formFile" className="mb-3 text-center">
          <Form.Control
            type="file"
            className="d-inline-block w-auto"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg"
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="danger" className="me-2">CANCEL</Button>
          <Button variant="primary">Upload</Button>
        </div>
      </Form>

      {/* Avatar Modal */}
      <Modal show={showAvatarModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Customer Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-4">
          <img
            src={selectedImage}
            alt="Customer avatar"
            className="img-fluid"
            style={{ maxHeight: "70vh" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card.Body>
  );
}

export default ViewAvatar;


