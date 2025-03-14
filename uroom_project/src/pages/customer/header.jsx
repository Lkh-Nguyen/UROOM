import { Container, Navbar, Nav, Button, Image } from "react-bootstrap"
import "../../css/customer/NavigationBar.css"
import * as Routers from "../../utils/Routes";
import { LoginPage } from "utils/Routes";
import {useNavigate } from "react-router-dom";

function NavigationBar() {
    const navigate = useNavigate();
    return (
      <Navbar expand="lg" className="navbar-dark fixed-top">
        <Container>
          <Navbar.Brand
            style={{ cursor: "pointer" }} // Hiển thị dấu tay khi hover
            onClick={() => {
              navigate(Routers.Home)
            }} 
          className="brand">
            UR<span style={{color: "#f8e71c"}}>OO</span>M
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link  className="nav-link"
                onClick={() => {
                  navigate(Routers.Home)
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                className="nav-link"
                onClick={() => {
                  navigate(Routers.ErrorPage)
                }}
              >
                About
              </Nav.Link>
              <Nav.Link 
                className="nav-link"
                onClick={() => {
                  navigate(Routers.MyAccountPage, { state: {id: 3}})
                }}
              >
                Transaction
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate(Routers.MyAccountPage, { state: {id: 5}})
                }}
                className="nav-link">
                My Feedback
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate(Routers.MyAccountPage, { state: {id: 4}})
                }}
                className="nav-link">
                Favorite hotels
              </Nav.Link>
            </Nav>
            <Button 
              variant="light" 
              className="login-btn d-flex align-items-center"
              onClick={() => {
                navigate(Routers.MyAccountPage, {state: {id: 0}})
              }}
            >
              Lê Kim Hoàng Nguyên
              <Image
                src="https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-3.jpg"
                roundedCircle
                width="30"
                height="30"
                className="ms-2"
              />
            </Button>
            {/*
              <Button 
                variant="light" className="login-btn d-flex align-items-center" 
                onClick=(() => {
                })
              >
                Login
              </Button>
            */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
  
  
  export default NavigationBar;