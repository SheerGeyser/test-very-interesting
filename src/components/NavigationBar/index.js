import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, Modal, Nav, Navbar } from "react-bootstrap"
import firebase from "firebase/app";

import { Loader } from '../Loader'
import { clearErrorLog, signInThunk } from "../../store/login";
import { clearErrorReg, registerThunk } from "../../store/register";
import { updateAuthState } from "../../store/auth";



export const NavigationBar = () => {
    const [showModal, setShowModal] = useState(false);
    const [auth, setAuth] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [passwordСonfirmation, setPasswordСonfirmation] = useState('')
    const [passConfError, setPassConfError] = useState(undefined)
    const { isLoadingLogin, errorLogin } = useSelector((state) => state.login);
    const { isLoadingRegister, errorRegister } = useSelector((state) => state.register);
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setShowModal(false)
        }
    }, [user]);

    const handleSignOut = () => {
        dispatch(updateAuthState(null));
        firebase.auth().signOut()
    }


    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(signInThunk({ email, password }));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (password === passwordСonfirmation) {
            dispatch(registerThunk({ email, password }));
        } else {
            setPassword('');
            setPasswordСonfirmation('');
            setPassConfError('Пароли не совпадают')
        }

    };

    const handleChangeAuth = () => {
        setAuth(!auth);
        setEmail('');
        setPassword('');
        setPassConfError('')
    }


    return (
        <Navbar fixed="top" bg="light" expand="lg">
            <Container>
                <Navbar.Brand>Библиотека</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/edit">Редактор</Nav.Link>
                    </Nav>
                    {
                        user === null
                            ? <Button onClick={() => setShowModal(true)} variant="outline-success">Войти</Button>
                            : <Button onClick={() => handleSignOut()} variant="outline-success">Выйти</Button>
                    }
                    <Modal
                        size="md"
                        show={showModal}
                        onHide={() => {
                            setShowModal(false);
                            setTimeout(() => {
                                setAuth(true)
                            }, 100)
                        }}
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
                                            <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Введите адрес почты" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Пароль</Form.Label>
                                            <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Пароль" />
                                        </Form.Group>
                                        {errorLogin && (<p>{errorLogin}</p>)}
                                        {isLoadingLogin && <Loader />}
                                        <Button variant="success" onClick={(e) => handleLogin(e)} name="Log in" type="submit" block>
                                            Войти
                                        </Button>
                                        <Button onClick={() => {
                                            handleChangeAuth()
                                            dispatch(clearErrorLog())
                                        }} variant="outline-success" name="Registration" type="button" block>
                                            Регистрация
                                    </Button>
                                    </Form>
                                    : <Form onSubmit={e => e.preventDefault()}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Адрес почты</Form.Label>
                                            <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Введите адрес почты" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label >Пароль</Form.Label>
                                            <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Пароль" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Control onChange={(e) => setPasswordСonfirmation(e.target.value)} value={passwordСonfirmation} type="password" placeholder="Поддтвердите пароль" />
                                        </Form.Group>
                                        {passConfError && (<p>{passConfError}</p>)}
                                        {errorRegister && (<p>{errorRegister}</p>)}
                                        {isLoadingRegister && <Loader />}
                                        <Button variant="success" onClick={(e) => handleRegister(e)} name="Log in" type="submit" block>
                                            Зарегестрироваться
                                    </Button>
                                        <Button onClick={() => {
                                            handleChangeAuth()
                                            dispatch(clearErrorReg())
                                        }} variant="outline-success" name="Registration" type="button" block>
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
