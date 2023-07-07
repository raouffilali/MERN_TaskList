import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { User } from "../models/user";
import NavBraLoggedinView from "./NavBraLoggedinView";
import NavBraLoggedoutView from "./NavBraLoggedoutView";

interface NavBarProps {
  logedInUser: User | null;
  onSignUpclicked: () => void;
  onLoginUpclicked: () => void;
  onLogOutSuccessful: () => void;
}

const NavBar = ({
  logedInUser,
  onSignUpclicked,
  onLoginUpclicked,
  onLogOutSuccessful,
}: NavBarProps) => {
  return (
    <Navbar bg="Primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <NavbarBrand>Acadedmia+</NavbarBrand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {logedInUser ? (
              <NavBraLoggedinView
                user={logedInUser}
                onLogoutSuccessful={onLogOutSuccessful}
              />
            ) : (
              <NavBraLoggedoutView
                onLoginClicked={onLoginUpclicked}
                onSignUpClicked={onSignUpclicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
