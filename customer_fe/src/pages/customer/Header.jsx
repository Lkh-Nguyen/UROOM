import {
  Container,
  Navbar,
  Nav,
  Button,
  Image,
  Dropdown,
} from "react-bootstrap"; // ✅ Thêm Dropdown
import "../../css/customer/NavigationBar.css";
import * as Routers from "../../utils/Routes";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import image from "../../images/image-removebg-preview.png";
function NavigationBar({ header = 1 }) {
  // ✅ Nhận `header` từ props (hoặc có thể setState)
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Danh sách thông báo mẫu
  const notifications = [
    "Bạn có 1 tin nhắn mới",
    "Cập nhật hệ thống vào 10h tối nay",
    "Khách hàng vừa đặt hàng mới",
  ];
  // Lắng nghe sự kiện cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      expand="lg"
      className={`fixed-top ${scrolled ? "navbar-scrolled" : "navbar-dark"}`}
      style={{
        backgroundColor: scrolled ? "rgba(26, 43, 73, 0.9)" : "transparent",
        transition: "background-color 0.3s ease",
      }}
    >
      <Container>
        {/* <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate(Routers.Home)}
          className="brand"
        >
          UR<span style={{ color: "#f8e71c" }}>OO</span>M
        </Navbar.Brand> */}
         <Image
                  src={image}
                  
                  width="100"
                  height="28"
                  className="ms-2 me-2"
                />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link
              className="nav-link"
              onClick={() => navigate(Routers.Home)}
            >
              Home
            </Nav.Link>
            <Nav.Link
              className="nav-link"
              onClick={() => navigate(Routers.ErrorPage)}
            >
              About
            </Nav.Link>
            <Nav.Link
              className="nav-link"
              onClick={() =>
                navigate(Routers.MyAccountPage, { state: { id: 3 } })
              }
            >
              Transaction
            </Nav.Link>
            <Nav.Link
              className="nav-link"
              onClick={() =>
                navigate(Routers.MyAccountPage, { state: { id: 5 } })
              }
            >
              My Feedback
            </Nav.Link>
            <Nav.Link
              className="nav-link"
              onClick={() =>
                navigate(Routers.MyAccountPage, { state: { id: 4 } })
              }
            >
              Favorite hotels
            </Nav.Link>
          </Nav>

          <Dropdown style={{ marginRight: "10px" }}>
            <Dropdown.Toggle
              style={{
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
              }}
            >
              <FaBell style={{ color: "white" }} />{" "}
              {/* Đổi màu chuông nếu cần */}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>You have a new message</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>System update at 10pm tonight</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => navigate(Routers.ChatPage, { state: { id: 0 } })}
              >
                You have a new message
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {header === 1 ? ( // ✅ Sửa header == 1 thành header === 1
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="light"
                className="login-btn d-flex align-items-center"
              >
                Lê Kim Hoàng Nguyên
                <Image
                  src="https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-3.jpg"
                  roundedCircle
                  width="30"
                  height="30"
                  className="ms-2 me-2"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    navigate(Routers.MyAccountPage, { state: { id: 0 } })
                  }
                >
                  View Information
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    console.log("User logged out");
                    navigate(Routers.HomeNotLogin);
                  }}
                >
                  Login
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div className="d-flex gap-3">
              <Button
                className="px-4 py-2 fw-bold"
                style={{
                  borderRadius: 8,
                  backgroundColor: "white",
                  color: "#2E9AED",
                }}
                onClick={() => navigate(Routers.LoginPage)}
              >
                Login
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
