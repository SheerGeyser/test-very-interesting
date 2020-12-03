import { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Book } from '../../components/Book/Index'
import { NavigationBar } from '../../components/NavigationBar'

import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from '../../store/book';

import './MainPage.scss'

export const MainPage = () => {
    const dispatch = useDispatch();
    const { isLoadingBooks, items, errorBooks } = useSelector((state) => state.books)

    // useEffect(() => {
    //     dispatch(fetchBooks())
    // }, []);

    return (
        <>
            <NavigationBar />
            <Container className='itemWrapper'>
                <Row>
                    {errorBooks && (
                        <div>
                            <p>{errorBooks}</p>
                        </div>
                    )}
                    {
                        isLoadingBooks
                            ?
                            (<div style={{ textAlign: 'center' }}><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>)
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