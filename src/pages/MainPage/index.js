import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Book } from '../../components/Book/Index'
import { Loader } from '../../components/Loader'

import './MainPage.scss'

export const MainPage = () => {
    const { isLoadingBooks, items, errorBooks } = useSelector((state) => state.books)

    return (
        <>
            <Container className='itemWrapper mainPageWrapper'>
                <Row>
                    {errorBooks && (
                        <div>
                            <p>{errorBooks}</p>
                        </div>
                    )}
                    {
                        isLoadingBooks
                            ?
                            (<Loader />)
                            :
                            (items.map((i, index) => (
                                <Book
                                    key={index}
                                    src={i.src}
                                    name={i.name}
                                    authors={i.authors}
                                    year={i.year}
                                    isbn={i.isbn}
                                />
                            )))
                    }
                </Row>
            </Container>
        </>
    )
}
