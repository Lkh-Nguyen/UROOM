import { 
    Container, 
    Row, 
    Col, 
    Card, 
    Form, 
    Button, 
    InputGroup 
} from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useState } from 'react';

const ChangePassword= () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        againNewPassword: '',
      });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission logic here
    };
    return (
        <Card.Body>
            <Card.Title className="mb-4">Change Password</Card.Title>
            <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: 500}}>Old Password</Form.Label>
                        <div className="position-relative">
                            <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your old password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="py-2"
                            />
                            <Button
                            variant="link"
                            className="position-absolute end-0 top-0 text-decoration-none text-muted h-100 d-flex align-items-center pe-3"
                            onClick={togglePasswordVisibility}
                            >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </div>
                        </Form.Group>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label style={{fontWeight: 500}}>New Password</Form.Label>
                    <div className="position-relative">
                        <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your new password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="py-2"
                        />
                        <Button
                        variant="link"
                        className="position-absolute end-0 top-0 text-decoration-none text-muted h-100 d-flex align-items-center pe-3"
                        onClick={togglePasswordVisibility}
                        >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                    </div>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: 500}}>Again New Password</Form.Label>
                        <div className="position-relative">
                            <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter again your new password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="py-2"
                            />
                            <Button
                            variant="link"
                            className="position-absolute end-0 top-0 text-decoration-none text-muted h-100 d-flex align-items-center pe-3"
                            onClick={togglePasswordVisibility}
                            >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </div>
                    </Form.Group>
                </Col>
            </Row>
            <div className="d-flex justify-content-end">
                <Button variant="danger" className="me-2" style={{width: '100px'}}>CANCEL</Button>
                <Button variant="primary" type="submit" style={{width: '100px'}}>SAVE</Button>
            </div>
            </Form>
        </Card.Body>
    );
}

export default ChangePassword