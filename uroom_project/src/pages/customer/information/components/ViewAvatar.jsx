import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCog, FaLock, FaUser, FaHistory, FaHeart, FaPen } from "react-icons/fa";
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function ViewAvatar() {
    return (
      <Card.Body>
        <h2 className="fw-bold mb-4">View Avatar</h2>
        <div className="text-center">
          <img
            src="https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"
            className="rounded-circle mb-2"
            style={{width: '150px', height: '150px'}}
            alt="avatar"
          /><br/>
          <Button className="fw-bold mb-4" variant="outline-primary">View Avatar</Button>
        </div>
        <p className="text-center text-muted">Maximum file size in 1 MB<br />Format JPEG, PNG, JPG, ...</p>
        <Form>
          <Form.Group controlId="formFile" className="mb-3 text-center">
            <Form.Control type="file" className="d-inline-block w-auto" />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="danger" className="me-2">CANCEL</Button>
            <Button variant="primary">Upload</Button>
          </div>
        </Form>
      </Card.Body>
    );
  }

export default ViewAvatar;