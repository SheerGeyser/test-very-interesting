import { Card, ListGroup, ListGroupItem } from "react-bootstrap"

import './Book.scss'

export const Book = ({ src, name, authors, year, isbn }) => {
    return (
        <Card>
            <div className='imgWrapper'>
                <Card.Img variant="top" src={src} />
            </div>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem><span>Автор: </span>{authors}</ListGroupItem>
                <ListGroupItem><span>Год издания: </span>{year}</ListGroupItem>
                <ListGroupItem><span>ISBN: </span>{isbn}</ListGroupItem>
            </ListGroup>
        </Card>
    )
}
