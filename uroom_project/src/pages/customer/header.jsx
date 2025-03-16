import { Container, Navbar, Nav, Button, Image, Dropdown } from "react-bootstrap"; // ✅ Thêm Dropdown
import "../../css/customer/NavigationBar.css";
import * as Routers from "../../utils/Routes";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function NavigationBar({ header = 1}) { // ✅ Nhận `header` từ props (hoặc có thể setState)
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

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
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate(Routers.Home)}
          className="brand"
        >
          UR<span style={{ color: "#f8e71c" }}>OO</span>M
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link className="nav-link" onClick={() => navigate(Routers.Home)}>
              Home
            </Nav.Link>
            <Nav.Link className="nav-link" onClick={() => navigate(Routers.ErrorPage)}>
              About
            </Nav.Link>
            <Nav.Link className="nav-link" onClick={() => navigate(Routers.MyAccountPage, { state: { id: 3 } })}>
              Transaction
            </Nav.Link>
            <Nav.Link className="nav-link" onClick={() => navigate(Routers.MyAccountPage, { state: { id: 5 } })}>
              My Feedback
            </Nav.Link>
            <Nav.Link className="nav-link" onClick={() => navigate(Routers.MyAccountPage, { state: { id: 4 } })}>
              Favorite hotels
            </Nav.Link>
          </Nav>
          {header === 1 ? ( // ✅ Sửa header == 1 thành header === 1
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" className="login-btn d-flex align-items-center">
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
                <Dropdown.Item onClick={() => navigate(Routers.MyAccountPage, { state: { id: 0 } })}>
                  View Information
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    console.log("User logged out");
                    navigate(Routers.LoginPage);
                  }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div className="d-flex gap-3">
              <Button
                variant="primary"
                className="px-4 py-2 fw-bold rounded-pill"
                onClick={() => navigate(Routers.LoginPage)}
              >
                Login
              </Button>
              <Button
                variant="warning"
                className="px-4 py-2 fw-bold rounded-pill text-dark"
                onClick={() => navigate(Routers.LoginHotelPage  )} // ✅ Thêm điều hướng cho nút này
              >
                Become Hotel Host
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
