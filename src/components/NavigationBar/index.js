import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, Modal, Nav, Navbar } from "react-bootstrap"
import firebase from "firebase/app";

import { Loader } from '../Loader'
import { signInThunk } from "../../store/login";
import { registerThunk } from "../../store/register";

export const NavigationBar = ({ user }) => {
    const [showModal, setShowModal] = useState(false);
    const [auth, setAuth] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const { isLoadingLogin, errorLogin } = useSelector((state) => state.login);
    const { isLoadingRegister, errorRegister } = useSelector((state) => state.register);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setShowModal(false)
        }
    }, [user]);

    const handleSignOut = () => {
        firebase.auth().signOut()
    }


    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(signInThunk({ email, password }));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(registerThunk({ email, password }));
    };

    const handleChangeAuth = () => {
        setAuth(!auth);
        setPassword('');
        setEmail('');
    }


    return (
        <Navbar fixed="top" bg="light" expand="lg">
            <Container>
                <Navbar.Brand>Библиотека</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    {
                        !user
                            ? <Button onClick={() => setShowModal(true)} variant="outline-success">Войти</Button>
                            : <Button onClick={() => handleSignOut()} variant="outline-success">Выйти</Button>
                    }
                    <Modal
                        size="md"
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        aria-labelledby="example-modal-sizes-title-sm"
                    >
                        <Modal.Header closeButton>
                            {
                                auth
                                    ? <Modal.Title id="example-modal-sizes-title-sm">Вход</Modal.Title>
                                    : <Modal.Title id="example-modal-sizes-title-sm">Регистрация</Modal.Title>
                            }
                        </Modal.Header>
                        <Modal.Body>
                            {
                                auth
                                    ? <Form onSubmit={e => e.preventDefault()}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label >Адрес почты</Form.Label>
                                            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Пароль</Form.Label>
                                            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Пароль" />
                                        </Form.Group>
                                        {errorLogin && (<p>{errorLogin}</p>)}
                                        {isLoadingLogin && <Loader />}
                                        <Button variant="success" onClick={(e) => handleLogin(e)} name="Log in" type="submit" block>
                                            Войти
                                        </Button>
                                        <Button onClick={() => handleChangeAuth()} variant="outline-success" name="Registration" type="button" block>
                                            Регистрация
                                    </Button>
                                    </Form>
                                    : <Form onSubmit={e => e.preventDefault()}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Адрес почты</Form.Label>
                                            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label >Пароль</Form.Label>
                                            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Пароль" />
                                        </Form.Group>
                                        {errorRegister && (<p>{errorRegister}</p>)}
                                        {isLoadingRegister && <Loader />}
                                        <Button variant="success" onClick={(e) => handleRegister(e)} name="Log in" type="submit" block>
                                            Зарегестрироваться
                                    </Button>
                                        <Button onClick={() => handleChangeAuth()} variant="outline-success" name="Registration" type="button" block>
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
