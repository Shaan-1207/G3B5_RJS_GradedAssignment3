import { Navbar, Container, Nav } from "react-bootstrap";
import {
  faCompactDisc,
  faMasksTheater,
  faStar,
  // faPowerOff,
  faVideo,
  faFireFlameCurved,
  faHeart,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const NavbarMenu = () => {
  return (
    <>
      <Container>
        <Navbar bg="dark" variant="dark" expand="lg">
          {/* <Navbar.Brand as={NavLink} to="/" className="mx-4">
            <strong className="m-head">M</strong>
            <FontAwesomeIcon
              icon={faCompactDisc}
              spin
              className="mx-1"
              size="sm"
            />
            vies
            <FontAwesomeIcon icon={faPowerOff} size="xl" className="my-1 mx-1"/>
            <span>
              n<strong>T</strong>ips
            </span>
          </Navbar.Brand> */}

          <Navbar.Brand as={NavLink} to="/" className="m-head mx-4">
            <strong>M</strong>
            <FontAwesomeIcon
              icon={faCompactDisc}
              spin
              className="mx-1"
              size="sm"
            />
            <span>
              <strong>T</strong>
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav-bar">
              <div className="menu-item">
                <Nav.Link as={NavLink} to="/coming-soon">
                  <FontAwesomeIcon icon={faVideo} />
                  <span> Coming Soon</span>
                </Nav.Link>
              </div>

              <div className="menu-item">
                <Nav.Link as={NavLink} to="/movies-in-theaters">
                  <FontAwesomeIcon icon={faMasksTheater} />
                  <span> Movies In Theatre</span>
                </Nav.Link>
              </div>

              <div className="menu-item">
                <Nav.Link as={NavLink} to="/top-rated-movies">
                  <FontAwesomeIcon icon={faStar} />
                  <span> Top Rated</span>
                </Nav.Link>
              </div>

              <div className="menu-item">
                <Nav.Link as={NavLink} to="/top-rated-indian">
                  <FontAwesomeIcon icon={faFireFlameCurved} />
                  <span> Top Rated Indian</span>
                </Nav.Link>
              </div>

              <div className="menu-item">
                <Nav.Link as={NavLink} to="/favorites">
                  <FontAwesomeIcon icon={faHeart} />
                  <span> Favorites</span>
                </Nav.Link>
              </div>

              <div className="menu-item">
                <Nav.Link as={NavLink} to="/about">
                  <FontAwesomeIcon icon={faCircleInfo} />
                  <span> About</span>
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  );
};

export default NavbarMenu;
