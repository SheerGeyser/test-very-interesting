import { Container, Nav, Navbar } from "react-bootstrap"
import { AuthModal } from "../AuthModal";

export const NavigationBar = () => {
    return (
        <Navbar fixed="top" bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Библиотека</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Галерея</Nav.Link>
                    </Nav>
                    <AuthModal />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
