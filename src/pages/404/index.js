import { Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux";

import './404.scss'

export const Error404 = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <>
            <Container className='ErrorWrapper'>
                <Row>
                    {
                        user === null
                            ? <h1>Для просмотра данной страницы нужно авторизироваться</h1>
                            : (<h1>404</h1>)
                    }

                </Row>
            </Container>
        </>
    )
}
