import { Container, Nav, Navbar } from "react-bootstrap"
import { useSelector } from "react-redux";
import { AuthModal } from "../AuthModal";

export const NavigationBar = () => {

    const { user } = useSelector((state) => state.auth);

    return (
        <Navbar fixed="top" bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Библиотека</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                        {
                            user === null || user === undefined
                                ?
                                null
                                :
                                <Nav.Link>Добавить</Nav.Link>
                        }
                    </Nav>
                    <AuthModal />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
