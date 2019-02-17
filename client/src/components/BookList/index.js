import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";

// BookList - renders an unorderd list of book items
export function BookList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// BookListItem - details of a book
export function BookListItem(props) {
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={props.thumbnail} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <a href={props.link}>Google Preview</a>
          </Col>
        </Row>
      </Container>
    </li>
  );
}
