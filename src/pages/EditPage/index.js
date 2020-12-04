import { Container, Row } from "react-bootstrap"

import './EditPage.scss'
import { AddBook } from "../../components/AddBook"

export const EditPage = () => {
    return (
        <>
            <Container className='itemWrapper'>
                <Row>
                    <AddBook />
                </Row>
            </Container>
        </>
    )
}
