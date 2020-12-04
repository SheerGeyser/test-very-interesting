import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Book } from '../../components/Book/Index'

import './MainPage.scss'

export const MainPage = () => {

    let count = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <>
            <Container className='itemWrapper'>
                <Row>
                    {count.map(() => <Book
                        name='СССР строит социализм'
                        authors='Лисицкий Лазарь Маркович'
                        year='1933'
                        isbn='978-5-699-12014-7'
                    />)}
                </Row>
            </Container>
        </>
    )
}
