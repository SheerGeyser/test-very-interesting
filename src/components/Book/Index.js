import { Card, ListGroup, ListGroupItem } from "react-bootstrap"

export const Book = ({ name, authors, year, isbn }) => {
    return (
        <Card>
            <Card.Img variant="top" src="https://cdn1.ozone.ru/multimedia/wc1200/1010838592.jpg" />
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
