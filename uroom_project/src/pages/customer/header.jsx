import { Container, Navbar, Nav, Button } from "react-bootstrap"
import "../../css/customer/NavigationBar.css"
import * as Routers from "../../utils/Routes";
import { LoginPage } from "utils/Routes";

function NavigationBar() {
    return (
      <Navbar expand="lg" className="navbar-dark fixed-top">
        <Container>
          <Navbar.Brand href="#" className="brand">
            UR<span style={{color: "#f8e71c"}}>OO</span>M
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="#" className="nav-link">
                Home
              </Nav.Link>
              <Nav.Link href="#" className="nav-link">
                About
              </Nav.Link>
              <Nav.Link href="#" className="nav-link">
                Transaction
              </Nav.Link>
              <Nav.Link href="#" className="nav-link">
                My feedback
              </Nav.Link>
              <Nav.Link href="#" className="nav-link">
                Favorite hotels
              </Nav.Link>
            </Nav>
            <Button variant="light" className="login-btn" href={LoginPage}>
              Login
            </Button>
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