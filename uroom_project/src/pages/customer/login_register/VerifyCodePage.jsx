import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import * as Routers from "../../../utils/Routes";

const VerifyCodePage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        backgroundImage: 'url(https://cdn1.123job.vn/123job/uploads/2020/03/26/2020_03_26______460d841b279b2a6a56b4ce8e7f2f1e40.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
        <Button 
          variant="light" 
          className="position-absolute start-0 top-0 rounded-pill d-flex align-items-center ms-3 mt-3" 
          style={{ zIndex: 100 }}
        >
          <FaArrowLeft className="me-2" /> Back
        </Button>
      <Container className="position-relative">
       
        
        <Card className="mx-auto shadow" style={{ maxWidth: '800px' }}>
          <Card.Body className="p-4 p-md-5">
            <h2 className="text-center mb-2">Verify Code</h2>
            <div className="text-center">
                <span className="text-muted">The code is sent to your email</span><br/>
                <span className="text-muted">Please check your email to receive the code</span>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label style={{fontWeight: 500}}>Verification Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="py-2"
                />
              </Form.Group>
                <div className="text-center">
                    <span className="text-muted">Didn’t receive the code? </span>
                    <a href="" className="text-decoration-none">Resend code</a>
                </div>
            <Button 
                variant="primary" 
                type="submit" 
                className="w-100 py-2 mt-2"
                href={Routers.ResetPasswordPage}
            >
                Reset Password
            </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default VerifyCodePage;
