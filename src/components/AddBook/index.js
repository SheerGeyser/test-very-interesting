import { Button, Card, Form, ListGroup, ListGroupItem } from "react-bootstrap"

import './AddBook.scss'

export const AddBook = () => {
    return (
        <Form onSubmit={e => e.preventDefault()}>
            <Card>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>
                        <Form.Group controlId="formBasicSrc">
                            <Form.Control type="text" title='http://yan-dex.ru' pattern='^(https?:\/\/)?\([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$' placeholder="Ссылка на изображение" />
                        </Form.Group>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Form.Group controlId="formBasicName">
                            <Form.Control type="text" title='Жить так здорово' placeholder="Название книги" />
                        </Form.Group>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Form.Group controlId="formBasicAuthor">
                            <Form.Control type="text" title='Михаил жванецкий' placeholder="Автор" />
                        </Form.Group>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Form.Group controlId="formBasicYear">
                            <Form.Control type="text" title='1945' pattern='^\d{4}$' placeholder="Год издания" />
                        </Form.Group>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Form.Group controlId="formBasicIsbn">
                            <Form.Control type="text" title='978-5-04-088837-5' pattern='[0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*[-| ][0-9]*' placeholder="ISBN" />
                        </Form.Group>
                    </ListGroupItem>
                    <ListGroupItem style={{ textAlign: 'right' }}>
                        <Button type='reset' variant="outline-danger">Очистить</Button>{' '}
                        <Button type='submit' variant="success">Добавить</Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Form>
    )
}
