import { useEffect, useState } from "react";
import { Button, Card, Form, ListGroup, ListGroupItem } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../store/books";

import './AddBook.scss'

export const AddBook = () => {
    const [imgUrl, setImgUrl] = useState('')
    const [bookName, setBookName] = useState('')
    const [bookAuthor, setBookAuthor] = useState('')
    const [bookYear, setBookYear] = useState()
    const [bookIsbn, setBookIsbn] = useState('')
    const { reload } = useSelector(state => state.books)


    const dispatch = useDispatch();

    const handleAdd = (e) => {
        e.preventDefault()
        dispatch(createBook({ bookAuthor, bookIsbn, bookName, imgUrl, bookYear }));
    };

    useEffect(() => {
        if (reload) {
            document.location.reload();
        }
    }, [reload])

    return (
        <Form className='formAddBook'>
            <Card>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>
                        <Form.Group controlId="formBasicSrc">
                            <Form.Control type="text" value={imgUrl} onChange={e => setImgUrl(e.target.value)} title='http://yan-dex.ru' pattern='^(https?:\/\/)?\([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$' placeholder="Ссылка на изображение" />
                        </Form.Group>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Form.Group controlId="formBasicName">
                            <Form.Control type="text" value={bookName} onChange={e => setBookName(e.target.value)} title='Жить так здорово' placeholder="Название книги" />
                        </Form.Group>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Form.Group controlId="formBasicAuthor">
                            <Form.Control type="text" value={bookAuthor} onChange={e => setBookAuthor(e.target.value)} title='Михаил жванецкий' placeholder="Автор" />
                        </Form.Group>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Form.Group controlId="formBasicYear">
                            <Form.Control type="text" value={bookYear} onChange={e => setBookYear(e.target.value)} title='1945' pattern='^\d{4}$' placeholder="Год издания" />
                        </Form.Group>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Form.Group controlId="formBasicIsbn">
                            <Form.Control type="text" value={bookIsbn} onChange={e => setBookIsbn(e.target.value)} title='978-5-04-088837-5' pattern='[0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*' placeholder="ISBN" />
                        </Form.Group>
                    </ListGroupItem>
                    <ListGroupItem style={{ textAlign: 'right' }}>
                        <Button type='reset' variant="outline-danger">Очистить</Button>{' '}
                        <Button type='submit' onClick={(e) => handleAdd(e)} variant="success">Добавить</Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Form>
    )
}
