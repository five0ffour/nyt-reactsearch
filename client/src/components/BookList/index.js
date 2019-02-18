import React from "react";
import Thumbnail from "../Thumbnail";
import Button from "../Button"
import { Container, Row, Col } from "../Grid";
import "./style.css"

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
          <Col size="lg-9">
            <h3>{props.title}</h3>
            <h6>Written by: {props.authors}</h6>
          </Col>
          <Col size="lg-3">
            <a className="btn btn-primary" href={props.link}>View</a>
            {props.isSearchView ? (<Button type="save"   className="btn-success" children="" onClick={props.saveClickHandler}>Save</Button>) :
                                  (<Button type="delete" className="btn-danger"  children="" onClick={props.deleteClickHandler}>Delete</Button>)
            }
          </Col>
        </Row>
        <Row>
          <Col size="sm-3">
            <Thumbnail src={props.thumbnail} />
          </Col>
          <Col size="sm-9">
          <p>{props.description}</p>
          </Col>
        </Row>
      </Container>
    </li>
  );
}
