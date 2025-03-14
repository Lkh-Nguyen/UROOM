import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import * as Routers from "../../../utils/Routes";
import { useNavigate } from "react-router-dom";
import Banner from '../../../images/banner.jpg';

const RegisterPage = () => {
  const navigate = useNavigate();
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
        backgroundImage: `url(${Banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Container className="position-relative">
       
        
        <Card className="mx-auto shadow" style={{ maxWidth: '800px' }}>
          <Card.Body className="p-4 p-md-5">
            <h2 className="text-center mb-4">Register Account</h2>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label style={{fontWeight: 500}}>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="py-2"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label style={{fontWeight: 500}}>Phone </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="py-2"
                />
              </Form.Group>
              
              <Form.Group className="mb-4">
                <Form.Label style={{fontWeight: 500}}>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="py-2"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{fontWeight: 500}}>Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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

              <Button 
                variant="outline-success" 
                className="w-100 mb-3 py-2 d-flex align-items-center justify-content-center"
              >
                <img 
                  src="https://cdn.pixabay.com/photo/2016/04/13/14/27/google-chrome-1326908_640.png" 
                  alt="Google" 
                  style={{ width: '20px', marginRight: '10px' }} 
                />
                Continue with Google
              </Button>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 py-2 mb-4"
                onClick={()=> {
                  navigate(Routers.Home)
                }}
              >
                Register Account
              </Button>

              <div className="text-center">
                <span className="text-muted">You have a account? </span>
                <a href={Routers.LoginPage} className="text-decoration-none">Sign in here</a>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterPage;
