import { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

import { useDispatch, useSelector } from "react-redux";
import { signInThunk } from "../../store/login";
import { registerThunk } from "../../store/register";

import '../loader.css'

export const AuthModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [auth, setAuth] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const { isLoading, error } = useSelector((state) => state.login);
    const [errorMsg, setErrorMsg] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoading) {
            setErrorMsg(error)
            console.log(`LOADING: ${isLoading}\nError: ${errorMsg}`);
        } else {
            setErrorMsg(error)
            console.log(`ELSE\nLOADING: ${isLoading}\nError: ${errorMsg}`);
        }
    }, [isLoading, error, errorMsg])

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('')
        dispatch(signInThunk({ email, password }));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setErrorMsg('')
        dispatch(registerThunk({ email, password }));
    };

    const handleChangeAuth = () => {
        setAuth(!auth);
        setPassword('');
        setEmail('');
        setErrorMsg('')
    }


    return (
        <>
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
                    {!auth ?
                        <Form onSubmit={e => handleLogin(e)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Адрес почты</Form.Label>
                                <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Введите адрес почты" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Пароль" />
                            </Form.Group>
                            {error && (<p>{errorMsg}</p>)}
                            {isLoading && <div style={{ textAlign: 'center' }}><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>}
                            <Button variant="success" name="Log in" type="submit" block>
                                Войти
                                </Button>
                            <Button onClick={() => handleChangeAuth()} variant="outline-success" name="Registration" type="button" block>
                                Регистрация
                                </Button>
                        </Form>
                        :
                        <Form onSubmit={e => handleRegister(e)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Адрес почты</Form.Label>
                                <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Введите адрес почты" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Пароль" />
                            </Form.Group>
                            {error && (<p>{errorMsg}</p>)}
                            {isLoading && <div style={{ textAlign: 'center' }}><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>}
                            <Button variant="success" name="Log in" type="submit" block>
                                Зарегестрироваться
                            </Button>
                            <Button onClick={() => handleChangeAuth()} variant="outline-success" name="Registration" type="button" block>
                                Уже есть аккаунт
                            </Button>
                        </Form>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}
