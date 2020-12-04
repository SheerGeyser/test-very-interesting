import { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

import { useDispatch, useSelector } from "react-redux";
import { signInThunk, clearError as clearErrorLogin } from "../../store/login";
import { registerThunk, clearError as clearErrorRegister } from "../../store/register";

import firebase from "firebase/app";

import '../loader.css'

export const AuthModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [needAuth, setNeedAuth] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const { isLoadingLogin, errorLogin } = useSelector((state) => state.login);
    const { isLoadingRegister, errorRegister } = useSelector((state) => state.register);
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setShowModal(false)
        }
    }, [user]);

    // const handleSignOut = () => {
    //     firebase.auth().signOut()
    // }


    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(signInThunk({ email, password }));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(registerThunk({ email, password }));
    };

    const handleChangeAuth = () => {
        setNeedAuth(!needAuth);
        setPassword('');
        setEmail('');
    }

    return (
        <>
            {
                user === null
                    ?
                    <Button onClick={() => setShowModal(true)} variant="outline-success">Войти</Button>
                    :
                    <Button onClick={() => firebase.auth().signOut()} variant="outline-success">Выйти</Button>
            }

            <Modal
                size="md"
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    {
                        !needAuth ? <Modal.Title id="example-modal-sizes-title-sm">
                            Вход
          </Modal.Title> : <Modal.Title id="example-modal-sizes-title-sm">
                                Регистрация
          </Modal.Title>
                    }
                </Modal.Header>
                <Modal.Body>
                    {!needAuth ?
                        <Form onSubmit={e => handleLogin(e)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Адрес почты</Form.Label>
                                <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Введите адрес почты" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Пароль" />
                            </Form.Group>
                            {errorLogin && (<p>{errorLogin}</p>)}
                            {isLoadingLogin && <div style={{ textAlign: 'center' }}><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>}
                            <Button variant="success" name="Log in" type="submit" block>
                                Войти
                                </Button>
                            <Button onClick={() => {
                                handleChangeAuth()
                                dispatch(clearErrorLogin())
                            }} variant="outline-success" name="Registration" type="button" block>
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
                            {errorRegister && (<p>{errorRegister}</p>)}
                            {isLoadingRegister && <div style={{ textAlign: 'center' }}><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>}
                            <Button variant="success" name="Log in" type="submit" block>
                                Зарегестрироваться
                            </Button>
                            <Button onClick={() => {
                                handleChangeAuth()
                                dispatch(clearErrorRegister())
                            }} variant="outline-success" name="Registration" type="button" block>
                                Уже есть аккаунт
                            </Button>
                        </Form>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}
