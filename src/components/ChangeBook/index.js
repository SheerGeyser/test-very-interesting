import { useEffect, useState } from "react"
import { Button, Card, Form, ListGroup, ListGroupItem } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { delleteBook } from "../../store/books"

import './ChangeBook.scss'

export const ChangeBook = ({ src, name, authors, year, isbn, id }) => {
    const [imgUrl, setImgUrl] = useState(src)
    const [bookName, setBookName] = useState(name)
    const [bookAuthor, setBookAuthor] = useState(authors)
    const [bookYear, setBookYear] = useState(year)
    const [bookIsbn, setBookIsbn] = useState(isbn)

    const { reload } = useSelector(state => state.books)

    const dispatch = useDispatch();

    const handleDell = () => {
        dispatch(delleteBook(id))
    }

    useEffect(() => {
        if (reload) {
            document.location.reload();
        }
    }, [reload])

    return (

        <Form onReset={() => handleDell()} className='formChangeCard'>
            <Card className='changeCard'>
                <div className='imgWrapper'>
                    <Card.Img variant="top" src={src} />
                </div>
                <ListGroup className="list-group-flush list-group-change">
                    <ListGroupItem>
                        <Form.Group controlId="formBasicSrc">
                            <Form.Control value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} type="text" title='http://yan-dex.ru' pattern='^(https?:\/\/)?\([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$' placeholder="Ссылка на изображение" />
                        </Form.Group>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Form.Group controlId="formBasicName">
                            <Form.Control value={bookName} onChange={(e) => setBookName(e.target.value)} type="text" title='Жить так здорово' placeholder="Название книги" />
                        </Form.Group>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Form.Group controlId="formBasicAuthor">
                            <Form.Control value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} type="text" title='Михаил жванецкий' placeholder="Автор" />
                        </Form.Group>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Form.Group controlId="formBasicYear">
                            <Form.Control value={bookYear} onChange={(e) => setBookYear(e.target.value)} type="text" title='1945' pattern='^\d{4}$' placeholder="Год издания" />
                        </Form.Group>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Form.Group controlId="formBasicIsbn">
                            <Form.Control value={bookIsbn} onChange={(e) => setBookIsbn(e.target.value)} type="text" title='978-5-04-088837-5' pattern='[0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*' placeholder="ISBN" />
                        </Form.Group>
                    </ListGroupItem>
                    <ListGroupItem style={{ textAlign: 'right' }}>
                        <Button type='reset' variant="outline-danger">Удалить</Button>{' '}
                        <Button type='submit' variant="success">Сохранить</Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Form>
    )
}
