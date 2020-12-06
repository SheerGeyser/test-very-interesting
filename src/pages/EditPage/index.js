import { Container, Row } from "react-bootstrap"

import './EditPage.scss'
import { AddBook } from "../../components/AddBook"
import { useSelector } from "react-redux"
import { Loader } from "../../components/Loader"
import { ChangeBook } from '../../components/ChangeBook'

export const EditPage = () => {
    const { isLoadingBooks, items, errorBooks } = useSelector((state) => state.books)



    return (
        <>
            <Container className='itemWrapper'>
                <Row>
                    <AddBook />
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
                                <ChangeBook
                                    key={index}
                                    id={i.id}
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
