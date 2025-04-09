import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Card } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import * as Routers from "../../../utils/Routes";
import Banner from "../../../images/banner.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthActions from "../../../redux/auth/actions";
import { showToast, ToastProvider } from "components/ToastContainer";
import { clearToken, clearUser } from "utils/handleToken";
import Utils from "utils/Utils";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "cus1@gm.com",
    password: "12345678",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}$/; // tối thiểu 6 ký tự
    if (!formData.email || !formData.password) {
      showToast.warning("Email and password is required. Please fill in completely !");
    } else if (!emailRegex.test(formData.email)) {
      showToast.warning("Invalid email format. Enter email again !!!");
    } else if (!passwordRegex.test(formData.password)) {
      showToast.warning("Password must be at least 8 characters.  Enter password again !!!");
    } else {
      dispatch({
        type: AuthActions.LOGIN,
        payload: {
          data: { email: formData.email, password: formData.password },
          onSuccess: (user) => {
            console.log('user: ', user)
            if (user.isLocked) {
              navigate(Routers.BannedPage, {
                state: {
                  reasonLocked: user.reasonLocked,
                  dateLocked: Utils.getDate(user.dateLocked, 4)
                },
              });
              dispatch({ type: AuthActions.LOGOUT });
              clearToken();
              clearUser();
            } else {
              navigate(Routers.Home, {
                state: { message: "Login account successfully!" },
              });
            }
          },
          onFailed: (msg) => {
            showToast.warning(msg);
            setFormData({ ...formData, password: "" });
          },
          onError: (error) => {
            showToast.error(error);
          },
        },
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        backgroundImage: `url(${Banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container className="position-relative">
        <ToastProvider />
        <Card className="mx-auto shadow" style={{ maxWidth: "800px" }}>
          <Card.Body className="p-4 p-md-5">
            <h2 className="text-center mb-4">Login Account</h2>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: 500 }}>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="py-2"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 500 }}>Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="py-2"
                    required
                  />
                  <Button
                    variant="link"
                    className="position-absolute text-decoration-none text-muted h-100 d-flex align-items-center pe-3"
                    style={{ right: 0, top: 0 }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>

              <div className="d-flex justify-content-between mb-4">
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="text-muted"
                />
                <a
                  href={Routers.ForgetPasswordPage}
                  className="text-decoration-none"
                >
                  Forgot Password?
                </a>
              </div>

              <Button
                variant="outline-success"
                className="w-100 mb-3 py-2 d-flex align-items-center justify-content-center"
              >
                <img
                  src="https://cdn.pixabay.com/photo/2016/04/13/14/27/google-chrome-1326908_640.png"
                  alt="Google"
                  style={{ width: "20px", marginRight: "10px" }}
                />
                Continue with Google
              </Button>

              <Button
                variant="primary"
                type="submit"
                className="w-100 py-2 mb-4"
                onClick={handleSubmit}
              >
                Login Account
              </Button>

              <div className="text-center">
                <span className="text-muted">Not a member? </span>
                <a href={Routers.RegisterPage} className="text-decoration-none">
                  Register now
                </a>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;
