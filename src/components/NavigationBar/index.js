import { useState } from "react";
import { Button, Container, Form, Modal, Nav, Navbar } from "react-bootstrap"

export const NavigationBar = () => {
    const [showModal, setShowModal] = useState(false);
    const [auth, setAuth] = useState(false);

    return (
        <Navbar fixed="top" bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Библиотека</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Галерея</Nav.Link>
                    </Nav>
                    <Button onClick={() => setShowModal(true)} variant="outline-success">Войти</Button>
                    <Modal
                        size="md"
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        aria-labelledby="example-modal-sizes-title-sm"
                    >
                        <Modal.Header closeButton>
                            {
                                !auth ? <Modal.Title id="example-modal-sizes-title-sm">
                                    Вход
          </Modal.Title> : <Modal.Title id="example-modal-sizes-title-sm">
                                        Регистрация
          </Modal.Title>
                            }
                        </Modal.Header>
                        <Modal.Body>
                            {!auth ? <Form onSubmit={e => e.preventDefault()}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Адрес почты</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control type="password" placeholder="Пароль" />
                                </Form.Group>
                                <Button variant="success" name="Log in" type="submit" block>
                                    Войти
                                </Button>
                                <Button onClick={() => setAuth(true)} variant="outline-success" name="Registration" type="button" block>
                                    Регистрация
                                </Button>
                            </Form> :
                                <Form onSubmit={e => e.preventDefault()}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Адрес почты</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Пароль</Form.Label>
                                        <Form.Control type="password" placeholder="Пароль" />
                                    </Form.Group>
                                    <Button variant="success" name="Log in" type="submit" block>
                                        Зарегестрироваться
                            </Button>
                                    <Button onClick={() => setAuth(false)} variant="outline-success" name="Registration" type="button" block>
                                        Уже есть аккаунт
                            </Button>
                                </Form>
                            }
                        </Modal.Body>
                    </Modal>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
